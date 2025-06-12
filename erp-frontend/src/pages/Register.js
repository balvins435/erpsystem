import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, MenuItem, Link } from "@mui/material";
import { registerUser } from "../api";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "Employee" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            setMessage("✅ Registration successful!");
            // Optional: Redirect to login page
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage(error.response?.data?.email || "❌ Error registering. Try again.");
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "5%" }}>
            <Paper elevation={5} style={{ padding: "20px", textAlign: "center", borderRadius: "10px" }}>
                <Typography variant="h4" gutterBottom>Register</Typography>
                {message && <Typography style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField label="Username" name="username" variant="outlined" fullWidth onChange={handleChange} style={{ marginBottom: "15px" }} />
                    <TextField label="Email" name="email" variant="outlined" fullWidth onChange={handleChange} style={{ marginBottom: "15px" }} />
                    <TextField label="Password" name="password" type="password" variant="outlined" fullWidth onChange={handleChange} style={{ marginBottom: "15px" }} />
                    <TextField label="Role" name="role" select variant="outlined" fullWidth onChange={handleChange} style={{ marginBottom: "15px" }}>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Finance_Manager">Finance Manager</MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                </form>

                {/* 👇 Add this login prompt here */}
                <Typography variant="body2" style={{ marginTop: "15px" }}>
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/login">
                        Log in here
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Register;
