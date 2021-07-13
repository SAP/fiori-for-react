import { ListGrowingMode } from '@ui5/webcomponents-react/dist/ListGrowingMode';
import { ListMode } from '@ui5/webcomponents-react/dist/ListMode';
import { ListSeparators } from '@ui5/webcomponents-react/dist/ListSeparators';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/List';

export interface ListPropTypes extends CommonProps {
  /**
   * Defines if the component would display a loading indicator over the list.
   */
  busy?: boolean;
  /**
   * Defines the footer text.
   */
  footerText?: string;
  /**
   * Defines whether the `List` will have growing capability either by pressing a `More` button, or via user scroll. In both cases `onLoadMore` event is fired.
   *
   * Available options:
   *
   * - `Button` - Shows a `More` button at the bottom of the list, pressing of which triggers the `onLoadMore` event.
   * - `Scroll` - The `onLoadMore` event is triggered when the user scrolls to the bottom of the list;
   * - `None` (default) - The growing is off.
   *
   * **Limitations:** `growing="Scroll"` is not supported for Internet Explorer, on IE the component will fallback to `growing="Button"`.
   */
  growing?: ListGrowingMode;
  /**
   * Defines the `List` header text.
   *
   * **Note:** If `header` is set this property is ignored.
   */
  headerText?: string;
  /**
   * Determines whether the list items are indented.
   */
  inset?: boolean;
  /**
   * Defines the mode of the `List`.
   *
   * **Note:** Available options are `None`, `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd`, `MultiSelect`, and `Delete`.
   */
  mode?: ListMode;
  /**
   * Defines the text that is displayed when the `List` contains no items.
   */
  noDataText?: string;
  /**
   * Defines the item separator style that is used.
   *
   * **Notes:**
   *
   * *   Avalaible options are `All`, `Inner`, and `None`.
   * *   When set to `None`, none of the items are separated by horizontal lines.
   * *   When set to `Inner`, the first item doesn't have a top separator and the last item doesn't have a bottom separator.
   */
  separators?: ListSeparators;
  /**
   * Defines the items of the `List`.
   *
   * **Note:** Use `StandardListItem`, `CustomListItem`, and `GroupHeaderListItem` for the intended design.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the `List` header.
   *
   * **Note:** When `header` is set, the `headerText` property is ignored.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  header?: ReactNode | ReactNode[];
  /**
   * Fired when an item is activated, unless the item's `type` property is set to `Inactive`.
   */
  onItemClick?: (event: Ui5CustomEvent<HTMLElement, { item: ReactNode }>) => void;
  /**
   * Fired when the `Close` button of any item is clicked
   *
   * **Note:** This event is applicable to `NotificationListItem` items only, not to be confused with `item-delete`.
   */
  onItemClose?: (event: Ui5CustomEvent<HTMLElement, { item: ReactNode }>) => void;
  /**
   * Fired when the Delete button of any item is pressed.
   *
   * **Note:** A Delete button is displayed on each item, when the `List` `mode` property is set to `Delete`.
   */
  onItemDelete?: (event: Ui5CustomEvent<HTMLElement, { item: ReactNode }>) => void;
  /**
   * Fired when the `Toggle` button of any item is clicked.
   *
   * **Note:** This event is applicable to `NotificationListItemBase` items only.
   */
  onItemToggle?: (event: Ui5CustomEvent<HTMLElement, { item: ReactNode }>) => void;
  /**
   * Fired when the user scrolls to the bottom of the list.
   *
   * **Note:** The event is fired when the `growing='Scroll'` property is enabled.
   */
  onLoadMore?: (event: Ui5CustomEvent<HTMLElement>) => void;
  /**
   * Fired when selection is changed by user interaction in `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect` modes.
   */
  onSelectionChange?: (
    event: Ui5CustomEvent<HTMLElement, { selectedItems: unknown[]; previouslySelectedItems: unknown[] }>
  ) => void;
}

/**
 * The `List` component allows displaying a list of items, advanced keyboard handling support for navigating between items, and predefined modes to improve the development efficiency.
 *
 * The `List` is а container for the available list items:
 *
 * *   `StandardListItem`
 * *   `CustomListItem`
 * *   `GroupHeaderListItem`
 *
 *
 *
 * To benefit from the built-in selection mechanism, you can use the available selection modes, such as `SingleSelect`, `MultiSelect` and `Delete`.
 *
 * Additionally, the `List` provides header, footer, and customization for the list item separators.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/List" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const List = withWebComponent<ListPropTypes>(
  'ui5-list',
  ['footerText', 'growing', 'headerText', 'mode', 'noDataText', 'separators'],
  ['busy', 'inset'],
  ['header'],
  ['item-click', 'item-close', 'item-delete', 'item-toggle', 'load-more', 'selection-change']
);

List.displayName = 'List';

List.defaultProps = {
  busy: false,
  growing: ListGrowingMode.None,
  inset: false,
  mode: ListMode.None,
  separators: ListSeparators.All
};

export { List };
