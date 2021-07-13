import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents-fiori/dist/SideNavigation';

export interface SideNavigationPropTypes extends CommonProps {
  /**
   * Defines whether the `SideNavigation` is expanded or collapsed.
   */
  collapsed?: boolean;
  /**
   * Defines the main items of the `SideNavigation`. Use the `SideNavigationItem` component for the top-level items, and the `SideNavigationSubItem` component for second-level items, nested inside the items.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the fixed items at the bottom of the `SideNavigation`. Use the `SideNavigationItem` component for the fixed items, and optionally the `SideNavigationSubItem` component to provide second-level items inside them. **Note:** In order to achieve the best user experience, it is recommended that you keep the fixed items "flat" (do not pass sub-items)
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  fixedItems?: ReactNode | ReactNode[];
  /**
   * Defines the header of the `SideNavigation`.
   *
   * **Note:** The header is displayed when the component is expanded - the property `collapsed` is false;
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  header?: ReactNode | ReactNode[];
  /**
   * Fired when the selection has changed via user interaction
   */
  onSelectionChange?: (event: Ui5CustomEvent<HTMLElement, { item: ReactNode }>) => void;
}

/**
 * The `SideNavigation` is used as a standard menu in applications. It consists of three containers: header (top-aligned), main navigation section (top-aligned) and the secondary section (bottom-aligned).
 *
 * *   The header is meant for displaying user related information - profile data, avatar, etc.
 * *   The main navigation section is related to the user’s current work context
 * *   The secondary section is mostly used to link additional information that may be of interest (legal information, developer communities, external help, contact information and so on).
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/SideNavigation" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const SideNavigation = withWebComponent<SideNavigationPropTypes>(
  'ui5-side-navigation',
  [],
  ['collapsed'],
  ['fixedItems', 'header'],
  ['selection-change']
);

SideNavigation.displayName = 'SideNavigation';

SideNavigation.defaultProps = {
  collapsed: false
};

export { SideNavigation };
