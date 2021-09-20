import React from 'react';

import {Labelled} from '../../../Labelled';
import {
  hexToRgb,
  rgbToHsb,
  rgbString,
  hsbToRgb,
} from '../../../../utilities/color-transformers';

import styles from './PresetPicker.scss';

interface Preset {
  value: string;
  label: string;
}

interface Props {
  onSelect(presetValue: string): void;
  presets: Preset[];
}

export function PresetPicker({presets, onSelect}: Props) {
  return (
    <div className={styles.Wrapper}>
      {presets.map(({label, value}) => {
        const key = `${label}${value}`;
        const rgb = hexToRgb(value);
        const rgbStringValue = rgbString(rgb);
        const hsb = rgbToHsb(rgb);

        const hueShift = rgbString(hsbToRgb({...hsb, hue: hsb.hue * 0.5}));
        const hueShiftGradient = `linear-gradient(45deg, ${rgbStringValue} 0%, ${hueShift} 100%)`;

        const saturationShift = rgbString(
          hsbToRgb({...hsb, saturation: hsb.saturation * 0.5}),
        );
        const saturationShiftGradient = `linear-gradient(45deg, ${rgbStringValue} 0%, ${saturationShift} 100%)`;

        const brightnessShift = rgbString(
          hsbToRgb({...hsb, brightness: hsb.brightness * 0.5}),
        );
        const brightnessShiftGradient = `linear-gradient(45deg, ${rgbStringValue} 0%, ${brightnessShift} 100%)`;

        return (
          <>
            <Labelled key={key} id={key} label={label}>
              <div
                onClick={() => onSelect(hueShiftGradient)}
                className={styles.ThumbnailWrapper}
                style={{
                  background: hueShiftGradient,
                }}
              />
              <div
                onClick={() => onSelect(saturationShiftGradient)}
                className={styles.ThumbnailWrapper}
                style={{
                  background: saturationShiftGradient,
                }}
              />
              <div
                onClick={() => onSelect(brightnessShiftGradient)}
                className={styles.ThumbnailWrapper}
                style={{
                  background: brightnessShiftGradient,
                }}
              />
            </Labelled>
          </>
        );
      })}
    </div>
  );
}
