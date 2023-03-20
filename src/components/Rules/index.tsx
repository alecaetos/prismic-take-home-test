import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { productsAtom } from "../../state";
import { DeleteRule } from "../DeleteRule";
import { EditRule } from "../EditRule";
import { Toolbar } from "./Toolbar";

const Rules = () => {
  const products = useAtomValue(productsAtom);
  const [editingProductId, setEditingProductId] = useState<string>();
  const [productToDelete, setProductToDelete] = useState<string>();

  const handleEditProduct = useCallback((id: string) => {
    setEditingProductId(id);
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    setProductToDelete(id);
  }, []);

  const rows: GridRowsProp<{ id: string; products: string; rules?: string }> =
    useMemo(
      () =>
        products.map(({ id, name, specialPrice }) => ({
          id,
          products: name,
          rules: specialPrice
            ? `x ${specialPrice.quantity} = ${specialPrice.price} €`
            : undefined,
        })),
      [products]
    );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "products", headerName: "Products", width: 150 },
      {
        field: "rules",
        headerName: "Rules",
        width: 150,
        renderCell(params) {
          return params.value || <em>No discount rule</em>;
        },
      },
      {
        field: "actions",
        headerName: "",
        width: 150,
        type: "action",
        renderCell: (cell) => {
          const product = products.find((product) => product.id === cell.id)!;

          return (
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                onClick={() => handleEditProduct(product.id)}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [handleDeleteProduct, handleEditProduct, products]
  );

  return (
    <>
      <Box width="100%" textAlign="center">
        <Typography variant="h4" component="h1">
          Rules
        </Typography>
      </Box>
      <Container maxWidth="sm" sx={{ mb: 2, height: 400 }}>
        <DataGrid
          disableColumnMenu
          rows={rows}
          columns={columns}
          slots={{ toolbar: Toolbar }}
        />
      </Container>

      <EditRule
        open={!!editingProductId}
        productId={editingProductId}
        handleClose={() => setEditingProductId(undefined)}
      />

      <DeleteRule
        open={!!productToDelete}
        productId={productToDelete}
        handleClose={() => setProductToDelete(undefined)}
      />
    </>
  );
};

export { Rules };
