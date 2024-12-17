import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home"; // Add your home or main component
import Cart from "./components/Cart";
import OrderConfirmationPage from "./components/Confirmation";
import OrderSummaryPage from "./components/Summary";
import "./style.css";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/confirmation" element={<OrderConfirmationPage />} />
                <Route path="/summary" element={<OrderSummaryPage />} />
            </Routes>
        </Router>
    );
};

export default App;
