import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/Label';

export interface LabelPropTypes extends CommonProps {
  /**
   * Defines the labeled input by providing its ID.
   *
   * **Note:** Can be used with both `Input` and native input.
   */
  for?: string;
  /**
   * Defines whether an asterisk character is added to the `Label` text.
   *
   * **Note:** Usually indicates that user input is required.
   */
  required?: boolean;
  /**
   * Defines whether semi-colon is added to the `Label` text.
   *
   * **Note:** Usually used in forms.
   */
  showColon?: boolean;
  /**
   * Determines whether the `Label` should wrap, when there is not enough space.
   *
   * **Note:** By default the text would truncate.
   */
  wrap?: boolean;
  /**
   * Defines the text of the `Label`.
   * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   */
  children?: ReactNode | ReactNode[];
}

/**
 * The `Label` is a component used to represent a label, providing valuable information to the user. Usually it is placed next to a value holder, such as a text field. It informs the user about what data is displayed or expected in the value holder.
 *
 * The `Label` appearance can be influenced by properties, such as `required` and `wrap`. The appearance of the Label can be configured in a limited way by using the design property. For a broader choice of designs, you can use custom styles.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Label" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Label = withWebComponent<LabelPropTypes>('ui5-label', ['for'], ['required', 'showColon', 'wrap'], [], []);

Label.displayName = 'Label';

Label.defaultProps = {
  required: false,
  showColon: false,
  wrap: false
};

export { Label };
