import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode } from 'react';

import '@ui5/webcomponents/dist/TableCell';

export interface TableCellPropTypes extends CommonProps {
  /**
   * Specifies the content of the `TableCell`.
   */
  children?: ReactNode | ReactNode[];
}

/**
 * The `TableCell` component defines the structure of the data in a single `Table` cell
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/TableCell" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const TableCell = withWebComponent<TableCellPropTypes>('ui5-table-cell', [], [], [], []);

TableCell.displayName = 'TableCell';

TableCell.defaultProps = {};

export { TableCell };
