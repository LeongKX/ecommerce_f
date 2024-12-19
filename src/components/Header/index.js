import React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Header() {
  const location = useLocation();

  // Conditionally change the title based on the current path
  const isCartPage = location.pathname === "/cart"; // assuming "/cart" is the cart page path
  const title = isCartPage ? "Cart" : "Ecommerce";

  return (
    <>
      <Box sx={{ textAlign: "center", p: 2, m: 0 }}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ textAlign: "center" }}>
          <Button variant="contained" component={Link} to="/">
            Home
          </Button>
          <Button variant="contained" component={Link} to="/products/addtocart">
            Cart
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default Header;
