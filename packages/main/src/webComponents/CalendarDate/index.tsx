import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';

import '@ui5/webcomponents/dist/CalendarDate';

export interface CalendarDatePropTypes extends CommonProps {
  /**
   * The date formatted according to the `formatPattern` property of the `Calendar` that hosts the `CalendarDate`
   */
  value?: string;
}

/**
 * The `CalendarDate` component defines a calendar date to be used inside `Calendar`
 */
const CalendarDate = withWebComponent<CalendarDatePropTypes>('ui5-date', ['value'], [], [], []);

CalendarDate.displayName = 'CalendarDate';

CalendarDate.defaultProps = {};

export { CalendarDate };
