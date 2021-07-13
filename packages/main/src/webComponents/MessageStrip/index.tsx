import { MessageStripType } from '@ui5/webcomponents-react/dist/MessageStripType';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/MessageStrip';

export interface MessageStripPropTypes extends CommonProps {
  /**
   * Defines whether the MessageStrip renders close icon.
   */
  noCloseButton?: boolean;
  /**
   * Defines whether the MessageStrip will show an icon in the beginning. You can directly provide an icon with the `icon` slot. Otherwise, the default icon for the type will be used.
   */
  noIcon?: boolean;
  /**
   * Defines the `MessageStrip` type.
   *
   * **Note:** Available options are `"Information"`, `"Positive"`, `"Negative"`, and `"Warning"`.
   */
  type?: MessageStripType;
  /**
   * Defines the text of the `MessageStrip`.
   *
   * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the content to be displayed as graphical element within the `MessageStrip`.
   *
   * **Note:** If no icon is given, the default icon for the `MessageStrip` type will be used. The SAP-icons font provides numerous options.
   *
   * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  icon?: ReactNode;
  /**
   * Fired when the close button is pressed either with a click/tap or by using the Enter or Space key.
   */
  onClose?: (event: Ui5CustomEvent<HTMLElement>) => void;
}

/**
 * The `MessageStrip` component enables the embedding of app-related messages. It displays 4 types of messages, each with corresponding semantic color and icon: Information, Positive, Warning and Negative. Each message can have a Close button, so that it can be removed from the UI, if needed.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/MessageStrip" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const MessageStrip = withWebComponent<MessageStripPropTypes>(
  'ui5-messagestrip',
  ['type'],
  ['noCloseButton', 'noIcon'],
  ['icon'],
  ['close']
);

MessageStrip.displayName = 'MessageStrip';

MessageStrip.defaultProps = {
  noCloseButton: false,
  noIcon: false,
  type: MessageStripType.Information
};

export { MessageStrip };
