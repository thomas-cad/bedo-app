// app/orders/OrderTableWrapper.tsx (Client Component)
'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Order } from "@/interfaces";
import { useRouter } from 'next/navigation';

interface Column {
  id: keyof Order;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: string | number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'Order ID', minWidth: 200 },
  { id: 'userFirstName', label: 'First Name', minWidth: 100 },
  { id: 'userLastName', label: 'Last Name', minWidth: 150 },
  { id: 'userEmail', label: 'Email', minWidth: 250 },
  { id: 'userPhone', label: 'Phone', minWidth: 100 },
  { id: 'orderDate', label: 'Order Date', minWidth: 170, format: (value) => new Date(value.toString()).toLocaleString() },
  { id: 'orderStatus', label: 'Status', minWidth: 120 },
  { id: 'price', label: 'Total Price (€)', minWidth: 120, align: 'right', format: (value) => typeof value === 'number' ? value.toFixed(2) : value },
];

interface OrderTableWrapperProps {
  orders: Order[];
}

export default function OrderWrapper({ orders }: OrderTableWrapperProps) {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const router = useRouter();

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="mt-4">
      <Paper sx={{ width: '100%', maxWidth: '85vw' }}>
        <TableContainer sx={{ maxHeight: 440, maxWidth: '100vw' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                      <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => router.push(`/orders/detail?id=${row.id}`)}
                      style={{ cursor: 'pointer' }}
                      >
                      {columns.map((column) => {
                        const value = row[column.id];
                        const displayValue = Array.isArray(value)
                        ? value.length
                        : value instanceof Date
                        ? value.toLocaleString()
                        : value;

                        return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && (typeof displayValue === 'number' || typeof displayValue === 'string')
                          ? column.format(displayValue)
                          : displayValue}
                        </TableCell>
                        );
                      })}
                      </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}