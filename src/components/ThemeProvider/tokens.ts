export type ColorScheme = keyof typeof tokens;

export const tokens = {
  light: {
    scheme: 'light',
    'action-critical-depressed': '#6c0f00',
    'action-critical-disabled': '#f1f1f1',
    'action-critical-hovered': '#bc2200',
    'action-critical-pressed': '#a21b00',
    'action-critical': '#d82c0d',
    'action-primary-depressed': '#003d2c',
    'action-primary-disabled': '#f1f1f1',
    'action-primary-hovered': '#006e52',
    'action-primary-pressed': '#005e46',
    'action-primary': '#008060',
    'action-secondary-depressed': '#6d7175',
    'action-secondary-disabled': '#ffffff',
    'action-secondary-hovered': '#f6f6f7',
    'action-secondary-pressed': '#f1f2f3',
    'action-secondary': '#ffffff',
    backdrop: '#000000',
    'background-hovered': '#f1f2f3',
    'background-pressed': '#edeeef',
    'background-selected': '#edeeef',
    background: '#f6f6f7',
    'border-critical-disabled': '#ffa7a3',
    'border-critical-subdued': '#e0b3b2',
    'border-critical': '#fd5749',
    'border-depressed': '#575959',
    'border-disabled': '#d2d5d8',
    'border-highlight-subdued': '#98c6cd',
    'border-highlight': '#449da7',
    'border-hovered': '#999ea4',
    'border-neutral-subdued': '#babfc3',
    'border-shadow-subdued': '#babfc4',
    'border-shadow': '#aeb4b9',
    'border-subdued': '#c9cccf',
    'border-success-subdued': '#95c9b4',
    'border-success': '#00a47c',
    'border-warning-subdued': '#e1b878',
    'border-warning': '#b98900',
    border: '#8c9196',
    'decorative-five-icon': '#ae2b4c',
    'decorative-five-surface': '#fdc9d0',
    'decorative-five-text': '#4f0e1f',
    'decorative-four-icon': '#006a68',
    'decorative-four-surface': '#91e0d6',
    'decorative-four-text': '#002d2d',
    'decorative-one-icon': '#7e5700',
    'decorative-one-surface': '#ffc96b',
    'decorative-one-text': '#3d2800',
    'decorative-three-icon': '#006d41',
    'decorative-three-surface': '#92e6b5',
    'decorative-three-text': '#002f19',
    'decorative-two-icon': '#af294e',
    'decorative-two-surface': '#ffc4b0',
    'decorative-two-text': '#490b1c',
    divider: '#e1e3e5',
    focused: '#458fff',
    'hint-from-direct-light': '#000000',
    'icon-critical': '#d72c0d',
    'icon-disabled': '#babec3',
    'icon-highlight': '#00a0ac',
    'icon-hovered': '#1a1c1d',
    'icon-on-critical': '#ffffff',
    'icon-on-interactive': '#ffffff',
    'icon-on-primary': '#ffffff',
    'icon-pressed': '#44474a',
    'icon-subdued': '#8c9196',
    'icon-success': '#007f5f',
    'icon-warning': '#b98900',
    icon: '#5c5f62',
    'interactive-critical-disabled': '#fd938d',
    'interactive-critical-hovered': '#cd290c',
    'interactive-critical-pressed': '#670f03',
    'interactive-critical': '#d82c0d',
    'interactive-disabled': '#bdc1cc',
    'interactive-hovered': '#1f5199',
    'interactive-pressed': '#103262',
    interactive: '#2c6ecb',
    overlay: '#ffffff',
    'shadow-from-ambient-light': '#171818',
    'shadow-from-dim-light': '#000000',
    'shadow-from-direct-light': '#000000',
    'surface-critical-subdued-depressed': '#febcb9',
    'surface-critical-subdued-hovered': '#fff0f0',
    'surface-critical-subdued-pressed': '#ffe9e8',
    'surface-critical-subdued': '#fff4f4',
    'surface-critical': '#fed3d1',
    'surface-depressed': '#edeeef',
    'surface-disabled': '#fafbfb',
    'surface-hovered': '#f6f6f7',
    'surface-pressed': '#f1f2f3',
    'surface-subdued': '#fafbfb',
    surface: '#ffffff',
    'surface-highlight-subdued-hovered': '#e4f7fa',
    'surface-highlight-subdued-pressed': '#d5f3f8',
    'surface-highlight-subdued': '#ebf9fc',
    'surface-highlight': '#a4e8f2',
    'surface-neutral-disabled': '#f1f2f3',
    'surface-neutral-hovered': '#dbdddf',
    'surface-neutral-pressed': '#c9ccd0',
    'surface-neutral-subdued': '#f6f6f7',
    'surface-neutral': '#e4e5e7',
    'surface-primary-selected-hovered': '#b3d0c3',
    'surface-primary-selected-pressed': '#a2bcb0',
    'surface-primary-selected': '#f1f8f5',
    'surface-search-field': '#f1f2f3',
    'surface-selected-hovered': '#edf4fe',
    'surface-selected-pressed': '#e5effd',
    'surface-selected': '#f2f7fe',
    'surface-success-subdued-hovered': '#ecf6f1',
    'surface-success-subdued-pressed': '#e2f1ea',
    'surface-success-subdued': '#f1f8f5',
    'surface-success': '#aee9d1',
    'surface-warning-subdued-hovered': '#fff2e2',
    'surface-warning-subdued-pressed': '#ffebd3',
    'surface-warning-subdued': '#fff5ea',
    'surface-warning': '#ffd79d',
    'text-critical': '#d72c0d',
    'text-disabled': '#8c9196',
    'text-highlight': '#347c84',
    'text-on-critical': '#ffffff',
    'text-on-interactive': '#ffffff',
    'text-on-primary': '#ffffff',
    'text-primary-hovered': '#006c50',
    'text-primary-pressed': '#005c44',
    'text-primary': '#007b5c',
    'text-subdued': '#6d7175',
    'text-success': '#008060',
    'text-warning': '#916a00',
    text: '#202223',
  },
  dark: {
    scheme: 'dark',
    'action-critical-depressed': '#fd5749',
    'action-critical-disabled': '#bb250a',
    'action-critical-hovered': '#e32f0e',
    'action-critical-pressed': '#fa3511',
    'action-critical': '#cd290c',
    'action-primary-depressed': '#00b388',
    'action-primary-disabled': '#005640',
    'action-primary-hovered': '#009671',
    'action-primary-pressed': '#00a47c',
    'action-primary': '#008060',
    'action-secondary-depressed': '#7b7f84',
    'action-secondary-disabled': '#202223',
    'action-secondary-hovered': '#54575b',
    'action-secondary-pressed': '#606467',
    'action-secondary': '#4d5053',
    backdrop: '#000000',
    'background-hovered': '#0b0c0d',
    'background-pressed': '#0b0c0d',
    'background-selected': '#0b0c0d',
    background: '#0b0c0d',
    'border-critical-disabled': '#831704',
    'border-critical-subdued': '#e32f0e',
    'border-critical': '#e32f0e',
    'border-depressed': '#8e9191',
    'border-disabled': '#676b6f',
    'border-highlight-subdued': '#449da7',
    'border-highlight': '#449da7',
    'border-hovered': '#505356',
    'border-neutral-subdued': '#82878b',
    'border-shadow-subdued': '#82878b',
    'border-shadow': '#5b5f62',
    'border-subdued': '#82878b',
    'border-success-subdued': '#008766',
    'border-success': '#008766',
    'border-warning-subdued': '#997000',
    'border-warning': '#997000',
    border: '#505356',
    'decorative-five-icon': '#f4b7bf',
    'decorative-five-surface': '#c23356',
    'decorative-five-text': '#ffffff',
    'decorative-four-icon': '#00ddda',
    'decorative-four-surface': '#167c79',
    'decorative-four-text': '#ffffff',
    'decorative-one-icon': '#ffba43',
    'decorative-one-surface': '#8e6609',
    'decorative-one-text': '#ffffff',
    'decorative-three-icon': '#00e38d',
    'decorative-three-surface': '#007c5a',
    'decorative-three-text': '#ffffff',
    'decorative-two-icon': '#f5b6c0',
    'decorative-two-surface': '#ce5814',
    'decorative-two-text': '#ffffff',
    divider: '#1a1c1d',
    focused: '#2662b6',
    'hint-from-direct-light': '#b9b9b9',
    'icon-critical': '#da2d0d',
    'icon-disabled': '#54575a',
    'icon-highlight': '#2c6c73',
    'icon-hovered': '#e1e3e5',
    'icon-on-critical': '#fff8f7',
    'icon-on-interactive': '#ffffff',
    'icon-on-primary': '#e6fff4',
    'icon-pressed': '#a6acb2',
    'icon-subdued': '#787d81',
    'icon-success': '#005e46',
    'icon-warning': '#684b00',
    icon: '#a6acb2',
    'interactive-critical-disabled': '#feaca8',
    'interactive-critical-hovered': '#fd8a84',
    'interactive-critical-pressed': '#fd9f9b',
    'interactive-critical': '#fd726a',
    'interactive-disabled': '#2662b6',
    'interactive-hovered': '#67afff',
    'interactive-pressed': '#88bcff',
    interactive: '#36a3ff',
    overlay: '#212121',
    'shadow-from-ambient-light': '#171818',
    'shadow-from-dim-light': '#ffffff',
    'shadow-from-direct-light': '#ffffff',
    'surface-critical-subdued-depressed': '#871805',
    'surface-critical-subdued-hovered': '#441714',
    'surface-critical-subdued-pressed': '#6b1003',
    'surface-critical-subdued': '#450701',
    'surface-critical': '#450701',
    'surface-depressed': '#505356',
    'surface-disabled': '#1a1c1d',
    'surface-highlight-subdued-hovered': '#143a3e',
    'surface-highlight-subdued-pressed': '#184146',
    'surface-highlight-subdued': '#123539',
    'surface-highlight': '#006971',
    'surface-hovered': '#2f3133',
    'surface-neutral-disabled': '#313335',
    'surface-neutral-hovered': '#313335',
    'surface-neutral-pressed': '#313335',
    'surface-neutral-subdued': '#44474a',
    'surface-neutral': '#313335',
    'surface-pressed': '#3e4043',
    'surface-primary-selected-hovered': '#28302c',
    'surface-primary-selected-pressed': '#36403b',
    'surface-primary-selected': '#0c1210',
    'surface-search-field': '#2f3133',
    'surface-selected-hovered': '#071d3d',
    'surface-selected-pressed': '#0d2b56',
    'surface-selected': '#020e23',
    'surface-subdued': '#1a1c1d',
    'surface-success-subdued-hovered': '#1f3a30',
    'surface-success-subdued-pressed': '#234136',
    'surface-success-subdued': '#1c352c',
    'surface-success': '#005e46',
    'surface-warning-subdued-hovered': '#523f20',
    'surface-warning-subdued-pressed': '#574322',
    'surface-warning-subdued': '#4d3b1d',
    'surface-warning': '#997000',
    surface: '#202123',
    'text-critical': '#e9807a',
    'text-disabled': '#6f7377',
    'text-highlight': '#a2effa',
    'text-on-critical': '#ffffff',
    'text-on-interactive': '#ffffff',
    'text-on-primary': '#ffffff',
    'text-primary-hovered': '#009e78',
    'text-primary-pressed': '#00b085',
    'text-primary': '#008d6a',
    'text-subdued': '#999fa4',
    'text-success': '#58ad8e',
    'text-warning': '#ca9500',
    text: '#e3e5e7',
  },
  dim: {
    scheme: 'dark',
    'action-critical-depressed': '#fd5749',
    'action-critical-disabled': '#bb250a',
    'action-critical-hovered': '#e32f0e',
    'action-critical-pressed': '#fa3511',
    'action-critical': '#cd290c',
    'action-primary-depressed': '#00b388',
    'action-primary-disabled': '#005640',
    'action-primary-hovered': '#009671',
    'action-primary-pressed': '#00a47c',
    'action-primary': '#008060',
    'action-secondary-depressed': '#7b7f84',
    'action-secondary-disabled': '#202223',
    'action-secondary-hovered': '#54575b',
    'action-secondary-pressed': '#606467',
    'action-secondary': '#4d5053',
    backdrop: '#000000',
    'background-hovered': '#0b0c0d',
    'background-pressed': '#0b0c0d',
    'background-selected': '#0b0c0d',
    background: '#334556',
    'border-critical-disabled': '#831704',
    'border-critical-subdued': '#e32f0e',
    'border-critical': '#e32f0e',
    'border-depressed': '#8e9191',
    'border-disabled': '#676b6f',
    'border-highlight-subdued': '#449da7',
    'border-highlight': '#449da7',
    'border-hovered': '#505356',
    'border-neutral-subdued': '#82878b',
    'border-shadow-subdued': '#82878b',
    'border-shadow': '#5b5f62',
    'border-subdued': '#82878b',
    'border-success-subdued': '#008766',
    'border-success': '#008766',
    'border-warning-subdued': '#997000',
    'border-warning': '#997000',
    border: '#505356',
    'decorative-five-icon': '#f4b7bf',
    'decorative-five-surface': '#c23356',
    'decorative-five-text': '#ffffff',
    'decorative-four-icon': '#00ddda',
    'decorative-four-surface': '#167c79',
    'decorative-four-text': '#ffffff',
    'decorative-one-icon': '#ffba43',
    'decorative-one-surface': '#8e6609',
    'decorative-one-text': '#ffffff',
    'decorative-three-icon': '#00e38d',
    'decorative-three-surface': '#007c5a',
    'decorative-three-text': '#ffffff',
    'decorative-two-icon': '#f5b6c0',
    'decorative-two-surface': '#ce5814',
    'decorative-two-text': '#ffffff',
    divider: '#1a1c1d',
    focused: '#2662b6',
    'hint-from-direct-light': '#b9b9b9',
    'icon-critical': '#da2d0d',
    'icon-disabled': '#54575a',
    'icon-highlight': '#2c6c73',
    'icon-hovered': '#e1e3e5',
    'icon-on-critical': '#fff8f7',
    'icon-on-interactive': '#ffffff',
    'icon-on-primary': '#e6fff4',
    'icon-pressed': '#a6acb2',
    'icon-subdued': '#787d81',
    'icon-success': '#005e46',
    'icon-warning': '#684b00',
    icon: '#a6acb2',
    'interactive-critical-disabled': '#feaca8',
    'interactive-critical-hovered': '#fd8a84',
    'interactive-critical-pressed': '#fd9f9b',
    'interactive-critical': '#fd726a',
    'interactive-disabled': '#2662b6',
    'interactive-hovered': '#67afff',
    'interactive-pressed': '#88bcff',
    interactive: '#36a3ff',
    overlay: '#212121',
    'shadow-from-ambient-light': '#171818',
    'shadow-from-dim-light': '#ffffff',
    'shadow-from-direct-light': '#ffffff',
    'surface-critical-subdued-depressed': '#871805',
    'surface-critical-subdued-hovered': '#441714',
    'surface-critical-subdued-pressed': '#6b1003',
    'surface-critical-subdued': '#450701',
    'surface-critical': '#450701',
    'surface-depressed': '#505356',
    'surface-disabled': '#1a1c1d',
    'surface-highlight-subdued-hovered': '#143a3e',
    'surface-highlight-subdued-pressed': '#184146',
    'surface-highlight-subdued': '#123539',
    'surface-highlight': '#006971',
    'surface-hovered': '#2f3133',
    'surface-neutral-disabled': '#313335',
    'surface-neutral-hovered': '#313335',
    'surface-neutral-pressed': '#313335',
    'surface-neutral-subdued': '#44474a',
    'surface-neutral': '#313335',
    'surface-pressed': '#3e4043',
    'surface-primary-selected-hovered': '#28302c',
    'surface-primary-selected-pressed': '#36403b',
    'surface-primary-selected': '#0c1210',
    'surface-search-field': '#2f3133',
    'surface-selected-hovered': '#071d3d',
    'surface-selected-pressed': '#0d2b56',
    'surface-selected': '#020e23',
    'surface-subdued': '#1a1c1d',
    'surface-success-subdued-hovered': '#1f3a30',
    'surface-success-subdued-pressed': '#234136',
    'surface-success-subdued': '#1c352c',
    'surface-success': '#005e46',
    'surface-warning-subdued-hovered': '#523f20',
    'surface-warning-subdued-pressed': '#574322',
    'surface-warning-subdued': '#4d3b1d',
    'surface-warning': '#997000',
    surface: '#202123',
    'text-critical': '#e9807a',
    'text-disabled': '#6f7377',
    'text-highlight': '#a2effa',
    'text-on-critical': '#ffffff',
    'text-on-interactive': '#ffffff',
    'text-on-primary': '#ffffff',
    'text-primary-hovered': '#009e78',
    'text-primary-pressed': '#00b085',
    'text-primary': '#008d6a',
    'text-subdued': '#999fa4',
    'text-success': '#58ad8e',
    'text-warning': '#ca9500',
    text: '#efefef',
  },
};
