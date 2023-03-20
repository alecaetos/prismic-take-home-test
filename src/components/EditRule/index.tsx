import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAtom } from "jotai";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { Product, productByIdAtomFamily, SpecialPrice } from "../../state";

export interface Rule {
  id: string;
  product: string;
  price: number;
  quantity: number;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  productId?: string;
}

const DEFAULT_DATA = {
  quantity: 0,
  price: 0,
};

const EditRule = ({ open, productId, handleClose }: Props) => {
  const [product, updateProduct] = useAtom(productByIdAtomFamily(productId));
  const [formData, setFormData] = useState<SpecialPrice>(DEFAULT_DATA);

  const onClose = () => {
    setFormData(DEFAULT_DATA);
    handleClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProduct({
      ...(product as Product),
      specialPrice: {
        ...formData,
      },
    });
    onClose();
  };

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  useLayoutEffect(() => {
    setFormData(product?.specialPrice || DEFAULT_DATA);
  }, [product]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "min(100%, 400px)" } }}
    >
      <DialogTitle>Edit Rule for {product?.name}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            id="quantity"
            name="quantity"
            label="Rule Quantity"
            value={formData?.quantity}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            type="number"
            id="price"
            name="price"
            label="Rule Price"
            value={formData?.price}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Rule
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { EditRule };
