import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { Ui5PickerDomRef } from '@ui5/webcomponents-react/interfaces/Ui5PickerDomRef';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/DurationPicker';

export interface DurationPickerPropTypes extends Omit<CommonProps, 'onChange' | 'onInput'> {
  /**
   * Defines whether the slider for hours will be available. By default there are sliders for hours, minutes and seconds.
   */
  hideHours?: boolean;
  /**
   * Defines whether the slider for minutes will be available. By default there are sliders for hours, minutes and seconds.
   */
  hideMinutes?: boolean;
  /**
   * Defines whether a slider for seconds will be available. By default there are sliders for hours, minutes and seconds.
   */
  hideSeconds?: boolean;
  /**
   * Defines a formatted maximal time that the user will be able to adjust.
   */
  maxValue?: string;
  /**
   * Defines the selection step for the minutes
   */
  minutesStep?: number;
  /**
   * Defines the selection step for the seconds
   */
  secondsStep?: number;
  /**
   * Defines a formatted time value.
   */
  value?: string;
  /**
   * Determines whether the `DurationPicker` is displayed as disabled.
   */
  disabled?: boolean;
  /**
   * Determines the format, displayed in the input field. Example: HH:mm:ss -> 11:42:35 hh:mm:ss a -> 2:23:15 PM mm:ss -> 12:04 (only minutes and seconds)
   */
  formatPattern?: string;
  /**
   * Defines a short hint, intended to aid the user with data entry when the `DurationPicker` has no value.
   *
   * **Note:** When no placeholder is set, the format pattern is displayed as a placeholder. Passing an empty string as the value of this property will make the `DurationPicker` appear empty - without placeholder or format pattern.
   */
  placeholder?: string;
  /**
   * Determines whether the `DurationPicker` is displayed as readonly.
   */
  readonly?: boolean;
  /**
   * Defines the value state of the `DurationPicker`.
   *
   * Available options are:
   *
   * *   `None`
   * *   `Error`
   * *   `Warning`
   * *   `Success`
   * *   `Information`
   */
  valueState?: ValueState;
  /**
   * Defines the value state message that will be displayed as pop up under the `DurationPicker`.
   *
   * **Note:** If not specified, a default text (in the respective language) will be displayed.
   * **Note:** The `valueStateMessage` would be displayed, when the `DurationPicker` is in `Information`, `Warning` or `Error` value state.
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  valueStateMessage?: ReactNode;
  /**
   * Fired when the input operation has finished by clicking the "OK" button or when the text in the input field has changed and the focus leaves the input field.
   */
  onChange?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
  /**
   * Fired when the value of the `DurationPicker` is changed at each key stroke.
   */
  onInput?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
}

/**
 * The `DurationPicker` component provides an input field with assigned sliders which opens on user action. The `DurationPicker` allows users to select a time duration. It consists of two parts: the time input field and the sliders.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/DurationPicker" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const DurationPicker = withWebComponent<DurationPickerPropTypes, Ui5PickerDomRef>(
  'ui5-duration-picker',
  ['maxValue', 'minutesStep', 'secondsStep', 'value', 'formatPattern', 'placeholder', 'valueState'],
  ['hideHours', 'hideMinutes', 'hideSeconds', 'disabled', 'readonly'],
  ['valueStateMessage'],
  ['change', 'input']
);

DurationPicker.displayName = 'DurationPicker';

DurationPicker.defaultProps = {
  hideHours: false,
  hideMinutes: false,
  hideSeconds: false,
  maxValue: '23:59:59',
  minutesStep: 1,
  secondsStep: 1,
  value: '00:00:00',
  disabled: false,
  placeholder: undefined,
  readonly: false,
  valueState: ValueState.None
};

export { DurationPicker };
