import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { Ui5ShellBarDomRef } from '@ui5/webcomponents-react/interfaces/Ui5ShellBarDomRef';
import { ReactNode } from 'react';

import '@ui5/webcomponents-fiori/dist/ShellBar';

export interface ShellBarPropTypes extends CommonProps {
  /**
   * Defines the `notificationCount`, displayed in the notification icon top-right corner.
   */
  notificationCount?: string;
  /**
   * Defines the `primaryTitle`.
   *
   * **Note:** The `primaryTitle` would be hidden on S screen size (less than approx. 700px).
   */
  primaryTitle?: string;
  /**
   * Defines the `secondaryTitle`.
   *
   * **Note:** The `secondaryTitle` would be hidden on S and M screen sizes (less than approx. 1300px).
   */
  secondaryTitle?: string;
  /**
   * Defines, if the product CoPilot icon would be displayed.
   * **Note:** By default the co-pilot is displayed as static SVG. If you need an animated co-pilot, you can import the `"@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js"` module as add-on feature.
   */
  showCoPilot?: boolean;
  /**
   * Defines, if the notification icon would be displayed.
   */
  showNotifications?: boolean;
  /**
   * Defines, if the product switch icon would be displayed.
   */
  showProductSwitch?: boolean;
  /**
   * Defines the `ShellBar` aditional items.
   *
   * **Note:** You can use the  `ShellBarItem`.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the logo of the `ShellBar`. For example, you can use `Avatar` or `img` elements as logo.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  logo?: ReactNode;
  /**
   * Defines the items displayed in menu after a click on the primary title.
   *
   * **Note:** You can use the  `StandardListItem` and its ancestors.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  menuItems?: ReactNode | ReactNode[];
  /**
   * You can pass `Avatar` to set the profile image/icon. If no profile slot is set - profile will be excluded from actions. Note: We recommend not using the `size` attribute of `Avatar` because it should have specific size by design in the context of `ShellBar` profile.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  profile?: ReactNode;
  /**
   * Defines the `Input`, that will be used as a search field.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  searchField?: ReactNode;
  /**
   * Defines a `Button` in the bar that will be placed in the beginning. We encourage this slot to be used for a back or home button. It gets overstyled to match ShellBar's styling.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  startButton?: ReactNode;
  /**
   * Fired, when the co pilot is activated.
   */
  onCoPilotClick?: (event: Ui5CustomEvent<HTMLElement, { targetRef: ReactNode }>) => void;
  /**
   * Fired, when the logo is activated.
   */
  onLogoClick?: (event: Ui5CustomEvent<HTMLElement, { targetRef: ReactNode }>) => void;
  /**
   * Fired, when a menu item is activated **Note:** You can prevent closing of oveflow popover by calling `event.preventDefault()`.
   */
  onMenuItemClick?: (event: Ui5CustomEvent<HTMLElement, { item: ReactNode }>) => void;
  /**
   * Fired, when the notification icon is activated.
   */
  onNotificationsClick?: (event: Ui5CustomEvent<HTMLElement, { targetRef: ReactNode }>) => void;
  /**
   * Fired, when the product switch icon is activated. **Note:** You can prevent closing of oveflow popover by calling `event.preventDefault()`.
   */
  onProductSwitchClick?: (event: Ui5CustomEvent<HTMLElement, { targetRef: ReactNode }>) => void;
  /**
   * Fired, when the profile slot is present.
   */
  onProfileClick?: (event: Ui5CustomEvent<HTMLElement, { targetRef: ReactNode }>) => void;
}

/**
 * The `ShellBar` is meant to serve as an application header and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/ShellBar" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const ShellBar = withWebComponent<ShellBarPropTypes, Ui5ShellBarDomRef>(
  'ui5-shellbar',
  ['notificationCount', 'primaryTitle', 'secondaryTitle'],
  ['showCoPilot', 'showNotifications', 'showProductSwitch'],
  ['logo', 'menuItems', 'profile', 'searchField', 'startButton'],
  ['co-pilot-click', 'logo-click', 'menu-item-click', 'notifications-click', 'product-switch-click', 'profile-click']
);

ShellBar.displayName = 'ShellBar';

ShellBar.defaultProps = {
  showCoPilot: false,
  showNotifications: false,
  showProductSwitch: false
};

export { ShellBar };
