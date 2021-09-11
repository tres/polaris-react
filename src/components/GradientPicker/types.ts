import type {HSBAColor} from '../../utilities/color-types';

export interface Stops {
  [stopId: string]: Stop;
}

export interface Stop {
  id: string;
  position: number;
  color: HSBAColor;
}

export type GradientType = 'linear' | 'radial' | 'conic' | 'custom';

export enum ErrorType {
  ContainsForbiddenCharacters = 'containsForbiddenCharacters',
}

interface ForbiddenCharactersError {
  type: ErrorType.ContainsForbiddenCharacters;
  characters: string[];
}

export type Error = ForbiddenCharactersError;

export enum WarningType {
  CouldNotParse = 'CouldNotParse',
  ContainsMultipleGradients = 'ContainsMultipleGradients',
  UnsupportedGradientType = 'UnsupportedGradientType',
  UnsupportedOrientation = 'unsupportedOrientation',
  UnsupportedColorStop = 'unsupportedColorStop',
  UnsupportedColorStopDistance = 'unsupportedColorStopDistance',
}

interface ContainsMultipleGradientsWarning {
  type: WarningType.ContainsMultipleGradients;
}

interface UnsupportedGradientTypeWarning {
  type: WarningType.UnsupportedGradientType;
  value: string;
}

interface UnsupportedOrientationWarning {
  type: WarningType.UnsupportedOrientation;
}

interface UnsupportedColorStopWarning {
  type: WarningType.UnsupportedColorStop;
  value: string;
}

interface UnsupportedColorStopDistanceWarning {
  type: WarningType.UnsupportedColorStopDistance;
  value: string;
}

interface CouldNotParseWarning {
  type: WarningType.CouldNotParse;
}

export type Warning =
  | ContainsMultipleGradientsWarning
  | UnsupportedGradientTypeWarning
  | UnsupportedOrientationWarning
  | UnsupportedColorStopWarning
  | UnsupportedColorStopDistanceWarning
  | CouldNotParseWarning;
