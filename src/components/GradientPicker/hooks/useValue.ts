import {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {unstable_batchedUpdates} from 'react-dom';
import debounce from 'lodash/debounce';
import {stringify} from 'scss-parser';

import {parseGradient} from '../utilities';
import {hsbToRgb, rgbString} from '../../../utilities/color-transformers';
import type {GradientType, Stops, Stop} from '../types';

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

interface Input {
  value: string;
  onValueChange(value: string): void;
}

export function useValue({
  value: externalValue,
  onValueChange: onExternalValueChange,
}: Input) {
  const [canUsePicker, setCanUsePicker] = useState(true);
  const [type, setType] = useState<GradientType>('linear');
  const [stops, setStops] = useState<Stops>(DEFAULT_INITIAL_STOPS);
  const [activeStopId, setActiveStopId] = useState(
    Object.keys(DEFAULT_INITIAL_STOPS)[0],
  );

  const [internalValue, setInternalValue] = useState(externalValue);

  useEffect(() => {
    if (type === 'custom') {
      return;
    }
    const nextInternalValue = stringifyGradient(type, stops);
    setInternalValue(() => nextInternalValue);
    if (externalValue !== nextInternalValue) {
      onExternalValueChange(nextInternalValue);
    }
  }, [stops, type, externalValue, onExternalValueChange]);

  useEffect(() => {
    if (externalValue !== internalValue) {
      const parsedGradient = parseGradient(externalValue);
      if (parsedGradient.tag === 'valid') {
        unstable_batchedUpdates(() => {
          setCanUsePicker(true);
          setActiveStopId(Object.keys(parsedGradient.stops)[0]);
          setStops(parsedGradient.stops);
          setInternalValue(externalValue);
        });
      } else {
        setCanUsePicker(false);
      }
    }
  }, [externalValue, internalValue]);

  const debouncedParseGradient = useMemo(
    () =>
      debounce(
        (value: string) => {
          const parsedGradient = parseGradient(value);
          if (parsedGradient.tag === 'valid') {
            console.log(parsedGradient);
            unstable_batchedUpdates(() => {
              setActiveStopId(Object.keys(parsedGradient.stops)[0]);
              setType(parsedGradient.type);
              setStops(parsedGradient.stops);
            });
          }
        },
        100,
        {leading: false, trailing: true},
      ),
    [],
  );

  // const memoizedOnValueChange = useCallback(onValueChange, [onValueChange]);
  // useEffect(() => {
  //   if (type === 'custom') {
  //     return;
  //   }
  //   console.log('stopsEffect: ', stops);
  //   const stringValue = stringifyGradient(
  //     type,
  //     Object.values(stops).sort(
  //       (stopA, stopB) => stopA.position - stopB.position,
  //     ),
  //   );
  //   latestInternallySeenValue.current = stringValue;
  //   memoizedOnValueChange(stringValue);
  // }, [stops, type, memoizedOnValueChange]);

  // useEffect(() => {
  //   const parsedGradient = parseGradient(value);
  //   console.log(latestInternallySeenValue.current, value  );
  //   if (latestInternallySeenValue.current === value) {
  //     return;
  //   }
  //   if (parsedGradient.tag === 'valid') {
  //     unstable_batchedUpdates(() => {
  //       console.log('setting: ', parsedGradient);
  //       setActiveStopId(Object.keys(parsedGradient.stops)[0]);
  //       setType(parsedGradient.type);
  //       setStops(parsedGradient.stops);
  //     });
  //   }
  // }, [value, debouncedParseGradient]);

  const activeStop = stops[activeStopId];

  const sortedStops = Object.values(stops).sort(
    (stopA, stopB) => stopA.position - stopB.position,
  );

  const linearGradient = stringifyGradient('linear', stops);
  const gradient = stringifyGradient(type, stops);
  console.log(internalValue, 'internalValue');
  return {
    stops,
    setStops,
    type,
    setType,
    activeStopId,
    setActiveStopId,
    activeStop,
    sortedStops,
    gradient: internalValue,
    linearGradient,
    canUsePicker,
  };
}

function stringifyGradient(type: GradientType, stops: Stops) {
  const sortedStops = Object.values(stops).sort(
    (stopA, stopB) => stopA.position - stopB.position,
  );

  if (sortedStops.length === 1) {
    return rgbString(hsbToRgb(stops[0].color));
  }
  const stopText = sortedStops.reduce(
    (acc, stop) =>
      `${acc}, ${rgbString(hsbToRgb(stop.color))} ${Math.floor(
        stop.position,
      )}%`,
    '',
  );

  if (type === 'linear') {
    return `linear-gradient(to right${stopText})`;
  }

  if (type === 'radial') {
    return `radial-gradient(circle${stopText})`;
  }

  if (type === 'conic') {
    return `conic-gradient(${stopText.slice(2)})`;
  }

  return '';
}
