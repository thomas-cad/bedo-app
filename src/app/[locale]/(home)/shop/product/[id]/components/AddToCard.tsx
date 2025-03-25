import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useCart } from '@/app/[locale]/context/CartContext';
import { Item, ProductItem } from "@/interfaces";

const AddToCart = ({ item, t }: { item: Item; t: { product: { add_to_cart: { size: string; add: string } } } }) => {
  const [selectedSizeKey, setSelectedSizeKey] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const products:ProductItem[] = item.products
  const { addToCart } = useCart();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSizeKey(event.target.value);
  };

  const handleAddToCart = () => {
    setMessage("");
    setErrorMessage("");

    const selectedSize = item.products?.find((product: ProductItem) => product.id === selectedSizeKey);

    if (selectedSize) {
      addToCart(selectedSize.id, 1, item.price);
      setMessage("Article ajouté au panier ! ;)");
    } else {
      setErrorMessage("Veuillez sélectionner une taille");
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: 400 }}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel
            id="size-selector-label"
            sx={{
              "&.Mui-focused": { color: "#0CFF21" },
              "&.MuiInputLabel-shrink:hover": { color: "#0CFF21" },
              padding: 0,
            }}
          >
            {t.product.add_to_cart.size}
          </InputLabel>
          <Select
            labelId="size-selector-label"
            id="product-size-selector"
            value={selectedSizeKey}
            onChange={handleChange}
            input={<OutlinedInput label="Votre taille" />}
            MenuProps={{
              PaperProps: { style: { maxHeight: 200, width: 250 } },
            }}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0CFF21" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0CFF21" },
              borderRadius: 0,
            }}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "black", color: "white", borderRadius: 0, padding: 1 }}
            onClick={handleAddToCart}
          >
            {t.product.add_to_cart.add}
          </Button>
        </Box>

        <Box sx={{ mt: 2, justifyContent: "center", display: "flex" }}>
          <div>{message}</div>
          <div style={{ color: "red" }}>{errorMessage}</div>
        </Box>
      </Box>
    </div>
  );
};

export default AddToCart;
