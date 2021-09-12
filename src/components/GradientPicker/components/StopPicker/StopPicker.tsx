import React, {useRef, useState, useLayoutEffect} from 'react';

import {clamp} from '../../../../utilities/clamp';
import type {Stops} from '../../types';

import {MultiSlidable} from './components';
import styles from './StopPicker.scss';

interface Props {
  activeStopId: string;
  stops: Stops;
  background: string;
  onActivateStop(stopId: string): void;
  onAddStop(position?: number): void;
  onUpdateStopPosition(stopId: string, stopPosition: number): void;
}

export function StopPicker({
  stops,
  background,
  activeStopId,
  onActivateStop,
  onAddStop,
  onUpdateStopPosition,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (width == null && ref.current != null) {
      setWidth(ref.current.clientWidth);
    }
  }, [setWidth, width]);

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

  return (
    <div className={styles.Wrapper} ref={ref}>
      <MultiSlidable
        background={background}
        draggers={draggers}
        draggerY={12}
        onDraggerMove={handleDraggerMove}
        onAddDragger={handleAddStop}
        onDraggerClick={onActivateStop}
      />
    </div>
  );

  function handleDraggerMove(id: string, position: {x: number; y: number}) {
    if (width == null) return;
    const positionPercent = clamp((position.x / width) * 100, 0, 100);
    onUpdateStopPosition(id, positionPercent);
  }

  function handleAddStop(x: number) {
    if (width == null) return;
    const positionPercent = clamp((x / width) * 100, 0, 100);
    onAddStop(positionPercent);
  }
}
