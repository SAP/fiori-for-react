import { Priority } from '@ui5/webcomponents-react/dist/Priority';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents-fiori/dist/NotificationListGroupItem';

export interface NotificationListGroupItemPropTypes extends CommonProps {
  /**
   * Defines if the group is collapsed or expanded.
   */
  collapsed?: boolean;
  /**
   * Defines if the items `counter` would be displayed.
   */
  showCounter?: boolean;
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
   * Defines the items of the `NotificationListItemBase`, usually `NotificationListItem` items.
   */
  children?: ReactNode | ReactNode[];
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
   * Fired when the `NotificationListItemBase` is expanded/collapsed by user interaction.
   */
  onToggle?: (event: Ui5CustomEvent<HTMLElement>) => void;
  /**
   * Fired when the `Close` button is pressed.
   */
  onClose?: (event: Ui5CustomEvent<HTMLElement>) => void;
}

/**
 * The `NotificationListGroupItem` is a special type of list item, that unlike others can group items within self, usually `NotificationListItem` items.
 * The component consists of:
 *
 * *   `Toggle` button to expand and collapse the group
 * *   `Priority` icon to display the priority of the group
 * *   `Heading` to entitle the group
 * *   Custom actions - with the use of `NotificationAction`
 * *   Items of the group
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/NotificationListGroupItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const NotificationListGroupItem = withWebComponent<NotificationListGroupItemPropTypes>(
  'ui5-li-notification-group',
  ['heading', 'priority'],
  ['collapsed', 'showCounter', 'busy', 'read', 'showClose', 'selected'],
  ['actions'],
  ['toggle', 'close']
);

NotificationListGroupItem.displayName = 'NotificationListGroupItem';

NotificationListGroupItem.defaultProps = {
  collapsed: false,
  showCounter: false,
  busy: false,
  priority: Priority.None,
  read: false,
  showClose: false,
  selected: false
};

export { NotificationListGroupItem };
