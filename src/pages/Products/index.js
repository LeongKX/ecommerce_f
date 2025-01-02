import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Grid } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { getProducts, getCategories, deleteProduct } from "../../utils/api";
import Header from "../../components/Header";

function Ecommerce() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      console.log("CATEGORIES", data);
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    getProducts(category, page).then((data) => {
      // setAllProducts(data);
      console.log("PRODUCTS", data);
      setProducts(data);
      //   let categories = [];
      //   for (let each of data) {
      //     categories.push(each.category);
      //   }
      //   categories = new Array(...new Set(categories));
      //   setCategories(categories);
    });
  }, [category, setCategory, page]);

  // useEffect(() => {
  //   if (category) {
  //     let newProducts = allProducts.filter((each) => each.category === category);
  //     setProducts(newProducts);
  //   } else {
  //     setProducts(allProducts);
  //   }
  // }, [category, setCategory]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteProduct(id);
      if (deleted) {
        // get the latest products data from the API again
        const latestProducts = await getProducts(category, page);
        // update the products state with the latest data
        setProducts(latestProducts);
        // show success message
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Container>
      <Header />
      <Box sx={{ flexGrow: 1, pb: 2 }}>
        <AppBar
          position="static"
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Products
            </Typography>
            <Button
              LinkComponent={Link}
              to="/products/new"
              variant="contained"
              color="success"
            >
              Add New
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid key={product._id} item size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="space-between"
                  >
                    <Chip
                      color="primary"
                      size="small"
                      label={`$${product.price}`}
                    />
                    <Chip size="small" label={product.category} />
                  </Stack>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ mb: 1 }}
                    fullWidth
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </Button>
                  <Stack
                    direction="row"
                    spacing={5}
                    justifyContent="space-between"
                  >
                    <Button
                      variant="contained"
                      color="info"
                      fullWidth
                      sx={{ borderRadius: "50px" }}
                      LinkComponent={Link}
                      to={`/products/${product._id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      sx={{ borderRadius: "50px" }}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="body1" align="center">
                  No product found.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          padding: "20px 0 40px 0",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        <span>Page {page}</span>
        <Button
          variant="contained"
          color="secondary"
          disabled={products.length === 0 ? true : false}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default Ecommerce;
