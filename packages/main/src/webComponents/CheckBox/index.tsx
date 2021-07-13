import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';

import '@ui5/webcomponents/dist/CheckBox';

export interface CheckBoxPropTypes extends Omit<CommonProps, 'onChange'> {
  /**
   * Defines if the `CheckBox` is checked.
   *
   * **Note:** The property can be changed with user interaction, either by cliking/tapping on the `CheckBox`, or by pressing the Enter or Space key.
   */
  checked?: boolean;
  /**
   * Defines whether the `CheckBox` is disabled.
   *
   * **Note:** A disabled `CheckBox` is completely noninteractive.
   */
  disabled?: boolean;
  /**
   * Determines the name with which the `CheckBox` will be submitted in an HTML form.
   *
   * **Important:** For the `name` property to have effect, you must add the following import to your project: `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
   *
   * **Note:** When set, a native `input` HTML element will be created inside the `CheckBox` so that it can be submitted as part of an HTML form. Do not use this property unless you need to submit a form.
   */
  name?: string;
  /**
   * Defines whether the `CheckBox` is read-only.
   *
   * **Note:** A red-only `CheckBox` is not editable, but still provides visual feedback upon user interaction.
   */
  readonly?: boolean;
  /**
   * Defines the text of the `CheckBox`.
   */
  text?: string;
  /**
   * Defines the value state of the `CheckBox`.
   *
   * **Note:** Available options are `Warning`, `Error`, and `None` (default).
   */
  valueState?: ValueState;
  /**
   * Defines whether the `CheckBox` text wraps when there is not enough space.
   *
   * **Note:** By default, the text truncates when there is not enough space.
   */
  wrap?: boolean;
  /**
   * Fired when the `CheckBox` checked state changes.
   */
  onChange?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
}

/**
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 *
 * The `CheckBox` component consists of a box and a label that describes its purpose. If it's checked, an indicator is displayed inside the box. To check/uncheck the `CheckBox`, the user has to click or tap the square box or its label.
 *
 * The `CheckBox` component only has 2 states - checked and unchecked. Clicking or tapping toggles the `CheckBox` between checked and unchecked state.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/CheckBox" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const CheckBox = withWebComponent<CheckBoxPropTypes>(
  'ui5-checkbox',
  ['name', 'text', 'valueState'],
  ['checked', 'disabled', 'readonly', 'wrap'],
  [],
  ['change']
);

CheckBox.displayName = 'CheckBox';

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
  readonly: false,
  valueState: ValueState.None,
  wrap: false
};

export { CheckBox };
