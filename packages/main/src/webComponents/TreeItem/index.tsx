import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/TreeItem';

export interface TreeItemPropTypes extends CommonProps {
  /**
   * Defines whether the tree node is expanded or collapsed. Only has visual effect for tree nodes with children.
   */
  expanded?: boolean;
  /**
   * Defines whether the tree node has children, even if currently no other tree nodes are slotted inside.
   * _Note:_ This property is useful for showing big tree structures where not all nodes are initially loaded due to performance reasons. Set this to `true` for nodes you intend to load lazily, when the user clicks the expand button. It is not necessary to set this property otherwise. If a tree item has children, the expand button will be displayed anyway.
   */
  hasChildren?: boolean;
  /**
   * If set, an icon will be displayed before the text, representing the tree item.
   */
  icon?: string;
  /**
   * Defines the `info`, displayed in the end of the tree item.
   */
  info?: string;
  /**
   * Defines the state of the `info`.
   * Available options are: `"None"` (by default), `"Success"`, `"Warning"`, `"Information"` and `"Erorr"`.
   */
  infoState?: ValueState;
  /**
   * Defines whether the tree node is selected by the user. Only has effect if the `Tree` is in one of the following modes: in `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect`.
   */
  selected?: boolean;
  /**
   * Defines the text of the tree item.
   */
  text?: string;
  /**
   * Defines the items of this `TreeItem`.
   */
  children?: ReactNode | ReactNode[];
}

/**
 * This is the item to use inside a `Tree`. You can represent an arbitrary tree structure by recursively nesting tree items.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/TreeItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const TreeItem = withWebComponent<TreeItemPropTypes>(
  'ui5-tree-item',
  ['icon', 'info', 'infoState', 'text'],
  ['expanded', 'hasChildren', 'selected'],
  [],
  []
);

TreeItem.displayName = 'TreeItem';

TreeItem.defaultProps = {
  expanded: false,
  hasChildren: false,
  infoState: ValueState.None,
  selected: false
};

export { TreeItem };
