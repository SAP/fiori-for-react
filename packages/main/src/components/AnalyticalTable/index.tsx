import { createUseStyles } from 'react-jss';
import { useIsomorphicLayoutEffect, useIsRTL } from '@ui5/webcomponents-react-base/dist/hooks';
import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import { usePassThroughHtmlProps } from '@ui5/webcomponents-react-base/dist/usePassThroughHtmlProps';
import { enrichEventWithDetails, debounce } from '@ui5/webcomponents-react-base/dist/Utils';
import { FlexBox } from '@ui5/webcomponents-react/dist/FlexBox';
import { GlobalStyleClasses } from '@ui5/webcomponents-react/dist/GlobalStyleClasses';
import { TableScaleWidthMode } from '@ui5/webcomponents-react/dist/TableScaleWidthMode';
import { TableSelectionBehavior } from '@ui5/webcomponents-react/dist/TableSelectionBehavior';
import { TableSelectionMode } from '@ui5/webcomponents-react/dist/TableSelectionMode';
import { TableVisibleRowCountMode } from '@ui5/webcomponents-react/dist/TableVisibleRowCountMode';
import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import React, {
  ComponentType,
  CSSProperties,
  FC,
  forwardRef,
  ReactNode,
  ReactText,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  PluginHook,
  useColumnOrder,
  useExpanded,
  useFilters,
  useGroupBy,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
  useGlobalFilter
} from 'react-table';
import { AnalyticalTableColumnDefinition } from '@ui5/webcomponents-react/interfaces/AnalyticalTableColumnDefinition';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import styles from './AnayticalTable.jss';
import { ColumnHeaderContainer } from './ColumnHeader/ColumnHeaderContainer';
import { DefaultColumn } from './defaults/Column';
import { DefaultLoadingComponent } from './defaults/LoadingComponent';
import { TablePlaceholder } from './defaults/LoadingComponent/TablePlaceholder';
import { DefaultNoDataComponent } from './defaults/NoDataComponent';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useDynamicColumnWidths } from './hooks/useDynamicColumnWidths';
import { usePopIn } from './hooks/usePopIn';
import { useRowHighlight } from './hooks/useRowHighlight';
import { useRowNavigationIndicators } from './hooks/useRowNavigationIndicator';
import { useRowSelectionColumn } from './hooks/useRowSelectionColumn';
import { useSingleRowStateSelection } from './hooks/useSingleRowStateSelection';
import { useStyling } from './hooks/useStyling';
import { useTableScrollHandles } from './hooks/useTableScrollHandles';
import { useToggleRowExpand } from './hooks/useToggleRowExpand';
import { useVisibleColumnsWidth } from './hooks/useVisibleColumnsWidth';
import { VerticalScrollbar } from './scrollbars/VerticalScrollbar';
import { VirtualTableBody } from './TableBody/VirtualTableBody';
import { VirtualTableBodyContainer } from './TableBody/VirtualTableBodyContainer';
import { stateReducer } from './tableReducer/stateReducer';
import { TitleBar } from './TitleBar';
import { orderByFn } from './util';
import { VerticalResizer } from './VerticalResizer';

interface DivWithCustomScrollProp extends HTMLDivElement {
  isExternalVerticalScroll?: boolean;
}

