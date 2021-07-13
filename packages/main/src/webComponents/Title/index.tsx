import { TitleLevel } from '@ui5/webcomponents-react/dist/TitleLevel';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/Title';

export interface TitlePropTypes extends CommonProps {
  /**
   * Defines the `Title` level. Available options are: `"H6"` to `"H1"`.
   */
  level?: TitleLevel;
  /**
   * Defines whether the `Title` would wrap.
   */
  wrap?: boolean;
  /**
   * Defines the text of the `Title`.
   *
   * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
   */
  children?: ReactNode | ReactNode[];
}

/**
 * The `Title` component is used to display titles inside a page. It is a simple, large-sized text with explicit header/title semantics.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Title" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Title = withWebComponent<TitlePropTypes>('ui5-title', ['level'], ['wrap'], [], []);

Title.displayName = 'Title';

Title.defaultProps = {
  level: TitleLevel.H2,
  wrap: false
};

export { Title };
