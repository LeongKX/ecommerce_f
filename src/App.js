import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Ecommerce from "./pages/Products";
import ProductAddNew from "./pages/ProductAddNew";
import ProductEdit from "./pages/ProductEdit";
import AddToCart from "./pages/AddToCart";

import "./global.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ecommerce />} />
          <Route path="/products/new" element={<ProductAddNew />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/products/addtocart" element={<AddToCart />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right"></Toaster>
    </div>
  );
}

export default App;
