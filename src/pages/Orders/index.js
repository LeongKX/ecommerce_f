import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { getUserToken, isUserLoggedIn } from "../../utils/api_user";
import Header from "../../components/Header";
import { getOrders, deleteOrder, updateOrder } from "../../utils/api_orders";
import { isAdmin } from "../../utils/api_user";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

  useEffect(() => {
    getOrders(token).then((data) => {
      setOrders(data);
    });
  }, []);

  useEffect(() => {
    if (!isUserLoggedIn(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleStatusUpdate = async (_id, status) => {
    const updatedOrder = await updateOrder(_id, status, token);
    if (updatedOrder) {
      // fetch the updated orders from API
      const updatedOrders = await getOrders(token);
      setOrders(updatedOrders);
      toast.success("Order status has been updated");
    }
  };

  const handleOrderDelete = async (_id) => {
    const response = await deleteOrder(_id, token);
    console.log(response);
    if (response && response.status === "success") {
      // fetch the updated orders from API
      const updatedOrders = await getOrders(token);
      setOrders(updatedOrders);
      toast.success("Order has been deleted");
    }
  };
  return (
    <Container>
      <Header title="My Orders" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Info</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <strong>{order.customerName}</strong>
                    <br />
                    <small>{order.customerEmail}</small>
                  </TableCell>
                  <TableCell>
                    {order.products.map((product) => (
                      <div key={product._id}>{product.name}</div>
                    ))}
                  </TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      {isAdmin(cookies) ? (
                        order.status === "pending" ? (
                          <Select value={order.status} disabled={true}>
                            <MenuItem value="pending">Pending</MenuItem>
                          </Select>
                        ) : (
                          <Select
                            value={order.status}
                            onChange={(event) => {
                              handleStatusUpdate(order._id, event.target.value);
                            }}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                            <MenuItem value="failed">Failed</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                          </Select>
                        )
                      ) : (
                        order.status
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {order.paid_at ? order.paid_at : "Not Paid"}
                  </TableCell>
                  <TableCell>
                    {isAdmin(cookies) && order.status === "pending" ? (
                      <Button
                        variant="contained"
                        color="error"
                        disabled={order.status !== "pending"}
                        onClick={() => {
                          handleOrderDelete(order._id);
                        }}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;
