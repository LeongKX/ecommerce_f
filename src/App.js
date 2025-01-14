import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";

import Ecommerce from "./pages/Products";
import ProductAddNew from "./pages/ProductAddNew";
import ProductEdit from "./pages/ProductEdit";
import AddToCart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentVerify from "./pages/PaymentVerify";
import Orders from "./pages/Orders";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CategoriesAddNew from "./pages/CategoryAddNew";
import CategoryEdit from "./pages/CategoryEdit";

import "./global.css";

function App() {
  return (
    <div className="App">
      {" "}
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Ecommerce />} />
            <Route path="/products/new" element={<ProductAddNew />} />
            <Route path="/products/:id/edit" element={<ProductEdit />} />
            <Route path="/cart" element={<AddToCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify-payment" element={<PaymentVerify />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/categories/new" element={<CategoriesAddNew />} />
            <Route path="/categories/:id/edit" element={<CategoryEdit />} />
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </CookiesProvider>
    </div>
  );
}

export default App;
