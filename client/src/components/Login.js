import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password,
            });
            const token = response.data.token;
            console.log("token is:", token);
            // If login is successful
            if (response.data.success) {
                localStorage.setItem("token", token);
                const x = localStorage.getItem("token");
                console.log("here is my tokennn", x);
                navigate("/");
            }
            console.log(response.data);
            // Redirect to dashboard or home page, or save token to localStorage
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message); // Display error message from backend
            } else {
                setError("An error occurred");
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
