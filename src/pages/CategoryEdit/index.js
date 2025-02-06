import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { toast } from "sonner";

import { editCategory, getCategory } from "../../utils/api";
import { isAdmin, getUserToken } from "../../utils/api_user";
import Header from "../../components/Header";

function CategoryEdit() {
  const { id } = useParams();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    getCategory(id).then((categoryData) => {
      setLoading(false);
      setName(categoryData.name);
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      toast.error("Please fill out all the required field");
    } else {
      const updatedCategory = await editCategory(id, name, token);
      if (updatedCategory) {
        toast.success("Category has been edited successfully!");
        navigate("/categories/new");
      }
    }
  };

  return (
    <Container>
      <Header />
      <Card>
        {isAdmin(cookies) ? (
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Category
            </Typography>
            <Box mb={2}>
              <TextField
                label="Category"
                required
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSubmit}
            >
              Update
            </Button>
          </CardContent>
        ) : null}
      </Card>
    </Container>
  );
}
export default CategoryEdit;
