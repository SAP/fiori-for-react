import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

import '@ui5/webcomponents/dist/TabSeparator';

export type TabSeparatorPropTypes = CommonProps;

/**
 * The `TabSeparator` represents a vertical line to separate tabs inside a `TabContainer`
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/TabSeparator" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const TabSeparator = withWebComponent<TabSeparatorPropTypes>('ui5-tab-separator', [], [], [], []);

TabSeparator.displayName = 'TabSeparator';

TabSeparator.defaultProps = {};

export { TabSeparator };
