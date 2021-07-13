import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/GroupHeaderListItem';

export interface GroupHeaderListItemPropTypes extends CommonProps {
  /**
   * Defines the selected state of the `ListItem`.
   */
  selected?: boolean;
  /**
   * Defines the text of the `GroupHeaderListItem`.
   * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   */
  children?: ReactNode | ReactNode[];
}

/**
 * The `GroupHeaderListItem` is a special list item, used only to separate other list items into logical groups
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/GroupHeaderListItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const GroupHeaderListItem = withWebComponent<GroupHeaderListItemPropTypes>(
  'ui5-li-groupheader',
  [],
  ['selected'],
  [],
  []
);

GroupHeaderListItem.displayName = 'GroupHeaderListItem';

GroupHeaderListItem.defaultProps = {
  selected: false
};

export { GroupHeaderListItem };
