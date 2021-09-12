import React from 'react';

import {ButtonGroup} from '../../../ButtonGroup';
import {Button} from '../../../Button';
import type {GradientType} from '../../types';

import styles from './TypePicker.scss';

interface Props {
  disabled: boolean;
  activeType: GradientType;
  onChange(type: GradientType): void;
}
export function TypePicker({disabled, activeType, onChange}: Props) {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.buttonGroup}>
        <ButtonGroup segmented>
          <Button
            size="slim"
            pressed={activeType === 'linear'}
            onClick={() => onChange('linear')}
            disabled={disabled}
          >
            Linear
          </Button>
          <Button
            size="slim"
            pressed={activeType === 'radial'}
            onClick={() => onChange('radial')}
            disabled={disabled}
          >
            Radial
          </Button>
          <Button
            size="slim"
            pressed={activeType === 'conic'}
            onClick={() => onChange('conic')}
            disabled={disabled}
          >
            Conic
          </Button>
        </ButtonGroup>
      </div>
      <Button
        size="slim"
        pressed={activeType === 'custom'}
        onClick={() => onChange('custom')}
      >
        Custom
      </Button>
    </div>
  );
}
