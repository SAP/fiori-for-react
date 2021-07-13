import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/Badge';

export interface BadgePropTypes extends CommonProps {
  /**
   * Defines the color scheme of the `Badge`. There are 10 predefined schemes. Each scheme applies different values for the `background-color` and `border-color`. To use one you can set a number from `"1"` to `"10"`. The `colorScheme` `"1"` will be set by default.
   *
   * **Note:** Color schemes have no visual representation in High Contrast Black (sap\_belize\_hcb) theme.
   */
  colorScheme?: string;
  /**
   * Defines the text of the `Badge`.
   * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the `Icon` to be displayed in the `Badge`.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  icon?: ReactNode;
}

/**
 * The `Badge` is a small non-interactive component which contains text information and color chosen from a list of predefined color schemes. It serves the purpose to attract the user attention to some piece of information (state, quantity, condition, etc.).
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Badge" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Badge = withWebComponent<BadgePropTypes>('ui5-badge', ['colorScheme'], [], ['icon'], []);

Badge.displayName = 'Badge';

Badge.defaultProps = {
  colorScheme: '1'
};

export { Badge };
