import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/FileUploader';

export interface FileUploaderPropTypes extends Omit<CommonProps, 'onChange'> {
  /**
   * Comma-separated list of file types that the `FileUploader` should accept.
   *
   * **Note:** Please make sure you are adding the `.` in front on the file type, e.g. `.png` in case you want to accept png's only.
   */
  accept?: string;
  /**
   * Defines whether `FileUploader` is in disabled state.
   *
   * **Note:** A disabled `FileUploader` is completely noninteractive.
   */
  disabled?: boolean;
  /**
   * If set to "true", the input field of `FileUploader` will not be rendered. Only the default slot that is passed will be rendered.
   */
  hideInput?: boolean;
  /**
   * Allows multiple files to be chosen.
   */
  multiple?: boolean;
  /**
   * Determines the name with which the `FileUploader` will be submitted in an HTML form.
   *
   * **Important:** For the `name` property to have effect, you must add the following import to your project: `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
   *
   * **Note:** When set, a native `input` HTML element will be created inside the `FileUploader` so that it can be submitted as part of an HTML form. Do not use this property unless you need to submit a form.
   */
  name?: string;
  /**
   * Defines a short hint intended to aid the user with data entry when the `FileUploader` has no value.
   */
  placeholder?: string;
  /**
   * Defines the name/names of the file/files to upload.
   */
  value?: string;
  /**
   * Defines the value state of the `FileUploader`.
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
   * By default the `FileUploader` contains a single input field. With this slot you can pass any content that you wish to add. See the samples for more information.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the value state message that will be displayed as pop up under the `FileUploader`.
   *
   * **Note:** If not specified, a default text (in the respective language) will be displayed.
   * **Note:** The `valueStateMessage` would be displayed, when the `FileUploader` is in `Information`, `Warning` or `Error` value state.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  valueStateMessage?: ReactNode | ReactNode[];
  /**
   * Event is fired when the value of the file path has been changed. **Note:** Keep in mind that because of the HTML input element of type file, the event is also fired in Chrome browser when the Cancel button of the uploads window is pressed.
   */
  onChange?: (event: Ui5CustomEvent<HTMLElement, { files: FileList }>) => void;
}

/**
 * The `FileUploader` opens a file explorer dialog and enables users to upload files. The component consists of input field, but you can provide an HTML element by your choice to trigger the file upload, by using the default slot. Furthermore, you can set the property "hideInput" to "true" to hide the input field.
 * To get all selected files, you can simply use the read-only "files" property. To restrict the types of files the user can select, you can use the "accept" property.
 * And, similar to all input based components, the FileUploader supports "valueState", "placeholder", "name", and "disabled" properties. For the `FileUploader`
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/FileUploader" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const FileUploader = withWebComponent<FileUploaderPropTypes>(
  'ui5-file-uploader',
  ['accept', 'name', 'placeholder', 'value', 'valueState'],
  ['disabled', 'hideInput', 'multiple'],
  ['valueStateMessage'],
  ['change']
);

FileUploader.displayName = 'FileUploader';

FileUploader.defaultProps = {
  disabled: false,
  hideInput: false,
  multiple: false,
  valueState: ValueState.None
};

export { FileUploader };
