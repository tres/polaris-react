import React from 'react';
import {CircleCancelMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import type {HSBAColor} from '../../../../utilities/color-types';
import {
  hsbToRgb,
  rgbString,
  hsbToHex,
} from '../../../../utilities/color-transformers';
import {TextField} from '../../../TextField';
import {Button} from '../../../Button';
import {Caption} from '../../../Caption';

import styles from './StopList.scss';

interface Props {
  activeStopId: string;
  onSetActiveStopId(id: string): void;
  onRemoveStop(id: string): void;
  onAddStop(): void;
  // onSetStopColor(id: string, color: HSBColor): void;
  // onSetStopPosition(id: string, position: number): void;
  stops: {id: string; position: number; color: HSBAColor}[];
}

export function StopList({
  stops,
  activeStopId,
  onSetActiveStopId,
  onAddStop,
  onRemoveStop,
}: Props) {
  return (
    <div className={styles.StopList}>
      <div className={styles.Captions}>
        <div className={styles.col1}>
          <Caption>Position</Caption>
        </div>
        <div className={styles.col2}>
          <Caption>Hex code</Caption>
        </div>
        <div className={styles.col3}>
          <Caption>Alpha</Caption>
        </div>
      </div>
      {stops.map((stop, index) => {
        return (
          <div
            key={stop.id}
            className={classNames(
              styles.StopListItem,
              stop.id === activeStopId && styles.Active,
            )}
          >
            <div className={styles.StopListPercentInput}>
              <TextField
                label=""
                suffix="%"
                monospaced
                value={Math.floor(stop.position).toString()}
                onChange={() => {}}
                onFocus={() => onSetActiveStopId(stop.id)}
              />
            </div>
            <div className={styles.StopListHexInput}>
              <TextField
                label=""
                prefix="#"
                monospaced
                value={hsbToHex(stop.color).replace('#', '').toUpperCase()}
                onChange={() => {}}
                onFocus={() => onSetActiveStopId(stop.id)}
              />
            </div>
            <div className={styles.StopListPercentInput}>
              <TextField
                label=""
                suffix="%"
                monospaced
                value={Math.floor(stop.color.alpha * 100).toString()}
                onChange={() => {}}
                onFocus={() => onSetActiveStopId(stop.id)}
              />
            </div>

            <div className={styles.ClearButton}>
              <Button
                monochrome
                plain
                disabled={stops.length <= 2}
                icon={CircleCancelMinor}
                onClick={() => onRemoveStop(stop.id)}
              />
            </div>
          </div>
        );
      })}
      <div className={styles.AddButton}>
        <Button plain onClick={() => onAddStop()}>
          Add color stop
        </Button>
      </div>
    </div>
  );
}
