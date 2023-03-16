import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { Product, productByIdAtomFamily } from "../../state";

interface Props {
  open: boolean;
  handleClose: () => void;
  productId?: string;
}

const DeleteRule = ({ open, productId, handleClose }: Props) => {
  const [product, updateProduct] = useAtom(productByIdAtomFamily(productId));

  const handleConfirm = () => {
    updateProduct({
      ...(product as Product),
      specialPrice: undefined,
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "min(100%, 400px)" } }}
    >
      <DialogTitle>Delete Rule for {product?.name}</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this rule</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeleteRule };
