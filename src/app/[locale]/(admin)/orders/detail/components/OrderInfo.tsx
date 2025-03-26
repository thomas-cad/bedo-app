import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Order } from "@/interfaces"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  info: string | Date | number,
) {
  return { name, info };
}


export default function OrderInfo({ order }: { order: Order }) {

  const rows = [
    createData('ID', order.id),
    createData('Client ID', order.userId),
    createData('Client Prenom', order.userFirstName),
    createData('Client Nom', order.userLastName),
    createData('Client E-Mail', order.userEmail),
    createData('Client Phone', order.userPhone),
    createData('Date commande', order.orderDate),
    createData('Statut commande', order.orderStatus),
    createData('Nombre produit', order.products.length),
    createData('Total commande', order.price)
  ];

  return (
    <Paper sx={{ width: '100%', maxWidth: '85vw' }}>
      <Table sx={{ minWidth: 300, maxWidth:500}} aria-label="customized table">
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.info instanceof Date ? row.info.toLocaleDateString() : row.info}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
