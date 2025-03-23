import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductOrder } from '@/interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'name', headerName: 'Item', width: 150 },
  { field: 'size', headerName: 'Taille', width: 70 },
  { field: 'quantity_stock', headerName: 'Dispo Stock', width: 100 },
  { field: 'quantity_preorder', headerName: 'Precommande', width: 110 },
  { field: 'price', headerName: 'Prix', width: 70 },
];

const paginationModel = { page: 0, pageSize: 5 };

type OrderDetailProps = {
  productsOrder: ProductOrder[];
};

export default function OrderDetail({ productsOrder }: OrderDetailProps) {
  const [rows, setRows] = React.useState(() =>
    productsOrder.map((product) => ({
      id: product.productId,
      name: product.name_fr,
      size: product.size,
      quantity_stock: product.quantity_stock,
      quantity_preorder: product.quantiy_preorder,
      price: product.price,
    }))
  );
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    setSelectedRows(selectionModel.map(String));
  };

  const deleteProducts = () => {
    if (selectedRows.length === 0) return;
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedRows.length} item(s) ?`)) {
      setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
      setSelectedRows([]);
    }
  };

  const updateDB = () => {
    console.log('Mise à jour des données :', JSON.stringify({
      products: rows.map((row) => ({
        productId: row.id,
        quantity_total: row.quantity_stock + row.quantity_preorder,
      })),
    }, null, 2));
  };

  const handleDelete = () => {
    deleteProducts();
    updateDB();
  };

  return (
    <div>
      <Paper sx={{ width: '100%', maxWidth: '85vw' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          sx={{ border: 0 }}
        />
      </Paper>
      <div className='py-3'>
        <Button
          variant='outlined'
          startIcon={<DeleteIcon />}
          sx={{ color: 'red', borderColor: 'red' }}
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
        >
          Supprimer ({selectedRows.length})
        </Button>
      </div>
    </div>
  );
}
