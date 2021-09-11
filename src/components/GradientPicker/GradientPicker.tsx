import React, {useState, useLayoutEffect, useRef} from 'react';

import {Card} from '../Card';
import {TextField} from '../TextField';
import {clamp} from '../../utilities/clamp';
import {ColorPicker} from '../ColorPicker';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import type {HSBAColor} from '../../utilities/color-types';

import {useValue} from './hooks';
import type {Stops} from './types';
import {MultiSlidable, StopList, AnglePicker} from './components';
import styles from './GradientPicker.scss';

export interface GradientPickerProps {}

const DEFAULT_INITIAL_STOPS: Stops = {
  1: {
    id: '1',
    position: 0,
    color: {hue: 193, saturation: 0.4, brightness: 0.7, alpha: 1},
  },
  2: {
    id: '2',
    position: 100,
    color: {hue: 137, saturation: 0.27, brightness: 0.86, alpha: 1},
  },
};

const DEFAULT_GRADIENT =
  'linear-gradient(to right, rgba(107, 163, 179, 1) 0%, rgba(160, 219, 177, 1) 100%)';

export function GradientPicker(props: GradientPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [value, setValue] = useState(DEFAULT_GRADIENT);
  const [angleState, setAngleState] = useState({from: 0, to: 0});
  useLayoutEffect(() => {
    if (width == null && ref.current != null) {
      setWidth(ref.current.clientWidth);
    }
  }, [setWidth, width]);

  const {
    type,
    setType,
    stops,
    setStops,
    activeStopId,
    setActiveStopId,
    activeStop,
    sortedStops,
    gradient,
    linearGradient,
    canUsePicker,
  } = useValue({value, onValueChange: setValue});

  const draggers = Object.values(stops).map((stop) => {
    const draggerX = (() => {
      if (width == null) return 0;
      const x = width * (stop.position / 100) - 13;
      return clamp(x, 0, width);
    })();

    return {
      id: stop.id,
      draggerX,
      active: activeStopId === stop.id,
    };
  });

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
        <div className={styles.StopPicker} ref={ref}>
          <MultiSlidable
            background={linearGradient}
            draggers={draggers}
            draggerY={12}
            onChange={handleChange}
            onAddDragger={handleAddStop}
            onDraggerClick={setActiveStopId}
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
  return (
    <div className={styles.CardWrapper}>
      <Card>
        <div className={styles.GradientPicker}>
          <div className={styles.Preview}>
            <div className={styles.circle} />

            <div className={styles.foreground} style={{background: gradient}} />
          </div>
          <div className={styles.Controls}>
            <div className={styles.TypePicker}>
              <div className={styles.buttonGroup}>
                <ButtonGroup segmented>
                  <Button
                    size="slim"
                    pressed={type === 'linear'}
                    onClick={() => setType('linear')}
                    disabled={!canUsePicker}
                  >
                    Linear
                  </Button>
                  <Button
                    size="slim"
                    pressed={type === 'radial'}
                    onClick={() => setType('radial')}
                    disabled={!canUsePicker}
                  >
                    Radial
                  </Button>
                  <Button
                    size="slim"
                    pressed={type === 'conic'}
                    onClick={() => setType('conic')}
                    disabled={!canUsePicker}
                  >
                    Conic
                  </Button>
                </ButtonGroup>
              </div>
              <Button
                size="slim"
                pressed={type === 'custom'}
                onClick={() => setType('custom')}
              >
                Custom
              </Button>
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

  function handleChange({x}: {x: number; y: number}, stopId: string) {
    if (width == null) return;
    if (stopId !== activeStopId) {
      setActiveStopId(stopId);
    }
    setStops((prev) => ({
      ...prev,
      [stopId]: {...prev[stopId], position: clamp((x / width) * 100, 0, 100)},
    }));
  }

  function handleAddStop(x?: number) {
    if (width == null) return;
    const id = generateStopId();
    const position =
      x == null ? getMiddlePosition() : clamp((x / width) * 100, 0, 100);
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

let stopId = Object.keys(DEFAULT_INITIAL_STOPS).length + 1;

function generateStopId() {
  return `${stopId++}`;
}
