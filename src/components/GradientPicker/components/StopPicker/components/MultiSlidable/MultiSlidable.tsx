import React, {PureComponent} from 'react';

import {classNames} from '../../../../../../utilities/css';
import {isServer} from '../../../../../../utilities/target';
import {EventListener} from '../../../../../EventListener';

import styles from './MultiSlidable.scss';

interface Position {
  x: number;
  y: number;
}

interface State {
  draggingId: string | null;
}

export interface MultiSlidableProps {
  background: string;
  draggers: {id: string; draggerX: number; active: boolean}[];
  draggerX?: number;
  draggerY?: number;
  onAddDragger(x?: number): void;
  onDraggerClick(id: string): void;
  onDraggerMove(id: string, position: Position): void;
  onDraggerHeight?(height: number): void;
}

let isDragging = false;

// Required to solve a bug causing the underlying page/container to scroll
// while trying to drag the ColorPicker controls.
// This must be called as soon as possible to properly prevent the event.
// `passive: false` must also be set, as it seems webkit has changed the "default" behaviour
// https://bugs.webkit.org/show_bug.cgi?id=182521
if (!isServer) {
  window.addEventListener(
    'touchmove',
    (event) => {
      if (!isDragging) {
        return;
      }

      event.preventDefault();
    },
    {passive: false},
  );
}

export class MultiSlidable extends PureComponent<MultiSlidableProps, State> {
  state: State = {
    draggingId: null,
  };

  private node: HTMLElement | null = null;
  private draggerNode: HTMLElement | null = null;

  componentDidMount() {
    const {onDraggerHeight} = this.props;
    if (onDraggerHeight == null) {
      return;
    }

    const {draggerNode} = this;
    if (draggerNode == null) {
      return;
    }

    onDraggerHeight(draggerNode.clientWidth);

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        onDraggerHeight(draggerNode.clientWidth);
      }, 0);
    }
  }

  render() {
    const {draggingId} = this.state;
    const {draggers, draggerY} = this.props;

    const dragging = draggingId != null;

    const moveListener = dragging ? (
      <EventListener
        event="mousemove"
        handler={this.handleMove}
        passive={false}
      />
    ) : null;

    const touchMoveListener = dragging ? (
      <EventListener
        event="touchmove"
        handler={this.handleMove}
        passive={false}
      />
    ) : null;

    const endDragListener = dragging ? (
      <EventListener event="mouseup" handler={this.handleDragEnd} />
    ) : null;

    const touchEndListener = dragging ? (
      <EventListener event="touchend" handler={this.handleDragEnd} />
    ) : null;

    const touchCancelListener = dragging ? (
      <EventListener event="touchcancel" handler={this.handleDragEnd} />
    ) : null;

    return (
      <div
        ref={this.setNode}
        className={classNames(
          styles.MultiSlidable,
          dragging && styles.Dragging,
        )}
      >
        {endDragListener}
        {moveListener}
        {touchMoveListener}
        {touchEndListener}
        {touchCancelListener}
        <div
          onClick={this.handleClick}
          className={styles.ColorLayer}
          style={{background: this.props.background}}
        />
        {draggers.map((dragger) => {
          const {draggerX} = dragger;
          const draggerPositioning = {
            transform: `translate3d(${draggerX}px, ${draggerY}px, 0)`,
          };

          return (
            <div
              key={dragger.id}
              onMouseDown={(event) => this.startDrag(event, dragger.id)}
              onTouchStart={(event) => this.startDrag(event, dragger.id)}
              style={draggerPositioning}
              className={classNames(
                styles.Dragger,
                dragging && styles.Dragging,
                dragger.active && styles.Active,
              )}
              ref={this.setDraggerNode}
            />
          );
        })}
      </div>
    );
  }

  private handleClick = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    if (event.cancelable) {
      event.preventDefault();
    }

    if (isMouseClickEvent(event)) {
      this.handleAddDragger(event.clientX, event.clientY);
      return;
    }

    this.handleAddDragger(event.touches[0].clientX, event.touches[0].clientY);
  };

  private handleAddDragger(x: number, y: number) {
    if (this.node == null) {
      return;
    }

    const {onAddDragger} = this.props;

    const rect = this.node.getBoundingClientRect();
    const offsetX = x - rect.left;
    onAddDragger(offsetX);
  }

  private setDraggerNode = (node: HTMLElement | null) => {
    this.draggerNode = node;
  };

  private setNode = (node: HTMLElement | null) => {
    this.node = node;
  };

  private startDrag = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    draggingId: string,
  ) => {
    if (isMouseDownEvent(event)) {
      this.handleDraggerMove(event.clientX, event.clientY);
    }
    this.props.onDraggerClick(draggingId);

    isDragging = true;
    this.setState({draggingId});
  };

  private handleDragEnd = () => {
    isDragging = false;
    this.setState({draggingId: null});
  };

  private handleMove = (event: MouseEvent | TouchEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (event.cancelable) {
      event.preventDefault();
    }

    if (isMouseMoveEvent(event)) {
      this.handleDraggerMove(event.clientX, event.clientY);
      return;
    }

    this.handleDraggerMove(event.touches[0].clientX, event.touches[0].clientY);
  };

  private handleDraggerMove = (x: number, y: number) => {
    if (this.node == null || this.state.draggingId == null) {
      return;
    }

    const {onDraggerMove} = this.props;

    const rect = this.node.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;
    onDraggerMove(this.state.draggingId, {x: offsetX, y: offsetY});
  };
}

function isMouseMoveEvent(event: Event): event is MouseEvent {
  return event.type === 'mousemove';
}

function isMouseClickEvent(
  event: React.MouseEvent | React.TouchEvent,
): event is React.MouseEvent {
  return event.type === 'click';
}

function isMouseDownEvent(
  event: React.MouseEvent | React.TouchEvent,
): event is React.MouseEvent {
  return event.type === 'mousedown';
}
