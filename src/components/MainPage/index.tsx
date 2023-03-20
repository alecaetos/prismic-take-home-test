import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { Navbar } from "../NavBar";
import { ProductList } from "../ProductsList";
import { Rules } from "../Rules";

function MainPage() {
  return (
    <Stack direction="column" gap={2}>
      <Navbar />
      <ProductList />
      <Divider />
      <Rules />
    </Stack>
  );
}

export { MainPage };
