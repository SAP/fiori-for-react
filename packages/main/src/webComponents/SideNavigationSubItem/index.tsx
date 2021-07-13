import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

import '@ui5/webcomponents-fiori/dist/SideNavigationSubItem';

export interface SideNavigationSubItemPropTypes extends CommonProps {
  /**
   * Defines the icon of the item.
   *
   * The SAP-icons font provides numerous options.
   * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
   */
  icon?: string;
  /**
   * Defines whether the subitem is selected.
   */
  selected?: boolean;
  /**
   * Defines the text of the item.
   */
  text?: string;
}

/**
 * The `SideNavigationSubItem` is intended to be used inside a `SideNavigationItem` only.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/SideNavigationSubItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const SideNavigationSubItem = withWebComponent<SideNavigationSubItemPropTypes>(
  'ui5-side-navigation-sub-item',
  ['icon', 'text'],
  ['selected'],
  [],
  []
);

SideNavigationSubItem.displayName = 'SideNavigationSubItem';

SideNavigationSubItem.defaultProps = {
  selected: false
};

export { SideNavigationSubItem };
