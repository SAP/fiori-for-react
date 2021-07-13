import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/SegmentedButton';

export interface SegmentedButtonPropTypes extends CommonProps {
  /**
   * Defines the buttons of `SegmentedButton`.
   *
   * **Note:** Multiple buttons are allowed.
   *
   * **Note:** Use the `ToggleButton` for the intended design.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired when the selected button changes.
   */
  onSelectionChange?: (event: Ui5CustomEvent<HTMLButtonElement, { selectedButton: ReactNode }>) => void;
}

/**
 * The `SegmentedButton` shows a group of buttons. When the user clicks or taps one of the buttons, it stays in a pressed state. It automatically resizes the buttons to fit proportionally within the component. When no width is set, the component uses the available width.
 *
 * **Note:** There can be just one selected `button` at a time.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/SegmentedButton" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const SegmentedButton = withWebComponent<SegmentedButtonPropTypes>(
  'ui5-segmentedbutton',
  [],
  [],
  [],
  ['selection-change']
);

SegmentedButton.displayName = 'SegmentedButton';

SegmentedButton.defaultProps = {};

export { SegmentedButton };
