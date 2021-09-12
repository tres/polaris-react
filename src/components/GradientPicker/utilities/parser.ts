/* eslint-disable one-var */

import type {RGBAColor, RGBColor} from 'index';

import {rgbToHsb, hexToRgb} from '../../../utilities/color-transformers';

import type {GradientValue} from './types';

interface Match {
  type: string;
  value: any;
  at?: any;
  style?: any;
  length?: any;
}

const TOKENS = {
  linearGradient: /^(-(webkit|o|ms|moz)-)?(linear-gradient)/i,
  repeatingLinearGradient: /^(-(webkit|o|ms|moz)-)?(repeating-linear-gradient)/i,
  radialGradient: /^(-(webkit|o|ms|moz)-)?(radial-gradient)/i,
  repeatingRadialGradient: /^(-(webkit|o|ms|moz)-)?(repeating-radial-gradient)/i,
  sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i,
  extentKeywords: /^(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)/,
  positionKeywords: /^(left|center|right|top|bottom)/i,
  pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
  percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))%/,
  emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
  angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
  startCall: /^\(/,
  endCall: /^\)/,
  comma: /^,/,
  hexColor: /^#([0-9a-fA-F]+)/,
  literalColor: /^([a-zA-Z]+)/,
  rgbColor: /^rgb/i,
  rgbaColor: /^rgba/i,
  number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/,
};

