import { ListItemTypes } from '@ui5/webcomponents-react/dist/ListItemTypes';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/CustomListItem';

export interface CustomListItemPropTypes extends CommonProps {
  /**
   * Defines the visual indication and behavior of the list items. Available options are `Active` (by default), `Inactive` and `Detail`.
   *
   * **Note:** When set to `Active`, the item will provide visual response upon press and hover, while with type `Inactive` and `Detail` - will not.
   */
  type?: ListItemTypes;
  /**
   * Defines the selected state of the `ListItem`.
   */
  selected?: boolean;
  /**
   * Defines the content of the `CustomListItem`.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired when the user clicks on the detail button when type is `Detail`.
   */
  onDetailClick?: (event: Ui5CustomEvent<HTMLElement>) => void;
}

/**
 * A component to be used as custom list item within the `List` the same way as the standard `StandardListItem`. The `CustomListItem` accepts arbitrary HTML content to allow full customization
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/CustomListItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const CustomListItem = withWebComponent<CustomListItemPropTypes>(
  'ui5-li-custom',
  ['type'],
  ['selected'],
  [],
  ['detail-click']
);

CustomListItem.displayName = 'CustomListItem';

CustomListItem.defaultProps = {
  type: ListItemTypes.Active,
  selected: false
};

export { CustomListItem };
