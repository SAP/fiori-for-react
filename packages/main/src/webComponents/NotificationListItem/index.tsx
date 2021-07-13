import { Priority } from '@ui5/webcomponents-react/dist/Priority';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents-fiori/dist/NotificationListItem';

export interface NotificationListItemPropTypes extends CommonProps {
  /**
   * Defines if the `heading` and `description` should wrap, they truncate by default.
   *
   * **Note:** by default the `heading` and `decription`, and a `ShowMore/Less` button would be displayed.
   */
  wrap?: boolean;
  /**
   * Defines if a busy indicator would be displayed over the item.
   */
  busy?: boolean;
  /**
   * Defines the `heading` of the item.
   */
  heading?: string;
  /**
   * Defines the `priority` of the item.
   */
  priority?: Priority;
  /**
   * Defines if the `notification` is new or has been already read.
   *
   * **Note:** if set to `false` the `heading` has bold font, if set to true - it has a normal font.
   */
  read?: boolean;
  /**
   * Defines if the `close` button would be displayed.
   */
  showClose?: boolean;
  /**
   * Defines the selected state of the `ListItem`.
   */
  selected?: boolean;
  /**
   * Defines the avatar, displayed in the `NotificationListItem`.
   *
   * **Note:** Consider using the `Avatar` to display icons, initials or images.
   * **Note:**In order to be complaint with the UX guidlines and for best experience, we recommend using avatars with 2rem X 2rem in size (32px X 32px). In case you are using the `Avatar` you can set its `size` ``property to `XS` to get the required size - .``
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  avatar?: ReactNode;
  /**
   * Defines the content of the `NotificationListItem`, usually a description of the notification.
   *
   * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the elements, dipalyed in the footer of the of the `NotificationListItem`.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  footnotes?: ReactNode | ReactNode[];
  /**
   * Defines the actions, displayed in the top-right area.
   *
   * **Note:** use the `NotificationAction` component.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  actions?: ReactNode | ReactNode[];
  /**
   * Fired when the `Close` button is pressed.
   */
  onClose?: (event: Ui5CustomEvent<HTMLElement>) => void;
}

/**
 * The `NotificationListItem` is a type of list item, meant to display notifications.
 * The component has a rich set of various properties that allows the user to set `avatar`, `heading`, descriptive `content` and `footnotes` to fully describe a notification.
 * The user can:
 *
 * *   display a `Close` button
 * *   can control whether the `heading` and `description` should wrap or truncate and display a `ShowMore` button to switch between less and more information
 * *   add custom actions by using the `NotificationAction` component
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/NotificationListItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const NotificationListItem = withWebComponent<NotificationListItemPropTypes>(
  'ui5-li-notification',
  ['heading', 'priority'],
  ['wrap', 'busy', 'read', 'showClose', 'selected'],
  ['avatar', 'footnotes', 'actions'],
  ['close']
);

NotificationListItem.displayName = 'NotificationListItem';

NotificationListItem.defaultProps = {
  wrap: false,
  busy: false,
  priority: Priority.None,
  read: false,
  showClose: false,
  selected: false
};

export { NotificationListItem };
