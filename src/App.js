import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Ecommerce from "./pages/Products";
import ProductAddNew from "./pages/ProductAddNew";
import ProductEdit from "./pages/ProductEdit";
import AddToCart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentVerify from "./pages/PaymentVerify";
import Orders from "./pages/Orders";

import "./global.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ecommerce />} />
          <Route path="/products/new" element={<ProductAddNew />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/verify-payment" element={<PaymentVerify />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right"></Toaster>
    </div>
  );
}

export default App;
