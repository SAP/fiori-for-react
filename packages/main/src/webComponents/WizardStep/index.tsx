import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode } from 'react';

import '@ui5/webcomponents-fiori/dist/WizardStep';

export interface WizardStepPropTypes extends CommonProps {
  /**
   * When `branching` is enabled a dashed line would be displayed after the step, meant to indicate that the next step is not yet known and depends on user choice in the current step.
   *
   * **Note:** It is recommended to use `branching` on the last known step and later add new steps when it becomes clear how the wizard flow should continue.
   */
  branching?: boolean;
  /**
   * Defines if the step is `disabled`. When disabled the step is displayed, but the user can't select the step by clicking or navigate to it with scrolling.
   *
   * **Note:** Step can't be `selected` and `disabled` at the same time. In this case the `selected` property would take precedence.
   */
  disabled?: boolean;
  /**
   * Defines the `heading` of the step.
   *
   * **Note:** the text is displayed in the `Wizard` navigation header.
   * **Note:** the text will hide on small sizes (about 559 px).
   */
  heading?: string;
  /**
   * Defines the `icon` of the step.
   *
   * **Note:** the icon is displayed in the `Wizard` navigation header.
   *
   * The SAP-icons font provides numerous options. See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
   */
  icon?: string;
  /**
   * Defines the step's `selected` state - the step that is currently active.
   *
   * **Note:** Step can't be `selected` and `disabled` at the same time. In this case the `selected` property would take precedence.
   */
  selected?: boolean;
  /**
   * Defines the `subheading` of the step.
   *
   * **Note:** the text is displayed in the `Wizard` navigation header.
   * **Note:** the text will hide on small sizes (about 559 px).
   */
  subheading?: string;
  /**
   * Defines the step content.
   */
  children?: ReactNode | ReactNode[];
}

/**
 * A component that represents a logical step as part of the `Wizard`. It is meant to aggregate arbitrary HTML elements that forms the content of a single step.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/WizardStep" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const WizardStep = withWebComponent<WizardStepPropTypes>(
  'ui5-wizard-step',
  ['heading', 'icon', 'subheading'],
  ['branching', 'disabled', 'selected'],
  [],
  []
);

WizardStep.displayName = 'WizardStep';

WizardStep.defaultProps = {
  branching: false,
  disabled: false,
  selected: false
};

export { WizardStep };
