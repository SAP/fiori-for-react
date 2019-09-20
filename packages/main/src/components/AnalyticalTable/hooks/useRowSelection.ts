import { Event } from '@ui5/webcomponents-react-base';
import { useCallback, useState } from 'react';

export const useRowSelection = (onRowSelected) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const onRowClicked = useCallback(
    (row) => (e) => {
      const newKey = row.getRowProps().key;
      setSelectedRow(selectedRow === newKey ? null : newKey);
      if (typeof onRowSelected === 'function') {
        onRowSelected(Event.of(null, e, { row }));
      }
    },
    [selectedRow, setSelectedRow]
  );
  return [selectedRow, onRowClicked];
};
