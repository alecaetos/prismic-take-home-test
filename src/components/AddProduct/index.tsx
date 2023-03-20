import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useSetAtom } from "jotai";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { addNewProductAtom } from "../../state";

interface AddProductProps {
  open: boolean;
  handleClose: () => void;
}

const initialState = {
  name: "",
  price: 0,
  promoPrice: 0,
  promoQuantity: 0,
};

const AddProduct = ({ open, handleClose }: AddProductProps) => {
  const addNewProduct = useSetAtom(addNewProductAtom);
  const [formData, setFormData] = useState(initialState);

  const onClose = () => {
    setFormData(initialState);
    handleClose();
  };

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, price, promoPrice, promoQuantity } = formData;

    addNewProduct({
      name,
      price: Number(price),
      specialPrice: {
        price: Number(promoPrice),
        quantity: Number(promoQuantity),
      },
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "min(100%, 400px)" } }}
    >
      <DialogTitle>Add new product</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            required
            fullWidth
            id="product-name"
            name="name"
            label="Product Name"
            margin="normal"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            required
            type="number"
            id="product-price"
            name="price"
            label="Price (€)"
            margin="normal"
            value={formData.price}
            onChange={handleInputChange}
          />
          <Stack direction="row" spacing={2} mt={1}>
            <TextField
              fullWidth
              type="number"
              id="special-product-quantity"
              name="promoQuantity"
              label="Discount Quantity"
              value={formData.promoQuantity}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              type="number"
              id="special-product-price"
              name="promoPrice"
              label="Discount Price (€)"
              value={formData.promoPrice}
              onChange={handleInputChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { AddProduct };
