import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useCart } from '@/app/context/CartContext';

interface ProductProps {
  item: {
    id: string;
    title: string;
    price: number;
    sizes?: { uniqueItemId: string; size: string; stock: number; price?: number }[];
  };
}

const AddToCart: React.FC<ProductProps> = ({ item }) => {
  const [selectedSizeKey, setSelectedSizeKey] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const { addToCart } = useCart();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSizeKey(event.target.value);
  };

  const handleAddToCart = () => {
    setMessage("");
    setErrorMessage("");

    const selectedSize = item.sizes?.find((size) => size.uniqueItemId === selectedSizeKey);

    if (selectedSize) {
      const price = selectedSize.price ?? item.price;  // Prendre le prix de la taille ou par défaut celui de l'article
      addToCart(selectedSize.uniqueItemId, 1, price);

      setMessage("Article ajouté au panier ! ;)");
    } else {
      setErrorMessage("Veuillez sélectionner une taille");
    }
  };

  const sizes = item.sizes?.map((size) => ({
    key: size.uniqueItemId,
    label: size.stock > 0
      ? `${size.size} (${size.stock})`
      : `${size.size} (Disponible sous 2 semaines)`,
  })) || [];

  return (
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
          Votre taille
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
          {sizes.map((size) => (
            <MenuItem key={size.key} value={size.key}>
              {size.label}
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
          Ajouter au panier
        </Button>
      </Box>

      <Box sx={{ mt: 2, justifyContent: "center", display: "flex" }}>
        <div>{message}</div>
        <div style={{ color: "red" }}>{errorMessage}</div>
      </Box>
    </Box>
  );
};

export default AddToCart;
