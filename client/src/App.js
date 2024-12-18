import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Cart from "./components/Cart";
import OrderConfirmationPage from "./components/Confirmation";
import OrderSummaryPage from "./components/Summary";
// import CheckoutPage from "./pages/CheckoutPage";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.css";

// Component to manage conditional NavBar and Footer rendering
const Layout = ({ children }) => {
    const location = useLocation();

    // Conditionally render NavBar and Footer based on current route
    const showHeaderFooter = !["/login", "/register"].includes(location.pathname);

    return (
        <>
            {showHeaderFooter && <NavBar />}
            {children}
            {showHeaderFooter && <Footer />}
        </>
    );
};

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/summary" element={<OrderSummaryPage />} />
                    {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
