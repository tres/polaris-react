import {v4 as uuid} from 'uuid';

import {GradientType, WarningType} from '../types';

import {Parse} from './parser';
import {ValidateAst} from './validate-ast';
import {ValidateString} from './validate-string';
import type {Gradient} from './types';

export function parseGradient(value?: string | null): Gradient {
  if (value == null || value.trim() === '') {
    return {tag: 'empty', string: ''};
  }

  const validatedString = ValidateString(value);

  if (validatedString.error) {
    return {
      tag: 'invalid',
      error: validatedString.error,
      string: value,
      wrappedGradient: unwrapGradient(value),
    };
  }

  try {
    const ast = Parse(value);
    const validatedAst = ValidateAst(ast);
    if (!validatedAst.supported) {
      return {
        tag: 'unsupported',
        warnings: validatedAst.warnings,
        string: value,
      };
    }

    const {gradient} = validatedAst;

    const stops = gradient.colorStops.reduce((stops, stop) => {
      const id = uuid();

      return {
        ...stops,
        [id]: {id, position: stop.length.value, color: stop.value.hsb},
      };
    }, {});

    const linearOrientation =
      gradient.type === 'linear' &&
      gradient.orientation != null &&
      gradient.orientation.type === 'angular'
        ? gradient.orientation
        : null;

    return {
      tag: 'valid',
      type: gradient.type as GradientType,
      linearOrientation,
      stops,
    };
  } catch (error) {
    console.log(error);
    return {
      tag: 'unsupported',
      string: value,
      warnings: [{type: WarningType.CouldNotParse}],
    };
  }
}

const GRADIENT_FUNCTION_REGEXP = /(?<repeating>repeating-)?(?<gradient_type>linear|conic|radial)-gradient\((?<args>.*)\)/;

function unwrapGradient(value: string) {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const match = value.match(GRADIENT_FUNCTION_REGEXP)?.[0];

  if (match == null) {
    return null;
  }

  try {
    const unwrappedGradientIsValid = Parse(match)?.[0] != null;

    if (unwrappedGradientIsValid) {
      return match;
    }
  } catch {
    return null;
  }

  return null;
}
