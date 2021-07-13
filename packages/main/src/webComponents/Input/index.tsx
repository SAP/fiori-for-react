import { InputType } from '@ui5/webcomponents-react/dist/InputType';
import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { Ui5InputDomRef } from '@ui5/webcomponents-react/interfaces/Ui5InputDomRef';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/Input';

export interface InputPropTypes extends Omit<CommonProps, 'onChange' | 'onInput'> {
  /**
   * Defines whether the `Input` is in disabled state.
   *
   * **Note:** A disabled `Input` is completely noninteractive.
   */
  disabled?: boolean;
  /**
   * Defines if characters within the suggestions are to be highlighted in case the input value matches parts of the suggestions text.
   *
   * **Note:** takes effect when `showSuggestions` is set to `true`
   */
  highlight?: boolean;
  /**
   * Sets the maximum number of characters available in the input field.
   */
  maxlength?: number;
  /**
   * Determines the name with which the `Input` will be submitted in an HTML form.
   *
   * **Important:** For the `name` property to have effect, you must add the following import to your project: `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
   *
   * **Note:** When set, a native `input` HTML element will be created inside the `Input` so that it can be submitted as part of an HTML form. Do not use this property unless you need to submit a form.
   */
  name?: string;
  /**
   * Defines a short hint intended to aid the user with data entry when the `Input` has no value.
   */
  placeholder?: string;
  /**
   * Defines whether the `Input` is read-only.
   *
   * **Note:** A read-only `Input` is not editable, but still provides visual feedback upon user interaction.
   */
  readonly?: boolean;
  /**
   * Defines whether the `Input` is required.
   */
  required?: boolean;
  /**
   * Defines whether the `Input` should show suggestions, if such are present.
   *
   * **Note:** Don\`t forget to import the `InputSuggestions` module from `"@ui5/webcomponents/dist/features/InputSuggestions.js"` to enable this functionality.
   */
  showSuggestions?: boolean;
  /**
   * Defines the HTML type of the `Input`. Available options are: `Text`, `Email`, `Number`, `Password`, `Tel`, and `URL`.
   *
   * **Notes:**
   *
   * *   The particular effect of this property differs depending on the browser and the current language settings, especially for type `Number`.
   * *   The property is mostly intended to be used with touch devices that use different soft keyboard layouts depending on the given input type.
   */
  type?: InputType;
  /**
   * Defines the value of the `Input`.
   *
   * **Note:** The property is updated upon typing.
   */
  value?: string;
  /**
   * Defines the value state of the `Input`.
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
   * Defines the `Input` suggestion items.
   *
   * Example:
   *
   * <pre>
   *   <code>
   *    &lt;Input showSuggestions><br />
   *    &nbsp;&nbsp;&lt;SuggestionItem text="Item #1" /><br />
   *    &nbsp;&nbsp;&lt;SuggestionItem text="Item #2" /><br />
   *    &lt;/Input>
   *  </code>
   * </pre>
   *
   *
   * **Note:** The suggestion would be displayed only if the `showSuggestions` property is set to `true`.
   *
   * **Note:** The `<SuggestionItem>` is recommended to be used as a suggestion item. Importing the Input Suggestions Support feature:
   * `import "@ui5/webcomponents/dist/features/InputSuggestions.js";`
   * also automatically imports the `<SuggestionItem>` for your convenience.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the icon to be displayed in the `Input`.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  icon?: ReactNode;
  /**
   * Defines the value state message that will be displayed as pop up under the `Input`.
   *
   * **Note:** If not specified, a default text (in the respective language) will be displayed.
   * **Note:** The `valueStateMessage` would be displayed, when the `Input` is in `Information`, `Warning` or `Error` value state.
   * **Note:** If the `Input` has `suggestionItems`, the `valueStateMessage` would be displayed as part of the same popover, if used on desktop, or dialog - on phone.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  valueStateMessage?: ReactNode | ReactNode[];
  /**
   * Fired when the input operation has finished by pressing Enter or on focusout.
   */
  onChange?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
  /**
   * Fired when the value of the `Input` changes at each keystroke, and when a suggestion item has been selected.
   */
  onInput?: (event: Ui5CustomEvent<HTMLInputElement>) => void;
  /**
   * Fired when the user navigates to a suggestion item via the ARROW keys, as a preview, before the final selection.
   */
  onSuggestionItemPreview?: (
    event: Ui5CustomEvent<HTMLInputElement, { item: ReactNode; targetRef: ReactNode }>
  ) => void;
  /**
   * Fired when a suggestion item, that is displayed in the suggestion popup, is selected.
   */
  onSuggestionItemSelect?: (event: Ui5CustomEvent<HTMLInputElement, { item: ReactNode }>) => void;
  /**
   * Fired when the user scrolls the suggestion popover.
   */
  onSuggestionScroll?: (
    event: Ui5CustomEvent<HTMLInputElement, { scrollTop: number; scrollContainer: ReactNode }>
  ) => void;
}

/**
 * The `Input` component allows the user to enter and edit text or numeric values in one line.
 * Additionally, you can provide `suggestionItems`, that are displayed in a popover right under the input.
 *
 * The text field can be editable or read-only (`readonly` property), and it can be enabled or disabled (`enabled` property). To visualize semantic states, such as "error" or "warning", the `valueState` property is provided. When the user makes changes to the text, the change event is fired, which enables you to react on any text change.
 *
 * **Note:** If you are using the `Input` as a single npm module, don't forget to import the `InputSuggestions` module from "@ui5/webcomponents/dist/features/InputSuggestions.js" to enable the suggestions functionality.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Input" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const Input = withWebComponent<InputPropTypes, Ui5InputDomRef>(
  'ui5-input',
  ['maxlength', 'name', 'placeholder', 'type', 'value', 'valueState'],
  ['disabled', 'highlight', 'readonly', 'required', 'showSuggestions'],
  ['icon', 'valueStateMessage'],
  ['change', 'input', 'suggestion-item-preview', 'suggestion-item-select', 'suggestion-scroll']
);

Input.displayName = 'Input';

Input.defaultProps = {
  disabled: false,
  highlight: false,
  readonly: false,
  required: false,
  showSuggestions: false,
  type: InputType.Text,
  valueState: ValueState.None
};

export { Input };
