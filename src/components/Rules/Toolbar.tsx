import { Box, Button } from "@mui/material";
import { useState } from "react";
import { AddProduct } from "../AddProduct";

export const Toolbar = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Box padding={1} borderBottom="1px solid" borderColor="divider">
        <Button variant="outlined" onClick={() => setIsAddModalOpen(true)}>
          Add product
        </Button>
      </Box>

      <AddProduct
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
};
