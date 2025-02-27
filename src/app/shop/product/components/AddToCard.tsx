"use client";

import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

interface ProductProps {
  item: {
    id: string;
    title: string;
    price: number;
    sizes?: { uniqueItemId: string; size: string; stock: number }[];
  };
}

const AddToCart: React.FC<ProductProps> = ({ item }) => {
  const [selectedSize, setSelectedSize] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value);
  };

  const sizes = item.sizes?.map((size) => {
    return {
      key: size.uniqueItemId,
      print: size.stock > 0
        ? `${size.size} (${size.stock})`
        : `${size.size} (Disponible sous 2 semaines)`,
    };
  }) || [];

  return (
    <Box sx={{ maxWidth: 400 }}>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel
          id="size-selector-label"
          sx={{
            "&.Mui-focused": {
              color: "#0CFF21",
            },
            "&.MuiInputLabel-shrink:hover": {
              color: "#0CFF21",
            },
            padding: 0,
          }}
        >
          Votre taille
        </InputLabel>
        <Select
          labelId="size-selector-label"
          id="product-size-selector"
          value={selectedSize}
          onChange={handleChange}
          input={<OutlinedInput label="Votre taille" />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 250,
              },
            },
          }}
          sx={{
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0CFF21",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0CFF21",
            },
            borderRadius: 0,
          }}
        >
          {sizes.map((size) => (
            <MenuItem key={size.key} value={size.print}>
              {size.print}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", mt: 2 }} className="pb-40">
        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "black", color: "white", borderRadius: 0, padding: 1 }}
        >
          Ajouter au panier
        </Button>
      </Box>
    </Box>
  );
};

export default AddToCart;
