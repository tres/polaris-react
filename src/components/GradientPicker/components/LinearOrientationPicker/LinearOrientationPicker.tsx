import React from 'react';
import {ArrowUpMinor} from '@shopify/polaris-icons';

import type {LinearOrientation} from '../../types';
import {Button} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {Icon} from '../../../Icon';
import styles from '../../GradientPicker.scss';

interface Props {
  onSetLinearOrientation(value: string): void;
  linearOrientation: NonNullable<LinearOrientation>;
}

export function LinearOrientationPicker({
  onSetLinearOrientation,
  linearOrientation,
}: Props) {
  const {value} = linearOrientation;
  return (
    <div className={styles.LinearOrientationWrapper}>
      <ButtonGroup segmented>
        <div className={styles.LinearOrientationButton}>
          <Button
            size="slim"
            icon={
              <span className={styles.Rotate90}>
                <Icon source={ArrowUpMinor} />
              </span>
            }
            pressed={value === '90'}
            onClick={() => onSetLinearOrientation('90')}
          />
        </div>
        <div className={styles.LinearOrientationButton}>
          <Button
            size="slim"
            icon={
              <span className={styles.Rotate45}>
                <Icon source={ArrowUpMinor} />
              </span>
            }
            pressed={value === '45'}
            onClick={() => onSetLinearOrientation('45')}
          />
        </div>
        <div className={styles.LinearOrientationButton}>
          <Button
            size="slim"
            icon={
              <span className={styles.Rotate135}>
                <Icon source={ArrowUpMinor} />
              </span>
            }
            pressed={value === '135'}
            onClick={() => onSetLinearOrientation('135')}
          />
        </div>
        <div className={styles.LinearOrientationButton}>
          <Button
            size="slim"
            icon={
              <span className={styles.Rotate180}>
                <Icon source={ArrowUpMinor} />
              </span>
            }
            pressed={value === '180'}
            onClick={() => onSetLinearOrientation('180')}
          />
        </div>
      </ButtonGroup>
      <input
        className={styles.LinearOrientationCustomInput}
        type="text"
        value={value}
        onChange={(event) => {
          onSetLinearOrientation(event.currentTarget.value);
        }}
      />
    </div>
  );
}
