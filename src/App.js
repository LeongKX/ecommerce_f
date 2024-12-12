import { BrowserRouter, Routes, Route } from "react-router-dom";

import Ecommerce from "./pages";
import "./global.css";

function App() {
  return (
    <div className="Ecommerce App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ecommerce />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
