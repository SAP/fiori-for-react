import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents-fiori/dist/TimelineItem';

export interface TimelineItemPropTypes extends CommonProps {
  /**
   * Defines the icon to be displayed as graphical element within the `TimelineItem`. SAP-icons font provides numerous options.
   *
   * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
   */
  icon?: string;
  /**
   * Defines the name of the item.
   */
  itemName?: string;
  /**
   * Defines whether the `itemName` is clickable.
   */
  itemNameClickable?: boolean;
  /**
   * Defines the subtitle text of the component.
   */
  subtitleText?: string;
  /**
   * Defines the title text of the component.
   */
  titleText?: string;
  /**
   * Determines the description of the `TimelineItem`.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired when the item name is pressed either with a click/tap or by using the Enter or Space key.
   *
   * **Note:** The event will not be fired if the `item-name-clickable` attribute is not set.
   */
  onItemNameClick?: (event: Ui5CustomEvent<HTMLElement>) => void;
}

/**
 * An entry posted on the timeline
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/TimelineItem" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const TimelineItem = withWebComponent<TimelineItemPropTypes>(
  'ui5-timeline-item',
  ['icon', 'itemName', 'subtitleText', 'titleText'],
  ['itemNameClickable'],
  [],
  ['item-name-click']
);

TimelineItem.displayName = 'TimelineItem';

TimelineItem.defaultProps = {
  itemNameClickable: false
};

export { TimelineItem };
