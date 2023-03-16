import { AddShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { basketAtom, Product, productsAtom } from "../../state";

function ProductList() {
  const updateBasket = useSetAtom(basketAtom);
  const productsData = useAtomValue(productsAtom);

  const handleAddToBasket = (product: Product) => {
    updateBasket((prevBasket) => [...prevBasket, product]);
  };

  return (
    <>
      <Box width="100%" textAlign="center">
        <Typography variant="h4" component="h1">
          Products
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: "50%",
          }}
        >
          {productsData.map((product) => (
            <Grid item xs={6} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {product.price}€
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleAddToBasket(product)}
                    endIcon={<AddShoppingCart />}
                  >
                    Add
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export { ProductList };
