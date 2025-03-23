"use client";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Order} from "@/interfaces"
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
    { id: 'orderDate', label: 'Order Date', minWidth: 170, format: (value: string | number) => new Date(value.toString()).toLocaleString() },
    { id: 'orderStatus', label: 'Status', minWidth: 120 },
    { id: 'price', label: 'Total Price (€)', minWidth: 120, align: 'right', format: (value: string | number) => typeof value === 'number' ? value.toFixed(2) : value },
];

function createOrder(order: Order): Order {
    return { 
        id: order.id, 
        userId: order.userId,
        userFirstName: order.userFirstName, 
        userLastName: order.userLastName, 
        userEmail: order.userEmail, 
        userPhone: order.userPhone, 
        orderDate: order.orderDate, 
        orderStatus: order.orderStatus, 
        price: order.price,
        products: order.products
    };
}

const fetchOrders = async (): Promise<Order[]> => {
    try {
        const response = await fetch('/api/order', {
            method: 'GET',
            // headers: {
            //     'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
            // }
        });

        if (!response.ok) {
            let errorMessage = `Failed to fetch orders. Status: ${response.status}`;
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const errorDetails = await response.json();
                    errorMessage += ' ' + JSON.stringify(errorDetails);
                }
            } catch (err) {
                errorMessage += ' (No JSON response)';
                errorMessage += err;
            }
            throw new Error(errorMessage);
        }

        const orders_response = await response.json();
        const orders = await orders_response["order"]

        if (!Array.isArray(orders)) {
            throw new Error('Invalid Order format: orders is not an array. Received: ' + JSON.stringify(orders));
        }
        return orders.map((order: Order) =>
            createOrder(order)
        );
    } catch (error) {
        console.error(error);
        return [];
    }
};

const OrderTable: React.FC<{ rows: Order[] }> = ({ rows }) => {
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
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
              onClick={() => router.push('/orders/detail?id=' + row.id)}
              style={{ cursor: 'pointer' }}
            >
            {columns.map((column) => {
              const value = row[column.id as keyof Order];
              let displayValue;

              if (value instanceof Date) {
                displayValue = value.toLocaleString();
              } else if (Array.isArray(value)) {
                displayValue = value.length; 
              } else {
                displayValue = value; 
              }

              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format && (typeof displayValue === 'number' || typeof displayValue === 'string')
              ? column.format(displayValue)
              : displayValue}
                </TableCell>
              );
            })}
                </TableRow>
              );
            })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      );
}

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        const loadOrders = async () => {
            const Order = await fetchOrders();
            setOrders(Order);
        };
        loadOrders();
    }, []);

    return (
        <div className="pt-20 pb-10">
            <OrderTable rows={orders} />
        </div>
    );
};

export default OrdersPage;