export interface TableProps extends Omit<CommonProps, 'title'> {
  /**
   * Defines the columns array where you can define the configuration for each column.
   *
   * __Note:__ Please look at the [AnalyticalTableColumnDefinition interface](#column-properties) for a full list of options.
   */
  columns: AnalyticalTableColumnDefinition[];
  /**
   * The data array that you want to display on the table.
   */
  data: Record<any, any>[];
  /**
   * Component or text rendered in the title section of the `AnalyticalTable`.
   *
   * __Note:__ If not set, it will be hidden.
   */
  title?: ReactText | ReactNode;
  /**
   * Extension section of the Table. If not set, no extension area will be rendered
   */
  extension?: ReactNode;
  /**
   * The minimum number of rows that are displayed. If the data contains less entries than `minRows`, it will be filled with empty rows.
   */
  minRows?: number;
  /**
   * Defines how the table table will render visible rows.
   *
   * - __"Fixed":__ The table always has as many rows as defined in the `visibleRowCount` prop.
   * - __"Auto":__ The table automatically fills the height of the surrounding container.
   * - __"Interactive":__ Adds a resizer to the bottom of the table to dynamically add or remove visible rows. The initial number of rows is defined by the `visibleRows` prop.
   *
   * __Note:__ When `"Auto"` is enabled, we recommend to use a fixed height for the outer container.
   */
  visibleRowCountMode?: TableVisibleRowCountMode;
  /**
   * The number of rows visible without going into overflow.
   *
   * __Note:__ If the data contains more entries than the `visibleRow` count, a vertical scrollbar is rendered and the table goes into overflow.
   */
  visibleRows?: number;
  /**
   * Indicates whether a loading indicator should be shown.
   *
   * __Note:__ If the data array is not empty and loading is set to `true` a `Loader` will be displayed underneath the header, otherwise a loading placeholder will be shown.
   * You can use your own placeholder by passing it to the `LoadingComponent` prop.
   */
  loading?: boolean;
  /**
   * Defines the text shown if the data array is empty. If not set "No data" will be displayed.
   */
  noDataText?: string;
  /**
   * Defines the height of the rows and header.
   */
  rowHeight?: number;
  /**
   * Defines whether the table should display rows with alternating row colors.
   */
  alternateRowColor?: boolean;
  /**
   * Flag whether the table should add an extra column at the end of the rows for displaying a navigation highlight.
   */
  withNavigationHighlight?: boolean;
  /**
   * Flag whether the table should add an extra column at the start of the rows for displaying row highlights, based on the `highlightField` prop.
   */
  withRowHighlight?: boolean;
  /**
   * Accessor for showing the row highlights. Only taken into account when `withRowHighlight` is set.
   *
   * Default Value: `status`.
   *
   * The value of this prop can either be a `string` pointing to a `ValueState` in your dataset
   * or an accessor function which should return a `ValueState`.
   */
  highlightField?: string | ((row: Record<any, any>) => ValueState);
  /**
   * Defines whether columns are filterable.
   */
  filterable?: boolean;
  /**
   * Defines whether columns are sortable.
   */
  sortable?: boolean;
  /**
   * Defines whether columns are groupable.
   */
  groupable?: boolean;
  /**
   * Group table rows by adding the column's `accessor` or `id` to the array.
   *
   * __Note:__ This prop has no effect when `isTreeTable` is true or `renderRowSubComponent` is set.
   */
  groupBy?: string[];
  /**
   * Defines the selection behavior of the table.
   *
   * - __"Row":__ A selection column is rendered along with the normal columns. The whole row is selectable.
   * - __"RowOnly":__ No selection column is rendered along with the normal columns. The whole row is selectable.
   * - __"RowSelector":__ The row is only selectable by clicking on the corresponding field in the selection column.
   */
  selectionBehavior?: TableSelectionBehavior;
  /**
   * Defines the `SelectionMode` of the table.
   *
   * - __"None":__ The rows are not selectable.
   * - __"SingleSelect":__ You can select only one row at once. Clicking on another row will unselect the previously selected row.
   * - __"MultiSelect":__ You can select multiple rows.
   */
  selectionMode?: TableSelectionMode;
  /**
   * Defines the column growing behaviour. Possible Values:
   *
   * - **Default**: Every column without fixed width gets the maximum available space of the table.
   * - **Smart**: Every column gets the space it needs for displaying the full header text. If all headers need more space than the available table width, horizontal scrolling will be enabled. If there is space left, columns with a long content will get more space until there is no more table space left.
   * - **Grow**: Every column gets the space it needs for displaying its full header text and full content of all cells. If it requires more space than the table has, horizontal scrolling will be enabled.
   *
   */
  scaleWidthMode?: TableScaleWidthMode;
  /**
   * Defines the columns order by their `accessor` or `id`.
   */
  columnOrder?: string[];
  /**
   * Defines whether infinite scroll is active.
   */
  infiniteScroll?: boolean;
  /**
   * The `infiniteScrollThreshold` defines at how many remaining rows the `onLoadMore` event should be fired.
   *
   * Example: Your initial dataset consists of 50 entries and you want to load more data when the user scrolled to the 40th row. Then you should set the `infiniteScrollThreshold` to 10.
   */
  infiniteScrollThreshold?: number;
  /**
   * The current global filter value.
   */
  globalFilterValue?: string;
  /**
   * Additional options which will be passed to [react-table´s useTable hook](https://react-table.tanstack.com/docs/api/useTable#table-options)
   */
  reactTableOptions?: Record<string, unknown>;
  /**
   * You can use this prob to add custom hooks to the table.
   */
  tableHooks?: PluginHook<any>[];
  /**
   * Defines the key for nested rows.
   *
   * Default: "children"
   */
  subRowsKey?: string;
  /**
   * The key must consist of a valid `rowId` like `{ 2: true }` or `{ '0.2.0': true }` for nested rows.
   */
  selectedRowIds?: { [key: string]: boolean };
  /**
   * Defines whether the table should act as tree-table.
   */
  isTreeTable?: boolean;
  /**
   * The amount of columns to load both behind and ahead of the current window range.
   */
  overscanCountHorizontal?: number;
  /**
   * The amount of rows to load both behind and ahead of the current window range.
   */
  overscanCount?: number;
  /**
   * Defines the subcomponent that should be displayed below each row.
   */
  renderRowSubComponent?: (row?: any) => ReactNode;
  /**
   * Defines whether a subcomponent should be rendered as expandable container or directly at the bottom of the row.
   */
  alwaysShowSubComponent?: boolean;

