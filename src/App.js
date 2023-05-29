import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MenuPage from "./Pages/MenuPage";
import AboutPage from "./Pages/AboutPage";
import BookPage from "./Pages/BookPage";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/book table" element={<BookPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
