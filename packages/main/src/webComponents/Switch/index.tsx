import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';

import '@ui5/webcomponents/dist/Switch';

export interface SwitchPropTypes extends Omit<CommonProps, 'onChange'> {
  /**
   * Defines if the `Switch` is checked.
   *
   * **Note:** The property can be changed with user interaction, either by cliking/tapping on the `Switch`, or by pressing the `Enter` or `Space` key.
   */
  checked?: boolean;
  /**
   * Defines whether the `Switch` is disabled.
   *
   * **Note:** A disabled `Switch` is noninteractive.
   */
  disabled?: boolean;
  /**
   * Defines the `Switch` type.
   *
   * **Note:** If `graphical` type is set, positive and negative icons will replace the `textOn` and `textOff`.
   */
  graphical?: boolean;
  /**
   * Defines the text of the `Switch` when switched off.
   *
   * **Note:** We recommend using short texts, up to 3 letters (larger texts would be cut off).
   */
  textOff?: string;
  /**
   * Defines the text of the `Switch` when switched on.
   *
   * **Note:** We recommend using short texts, up to 3 letters (larger texts would be cut off).
   */
  textOn?: string;
  /**
   * Fired when the `Switch` checked state changes.
   */
  onChange?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
}

/**
 * The `Switch` component is used for changing between binary states.
 * The component can display texts, that will be switched, based on the component state, via the `textOn` and `textOff` properties, but texts longer than 3 letters will be cutted off.
 * However, users are able to customize the width of `Switch` with pure CSS (`<Switch style={{width: "200px"}} />`), and set widths, depending on the texts they would use.
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Switch" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Switch = withWebComponent<SwitchPropTypes>(
  'ui5-switch',
  ['textOff', 'textOn'],
  ['checked', 'disabled', 'graphical'],
  [],
  ['change']
);

Switch.displayName = 'Switch';

Switch.defaultProps = {
  checked: false,
  disabled: false,
  graphical: false
};

export { Switch };
