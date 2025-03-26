import * as React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const STATUS_VALUES = ['COMPLETED', 'PAID', 'PENDING'];

function getStyles(name: string, selectedStatus: string, theme: Theme) {
  return {
    fontWeight: name === selectedStatus
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function OrderStatus({ status, id }: { status: string; id: string }) {
  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = React.useState<string>(status);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };

  const updateOrderStatus = async () => {
    if (window.confirm('Etes-vous sûr de vouloir mettre à jour le statut ?')) {
      try {
          await fetch(`/api/order?id=${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderStatus: selectedStatus }),
        });
      } catch (err) {
        console.error(err);
        alert('Une erreur est survenue lors de la mise à jour de la commande.');
      }
    }
  };

  return (
    <div>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="status-label">Statut</InputLabel>
        <Select
          labelId="status-label"
          id="status-select"
          value={selectedStatus}
          onChange={handleChange}
          input={<OutlinedInput label="Statut" />}
          MenuProps={MenuProps}
        >
          {STATUS_VALUES.map((STATUS_VALUE) => (
            <MenuItem
              key={STATUS_VALUE}
              value={STATUS_VALUE}
              style={getStyles(STATUS_VALUE, selectedStatus, theme)}
            >
              {STATUS_VALUE}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="py-3">
        <Button
          variant="contained"
          tabIndex={-1}
          startIcon={<UpdateIcon />}
          sx={{ backgroundColor: '#0CFF21', color: 'white', '&:hover': { backgroundColor: '#05c916' } }}
          onClick={updateOrderStatus}
        >
          Mettre à jour
        </Button>
      </div>
    </div>
  );
}
