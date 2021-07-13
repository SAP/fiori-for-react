import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

import '@ui5/webcomponents/dist/ComboBoxItem';

export interface ComboBoxItemPropTypes extends CommonProps {
  /**
   * Defines the additional text of the `ComboBoxItem`.
   */
  additionalText?: string;
  /**
   * Defines the text of the `ComboBoxItem`.
   */
  text?: string;
}

/**
 * The `ComboBoxItem` represents the item for a `ComboBox`
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/ComboBoxItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const ComboBoxItem = withWebComponent<ComboBoxItemPropTypes>('ui5-cb-item', ['additionalText', 'text'], [], [], []);

ComboBoxItem.displayName = 'ComboBoxItem';

ComboBoxItem.defaultProps = {};

export { ComboBoxItem };