  // events
  /**
   * This callback can be used to programmatically show an indicator for navigated rows. It has no effect if `withNavigationHighlight` is not set.
   *
   * __Must be memoized!__
   */
  markNavigatedRow?: (row?: Record<any, any>) => boolean;
  /**
   * Fired when the sorting of the rows changes.
   */
  onSort?: (e: CustomEvent<{ column: unknown; sortDirection: string }>) => void;
  /**
   * Fired when the grouping of the rows changes.
   */
  onGroup?: (e: CustomEvent<{ column: unknown; groupedColumns: string[] }>) => void;
  /**
   * Fired when a row is selected or unselected.
   */
  onRowSelected?: (e?: CustomEvent<{ allRowsSelected?: boolean; row?: unknown; isSelected?: boolean }>) => void;
  /**
   * Fired when a row is clicked
   */
  onRowClick?: (e?: CustomEvent<{ row?: unknown }>) => void;
  /**
   * Fired when a row is expanded or collapsed
   */
  onRowExpandChange?: (e?: CustomEvent<{ row: unknown; column: unknown }>) => void;
  /**
   * Fired when the columns order is changed.
   */
  onColumnsReordered?: (e?: CustomEvent<{ columnsNewOrder: string[]; column: unknown }>) => void;
  /**
   * Fired when the `infiniteScrollThreshold` is reached.
   *
   * @param {number} e.detail.rowCount - The number of rows
   * @param {number} e.detail.totalRowCount - The total number of rows, including sub-rows
   */
  onLoadMore?: (e?: { detail: { rowCount: number; totalRowCount: number } }) => void;

  // default components
  /**
   * Component that will be rendered when the table is not loading and has no data.
   */
  NoDataComponent?: ComponentType<any>;
  /**
   * Component that will be rendered when the table is loading and has no data.
   */
  LoadingComponent?: ComponentType<any>;
}