export const Parse = (function () {
  let input = '';

  // We throw an error if
  function error(message: string) {
    return new Error(`${input}: ${message}`);
  }

  function getAST(): GradientValue[] {
    const ast = matchListDefinitions();

    if (input.length > 0) {
      throw error(
        'Input contains characters in addition to css gradient string.',
      );
    }

    return ast;
  }

  function matchListDefinitions() {
    return matchArrayOf(matchDefinition);
  }

  function matchDefinition() {
    return (
      matchGradient('linear', TOKENS.linearGradient, matchLinearOrientation) ||
      matchGradient(
        'repeating-linear',
        TOKENS.repeatingLinearGradient,
        matchLinearOrientation,
      ) ||
      matchGradient(
        'radial',
        TOKENS.radialGradient,
        matchListRadialOrientations,
      ) ||
      matchGradient(
        'repeating-radial',
        TOKENS.repeatingRadialGradient,
        matchListRadialOrientations,
      )
    );
  }

  function matchGradient(
    gradientType: GradientValue['type'],
    pattern: RegExp,
    orientationMatcher: () => Match | Match[] | undefined | null,
  ) {
    return matchCssFunctionCall(pattern, function () {
      const orientation = orientationMatcher();
      if (orientation) {
        if (!scan(TOKENS.comma)) {
          throw error('Missing comma before color stops');
        }
      }

      return {
        type: gradientType,
        orientation,
        colorStops: matchArrayOf(matchColorStop),
      };
    });
  }

  function matchCssFunctionCall(
    pattern: RegExp,
    handleHasFunctionCall: () => any,
  ) {
    const captures = scan(pattern);

    if (captures) {
      if (!scan(TOKENS.startCall)) {
        throw error('Missing (');
      }

      const result = handleHasFunctionCall();

      if (!scan(TOKENS.endCall)) {
        throw error('Missing )');
      }

      return result;
    }

    return null;
  }

  function match(
    type: string,
    pattern: RegExp,
    captureIndex: number,
  ): Match | null {
    const captures = scan(pattern);
    if (captures) {
      return {
        type,
        value: captures[captureIndex],
      };
    }

    return null;
  }

  function matchLinearOrientation() {
    return matchSideOrCorner() || matchAngle();
  }

  function matchSideOrCorner() {
    return match('directional', TOKENS.sideOrCorner, 1);
  }

  function matchAngle() {
    return match('angular', TOKENS.angleValue, 1);
  }

  function matchListRadialOrientations() {
    // eslint-disable-next-line no-var
    var radialOrientations,
      radialOrientation = matchRadialOrientation(),
      lookaheadCache;

    if (radialOrientation) {
      radialOrientations = [];
      radialOrientations.push(radialOrientation);

      lookaheadCache = input;
      if (scan(TOKENS.comma)) {
        radialOrientation = matchRadialOrientation();
        if (radialOrientation) {
          radialOrientations.push(radialOrientation);
        } else {
          input = lookaheadCache;
        }
      }
    }

    return radialOrientations;
  }

  function matchRadialOrientation() {
    let radialType = matchCircle() || matchEllipse();

    if (radialType) {
      radialType.at = matchAtPosition();
    } else {
      const extent = matchExtentKeyword();
      if (extent) {
        radialType = extent;
        const positionAt = matchAtPosition();
        if (positionAt) {
          radialType.at = positionAt;
        }
      } else {
        const defaultPosition = matchPositioning();
        if (defaultPosition) {
          radialType = {
            type: 'default-radial',
            at: defaultPosition,
            value: null,
          };
        }
      }
    }

    return radialType;
  }

  function matchCircle() {
    const circle = match('shape', /^(circle)/i, 0);

    if (circle) {
      circle.style = matchLength() || matchExtentKeyword();
    }

    return circle;
  }

  function matchEllipse() {
    const ellipse = match('shape', /^(ellipse)/i, 0);

    if (ellipse) {
      ellipse.style = matchDistance() || matchExtentKeyword();
    }

    return ellipse;
  }

  function matchExtentKeyword() {
    return match('extent-keyword', TOKENS.extentKeywords, 1);
  }

  function matchAtPosition() {
    if (match('position', /^at/, 0)) {
      const positioning = matchPositioning();

      if (!positioning) {
        throw error('Missing positioning value');
      }

      return positioning;
    }
  }

  function matchPositioning() {
    const location = matchCoordinates();

    if (location.x || location.y) {
      return {
        type: 'position',
        value: location,
      };
    }
  }

  function matchCoordinates() {
    return {
      x: matchDistance(),
      y: matchDistance(),
    };
  }

  function matchArrayOf(matcher: () => any) {
    let captures = matcher();
    const result = [];

    if (captures) {
      result.push(captures);
      while (scan(TOKENS.comma)) {
        captures = matcher();
        if (captures) {
          result.push(captures);
        } else {
          throw error('One extra comma');
        }
      }
    }

    return result;
  }

  function matchColorStop() {
    const color = matchColor();

    if (color == null) {
      throw error('Expected color definition');
    }

    color.length = matchDistance();
    return color;
  }

  function matchColor() {
    return (
      matchHexColor() ||
      matchRGBAColor() ||
      matchRGBColor() ||
      matchLiteralColor()
    );
  }

  function matchLiteralColor() {
    const literalMatch = match('literal', TOKENS.literalColor, 0);

    return {
      type: 'literal',
      value: {input: literalMatch?.value},
    };
  }

  function matchHexColor() {
    const hexMatch = match('hex', TOKENS.hexColor, 1);

    if (hexMatch == null) {
      return null;
    }

    return {
      type: 'hex',
      value: {input: hexMatch.value, hsb: rgbToHsb(hexToRgb(hexMatch.value))},
    };
  }

  function matchRGBColor() {
    return matchCssFunctionCall(TOKENS.rgbColor, function () {
      const input = matchArrayOf(matchNumber);
      const [red, green, blue] = input;
      const rgbColor: RGBColor = {red, green, blue};
      const hsb = rgbToHsb(rgbColor);
      return {
        type: 'rgb',
        value: {input, hsb},
      };
    });
  }

  function matchRGBAColor() {
    return matchCssFunctionCall(TOKENS.rgbaColor, function () {
      const input = matchArrayOf(matchNumber);
      const [red, green, blue, alpha] = input;
      const rgbaColor: RGBAColor = {
        red,
        green,
        blue,
        alpha,
      };
      const hsb = rgbToHsb(rgbaColor);
      return {
        type: 'rgba',
        value: {input, hsb},
      };
    });
  }

  function matchNumber() {
    return scan(TOKENS.number)?.[1] || null;
  }

  function matchDistance() {
    return (
      match('%', TOKENS.percentageValue, 1) ||
      matchPositionKeyword() ||
      matchLength()
    );
  }

  function matchPositionKeyword() {
    return match('position-keyword', TOKENS.positionKeywords, 1);
  }

  function matchLength() {
    return match('px', TOKENS.pixelValue, 1) || match('em', TOKENS.emValue, 1);
  }

  function scan(regexp: RegExp): RegExpExecArray | null {
    const blankCaptures = /^[\n\r\t\s]+/.exec(input);

    if (blankCaptures) {
      consume(blankCaptures[0].length);
    }

    const captures = regexp.exec(input);

    if (captures) {
      consume(captures[0].length);
    }

    return captures;
  }

  function consume(size: number) {
    input = input.substr(size);
  }

  return function (code: string) {
    input = code.toString();
    return getAST();
  };
})();
