import { isIE } from '@ui5/webcomponents-react-base/dist/Device';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/usePassThroughHtmlProps';
import { useViewportRange } from '@ui5/webcomponents-react-base/dist/useViewportRange';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { GridPosition } from '@ui5/webcomponents-react/dist/GridPosition';
import React, {
  Children,
  cloneElement,
  CSSProperties,
  FC,
  forwardRef,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  Ref,
  useCallback
} from 'react';
import { createUseStyles } from 'react-jss';
import { styles } from './Grid.jss';

export interface GridPropTypes extends CommonProps {
  /**
   * Vertical spacing between the rows in the Grid. If not specified, then 1rem.
   */
  vSpacing?: CSSProperties['height'];
  /**
   * Horizontal spacing between the content in the Grid. If not specified, then 1rem.
   */
  hSpacing?: CSSProperties['width'];
  /**
   * Position of the Grid in the window or surrounding container. Possible values are "Center", "Left" and "Right".
   */
  position?: GridPosition;
  /**
   * A string type that represents Grid's default span values for very large, large, medium and small screens for the whole Grid.
   * Allowed values are separated by space Letters XL, L, M or S followed by number of columns from 1 to 12 that the container has to take, for example: "L2 M4 S6", "M12", "s10" or "l4 m4".
   * Note that the parameters has to be provided in the order very large, large, medium, small.
   * <br />
   * You can override this default span on each child element by setting the prop `data-layout-span`.
   */
  defaultSpan?: string;
  /**
   * Defines default for the whole Grid numbers of empty columns before the current span begins. It can be defined for very large, large, medium and small screens.
   * Allowed values are separated by space Letters XL, L, M or S followed by number of columns from 0 to 12 that the container has to take, for example: "L2 M4 S6", "M11", "s10" or "l4 m4".
   * Note that the parameters has to be provided in the order very-large, large, medium, small.
   * <br />
   * You can override this default indent on each child element by setting the prop `data-layout-indent`.
   */
  defaultIndent?: string;
  /**
   * Components that are placed into Grid layout.
   */
  children: ReactNode | ReactNodeArray;
}

const INDENT_PATTERN =
  /^([X][L](?<LargeDesktop>[0-9]|1[0-2]))? ?([L](?<Desktop>[0-9]|1[0-2]))? ?([M](?<Tablet>[0-9]|1[0-2]))? ?([S](?<Phone>[0-9]|1[0-2]))?$/i;
const SPAN_PATTERN =
  /^([X][L](?<LargeDesktop>[1-9]|1[0-2]))? ?([L](?<Desktop>[1-9]|1[0-2]))? ?([M](?<Tablet>[1-9]|1[0-2]))? ?([S](?<Phone>[1-9]|1[0-2]))?$/i;

const DefaultSpanMap = new Map();
DefaultSpanMap.set('Phone', 1);
DefaultSpanMap.set('Tablet', 2);
DefaultSpanMap.set('Desktop', 4);
DefaultSpanMap.set('LargeDesktop', 4);

const DefaultIndentMap = new Map();
DefaultIndentMap.set('Phone', 0);
DefaultIndentMap.set('Tablet', 0);
DefaultIndentMap.set('Desktop', 0);
DefaultIndentMap.set('LargeDesktop', 0);

const getSpanFromString = (span, currentRange) => {
  const spanConfig = SPAN_PATTERN.exec(span);
  return spanConfig?.groups[currentRange] ?? DefaultSpanMap.get(currentRange);
};

const getIndentFromString = (indent, currentRange) => {
  const indentConfig = INDENT_PATTERN.exec(indent);
  return indentConfig?.groups[currentRange] ?? DefaultIndentMap.get(currentRange);
};

const getIECellPlacement = (col, row, span) => {
  let colStart;
  let safeSpan = parseInt(span);
  const added = col + safeSpan;
  if (added <= 12) {
    colStart = col + 1;
    col = added;
  } else {
    colStart = 1;
    col = safeSpan;
    row++;
  }
  return [col, row, colStart];
};

const useStyles = createUseStyles(styles, { name: 'Grid' });
/**
 * A layout container component used for aligning items with various sizes in a simple grid.
 */
const Grid: FC<GridPropTypes> = forwardRef((props: GridPropTypes, ref: Ref<HTMLDivElement>) => {
  const { position, children, hSpacing, vSpacing, style, className, tooltip, slot, defaultIndent, defaultSpan } = props;
  const classes = useStyles();
  const currentRange = useViewportRange('StdExt');
  const gridClasses = StyleClassHelper.of(classes.grid);

  if (GridPosition.Center === position) {
    gridClasses.put(classes.positionCenter);
  }

  if (GridPosition.Right === position) {
    gridClasses.put(classes.positionRight);
  }

  if (className) {
    gridClasses.put(className);
  }

  let column = 0;
  let row = 1;
  const renderGridElements = useCallback(
    (child: ReactElement<any>) => {
      if (!child) return null;

      const childSpan = getSpanFromString(child.props['data-layout-span'] ?? defaultSpan, currentRange);
      let childClass = classes[`gridSpan${childSpan}`];

      const childrenWithGridLayout = [<div className={childClass}>{child}</div>];

      const indentSpan = getIndentFromString(child.props['data-layout-indent'] ?? defaultIndent, currentRange);
      if (indentSpan && indentSpan > 0) {
        childrenWithGridLayout.unshift(<span className={classes[`gridSpan${indentSpan}`]} />);
      }
      if (isIE()) {
        return childrenWithGridLayout.map((item, index) => {
          let colStart;
          if (childrenWithGridLayout.length === 2 && index === 0) {
            [column, row, colStart] = getIECellPlacement(column, row, indentSpan);
            return cloneElement(item, {
              style: { marginRight: vSpacing, marginBottom: hSpacing, msGridRow: row, msGridColumn: colStart }
            });
          }
          [column, row, colStart] = getIECellPlacement(column, row, childSpan);
          return cloneElement(item, {
            style: { marginRight: vSpacing, marginBottom: hSpacing, msGridRow: row, msGridColumn: colStart }
          });
        });
      }
      return childrenWithGridLayout;
    },
    [currentRange, defaultSpan, defaultIndent, classes, vSpacing, hSpacing]
  );

  const passThroughProps = usePassThroughHtmlProps(props);

  return (
    <div
      ref={ref}
      className={gridClasses.valueOf()}
      style={{ gridRowGap: vSpacing, gridColumnGap: hSpacing, ...style }}
      title={tooltip}
      slot={slot}
      {...passThroughProps}
    >
      {Children.map(children, renderGridElements)}
    </div>
  );
});

Grid.displayName = 'Grid';

Grid.defaultProps = {
  hSpacing: '1rem',
  vSpacing: '1rem',
  defaultIndent: 'XL0 L0 M0 S0',
  defaultSpan: 'XL3 L3 M6 S12'
};

export { Grid };
