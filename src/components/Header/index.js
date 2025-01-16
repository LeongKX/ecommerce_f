import { Typography, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isUserLoggedIn } from "../../utils/api_user";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../utils/api_cart";
import { isAdmin, getCurrentUser } from "../../utils/api_user";

function Header(props) {
  const { title = "Welcome To My Store" } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["currentUser"]);
  const currentUser = getCurrentUser(cookies);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    //clear the cookies
    removeCookie("currentUser");
    //clear the cart
    clearCart();
    //redirect the user back to login page
    navigate("/login");
  };

  return (
    <Box
      sx={{
        padding: "40px 0 30px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #000",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Box display="flex" gap={2} sx={{ marginTop: 1 }}>
        <Button
          variant={location.pathname === "/" ? "contained" : "outlined"}
          color="primary"
          LinkComponent={Link}
          to="/"
          sx={{
            padding: "10px 20px",
          }}
        >
          Home
        </Button>

        <Button
          variant={location.pathname === "/cart" ? "contained" : "outlined"}
          color="primary"
          LinkComponent={Link}
          to="/cart"
          sx={{
            padding: "10px 20px",
          }}
        >
          Cart
        </Button>
        {isUserLoggedIn(cookies) ? (
          <Button
            variant={location.pathname === "/orders" ? "contained" : "outlined"}
            color="primary"
            LinkComponent={Link}
            to="/orders"
            sx={{
              padding: "10px 20px",
            }}
          >
            My Orders
          </Button>
        ) : null}

        {isAdmin(cookies) ? (
          <Button
            variant={
              location.pathname === "/categories/new" ? "contained" : "outlined"
            }
            color="primary"
            LinkComponent={Link}
            to="/categories/new"
            sx={{
              padding: "10px 20px",
            }}
          >
            Categories
          </Button>
        ) : null}
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto ",
            alignItems: "center",
          }}
          gap={2}
        >
          {isUserLoggedIn(cookies) ? (
            <>
              <Typography>Current User:{currentUser.name}</Typography>
              <Button
                variant={"outlined"}
                color="primary"
                sx={{
                  padding: "10px 20px",
                  marginLeft: "auto",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={
                  location.pathname === "/login" ? "contained" : "outlined"
                }
                color="primary"
                LinkComponent={Link}
                to="/login"
                sx={{
                  padding: "10px 20px",
                }}
              >
                Login
              </Button>
              <Button
                variant={
                  location.pathname === "/signup" ? "contained" : "outlined"
                }
                color="primary"
                LinkComponent={Link}
                to="/signup"
                sx={{
                  padding: "10px 20px",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
