import { act, fireEvent, getByText, getMouseEvent, render, renderRtl, screen } from '@shared/tests';
import { createPassThroughPropsTest } from '@shared/tests/utils';
import { AnalyticalTable } from '@ui5/webcomponents-react/dist/AnalyticalTable';
import { useRowDisableSelection } from '@ui5/webcomponents-react/dist/AnalyticalTableHooks';
import { TableSelectionBehavior } from '@ui5/webcomponents-react/dist/TableSelectionBehavior';
import { TableSelectionMode } from '@ui5/webcomponents-react/dist/TableSelectionMode';
import { TableVisibleRowCountMode } from '@ui5/webcomponents-react/dist/TableVisibleRowCountMode';
import { Button } from '@ui5/webcomponents-react/dist/Button';
import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import React, { useRef } from 'react';

const columns = [
  {
    Header: 'Name',
    headerTooltip: 'Full Name', // A more extensive description!
    accessor: 'name' // String-based value accessors!
  },
  {
    Header: 'Age',
    accessor: 'age'
  },
  {
    Header: 'Friend Name',
    accessor: 'friend.name' // Custom value accessors!
  },
  {
    Header: () => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }
];

const columnsWithPopIn = [
  {
    Header: 'Name',
    headerTooltip: 'Full Name',
    accessor: 'name'
  },
  {
    responsiveMinWidth: 601,
    Header: 'Age',
    accessor: 'age'
  },
  {
    responsivePopIn: true,
    responsiveMinWidth: 801,
    Header: 'Friend Name',
    accessor: 'friend.name'
  },
  {
    responsivePopIn: true,
    responsiveMinWidth: 801,
    Header: () => <span>Custom original Header1</span>,
    PopInHeader: 'Custom Header1',
    accessor: 'friend.age'
  },
  {
    responsivePopIn: true,
    responsiveMinWidth: 801,
    Header: () => <span>Custom original Header2</span>,
    PopInHeader: (instance) => {
      return 'Custom Header 2';
    },
    id: 'custom1',
    Cell: 'custom header 2'
  },
  {
    responsivePopIn: true,
    responsiveMinWidth: 801,
    Header: 'Custom Cell',
    id: 'custom2',
    Cell: ({ isPopIn }) => {
      if (isPopIn) {
        return 'pop-in content';
      }
      return 'original content';
    }
  }
];

const data = [
  {
    name: 'Fra',
    age: 40,
    friend: {
      name: 'MAR',
      age: 28
    },
    status: ValueState.Success,
    navigation: ValueState.Error
  },
  {
    name: 'bla',
    age: 20,
    friend: {
      name: 'Nei',
      age: 50
    }
  }
];

const moreData = [
  {
    name: 'foo',
    age: 18,
    friend: {
      name: 'meh',
      age: 28
    },
    status: ValueState.Success
  },
  {
    name: 'bar',
    age: 77,
    friend: {
      name: 'la',
      age: 66
    }
  },
  {
    name: 'lorem',
    age: 18,
    friend: {
      name: 'ipsum',
      age: 28
    },
    status: ValueState.Success
  },
  {
    name: 'dolor',
    age: 77,
    friend: {
      name: 'sit',
      age: 66
    }
  },
  {
    name: 'amet',
    age: 18,
    friend: {
      name: 'consetetur',
      age: 28
    },
    status: ValueState.Success
  },
  {
    name: 'sadipscing',
    age: 77,
    friend: {
      name: 'elitr',
      age: 66
    }
  }
];

