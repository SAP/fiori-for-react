import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';

import '@ui5/webcomponents/dist/RadioButton';

export interface RadioButtonPropTypes extends Omit<CommonProps, 'onSelect'> {
  /**
   * Determines whether the `RadioButton` is disabled.
   *
   * **Note:** A disabled `RadioButton` is completely noninteractive.
   */
  disabled?: boolean;
  /**
   * Defines the name of the `RadioButton`. Radio buttons with the same `name` will form a radio button group.
   *
   * **Note:** The selection can be changed with `ARROW_UP/DOWN` and `ARROW_LEFT/RIGHT` keys between radio buttons in same group.
   *
   * **Note:** Only one radio button can be selected per group.
   *
   * **Important:** For the `name` property to have effect when submitting forms, you must add the following import to your project: `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
   *
   * **Note:** When set, a native `input` HTML element will be created inside the `RadioButton` so that it can be submitted as part of an HTML form.
   */
  name?: string;
  /**
   * Determines whether the `RadioButton` is read-only.
   *
   * **Note:** A read-only `RadioButton` is not editable, but still provides visual feedback upon user interaction.
   */
  readonly?: boolean;
  /**
   * Determines whether the `RadioButton` is selected or not.
   *
   * **Note:** The property value can be changed with user interaction, either by cliking/tapping on the `RadioButton`, or by using the Space or Enter key.
   */
  selected?: boolean;
  /**
   * Defines the text of the `RadioButton`.
   */
  text?: string;
  /**
   * Defines the form value of the `RadioButton`. When a form with a radio button group is submitted, the group's value will be the value of the currently selected radio button.
   * **Important:** For the `value` property to have effect, you must add the following import to your project: `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
   */
  value?: string;
  /**
   * Defines the value state of the `RadioButton`.
   *
   * Available options are:
   *
   * *   `None`
   * *   `Error`
   * *   `Warning`
   */
  valueState?: ValueState;
  /**
   * Defines whether the `RadioButton` text wraps when there is not enough space.
   *
   * **Note:** By default, the text truncates when there is not enough space.
   */
  wrap?: boolean;
  /**
   * Fired when the `RadioButton` selected state changes.
   */
  onSelect?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
}

/**
 * The `RadioButton` component enables users to select a single option from a set of options. When a `RadioButton` is selected by the user, the `onSelect` event is fired. When a `RadioButton` that is within a group is selected, the one that was previously selected gets automatically deselected. You can group radio buttons by using the `name` property.
 * **Note:** If `RadioButton` is not part of a group, it can be selected once, but can not be deselected back.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/RadioButton" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const RadioButton = withWebComponent<RadioButtonPropTypes>(
  'ui5-radiobutton',
  ['name', 'text', 'value', 'valueState'],
  ['disabled', 'readonly', 'selected', 'wrap'],
  [],
  ['select']
);

RadioButton.displayName = 'RadioButton';

RadioButton.defaultProps = {
  disabled: false,
  readonly: false,
  selected: false,
  valueState: ValueState.None,
  wrap: false
};

export { RadioButton };
