import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';

import '@ui5/webcomponents-fiori/dist/ProductSwitchItem';

export interface ProductSwitchItemPropTypes extends Omit<CommonProps, 'onClick'> {
  /**
   * Defines the title of the `ProductSwitchItem`.
   */
  heading?: string;
  /**
   * Defines the icon to be displayed as a graphical element within the `ProductSwitchItem`.
   *
   * Example:
   *
   * ProductSwitchItem icon="palette"
   *
   * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
   */
  icon?: string;
  /**
   * Defines the subtitle of the `ProductSwitchItem`.
   */
  subtitle?: string;
  /**
   * Defines a target where the `targetSrc` content must be open.
   *
   * Available options are:
   *
   * *   `_self`
   * *   `_top`
   * *   `_blank`
   * *   `_parent`
   * *   `_search`
   */
  target?: string;
  /**
   * Defines the `ProductSwitchItem` target URI. Supports standard hyperlink behavior.
   */
  targetSrc?: string;
  /**
   * Fired when the `ProductSwitchItem` is activated either with a click/tap or by using the Enter or Space key.
   */
  onClick?: (event: Ui5CustomEvent<HTMLElement>) => void;
}

/**
 * The `ProductSwitchItem` web component represents the items displayed in the `ProductSwitch` web component.
 *
 * **Note:** `ProductSwitchItem` is not supported when used outside of `ProductSwitch`.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/ProductSwitchItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const ProductSwitchItem = withWebComponent<ProductSwitchItemPropTypes>(
  'ui5-product-switch-item',
  ['heading', 'icon', 'subtitle', 'target', 'targetSrc'],
  [],
  [],
  ['click']
);

ProductSwitchItem.displayName = 'ProductSwitchItem';

ProductSwitchItem.defaultProps = {
  target: '_self'
};

export { ProductSwitchItem };
