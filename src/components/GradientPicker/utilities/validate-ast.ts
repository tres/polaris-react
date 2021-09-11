import {Warning, WarningType} from '../types';

import type {GradientValue} from './types';

interface SupportedOutput {
  supported: true;
  gradient: GradientValue;
}

interface UnsupportedOutput {
  supported: false;
  warnings: Warning[];
}

type Output = SupportedOutput | UnsupportedOutput;

const SUPPORTED_TYPES = ['linear-gradient', 'radial-gradient'];

export const ValidateAst = (input: GradientValue[]): Output => {
  const warnings: Warning[] = [];

  if (input.length > 1) {
    return {warnings: [{type: WarningType.ContainsMultipleGradients}], input};
  }

  const gradient = input[0];

  validateType();
  validateOrientation();
  validateColorStops();

  if (warnings.length > 0) {
    return {
      supported: false,
      warnings,
    };
  }

  return {
    supported: true,
    gradient,
  };

  function validateType() {
    if (!SUPPORTED_TYPES.includes(gradient.type)) {
      warnings.push({
        type: WarningType.UnsupportedGradientType,
        value: gradient.type,
      });
    }
  }

  function validateOrientation() {}

  function validateColorStops() {
    for (const colorStop of gradient.colorStops) {
      // TODO: Support literal color stops when possible by transforming literal to color when I
      // transition this to osw.
      if (colorStop.type === 'literal') {
        warnings.push({
          type: WarningType.UnsupportedColorStop,
          value: colorStop.value.input,
        });
      }

      // UI only supports relative distance between stops
      if (colorStop.length.type !== '%') {
        warnings.push({
          type: WarningType.UnsupportedColorStopDistance,
          value: colorStop.length.type,
        });
      }
    }
  }
};
