import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

const DataTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="p-4">
      <table
        {...getTableProps()}
        className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
      >
        <thead className="bg-gray-800 text-white">
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-4 text-left text-sm font-medium uppercase tracking-wider"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()} className="border-b">
                {row.cells.map(cell => (
                  <td
                    key={cell.column.id}
                    {...cell.getCellProps()}
                    className="p-4 text-sm text-gray-900"
                  >
                    {cell.column.id === 'price'
                      ? typeof cell.value === 'number'
                        ? `$${cell.value.toFixed(2)}`
                        : '$0.00'
                      : cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="ml-2 p-2 bg-gray-800 text-white rounded-md"
        >
          {[10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DataTable;
