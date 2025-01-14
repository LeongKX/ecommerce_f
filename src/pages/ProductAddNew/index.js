import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { toast } from "sonner";
import Header from "../../components/Header";
import { addNewProduct } from "../../utils/api";
import { useCookies } from "react-cookie";
import { getUserToken } from "../../utils/api_user";
import ButtonUpload from "../../components/ButtonUpload";
import { isAdmin } from "../../utils/api_user";
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../constants";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { getCategories } from "../../utils/api";

function ProductAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    }

    //triger the API
    const newProductData = await addNewProduct(
      name,
      description,
      price,
      category,
      image,
      token
    );

    //check if the newProdcutsData exists or not
    if (newProductData) {
      //show success message
      toast.success("Product has been added successfully");
      //redirect back to home page
      navigate("/");
    }
  };

  const handleImageUpload = async (files) => {
    //trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    setImage(image_url);
  };

  return (
    <Container>
      <Header />
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" mb={4}>
            Add New Product
          </Typography>
          <Box mb={2}>
            <TextField
              label="Name"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              required
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              label="Price"
              required
              fullWidth
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="category"
                onChange={(event) => {
                  console.log(event.target.value);
                  setCategory(event.target.value);
                }}
                sx={{
                  width: "100%",
                }}
              >
                {categories.map((category) => {
                  return (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <ButtonUpload
              onFileUpload={(files) => {
                // handleImageUpload
                if (files && files[0]) {
                  handleImageUpload(files);
                }
              }}
            />
          </Box>
          {image !== "" ? (
            <>
              <div>
                <img
                  src={`${API_URL}/${image}`}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                  }}
                />
              </div>
              <button onClick={() => setImage("")}>Remove</button>
            </>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
export default ProductAddNew;
