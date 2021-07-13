import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { CSSProperties, ReactNode } from 'react';

import '@ui5/webcomponents/dist/ColorPalette';

export interface ColorPalettePropTypes extends Omit<CommonProps, 'onChange'> {
  /**
   * Defines whether the user can choose a custom color from a color picker **Note:** In order to use this property you need to import the following module: `"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"`
   */
  moreColors?: boolean;
  /**
   * The selected color.
   */
  value?: CSSProperties['color'];
  /**
   * Defines the `ColorPaletteItem` items.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired when the user selects a color.
   */
  onChange?: (event: Ui5CustomEvent<HTMLElement, { color: string }>) => void;
}

/**
 * The ColorPalette provides the users with a range of predefined colors. You can set them by using the ColorPaletteItem items as slots.
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/ColorPalette" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const ColorPalette = withWebComponent<ColorPalettePropTypes>(
  'ui5-color-palette',
  ['value'],
  ['moreColors'],
  [],
  ['change']
);

ColorPalette.displayName = 'ColorPalette';

ColorPalette.defaultProps = {};

export { ColorPalette };
