import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';

import '@ui5/webcomponents/dist/RatingIndicator';

export interface RatingIndicatorPropTypes extends Omit<CommonProps, 'onChange'> {
  /**
   * Defines whether the `RatingIndicator` is disabled.
   *
   * **Note:** A disabled `RatingIndicator` is completely noninteractive.
   */
  disabled?: boolean;
  /**
   * The number of displayed rating symbols
   */
  maxValue?: number;
  /**
   * Defines whether the `RatingIndicator` is read-only.
   *
   * **Note:** A read-only `RatingIndicator` is not editable, but still provides visual feedback upon user interaction.
   */
  readonly?: boolean;
  /**
   * The indicated value of the rating
   *
   * **Note:** If you set a number which is not round, it would be shown as follows:
   *
   * *   1.0 - 1.2 -> 1
   * *   1.3 - 1.7 -> 1.5
   * *   1.8 - 1.9 -> 2
   */
  value?: number;
  /**
   * The event is fired when the value changes.
   */
  onChange?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
}

/**
 * The rating indicator is used to display a specific number of icons that are used to rate an item. Additionally, it is also used to display the average and overall ratings.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/RatingIndicator" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const RatingIndicator = withWebComponent<RatingIndicatorPropTypes>(
  'ui5-rating-indicator',
  ['maxValue', 'value'],
  ['disabled', 'readonly'],
  [],
  ['change']
);

RatingIndicator.displayName = 'RatingIndicator';

RatingIndicator.defaultProps = {
  disabled: false,
  maxValue: 5,
  readonly: false,
  value: 0
};

export { RatingIndicator };
