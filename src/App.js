import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MenuPage from "./Pages/MenuPage";
import AboutPage from "./Pages/AboutPage";
import BookPage from "./Pages/BookPage";
import CartPage from "./Pages/CartPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";

import AdminOrders from "./Pages/Admin/AdminOrders";
import AdminBooking from "./Pages/Admin/AdminBooking";
import Admin from "./Pages/Admin/Admin";

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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/adminorders" element={<AdminOrders />} />
        <Route path="/adminbooking" element={<AdminBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
