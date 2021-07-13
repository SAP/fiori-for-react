import { ButtonDesign } from '@ui5/webcomponents-react/dist/ButtonDesign';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode, MouseEventHandler } from 'react';

import '@ui5/webcomponents/dist/ToggleButton';

export interface ToggleButtonPropTypes extends Omit<CommonProps, 'onClick'> {
  /**
   * Determines whether the `ToggleButton` is displayed as pressed.
   */
  pressed?: boolean;
  /**
   * Defines the `Button` design.
   *
   * **Note:** Available options are "Default", "Emphasized", "Positive", "Negative", and "Transparent".
   */
  design?: ButtonDesign;
  /**
   * Defines whether the `Button` is disabled (default is set to `false`). A disabled `Button` can't be pressed or focused, and it is not in the tab chain.
   */
  disabled?: boolean;
  /**
   * Defines the icon to be displayed as graphical element within the `Button`. The SAP-icons font provides numerous options.
   *
   * Example:
   *
   * Button icon="palette"
   *
   * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
   */
  icon?: string;
  /**
   * Defines whether the icon should be displayed after the `Button` text.
   */
  iconEnd?: boolean;
  /**
   * Defines the size of the icon inside the `Button`.
   */
  iconSize?: string;
  /**
   * When set to `true`, the `Button` will automatically submit the nearest form element upon `press`.
   *
   * **Important:** For the `submits` property to have effect, you must add the following import to your project: `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
   */
  submits?: boolean;
  /**
   * Defines the text of the `Button`.
   *
   * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired when the `Button` is activated either with a mouse/tap or by using the Enter or Space key.
   *
   * **Note:** The event will not be fired if the `disabled` property is set to `true`.
   */
  onClick?: MouseEventHandler<HTMLElement>;
}

/**
 * The `ToggleButton` component is an enhanced `Button` that can be toggled between pressed and normal states. Users can use the `ToggleButton` as a switch to turn a setting on or off. It can also be used to represent an independent choice similar to a check box.
 *
 * Clicking or tapping on a `ToggleButton` changes its state to `pressed`. The button returns to its initial state when the user clicks or taps on it again. By applying additional custom CSS-styling classes, apps can give a different style to any `ToggleButton`.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/ToggleButton" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const ToggleButton = withWebComponent<ToggleButtonPropTypes>(
  'ui5-togglebutton',
  ['design', 'icon', 'iconSize'],
  ['pressed', 'disabled', 'iconEnd', 'submits'],
  [],
  ['click']
);

ToggleButton.displayName = 'ToggleButton';

ToggleButton.defaultProps = {
  pressed: false,
  design: ButtonDesign.Default,
  disabled: false,
  iconEnd: false,
  iconSize: undefined,
  submits: false
};

export { ToggleButton };
