import { ListItemTypes } from '@ui5/webcomponents-react/dist/ListItemTypes';
import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

import '@ui5/webcomponents/dist/SuggestionItem';

export interface SuggestionItemPropTypes extends CommonProps {
  /**
   * Defines the description displayed right under the item text, if such is present.
   */
  description?: string;
  /**
   * Defines the item to be displayed as a group item.
   *
   * **Note:** When set, the other properties, such as `image`, `icon`, `description`, etc. will be omitted and only the `text` will be displayed.
   */
  group?: boolean;
  /**
   * Defines the `icon` source URI.
   *
   * **Note:** SAP-icons font provides numerous buil-in icons. To find all the available icons, see the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
   */
  icon?: string;
  /**
   * Defines whether the `icon` should be displayed in the beginning of the item or in the end.
   *
   * **Note:** If `image` is set, the `icon` would be displayed after the `image`.
   */
  iconEnd?: boolean;
  /**
   * Defines the `image` source URI.
   *
   * **Note:** The `image` would be displayed in the beginning of the item.
   */
  image?: string;
  /**
   * Defines the `info`, displayed in the end of the item.
   */
  info?: string;
  /**
   * Defines the state of the `info`.
   *
   * Available options are: `"None"` (by default), `"Success"`, `"Warning"` and `"Erorr"`.
   */
  infoState?: ValueState;
  /**
   * Defines the text of the `SuggestionItem`.
   */
  text?: string;
  /**
   * Defines the visual indication and behavior of the item. Available options are `Active` (by default), `Inactive` and `Detail`.
   *
   * **Note:** When set to `Active`, the item will provide visual response upon press and hover, while when `Inactive` or `Detail` - will not.
   */
  type?: ListItemTypes;
}

/**
 * The `SuggestionItem` represents the suggestion item of the `Input`
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/SuggestionItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const SuggestionItem = withWebComponent<SuggestionItemPropTypes>(
  'ui5-suggestion-item',
  ['description', 'icon', 'image', 'info', 'infoState', 'text', 'type'],
  ['group', 'iconEnd'],
  [],
  []
);

SuggestionItem.displayName = 'SuggestionItem';

SuggestionItem.defaultProps = {
  group: false,
  iconEnd: false,
  infoState: ValueState.None,
  type: ListItemTypes.Active
};

export { SuggestionItem };
