import { ButtonDesign } from '@ui5/webcomponents-react/dist/ButtonDesign';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode, MouseEventHandler } from 'react';

import '@ui5/webcomponents/dist/Button';

export interface ButtonPropTypes extends Omit<CommonProps, 'onClick'> {
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
 * The `Button` component represents a simple push button. It enables users to trigger actions by clicking or tapping the `Button`, or by pressing certain keyboard keys, such as Enter.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Button" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Button = withWebComponent<ButtonPropTypes>(
  'ui5-button',
  ['design', 'icon', 'iconSize'],
  ['disabled', 'iconEnd', 'submits'],
  [],
  ['click']
);

Button.displayName = 'Button';

Button.defaultProps = {
  design: ButtonDesign.Default,
  disabled: false,
  iconEnd: false,
  iconSize: undefined,
  submits: false
};

export { Button };
