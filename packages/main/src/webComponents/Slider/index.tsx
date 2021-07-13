import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';

import '@ui5/webcomponents/dist/Slider';

export interface SliderPropTypes extends Omit<CommonProps, 'onChange' | 'onInput'> {
  /**
   * Current value of the slider
   */
  value?: number;
  /**
   * Defines whether the slider is in disabled state.
   */
  disabled?: boolean;
  /**
   * Displays a label with a value on every N-th step.
   *
   * **Note:** The step and tickmarks properties must be enabled. Example - if the step value is set to 2 and the label interval is also specified to 2 - then every second tickmark will be labelled, which means every 4th value number.
   */
  labelInterval?: number;
  /**
   * Defines the maximum value of the slider
   */
  max?: number;
  /**
   * Defines the minimum value of the slider
   */
  min?: number;
  /**
   * Enables tick marks visualization for each step.
   *
   * **Note:** The step must be a positive number.
   */
  showTickmarks?: boolean;
  /**
   * Enables handle tooltip displaying the current value.
   */
  showTooltip?: boolean;
  /**
   * Defines the size of the slider's selection intervals (e.g. min = 0, max = 10, step = 5 would result in possible selection of the values 0, 5, 10).
   *
   * **Note:** If set to 0 the slider handle movement is disabled. When negative number or value other than a number, the component fallbacks to its default value.
   */
  step?: number;
  /**
   * Fired when the value changes and the user has finished interacting with the slider.
   */
  onChange?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
  /**
   * Fired when the value changes due to user interaction that is not yet finished - during mouse/touch dragging.
   */
  onInput?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
}

/**
 * The Slider component represents a numerical range and a handle (grip). The purpose of the component is to enable visual selection of a value in a continuous numerical range by moving an adjustable handle.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Slider" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Slider = withWebComponent<SliderPropTypes>(
  'ui5-slider',
  ['value', 'labelInterval', 'max', 'min', 'step'],
  ['disabled', 'showTickmarks', 'showTooltip'],
  [],
  ['change', 'input']
);

Slider.displayName = 'Slider';

Slider.defaultProps = {
  value: 0,
  disabled: false,
  labelInterval: 0,
  max: 100,
  min: 0,
  showTickmarks: false,
  showTooltip: false,
  step: 1
};

export { Slider };
