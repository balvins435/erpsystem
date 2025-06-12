import { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const response = await axios.post("/auth/reset-password/", { email });
      setMessage(response.data.message || "✅ Reset link sent!");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "❌ Could not send reset link."
      );
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "5%" }}>
      <Paper
        elevation={5}
        style={{ padding: "20px", textAlign: "center", borderRadius: "10px" }}
      >
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enter your email below to receive a reset link.
        </Typography>

        {message && (
          <Typography
            style={{
              marginTop: "10px",
              color: message.includes("Error") ? "red" : "green",
            }}
          >
            {message}
          </Typography>
        )}

        <TextField
          label="Enter Your Email"
          variant="outlined"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "15px" }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleReset}
        >
          Send Reset Link
        </Button>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
