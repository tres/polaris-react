import {WarningType} from '../types';

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

    if (gradient.type === 'linear-gradient') {
      return {
        tag: 'valid',
        type: 'linear' as any,
        stops: gradient.colorStops.reduce((stops, stop) => {
          const id = generateId();

          return {
            ...stops,
            [id]: {id, position: stop.length.value, color: stop.value.hsb},
          };
        }, {}),
      };
    }

    if (gradient.type === 'radial-gradient') {
      return {
        tag: 'valid',
        type: 'radial' as any,
        stops: gradient.colorStops.reduce((stops, stop) => {
          const id = generateId();

          return {
            ...stops,
            [id]: {id, position: stop.length.value, color: stop.value.hsb},
          };
        }, {}),
      };
    }
  } catch (error) {
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

let id = 1000;

function generateId() {
  return `${id++}`;
}
