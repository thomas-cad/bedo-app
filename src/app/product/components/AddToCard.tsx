"use client";

import React from "react";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const sizes = ["S", "M", "L", "XL"];

interface ProductProps {
  item: {
    id: string;
    title: string;
    price: number;
  };
}

const AddToCart: React.FC<ProductProps> = ({ item }) => {
  const [selectedSize, setSelectedSize] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 400}}>
      
      

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
            }}>
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
              borderColor: "#0CFF21", // Keeping the chosen color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0CFF21", // Keeping the chosen color
            },
            borderRadius: 0,
          }}
        >
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", mt: 2}} className="pb-40">
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
