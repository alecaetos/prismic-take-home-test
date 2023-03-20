import { MouseEvent, useState } from "react";

import { useAtom, useAtomValue } from "jotai";

import { Delete, DeleteForever, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { basketAtom, totalPriceAtom, totalPriceSummaryAtom } from "../../state";

const TotalPrice = () => {
  const totalPrice = useAtomValue(totalPriceAtom);
  const priceSummary = useAtomValue(totalPriceSummaryAtom);

  return !!priceSummary.discounts.length ? (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography component="s" color="red">
        {priceSummary.totalPriceWithoutDiscount}€
      </Typography>
      <Typography variant="subtitle1">{totalPrice}€</Typography>
    </Stack>
  ) : (
    <Typography variant="subtitle1">{totalPrice}€</Typography>
  );
};

function Navbar() {
  const [basket, setBasket] = useAtom(basketAtom);
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);
  const priceSummary = useAtomValue(totalPriceSummaryAtom);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.target as HTMLAnchorElement);
  };

  const handleClearBasket = () => {
    setBasket([]);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveItemFromBasket = (productId: string) => {
    const itemToRemoveIndex = basket.findIndex((item) => item.id === productId);
    const newBasket = [...basket];
    newBasket.splice(itemToRemoveIndex, 1);
    setBasket(newBasket);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          gap={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Badge badgeContent={basket.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          Total: <TotalPrice />
        </Stack>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List sx={{ width: "300px", padding: 1 }}>
            {basket.length > 0 ? (
              basket.map((product, ix) => (
                <ListItem key={`${product.id}_${ix}`}>
                  <ListItemText
                    primary={product.name}
                    secondary={`${product.price}€`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveItemFromBasket(product.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography variant="subtitle1">No items in basket</Typography>
            )}
            <Divider />
            {!!priceSummary.discounts.length && (
              <ListItem>
                <ListItemText
                  primary="Discounts applied"
                  secondary={priceSummary.discounts.map((discount, ix) => (
                    <span style={{ display: "block" }} key={ix}>
                      {discount}
                    </span>
                  ))}
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemText primary="Total" />
              <TotalPrice />
            </ListItem>
            <Stack direction="row" gap={2}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{ whiteSpace: "nowrap" }}
              >
                Go to checkout
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="warning"
                endIcon={<DeleteForever />}
                sx={{ whiteSpace: "nowrap" }}
                onClick={handleClearBasket}
              >
                Clear basket
              </Button>
            </Stack>
          </List>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
