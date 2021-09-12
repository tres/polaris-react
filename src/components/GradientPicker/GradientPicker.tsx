import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';

import {Card} from '../Card';
import {TextField} from '../TextField';
import {clamp} from '../../utilities/clamp';
import {ColorPicker} from '../ColorPicker';
import type {HSBAColor} from '../../utilities/color-types';

import {useValue} from './hooks';
import {StopList, CircleSlider, StopPicker, TypePicker} from './components';
import styles from './GradientPicker.scss';

export interface GradientPickerProps {}

const DEFAULT_GRADIENT =
  'linear-gradient(to right, rgba(107, 163, 179, 1) 0%, rgba(160, 219, 177, 1) 100%)';

export function GradientPicker(props: GradientPickerProps) {
  const [value, setValue] = useState(DEFAULT_GRADIENT);

  const {
    type,
    setType,
    stops,
    setStops,
    linearOrientation,
    setLinearOrientation,
    activeStopId,
    setActiveStopId,
    activeStop,
    sortedStops,
    gradient,
    linearGradient,
    canUsePicker,
  } = useValue({value, onValueChange: setValue});

  const controlMarkup =
    type === 'custom' ? (
      <TextField
        monospaced
        spellCheck={false}
        autoComplete={false}
        value={value}
        onChange={setValue}
        label=""
        multiline={4}
      />
    ) : (
      <>
        <div className={styles.StopPicker}>
          <StopPicker
            activeStopId={activeStopId}
            background={linearGradient}
            stops={stops}
            onUpdateStopPosition={handleUpdateStopPosition}
            onAddStop={handleAddStop}
            onActivateStop={setActiveStopId}
          />
        </div>
        <div className={styles.ColorPicker}>
          <ColorPicker
            fullWidth
            allowAlpha
            color={activeStop.color}
            onChange={handleColorChange}
          />
        </div>
        <div>
          <StopList
            stops={sortedStops}
            activeStopId={activeStopId}
            onSetActiveStopId={setActiveStopId}
            onRemoveStop={handleRemoveStop}
            onAddStop={handleAddStop}
          />
        </div>
      </>
    );

  const supportsAngularOrientation = type === 'conic' || type === 'linear';

  return (
    <div className={styles.CardWrapper}>
      <Card>
        <div className={styles.GradientPicker}>
          <div className={styles.Preview}>
            {linearOrientation && supportsAngularOrientation && (
              <div className={styles.circle}>
                <CircleSlider
                  value={parseInt(linearOrientation.value, 10)}
                  onChange={(value) =>
                    value && setLinearOrientation(value.toString())
                  }
                />
              </div>
            )}
            <div className={styles.foreground} style={{background: gradient}} />
          </div>
          <div className={styles.Controls}>
            <div className={styles.TypePicker}>
              <TypePicker
                disabled={!canUsePicker}
                activeType={type}
                onChange={setType}
              />
            </div>
            {controlMarkup}
          </div>
        </div>
      </Card>
    </div>
  );

  function handleColorChange(color: HSBAColor) {
    setStops((prev) => ({
      ...prev,
      [activeStopId]: {...prev[activeStopId], color},
    }));
  }

  function handleRemoveStop(stopId: string) {
    if (sortedStops.length <= 2) {
      return;
    }

    if (stopId === activeStopId) {
      const nextActiveStop = sortedStops.find((stop) => stop.id !== stopId)!;
      setActiveStopId(nextActiveStop.id);
    }

    setStops((prev) => {
      if (Object.keys(prev).length - 1 < 2) {
        return prev;
      }
      const {[stopId]: _, ...nextStops} = prev;
      return nextStops;
    });
  }

  function handleUpdateStopPosition(stopId: string, position: number) {
    if (stopId !== activeStopId) {
      setActiveStopId(stopId);
    }
    setStops((prev) => ({
      ...prev,
      [stopId]: {
        ...prev[stopId],
        position,
      },
    }));
  }

  function handleAddStop(x?: number) {
    const id = uuid();
    const position = x == null ? getMiddlePosition() : x;
    const color = {
      ...activeStop.color,
      brightness: clamp(activeStop.color.brightness - 0.3, 0, 1),
    };

    setStops((prev) => ({...prev, [id]: {id, position, color}}));
    setActiveStopId(id);
  }

  function getMiddlePosition() {
    const lastStop = sortedStops[sortedStops.length - 1];
    const firstStop = sortedStops[0];

    return Math.floor((lastStop.position - firstStop.position) / 2);
  }
}
