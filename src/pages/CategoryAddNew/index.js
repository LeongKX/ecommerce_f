import Header from "../../components/Header";
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import { isAdmin, getUserToken } from "../../utils/api_user";
import { getCategories, addNewCategory, deleteCategory } from "../../utils/api";

function CategoriesAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleFormSubmit = async () => {
    if (!name) {
      toast.error("Please fill out all the required field");
    }
    const newCategoryData = await addNewCategory(name, token);
    if (newCategoryData) {
      const newData = await getCategories();
      setCategories(newData);
      // clear the input field
      setName("");
      toast.success("Category added successfully");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      const deleted = await deleteCategory(id, token);
      if (deleted) {
        const latestCategories = await getCategories();
        setCategories(latestCategories);
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <Container>
      <Header />
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" mb={4}>
            Categories
          </Typography>
          <Box mb={2} sx={{ display: "flex" }} gap={1}>
            <TextField
              label="Category Name"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {isAdmin(cookies) ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
              >
                ADD
              </Button>
            ) : null}
          </Box>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAdmin(cookies) && categories.length > 0 ? (
              categories.map((category) => {
                return (
                  <TableRow>
                    <TableCell value={category._id}>{category.name}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        LinkComponent={Link}
                        to={`/categories/${category._id}/edit`}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDelete(category._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableCell>No category found</TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
export default CategoriesAddNew;
