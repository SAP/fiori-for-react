import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { Ui5DialogDomRef } from '@ui5/webcomponents-react/interfaces/Ui5DialogDomRef';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/Dialog';

export interface DialogPropTypes extends CommonProps {
  /**
   * Determines whether the `Dialog` is draggable. If this property is set to true, the Dialog will be draggable by its header.
   *
   * **Note:** The `Dialog` can be draggable only in desktop mode.
   */
  draggable?: boolean;
  /**
   * Defines the header text.
   *
   * **Note:** If `header` slot is provided, the `headerText` is ignored.
   */
  headerText?: string;
  /**
   * Configures the `Dialog` to be resizable. If this property is set to true, the Dialog will have a resize handle in its bottom right corner in LTR languages. In RTL languages, the resize handle will be placed in the bottom left corner.
   *
   * **Note:** The `Dialog` can be resizable only in desktop mode.
   * **Note:** Upon resizing, externally defined height and width styling will be ignored.
   */
  resizable?: boolean;
  /**
   * Determines whether the `Dialog` should be stretched to fullscreen.
   *
   * **Note:** The `Dialog` will be stretched to approximately 90% of the viewport.
   */
  stretch?: boolean;
  /**
   * Defines the ID of the HTML Element, which will get the initial focus.
   */
  initialFocus?: string;
  /**
   * Defines if the focus should be returned to the previously focused element, when the popup closes.
   */
  preventFocusRestore?: boolean;
  /**
   * Defines the footer HTML Element.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  footer?: ReactNode | ReactNode[];
  /**
   * Defines the header HTML Element.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  header?: ReactNode | ReactNode[];
  /**
   * Defines the content of the Popup.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired after the component is closed. This event does not bubble.
   */
  onAfterClose?: (event: Ui5CustomEvent<HTMLElement>) => void;
  /**
   * Fired after the component is opened. This event does not bubble.
   */
  onAfterOpen?: (event: Ui5CustomEvent<HTMLElement>) => void;
  /**
   * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. This event does not bubble.
   */
  onBeforeClose?: (event: Ui5CustomEvent<HTMLElement, { escPressed: boolean }>) => void;
  /**
   * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening. This event does not bubble.
   */
  onBeforeOpen?: (event: Ui5CustomEvent<HTMLElement>) => void;
}

/**
 * The `Dialog` component is used to temporarily display some information in a size-limited window in front of the regular app screen. It is used to prompt the user for an action or a confirmation. The `Dialog` interrupts the current app processing as it is the only focused UI element and the main screen is dimmed/blocked. The dialog combines concepts known from other technologies where the windows have names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
 *
 * The `Dialog` is modal, which means that user action is required before returning to the parent window is possible. The content of the `Dialog` is fully customizable.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Dialog" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Dialog = withWebComponent<DialogPropTypes, Ui5DialogDomRef>(
  'ui5-dialog',
  ['headerText', 'initialFocus'],
  ['draggable', 'resizable', 'stretch', 'preventFocusRestore'],
  ['footer', 'header'],
  ['after-close', 'after-open', 'before-close', 'before-open']
);

Dialog.displayName = 'Dialog';

Dialog.defaultProps = {
  draggable: false,
  resizable: false,
  stretch: false,
  preventFocusRestore: false
};

export { Dialog };