const useStyles = createUseStyles(styles, { name: 'AnalyticalTable' });
/**
 * The `AnalyticalTable` provides a set of convenient functions for responsive table design, including virtualization of rows and columns, infinite scrolling and customizable columns that will, unless otherwise defined, distribute the available space equally among themselves.
 * It also provides several possibilities for working with the data, including sorting, filtering, grouping and aggregation.
 */
const AnalyticalTable: FC<TableProps> = forwardRef((props: TableProps, ref: Ref<HTMLDivElement>) => {
  const {
    columns,
    className,
    style,
    tooltip,
    title,
    loading,
    groupBy,
    selectionMode,
    selectionBehavior,
    onRowSelected,
    onRowClick,
    onSort,
    reactTableOptions,
    tableHooks,
    subRowsKey,
    onGroup,
    rowHeight,
    selectedRowIds,
    LoadingComponent,
    onRowExpandChange,
    noDataText,
    NoDataComponent,
    visibleRows,
    visibleRowCountMode,
    minRows,
    isTreeTable,
    alternateRowColor,
    overscanCount,
    overscanCountHorizontal,
    scaleWidthMode,
    withRowHighlight,
    highlightField,
    withNavigationHighlight,
    markNavigatedRow,
    groupable,
    sortable,
    filterable,
    infiniteScroll,
    infiniteScrollThreshold,
    onLoadMore,
    extension,
    columnOrder,
    renderRowSubComponent,
    alwaysShowSubComponent,
    globalFilterValue
  } = props;

  const classes = useStyles();

  const [analyticalTableRef, reactWindowRef] = useTableScrollHandles(ref);
  const tableRef: RefObject<DivWithCustomScrollProp> = useRef();

  const isRtl = useIsRTL(analyticalTableRef);

  const getSubRows = useCallback((row) => row[subRowsKey] || [], [subRowsKey]);

  const data = useMemo(() => {
    if (minRows > props.data.length) {
      const missingRows: number = minRows - props.data.length;
      const emptyRows = Array.from({ length: missingRows }, (v, i) => i).map(() => ({ emptyRow: true }));

      return [...props.data, ...emptyRows];
    }
    return props.data;
  }, [props.data, minRows]);

  const webComponentsReactProperties = useMemo(
    () => ({
      tableRef,
      selectionMode,
      selectionBehavior,
      classes,
      onRowSelected,
      onRowClick,
      onRowExpandChange,
      isTreeTable,
      alternateRowColor,
      scaleWidthMode,
      loading,
      withRowHighlight,
      highlightField,
      withNavigationHighlight,
      markNavigatedRow,
      renderRowSubComponent,
      alwaysShowSubComponent
    }),
    [
      tableRef.current,
      selectionMode,
      selectionBehavior,
      classes,
      onRowSelected,
      onRowClick,
      onRowExpandChange,
      isTreeTable,
      alternateRowColor,
      scaleWidthMode,
      loading,
      withRowHighlight,
      highlightField,
      withNavigationHighlight,
      markNavigatedRow,
      renderRowSubComponent,
      alwaysShowSubComponent
    ]
  );

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state: tableState,
    columns: tableInternalColumns,
    setColumnOrder,
    dispatch,
    totalColumnsWidth,
    visibleColumns,
    visibleColumnsWidth,
    setGroupBy,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn: DefaultColumn,
      orderByFn,
      getSubRows,
      stateReducer,
      disableFilters: !filterable,
      disableSortBy: !sortable,
      disableGroupBy: isTreeTable || renderRowSubComponent ? true : !groupable,
      selectSubRows: false,
      webComponentsReactProperties,
      ...reactTableOptions
    },
    useFilters,
    useGlobalFilter,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    useResizeColumns,
    useRowSelectionColumn,
    useSingleRowStateSelection,
    useRowHighlight,
    useRowNavigationIndicators,
    useDynamicColumnWidths,
    useStyling,
    useToggleRowExpand,
    usePopIn,
    useVisibleColumnsWidth,
    ...tableHooks
  );

  const titleBarRef = useRef(null);
  const extensionRef = useRef(null);
  const headerRef = useRef(null);

  const extensionsHeight =
    (titleBarRef.current?.offsetHeight ?? 0) +
    (extensionRef.current?.offsetHeight ?? 0) +
    (headerRef.current?.offsetHeight ?? 0);

  const calcRowHeight = parseInt(
    getComputedStyle(tableRef.current ?? document.body).getPropertyValue('--sapWcrAnalyticalTableRowHeight') || '44'
  );
  const internalRowHeight = rowHeight ?? calcRowHeight;
  const popInRowHeight =
    tableState?.popInColumns?.length > 0
      ? internalRowHeight + tableState.popInColumns.length * (internalRowHeight + 16)
      : internalRowHeight;

  const internalVisibleRowCount = tableState.visibleRows ?? visibleRows;

  const updateTableClientWidth = useCallback(() => {
    if (tableRef.current) {
      dispatch({ type: 'TABLE_RESIZE', payload: { tableClientWidth: tableRef.current.clientWidth } });
    }
  }, [tableRef.current]);

  const updateRowsCount = useCallback(() => {
    if (visibleRowCountMode === TableVisibleRowCountMode.AUTO && analyticalTableRef.current?.parentElement) {
      const parentElement = analyticalTableRef.current?.parentElement;
      const tableYPosition =
        parentElement &&
        getComputedStyle(parentElement).position === 'relative' &&
        analyticalTableRef.current?.offsetTop
          ? analyticalTableRef.current?.offsetTop
          : 0;
      const parentHeight = parentElement?.getBoundingClientRect().height;
      const tableHeight = parentHeight ? parentHeight - tableYPosition : 0;
      const rowCount = Math.floor((tableHeight - extensionsHeight) / popInRowHeight);
      dispatch({
        type: 'VISIBLE_ROWS',
        payload: { visibleRows: rowCount }
      });
    }
  }, [
    analyticalTableRef.current?.parentElement?.getBoundingClientRect().height,
    analyticalTableRef.current?.getBoundingClientRect().y,
    extensionsHeight,
    popInRowHeight,
    visibleRowCountMode
  ]);

  useEffect(() => {
    setGlobalFilter(globalFilterValue);
  }, [globalFilterValue, setGlobalFilter]);

  useEffect(() => {
    const tableWidthObserver = new ResizeObserver(debounce(updateTableClientWidth, 500));
    tableWidthObserver.observe(tableRef.current);

    const parentHeightObserver = new ResizeObserver(debounce(updateRowsCount, 500));
    parentHeightObserver.observe(analyticalTableRef.current?.parentElement);
    return () => {
      tableWidthObserver.disconnect();
      parentHeightObserver.disconnect();
    };
  }, [updateTableClientWidth, updateRowsCount]);

  useIsomorphicLayoutEffect(() => {
    dispatch({ type: 'IS_RTL', payload: { isRtl } });
  }, [isRtl]);

  useIsomorphicLayoutEffect(() => {
    updateTableClientWidth();
  }, [updateTableClientWidth]);

  useIsomorphicLayoutEffect(() => {
    updateRowsCount();
  }, [updateRowsCount]);

  useEffect(() => {
    if (tableState.visibleRows !== undefined && visibleRowCountMode === TableVisibleRowCountMode.FIXED) {
      dispatch({
        type: 'VISIBLE_ROWS',
        payload: { visibleRows: undefined }
      });
    }
  }, [visibleRowCountMode, tableState.visibleRows]);

  useEffect(() => {
    setGroupBy(groupBy);
  }, [groupBy, setGroupBy]);

  useEffect(() => {
    dispatch({ type: 'SET_SELECTED_ROW_IDS', payload: { selectedRowIds } });
  }, [selectedRowIds]);

  useEffect(() => {
    if (tableState?.interactiveRowsHavePopIn && (!tableState?.popInColumns || tableState?.popInColumns?.length === 0)) {
      dispatch({ type: 'WITH_POPIN', payload: false });
    }
  }, [tableState?.interactiveRowsHavePopIn, tableState?.popInColumns?.length]);

  const [maxHeight, setMaxHeight] = useState(-1);

  useEffect(() => {
    if (visibleRowCountMode === TableVisibleRowCountMode.AUTO && analyticalTableRef.current?.parentElement) {
      const height = analyticalTableRef.current?.parentElement?.getBoundingClientRect().height;
      setMaxHeight(height);
    }
  }, [visibleRowCountMode, analyticalTableRef.current, setMaxHeight]);

  const tableBodyHeight = useMemo(() => {
    const rowNum = rows.length < internalVisibleRowCount ? Math.max(rows.length, minRows) : internalVisibleRowCount;
    const rowHeight =
      visibleRowCountMode === TableVisibleRowCountMode.AUTO || tableState?.interactiveRowsHavePopIn
        ? popInRowHeight
        : internalRowHeight;
    const additionalHeight = tableState.subComponentsHeight
      ? Object.keys(tableState.subComponentsHeight).reduce(
          (acc, curr) => acc + tableState.subComponentsHeight[curr].subComponentHeight,
          0
        )
      : 0;
    const totalHeight = rowHeight * rowNum + additionalHeight;

    return visibleRowCountMode === TableVisibleRowCountMode.AUTO ? Math.min(maxHeight, totalHeight) : totalHeight;
  }, [
    internalRowHeight,
    rows.length,
    internalVisibleRowCount,
    minRows,
    popInRowHeight,
    visibleRowCountMode,
    tableState?.interactiveRowsHavePopIn,
    tableState.subComponentsHeight,
    maxHeight
  ]);

  // scroll bar detection
  useEffect(() => {
    const visibleRowCount =
      rows.length < internalVisibleRowCount ? Math.max(rows.length, minRows) : internalVisibleRowCount;
    if (popInRowHeight !== internalRowHeight) {
      dispatch({
        type: 'TABLE_SCROLLING_ENABLED',
        payload: { isScrollable: visibleRowCount * popInRowHeight > tableBodyHeight || rows.length > visibleRowCount }
      });
    } else {
      dispatch({ type: 'TABLE_SCROLLING_ENABLED', payload: { isScrollable: rows.length > visibleRowCount } });
    }
  }, [rows.length, minRows, internalVisibleRowCount, popInRowHeight, tableBodyHeight]);

  const noDataStyles = useMemo(() => {
    return {
      height: `${tableBodyHeight}px`,
      width: `${totalColumnsWidth}px`
    };
  }, [tableBodyHeight, totalColumnsWidth]);

  const onGroupByChanged = useCallback(
    (e) => {
      const { column, isGrouped } = e.detail;
      let groupedColumns = [];
      if (isGrouped) {
        groupedColumns = [...tableState.groupBy, column.id];
      } else {
        groupedColumns = tableState.groupBy.filter((group) => group !== column.id);
      }
      setGroupBy(groupedColumns);
      onGroup(
        enrichEventWithDetails(e, {
          column,
          groupedColumns
        })
      );
    },
    [tableState.groupBy, onGroup, setGroupBy]
  );

  useEffect(() => {
    if (columnOrder?.length > 0) {
      setColumnOrder(columnOrder);
    }
  }, [columnOrder]);

  const [dragOver, handleDragEnter, handleDragStart, handleDragOver, handleOnDrop, handleOnDragEnd] = useDragAndDrop(
    props,
    isRtl,
    setColumnOrder,
    tableState.columnOrder,
    tableState.columnResizing,
    tableInternalColumns
  );

  const passThroughProps = usePassThroughHtmlProps(props, [
    'onSort',
    'onGroup',
    'onRowSelected',
    'onRowClick',
    'onRowExpandChange',
    'onColumnsReordered',
    'onLoadMore'
  ]);

  const inlineStyle = useMemo(() => {
    const tableStyles = {
      maxWidth: '100%',
      overflowX: 'auto',
      display: 'flex',
      flexDirection: 'column'
    };
    if (!!rowHeight) {
      tableStyles['--sapWcrAnalyticalTableRowHeight'] = `${rowHeight}px`;
    }

    if (tableState.tableClientWidth > 0) {
      const styles = {
        ...tableStyles,
        ...style
      } as CSSProperties;

      if (totalColumnsWidth < tableState.tableClientWidth) {
        return { ...styles, borderBottom: `1px solid ${ThemingParameters.sapList_BorderColor}` };
      }
      return styles;
    }
    return {
      ...tableStyles,
      ...style,
      visibility: 'hidden'
    } as CSSProperties;
  }, [tableState.tableClientWidth, style, rowHeight, totalColumnsWidth]);

  const parentRef: RefObject<DivWithCustomScrollProp> = useRef(null);

  const verticalScrollBarRef: RefObject<DivWithCustomScrollProp> = useRef(null);

  const handleBodyScroll = () => {
    if (verticalScrollBarRef.current && verticalScrollBarRef.current.scrollTop !== parentRef.current.scrollTop) {
      if (!parentRef.current.isExternalVerticalScroll) {
        verticalScrollBarRef.current.scrollTop = parentRef.current.scrollTop;
        verticalScrollBarRef.current.isExternalVerticalScroll = true;
      }
      parentRef.current.isExternalVerticalScroll = false;
    }
  };

  const handleVerticalScrollBarScroll = () => {
    if (!verticalScrollBarRef.current.isExternalVerticalScroll) {
      parentRef.current.scrollTop = verticalScrollBarRef.current.scrollTop;
      parentRef.current.isExternalVerticalScroll = true;
    }
    verticalScrollBarRef.current.isExternalVerticalScroll = false;
  };

  const tableClasses = StyleClassHelper.of(classes.table, GlobalStyleClasses.sapScrollBar);
  if (withNavigationHighlight) {
    tableClasses.put(classes.hasNavigationIndicator);
  }
  return (
    <div className={className} style={inlineStyle} title={tooltip} ref={analyticalTableRef} {...passThroughProps}>
      {title && <TitleBar ref={titleBarRef}>{title}</TitleBar>}
      {extension && <div ref={extensionRef}>{extension}</div>}
      <FlexBox>
        <div
          {...getTableProps()}
          role="grid"
          aria-rowcount={rows.length}
          aria-colcount={tableInternalColumns.length}
          data-per-page={internalVisibleRowCount}
          ref={tableRef}
          className={tableClasses.className}
        >
          <div className={classes.tableHeaderBackgroundElement} />
          {headerGroups.map((headerGroup) => {
            let headerProps: Record<string, unknown> = {};
            if (headerGroup.getHeaderGroupProps) {
              headerProps = headerGroup.getHeaderGroupProps();
            }

            return (
              tableRef.current && (
                <ColumnHeaderContainer
                  ref={headerRef}
                  key={headerProps.key as string}
                  reactWindowRef={reactWindowRef}
                  tableRef={tableRef}
                  resizeInfo={tableState.columnResizing}
                  visibleColumnsWidth={visibleColumnsWidth}
                  headerProps={headerProps}
                  headerGroup={headerGroup}
                  overscanCountHorizontal={overscanCountHorizontal}
                  onSort={onSort}
                  onGroupByChanged={onGroupByChanged}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleOnDrop}
                  onDragEnter={handleDragEnter}
                  onDragEnd={handleOnDragEnd}
                  dragOver={dragOver}
                  isRtl={isRtl}
                />
              )
            );
          })}
          {loading && props.data?.length > 0 && <LoadingComponent style={{ width: `${totalColumnsWidth}px` }} />}
          {loading && props.data?.length === 0 && (
            <TablePlaceholder
              isRtl={isRtl}
              columns={tableInternalColumns.filter(
                (col) => (col.isVisible ?? true) && !tableState.hiddenColumns.includes(col.accessor)
              )}
              rows={props.minRows}
              style={noDataStyles}
              rowHeight={internalRowHeight}
              tableWidth={totalColumnsWidth}
            />
          )}
          {!loading && props.data?.length === 0 && (
            <NoDataComponent noDataText={noDataText} className={classes.noDataContainer} style={noDataStyles} />
          )}
          {props.data?.length > 0 && tableRef.current && (
            <VirtualTableBodyContainer
              tableBodyHeight={tableBodyHeight}
              totalColumnsWidth={totalColumnsWidth}
              parentRef={parentRef}
              classes={classes}
              infiniteScroll={infiniteScroll}
              infiniteScrollThreshold={infiniteScrollThreshold}
              onLoadMore={onLoadMore}
              internalRowHeight={internalRowHeight}
              popInRowHeight={popInRowHeight}
              rows={rows}
              handleExternalScroll={handleBodyScroll}
              visibleRows={internalVisibleRowCount}
            >
              <VirtualTableBody
                classes={classes}
                prepareRow={prepareRow}
                rows={rows}
                minRows={minRows}
                reactWindowRef={reactWindowRef}
                isTreeTable={isTreeTable}
                internalRowHeight={internalRowHeight}
                popInRowHeight={popInRowHeight}
                visibleRows={internalVisibleRowCount}
                alternateRowColor={alternateRowColor}
                overscanCount={overscanCount}
                tableRef={tableRef}
                parentRef={parentRef}
                visibleColumns={visibleColumns}
                visibleColumnsWidth={visibleColumnsWidth}
                overscanCountHorizontal={overscanCountHorizontal}
                renderRowSubComponent={renderRowSubComponent}
                alwaysShowSubComponent={alwaysShowSubComponent}
                markNavigatedRow={markNavigatedRow}
                isRtl={isRtl}
                subComponentsHeight={tableState.subComponentsHeight}
                dispatch={dispatch}
              />
            </VirtualTableBodyContainer>
          )}
        </div>
        {(tableState.isScrollable === undefined || tableState.isScrollable) && (
          <VerticalScrollbar
            internalRowHeight={internalRowHeight}
            popInRowHeight={popInRowHeight}
            tableRef={tableRef}
            minRows={minRows}
            rows={rows}
            handleVerticalScrollBarScroll={handleVerticalScrollBarScroll}
            ref={verticalScrollBarRef}
          />
        )}
      </FlexBox>
      {visibleRowCountMode === TableVisibleRowCountMode.INTERACTIVE && (
        <VerticalResizer
          popInRowHeight={popInRowHeight}
          hasPopInColumns={tableState?.popInColumns?.length > 0}
          analyticalTableRef={analyticalTableRef}
          dispatch={dispatch}
          extensionsHeight={extensionsHeight}
          internalRowHeight={internalRowHeight}
        />
      )}
    </div>
  );
});

AnalyticalTable.displayName = 'AnalyticalTable';
AnalyticalTable.defaultProps = {
  infiniteScrollThreshold: 20,
  loading: false,
  sortable: true,
  filterable: false,
  groupable: false,
  selectionMode: TableSelectionMode.NONE,
  selectionBehavior: TableSelectionBehavior.ROW,
  scaleWidthMode: TableScaleWidthMode.Default,
  data: [],
  columns: [],
  title: null,
  minRows: 5,
  groupBy: [],
  NoDataComponent: DefaultNoDataComponent,
  LoadingComponent: DefaultLoadingComponent,
  noDataText: 'No Data',
  reactTableOptions: {},
  tableHooks: [],
  visibleRows: 15,
  subRowsKey: 'subRows',
  highlightField: 'status',
  markNavigatedRow: () => false,
  selectedRowIds: {},
  onGroup: () => {},
  onRowExpandChange: () => {},
  onColumnsReordered: () => {},
  isTreeTable: false,
  alternateRowColor: false,
  overscanCountHorizontal: 5,
  visibleRowCountMode: TableVisibleRowCountMode.FIXED,
  alwaysShowSubComponent: false
};

export { AnalyticalTable };
