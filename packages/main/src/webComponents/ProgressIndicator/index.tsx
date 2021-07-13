import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

import '@ui5/webcomponents/dist/ProgressIndicator';

export interface ProgressIndicatorPropTypes extends CommonProps {
  /**
   * Defines whether `ProgressIndicator` is in disabled state.
   */
  disabled?: boolean;
  /**
   * Defines whether `ProgressIndicator` value is shown.
   */
  hideValue?: boolean;
  /**
   * Specifies the numerical value in percent for the length of the `ProgressIndicator`. **Note:** If a value greater than 100 is provided, the percentValue is set to 100. In other cases of invalid value, percentValue is set to its default of 0.
   */
  value?: number;
  /**
   * Defines the value state of the `ProgressIndicator`.
   *
   * Available options are:
   *
   * *   `None`
   * *   `Error`
   * *   `Warning`
   * *   `Success`
   * *   `Information`
   */
  valueState?: ValueState;
}

/**
 * Shows the progress of a process in a graphical way. To indicate the progress, the inside of the `ProgressIndicator` is filled with a color.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/ProgressIndicator" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const ProgressIndicator = withWebComponent<ProgressIndicatorPropTypes>(
  'ui5-progress-indicator',
  ['value', 'valueState'],
  ['disabled', 'hideValue'],
  [],
  []
);

ProgressIndicator.displayName = 'ProgressIndicator';

ProgressIndicator.defaultProps = {
  disabled: false,
  hideValue: false,
  value: 0,
  valueState: ValueState.None
};

export { ProgressIndicator };
