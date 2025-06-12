import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../api";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';  // React Router v6+

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();  // <-- Initialize navigate here

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            localStorage.setItem("token", response.access);
            navigate("/dashboard");  
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "5%" }}>
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Paper elevation={5} style={{ padding: "20px", textAlign: "center", borderRadius: "10px" }}>
                    <Typography variant="h4" gutterBottom>Login</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            label="Username" 
                            name="username" 
                            variant="outlined" 
                            fullWidth 
                            onChange={handleChange}
                            style={{ marginBottom: "15px" }}
                        />
                        <TextField 
                            label="Password" 
                            name="password" 
                            type="password" 
                            variant="outlined" 
                            fullWidth 
                            onChange={handleChange}
                            style={{ marginBottom: "15px" }}
                        />
                        <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                        </motion.div>
                    </form>
                    <Typography 
                        variant="body2" 
                        style={{ marginTop: "10px", cursor: "pointer", color: "blue" }} 
                        onClick={() => navigate("/register")}
                    >
                        Don't have an account? Sign up here!
                    </Typography>
                    <Typography 
                        variant="body2" 
                        style={{ marginTop: "10px", cursor: "pointer", color: "blue" }} 
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </Typography>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Login;
