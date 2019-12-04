import { useCallback, useState } from 'react';
import { Event } from '@ui5/webcomponents-react-base/lib/Event';

const getColumnId = (column) => {
  return typeof column.accessor === 'string' ? column.accessor : column.id;
};

export const useDragAndDrop = (props, setColumnOrder, columnOrder, resizeInfo) => {
  const { onColumnsReordered } = props;

  const [dragOver, setDragOver] = useState('');

  const handleDragStart = useCallback(
    (e) => {
      if (resizeInfo.isResizingColumn === e.currentTarget.id) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('colId', e.currentTarget.id);
    },
    [resizeInfo.isResizingColumn]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback((e) => {
    setDragOver(e.currentTarget.id);
  }, []);

  const handleOnDrop = useCallback(
    (e) => {
      setDragOver('');

      const droppedColId = e.currentTarget.id;
      const draggedColId = e.dataTransfer.getData('colId');
      if (droppedColId === draggedColId) return;

      const internalColumnOrder = columnOrder.length > 0 ? columnOrder : props.columns.map((col) => getColumnId(col));
      const droppedColIdx = internalColumnOrder.findIndex((col) => col === droppedColId);
      const draggedColIdx = internalColumnOrder.findIndex((col) => col === draggedColId);

      const tempCols = [...internalColumnOrder];
      tempCols.splice(droppedColIdx, 0, tempCols.splice(draggedColIdx, 1)[0]);
      setColumnOrder(tempCols);

      const columnsNewOrder = tempCols.map((tempColId) => props.columns.find((col) => getColumnId(col) === tempColId));
      onColumnsReordered(
        Event.of(null, e, {
          columnsNewOrder,
          column: props.columns[draggedColIdx]
        })
      );
    },
    [columnOrder]
  );

  const handleOnDragEnd = useCallback(() => {
    setDragOver('');
  }, [dragOver]);

  return [dragOver, handleDragEnter, handleDragStart, handleDragOver, handleOnDrop, handleOnDragEnd];
};
