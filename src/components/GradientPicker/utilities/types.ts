import type {HSBAColor, HSBColor} from 'index';

import type {
  Error,
  Warning,
  Stops,
  GradientType as AcceptedGradientType,
} from '../types';

export type Gradient =
  | ValidGradient
  | ValidButUnsupportedGradient
  | InvalidGradient
  | EmptyGradient;

interface ValidGradient {
  tag: 'valid';
  stops: Stops;
  type: AcceptedGradientType;
}

interface InvalidGradient {
  tag: 'invalid';
  error: Error;
  string: string;
  wrappedGradient: string | null;
}

interface ValidButUnsupportedGradient {
  tag: 'unsupported';
  string: string;
  warnings: Warning[];
}

interface EmptyGradient {
  tag: 'empty';
  string: string;
}

export interface GradientValue {
  type: GradientType;
  orientation: Orientation;
  colorStops: ColorStop[];
}

type GradientType =
  | 'linear-gradient'
  | 'repeating-linear-gradient'
  | 'radial-gradient'
  | 'repeating-radial-gradient';

interface Orientation {
  type: 'directional' | 'angular';
  value: string;
}

type ColorStop = HexColorStop | RgbColorStop | RgbaColorStop | LiteralColorStop;

interface LiteralColorStop extends BaseColorStop {
  type: 'literal';
  value: {input: string; hsb: HSBAColor | HSBColor};
}

interface HexColorStop extends BaseColorStop {
  type: 'hex';
  value: {input: string; hsb: HSBAColor | HSBColor};
}

interface RgbColorStop extends BaseColorStop {
  type: 'rgb';
  value: {input: [string, string, string]; hsb: HSBAColor | HSBColor};
}

interface RgbaColorStop extends BaseColorStop {
  type: 'rgba';
  value: {input: [string, string, string, string]; hsb: HSBAColor | HSBColor};
}

interface BaseColorStop {
  length: {type: '%' | 'px' | 'em'; value: string};
}
