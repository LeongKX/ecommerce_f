import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Grid } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from '@mui/material/Container';


import { getProducts } from "../utils/api";

function Ecommerce() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   getCategories().then((data) => {
  //     setCatagories(data);
  //   });
  // }, []);

  useEffect(() => {
    getProducts(category).then((data) => {
      setAllProducts(data);
      setProducts(data);
      let categories = [];
      for (let each of data) {
        categories.push(each.category);
      }
      categories = new Array(...new Set(categories));
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    if (category) {
      let newProducts = allProducts.filter((each) => each.category === category);
      setProducts(newProducts);
    } else {
      setProducts(allProducts);
    }
  }, [category, setCategory]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", p: 5, m: 0 }}>
        <Typography variant="h  4" component="h1">
          Ecommerce
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, pb: 3 }}>
        <AppBar
          position="static"
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Products
            </Typography>
            <Button variant="contained" color="success">
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
        {products.map(({ name, price, category }) => (
          <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="space-between"
                >
                  <Chip color="primary" size="small" label={`$${price}`} />
                  <Chip size="small" label={category} />
                </Stack>
              </Box>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" sx={{ mb: 1 }} fullWidth>
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
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    sx={{ borderRadius: "50px" }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default Ecommerce;
