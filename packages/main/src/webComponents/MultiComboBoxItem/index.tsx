import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

import '@ui5/webcomponents/dist/MultiComboBoxItem';

export interface MultiComboBoxItemPropTypes extends CommonProps {
  /**
   * Defines the selected state of the `MultiComboBoxItem`.
   */
  selected?: boolean;
  /**
   * Defines the stable selector that you can use via getStableDomRef method.
   */
  stableDomRef?: string;
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
 * The `MultiComboBoxItem` represents the item for a `MultiComboBox`
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/MultiComboBoxItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const MultiComboBoxItem = withWebComponent<MultiComboBoxItemPropTypes>(
  'ui5-mcb-item',
  ['stableDomRef', 'additionalText', 'text'],
  ['selected'],
  [],
  []
);

MultiComboBoxItem.displayName = 'MultiComboBoxItem';

MultiComboBoxItem.defaultProps = {
  selected: false
};

export { MultiComboBoxItem };
