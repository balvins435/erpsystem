import { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2"; 
import { Chart, registerables } from "chart.js"; 
import API from "../api";  // ✅ Correct API import

Chart.register(...registerables);  // ✅ Register Chart.js scales globally

const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
        label: "Transactions",
        data: [50, 80, 120, 200, 250],
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        fill: true
    }]
};

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({ transactions: 0, approvals: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get("/dashboard-summary/", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to Your ERP Dashboard
                </Typography>
            </motion.div>

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Card elevation={5}>
                        <CardContent>
                            <Typography variant="h6">Transaction Trends</Typography>
                            <Line data={chartData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Card elevation={5}>
                            <CardContent>
                                <Typography variant="h6">Total Transactions</Typography>
                                <Typography variant="h4">{dashboardData.transactions}</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Card elevation={5}>
                            <CardContent>
                                <Typography variant="h6">Pending Approvals</Typography>
                                <Typography variant="h4">{dashboardData.approvals}</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