const dataTree = [
  {
    name: 'Fra',
    age: 40,
    friend: {
      name: 'MAR',
      age: 28
    },
    subRows: [
      {
        name: 'asd',
        age: 40,
        friend: {
          name: 'longlonglong',
          age: 28
        },
        subRows: [
          {
            name: 'ABC',
            age: 40,
            friend: {
              name: 'DEF',
              age: 28
            },
            subRows: [
              {
                name: 'GHijkl',
                age: 40,
                friend: {
                  name: 'mnop',
                  age: 28
                },
                subRows: [
                  {
                    name: 'Fra',
                    age: 40,
                    friend: {
                      name: 'MAR',
                      age: 28
                    },
                    subRows: [
                      {
                        name: 'Fra',
                        age: 40,
                        friend: {
                          name: 'MAR',
                          age: 28
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Fra',
        age: 40,
        friend: {
          name: 'MAR',
          age: 28
        }
      },
      {
        name: 'Fra',
        age: 40,
        friend: {
          name: 'MAR',
          age: 28
        },
        subRows: [
          {
            name: 'Peter',
            age: 40,
            friend: {
              name: 'Retep',
              age: 28
            }
          }
        ]
      }
    ]
  },
  {
    name: 'bla',
    age: 20,
    friend: {
      name: 'Nei',
      age: 50
    }
  }
];

describe('AnalyticalTable', () => {
  beforeEach(() => {
    window = Object.assign(window, { innerWidth: 1440 });
  });
  //todo when it's possible to open popovers on click, activate this test again
  test.skip('test Asc desc', async () => {
    const { asFragment } = render(<AnalyticalTable data={data} header={'Test'} columns={columns} />);

    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getAllByText('Sort Ascending')[0], { bubbles: false });

    expect(asFragment()).toMatchSnapshot();

    // test desc function inside the popover element
    fireEvent.click(screen.getAllByText('Sort Descending')[0], { bubbles: false });

    expect(asFragment()).toMatchSnapshot();
  });

  test('render custom Cell & Header', () => {
    const callbackCellBtn = jest.fn();
    const callbackHeaderBtn = jest.fn();
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Age',
        accessor: 'age',
        Cell: () => <Button onClick={callbackCellBtn}>Custom Cell Button</Button>
      },
      {
        Header: () => <Button onClick={callbackHeaderBtn}>Custom Header Button</Button>,
        accessor: 'friend.name'
      }
    ];
    const { getAllByText, getByText, asFragment } = render(<AnalyticalTable data={data} columns={columns} />);

    const allCellButtons = getAllByText('Custom Cell Button');

    expect(allCellButtons).toHaveLength(2); // one button for each row

    fireEvent.click(allCellButtons[0]);
    fireEvent.click(getByText('Custom Header Button'));
    expect(callbackCellBtn).toBeCalledTimes(1);
    expect(callbackHeaderBtn).toBeCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Tree Table', () => {
    const utils = render(
      <AnalyticalTable
        header="Table Title"
        data={dataTree}
        columns={columns}
        loading={false}
        sortable={true}
        filterable={true}
        visibleRows={15}
        minRows={5}
        selectionMode={TableSelectionMode.SINGLE_SELECT}
        subRowsKey="subRows"
        isTreeTable={true}
      />
    );

    const colInst = utils.container.querySelector<HTMLElement>('div[role="columnheader"]');

    expect(colInst.draggable).toBeDefined();
    expect(colInst.draggable).toBeFalsy();
    expect(utils.asFragment()).toMatchSnapshot();
  });

  test('Loading - Placeholder', () => {
    const { asFragment } = render(
      <AnalyticalTable header="Table Title" data={[]} columns={columns} loading visibleRows={15} minRows={5} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Loading - Loader', () => {
    const { asFragment } = render(
      <AnalyticalTable header="Table Title" data={data} columns={columns} loading visibleRows={15} minRows={5} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Alternate Row Color', () => {
    const { asFragment } = render(
      <AnalyticalTable header="Table Title" data={data} columns={columns} alternateRowColor />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('custom row height', () => {
    const { asFragment } = render(
      <AnalyticalTable header="Table Title" data={data} columns={columns} rowHeight={60} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('with initial column order', () => {
    const { getAllByRole, asFragment } = render(
      <AnalyticalTable
        data={data}
        columns={columns}
        groupable={false}
        filterable={false}
        sortable={false}
        columnOrder={['age', 'friend.age', 'friend.name', 'name']}
      />
    );
    const columnHeaders = getAllByRole('columnheader', { hidden: true });

    ['Age', 'Friend Age', 'Friend Name', 'Name'].forEach((item, index) => {
      getByText(columnHeaders[index], item);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test('RTL: with initial column order', () => {
    const { getAllByRole, asFragment } = renderRtl(
      <AnalyticalTable
        data={data}
        columns={columns}
        groupable={false}
        filterable={false}
        sortable={false}
        columnOrder={['age', 'friend.age', 'friend.name', 'name']}
      />
    );
    const columnHeaders = getAllByRole('columnheader', { hidden: true });

    ['Age', 'Friend Age', 'Friend Name', 'Name'].forEach((item, index) => {
      getByText(columnHeaders[index], item);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test('test drag and drop of a draggable column', () => {
    const { asFragment, container } = render(<AnalyticalTable data={data} header={'Test'} columns={columns} />);

    // get first column of the table and simulate dragging of it
    let componentDrag = container.querySelector<HTMLElement>('div[role="columnheader"][draggable]');
    let dragColumnId = componentDrag.dataset.columnId;

    expect(componentDrag.draggable).toBeDefined();
    expect(componentDrag.draggable).toBeTruthy();
    fireEvent.drag(componentDrag);

    // get second column of the table and simulate dropping on it
    let dataTransfer = {
      getData: () => {
        return dragColumnId;
      }
    };
    let componentDrop = container.querySelectorAll('div[role="columnheader"][draggable]')[1];
    fireEvent.drag(componentDrop, { dataTransfer });

    expect(asFragment()).toMatchSnapshot();
  });

  test('RTL: test drag and drop of a draggable column', () => {
    const { asFragment, container } = renderRtl(<AnalyticalTable data={data} header={'Test'} columns={columns} />);

    // get first column of the table and simulate dragging of it
    let componentDrag = container.querySelector<HTMLElement>('div[role="columnheader"][draggable]');
    let dragColumnId = componentDrag.dataset.columnId;

    expect(componentDrag.draggable).toBeDefined();
    expect(componentDrag.draggable).toBeTruthy();
    fireEvent.drag(componentDrag);

    // get second column of the table and simulate dropping on it
    let dataTransfer = {
      getData: () => {
        return dragColumnId;
      }
    };
    let componentDrop = container.querySelectorAll('div[role="columnheader"][draggable]')[1];
    fireEvent.drag(componentDrop, { dataTransfer });

    expect(asFragment()).toMatchSnapshot();
  });

  test('render without data', () => {
    const data = [];
    const { asFragment } = render(
      <AnalyticalTable header="Table Title" data={data} columns={columns} alternateRowColor />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('without selection Column', () => {
    const { asFragment } = render(
      <AnalyticalTable
        header="Table Title"
        data={data}
        columns={columns}
        selectionMode={TableSelectionMode.SINGLE_SELECT}
        selectionBehavior={TableSelectionBehavior.ROW_ONLY}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Check for scrollTo and scrollToItem functions', () => {
    let tableRef;
    const UsingTable = (props) => {
      tableRef = useRef(null);
      return (
        <AnalyticalTable
          style={{ width: '170px' }}
          ref={tableRef}
          header="Table Title"
          data={data}
          columns={columns}
          visibleRows={1}
          minRows={1}
        />
      );
    };

    const { getByRole } = render(<UsingTable />);

    // Check existence + type
    expect(typeof tableRef.current.scrollTo).toBe('function');
    expect(typeof tableRef.current.scrollToItem).toBe('function');
    expect(typeof tableRef.current.horizontalScrollTo).toBe('function');
    expect(typeof tableRef.current.horizontalScrollToItem).toBe('function');

    // call functions
    const tableBodyRef = tableRef.current.querySelector("div[class^='AnalyticalTable-tbody']");
    const tableContainerRef = getByRole('grid', { hidden: true });

    act(() => {
      tableRef.current.scrollToItem(1, 'start');
    });

    expect(tableBodyRef.scrollTop).toBe(44);

    act(() => {
      tableRef.current.scrollTo(2);
    });

    expect(tableBodyRef.scrollTop).toBe(2);

    act(() => {
      tableRef.current.horizontalScrollToItem(1, 'start');
    });

    expect(tableContainerRef.scrollLeft).toBe(150);

    act(() => {
      tableRef.current.horizontalScrollTo(2);
    });

    expect(tableContainerRef.scrollLeft).toBe(2);
  });

  test('with highlight row', () => {
    const { asFragment, getAllByRole, rerender } = render(
      <AnalyticalTable
        header="Table Title"
        data={data}
        columns={columns}
        selectionMode={TableSelectionMode.SINGLE_SELECT}
        withRowHighlight
        minRows={1}
      />
    );
    const columnHeaders = getAllByRole('columnheader', { hidden: true });
    const highlightColumnHeader = columnHeaders[0];

    expect(highlightColumnHeader).toHaveStyle(`width: 6px; padding: 0px;`);
    expect(highlightColumnHeader.id).toBe('__ui5wcr__internal_highlight_column');

    const cells = getAllByRole('cell', { hidden: true });

    //highlight cells + selection cells + custom cells
    expect(cells.length).toBe(12);
    expect(asFragment()).toMatchSnapshot();

    rerender(
      <AnalyticalTable
        header="Table Title"
        data={data}
        columns={columns}
        selectionMode={TableSelectionMode.SINGLE_SELECT}
        minRows={1}
      />
    );

    const cellsWithoutHighlightCol = getAllByRole('cell', { hidden: true });

    //selection cells + custom cells
    expect(cellsWithoutHighlightCol.length).toBe(10);
  });

  test('RTL: with highlight row', () => {
    const { asFragment, getAllByRole, rerender } = renderRtl(
      <AnalyticalTable
        header="Table Title"
        data={data}
        columns={columns}
        selectionMode={TableSelectionMode.SINGLE_SELECT}
        withRowHighlight
        minRows={1}
      />
    );
    const columnHeaders = getAllByRole('columnheader', { hidden: true });
    const highlightColumnHeader = columnHeaders[0];

    expect(highlightColumnHeader).toHaveStyle(`width: 6px; padding: 0px;`);
    expect(highlightColumnHeader.id).toBe('__ui5wcr__internal_highlight_column');

    const cells = getAllByRole('cell', { hidden: true });

    //highlight cells + selection cells + custom cells
    expect(cells.length).toBe(12);
    expect(asFragment()).toMatchSnapshot();

    rerender(
      <AnalyticalTable
        header="Table Title"
        data={data}
        columns={columns}
        selectionMode={TableSelectionMode.SINGLE_SELECT}
        minRows={1}
      />
    );

    const cellsWithoutHighlightCol = getAllByRole('cell', { hidden: true });

    //selection cells + custom cells
    expect(cellsWithoutHighlightCol.length).toBe(10);
  });

  test('highlight row with custom row key', () => {
    const utils = render(
      <AnalyticalTable
        selectionMode={TableSelectionMode.SINGLE_SELECT}
        data={data}
        columns={columns}
        reactTableOptions={{
          getRowId: (row, relativeIndex, parent) => {
            return `${row.name ?? relativeIndex}`;
          }
        }}
        selectedRowIds={{
          ['Fra']: true
        }}
      />
    );

    expect(utils.asFragment()).toMatchSnapshot();

    const row = screen.getByText('Fra').parentNode.parentNode;
    expect(row).toHaveAttribute('data-is-selected');
  });

  test('render subcomponents', () => {
    const renderRowSubComponent = () => {
      return <div title="subcomponent">Hi! I'm a subcomponent.</div>;
    };

    const onlyFirstRowWithSubcomponent = (row) => {
      if (row.id === '0') {
        return <div title="subcomponent">Hi! I'm a subcomponent.</div>;
      }
    };
    const { asFragment, rerender } = render(
      <AnalyticalTable data={data} columns={columns} renderRowSubComponent={renderRowSubComponent} />
    );
    expect(screen.getAllByTitle('Toggle Row Expanded')).toHaveLength(2);

    fireEvent.click(screen.getAllByTitle('Toggle Row Expanded')[0]);

    expect(screen.getAllByTitle('subcomponent')).toHaveLength(1);

    fireEvent.click(screen.getAllByTitle('Toggle Row Expanded')[1]);

    expect(screen.getAllByTitle('subcomponent')).toHaveLength(2);

    expect(asFragment()).toMatchSnapshot();

    rerender(<AnalyticalTable data={data} columns={columns} renderRowSubComponent={onlyFirstRowWithSubcomponent} />);

    expect(screen.getAllByTitle('Toggle Row Expanded')).toHaveLength(1);
  });

  test('render rows', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientHeight: {
        value: 100,
        configurable: true
      }
    });
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return {
        height: 100
      };
    };
    const { asFragment, rerender } = render(
      <AnalyticalTable
        data={[...data, ...moreData]}
        columns={columns}
        visibleRowCountMode={TableVisibleRowCountMode.AUTO}
      />
    );

    const tableContainer = screen.getByRole('grid', { hidden: true });
    expect(tableContainer.getAttribute('data-per-page')).toBe('2');
    // expect(asFragment()).toMatchSnapshot();

    Object.defineProperties(window.HTMLElement.prototype, {
      clientHeight: {
        value: 1000,
        configurable: true
      }
    });
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return {
        height: 1000
      };
    };

    rerender(
      <AnalyticalTable
        data={[...data, ...moreData]}
        columns={columns}
        visibleRowCountMode={TableVisibleRowCountMode.AUTO}
      />
    );
    expect(tableContainer.getAttribute('data-per-page')).toBe('22');
    // expect(asFragment()).toMatchSnapshot();

    //test if visibleRows prop is ignored when row-count-mode is "Auto"
    rerender(
      <AnalyticalTable
        data={[...data, ...moreData]}
        columns={columns}
        visibleRowCountMode={TableVisibleRowCountMode.AUTO}
        visibleRows={1337}
      />
    );
    expect(tableContainer.getAttribute('data-per-page')).toBe('22');

    //test default visibleRow count
    rerender(
      <AnalyticalTable
        data={[...data, ...moreData]}
        columns={columns}
        visibleRowCountMode={TableVisibleRowCountMode.FIXED}
      />
    );
    expect(tableContainer.getAttribute('data-per-page')).toBe('15');
    // expect(asFragment()).toMatchSnapshot();

    rerender(
      <AnalyticalTable
        data={[...data, ...moreData]}
        columns={columns}
        visibleRowCountMode={TableVisibleRowCountMode.FIXED}
        visibleRows={1337}
      />
    );
    expect(tableContainer.getAttribute('data-per-page')).toBe('1337');
  });

  test('resize vertically', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientHeight: {
        value: 0,
        configurable: true
      }
    });

    render(
      <AnalyticalTable
        data={[...data, ...moreData]}
        columns={columns}
        visibleRowCountMode={TableVisibleRowCountMode.INTERACTIVE}
      />
    );
    const tableContainer = screen.getByRole('grid', { hidden: true });
    expect(tableContainer.getAttribute('data-per-page')).toBe('15');

    const mouseDown = getMouseEvent('mousedown');
    const mouseMove = getMouseEvent('mousemove');
    const mouseUp = getMouseEvent('mouseup', {
      pageY: 44
    });
    const mouseUp2 = getMouseEvent('mouseup', {
      pageY: 500
    });
    fireEvent(screen.getByTitle('Drag to resize'), mouseDown);

    fireEvent(document.body, mouseMove);
    expect(document.body.lastChild).toHaveClass('VerticalResizer-resizer');
    expect(document.body).toMatchSnapshot();

    fireEvent(document.body, mouseUp);
    expect(document.body.lastChild).not.toHaveClass('VerticalResizer-resizer');
    expect(tableContainer.getAttribute('data-per-page')).toBe('0');

    fireEvent(screen.getByTitle('Drag to resize'), mouseDown);
    fireEvent(document.body, mouseMove);
    fireEvent(document.body, mouseUp2);
    expect(tableContainer.getAttribute('data-per-page')).toBe('11');
  });

  test('pop-in columns: w/o pop-ins', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        value: 801,
        configurable: true
      }
    });

    render(<AnalyticalTable data={data} columns={columnsWithPopIn} />);

    screen.getByText('Name');
    screen.getByText('Age');
    screen.getByText('Friend Name');
    screen.getByText('Custom original Header1');
    screen.getByText('Custom original Header2');
    screen.getByText('Custom Cell');
  });

  test('RTL: pop-in columns: w/o pop-ins', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        value: 801,
        configurable: true
      }
    });

    renderRtl(<AnalyticalTable data={data} columns={columnsWithPopIn} />);

    screen.getByText('Name');
    screen.getByText('Age');
    screen.getByText('Friend Name');
    screen.getByText('Custom original Header1');
    screen.getByText('Custom original Header2');
    screen.getByText('Custom Cell');
  });

  test('pop-in columns: w/ pop-ins', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        value: 800,
        configurable: true
      }
    });

    const { asFragment } = render(<AnalyticalTable data={data} columns={columnsWithPopIn} />);

    screen.getByText('Name');
    screen.getByText('Age');

    expect(screen.queryByText('Friend Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Custom original Header1')).not.toBeInTheDocument();
    expect(screen.queryByText('Custom original Header2')).not.toBeInTheDocument();
    expect(screen.queryByText('Custom Cell')).not.toBeInTheDocument();

    const cells = screen.getAllByRole('cell', { hidden: true });

    getByText(cells[0], 'Fra');
    getByText(cells[0], 'Friend Name:');
    getByText(cells[0], 'MAR');
    getByText(cells[0], 'Custom Header1:');
    getByText(cells[0], '28');
    getByText(cells[0], 'Custom Header 2:');
    getByText(cells[0], 'custom header 2');
    getByText(cells[0], 'Custom Cell:');
    getByText(cells[0], 'pop-in content');

    expect(asFragment()).toMatchSnapshot();
  });

  test('RTL: pop-in columns: w/ pop-ins', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        value: 800,
        configurable: true
      }
    });

    const { asFragment } = renderRtl(<AnalyticalTable data={data} columns={columnsWithPopIn} />);

    screen.getByText('Name');
    screen.getByText('Age');

    expect(screen.queryByText('Friend Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Custom original Header1')).not.toBeInTheDocument();
    expect(screen.queryByText('Custom original Header2')).not.toBeInTheDocument();
    expect(screen.queryByText('Custom Cell')).not.toBeInTheDocument();

    const cells = screen.getAllByRole('cell', { hidden: true });

    getByText(cells[0], 'Fra');
    getByText(cells[0], 'Friend Name:');
    getByText(cells[0], 'MAR');
    getByText(cells[0], 'Custom Header1:');
    getByText(cells[0], '28');
    getByText(cells[0], 'Custom Header 2:');
    getByText(cells[0], 'custom header 2');
    getByText(cells[0], 'Custom Cell:');
    getByText(cells[0], 'pop-in content');

    expect(asFragment()).toMatchSnapshot();
  });

  test('pop-in columns: w/ pop-ins & hidden column', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        value: 600,
        configurable: true
      }
    });

    const { asFragment } = render(<AnalyticalTable data={data} columns={columnsWithPopIn} />);

    screen.getByText('Name');
    expect(screen.queryByText('Age')).not.toBeInTheDocument();

    const cells = screen.getAllByRole('cell', { hidden: true });

    getByText(cells[0], 'Fra');
    getByText(cells[0], 'Friend Name:');
    getByText(cells[0], 'MAR');
    getByText(cells[0], 'Custom Header1:');
    getByText(cells[0], '28');
    getByText(cells[0], 'Custom Header 2:');
    getByText(cells[0], 'custom header 2');
    getByText(cells[0], 'Custom Cell:');
    getByText(cells[0], 'pop-in content');

    expect(asFragment()).toMatchSnapshot();
  });
  test('onRowClick', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        value: 600,
        configurable: true
      }
    });

    const callback = jest.fn();
    const { getByText, getAllByRole } = render(
      <AnalyticalTable
        header="Table Title"
        data={data}
        columns={columns}
        selectionBehavior={TableSelectionBehavior.ROW}
        selectionMode={TableSelectionMode.SINGLE_SELECT}
        onRowClick={callback}
      />
    );

    const firstBodyRow = getAllByRole('row')[1];
    fireEvent.click(firstBodyRow);

    expect(callback).toBeCalled();

    const selectionColumn = firstBodyRow.querySelector('[data-name="internal_selection_column"]');
    fireEvent.click(selectionColumn);
    expect(callback).toBeCalledTimes(1);

    fireEvent.click(getByText('Fra'));
    expect(callback).toBeCalledTimes(2);
  });

  test('RTL: pop-in columns: w/ pop-ins & hidden column', () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      clientWidth: {
        value: 600,
        configurable: true
      }
    });

    const { asFragment } = renderRtl(<AnalyticalTable data={data} columns={columnsWithPopIn} />);

    screen.getByText('Name');
    expect(screen.queryByText('Age')).not.toBeInTheDocument();

    const cells = screen.getAllByRole('cell', { hidden: true });

    getByText(cells[0], 'Fra');
    getByText(cells[0], 'Friend Name:');
    getByText(cells[0], 'MAR');
    getByText(cells[0], 'Custom Header1:');
    getByText(cells[0], '28');
    getByText(cells[0], 'Custom Header 2:');
    getByText(cells[0], 'custom header 2');
    getByText(cells[0], 'Custom Cell:');
    getByText(cells[0], 'pop-in content');

    expect(asFragment()).toMatchSnapshot();
  });

  test('navigation indicator column', () => {
    const { asFragment, getAllByRole, rerender } = render(
      <AnalyticalTable data={data} columns={columns} withNavigationHighlight minRows={1} />
    );
    const columnHeaders = getAllByRole('columnheader', { hidden: true });
    const navigationColumnHeader = columnHeaders[columnHeaders.length - 1];

    expect(navigationColumnHeader).toHaveStyle(`width: 6px; padding: 0px;`);
    expect(navigationColumnHeader.id).toBe('__ui5wcr__internal_navigation_column');

    const cells = getAllByRole('cell', { hidden: true });
    const navigationCells = cells.filter((item) => item.getAttribute('aria-colindex') === '5');

    expect(navigationCells).toHaveLength(2);

    expect(asFragment()).toMatchSnapshot();

    rerender(<AnalyticalTable data={data} columns={columns} minRows={1} />);
    const cellsWithoutNavCol = getAllByRole('cell', { hidden: true });

    expect(cellsWithoutNavCol.filter((item) => item.getAttribute('aria-colindex') === '5')).toHaveLength(0);
  });

  test('RTL: navigation indicator column', () => {
    const { asFragment, getAllByRole, rerender } = renderRtl(
      <AnalyticalTable data={data} columns={columns} withNavigationHighlight minRows={1} />
    );
    const columnHeaders = getAllByRole('columnheader', { hidden: true });
    const navigationColumnHeader = columnHeaders[columnHeaders.length - 1];

    expect(navigationColumnHeader).toHaveStyle(`width: 6px; padding: 0px;`);
    expect(navigationColumnHeader.id).toBe('__ui5wcr__internal_navigation_column');

    const cells = getAllByRole('cell', { hidden: true });
    const navigationCells = cells.filter((item) => item.getAttribute('aria-colindex') === '5');

    expect(navigationCells).toHaveLength(2);

    expect(asFragment()).toMatchSnapshot();

    rerender(<AnalyticalTable data={data} columns={columns} minRows={1} />);
    const cellsWithoutNavCol = getAllByRole('cell', { hidden: true });

    expect(cellsWithoutNavCol.filter((item) => item.getAttribute('aria-colindex') === '5')).toHaveLength(0);
  });

  test('plugin hook: useRowDisableSelection', () => {
    const cb = jest.fn();
    const TestComponent = (props) => {
      const { cb } = props;
      const dataWithDisableSelectProp = data.map((item, index) => ({ ...item, disableSelection: index === 0 }));
      return (
        <AnalyticalTable
          data={dataWithDisableSelectProp}
          columns={columns}
          onRowSelected={cb}
          selectionMode={TableSelectionMode.MULTI_SELECT}
          tableHooks={[useRowDisableSelection('disableSelection')]}
          minRows={1}
        />
      );
    };

    const { getAllByRole, asFragment } = render(<TestComponent cb={cb} />);

    //first row is disabled, so all selection cells, and "normal" cells should not fire the event there
    const cells = getAllByRole('cell', { hidden: true });
    const selectionCells = cells.filter((item) => item.getAttribute('aria-colindex') === '1');
    expect(selectionCells).toHaveLength(2);
    fireEvent.click(selectionCells[0]);
    expect(cb).toBeCalledTimes(0);
    fireEvent.click(selectionCells[0].children[0]);
    expect(selectionCells[0].children[0].getAttribute('disabled')).toEqual('true');
    expect(cb).toBeCalledTimes(0);
    fireEvent.click(selectionCells[1]);
    expect(cb).toBeCalledTimes(1);
    fireEvent.click(selectionCells[1].children[0]);
    expect(cb).toBeCalledTimes(2);

    const extCells = cells.filter(
      (item) => item.getAttribute('aria-colindex') && item.getAttribute('aria-colindex') !== '1'
    );
    let counter = 2;
    extCells.forEach((item, index) => {
      fireEvent.click(item);
      if (index <= 3) {
        expect(cb).toBeCalledTimes(2);
      } else {
        counter++;
        expect(cb).toBeCalledTimes(counter);
      }
    });

    // test if "select-all" checkbox is not rendered
    const headers = getAllByRole('columnheader', { hidden: true });
    expect(headers[0].getElementsByTagName('ui5-checkbox')[0]).toBeFalsy();

    expect(asFragment()).toMatchSnapshot();
  });

  createPassThroughPropsTest(AnalyticalTable);
});
