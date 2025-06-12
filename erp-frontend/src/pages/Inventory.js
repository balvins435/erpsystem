import { useState, useEffect } from "react";
import {
    Container, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    Button, TextField, Grid, Box, Alert
} from "@mui/material";
import API from "../api";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", category: "", stock: "", price: "" });
    const [supplier] = useState("Best Suppliers Ltd");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState("");

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await API.get("/inventory/");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async () => {
        const { name, category, stock, price } = newProduct;
        if (!name || !category || stock === "" || price === "") {
            setAlert("⚠️ Please fill out all product fields.");
            return;
        }
        try {
            await API.post("/inventory/add/", {
                ...newProduct,
                stock: Number(stock),
                price: Number(price),
            });
            setAlert("✅ Product added successfully!");
            setNewProduct({ name: "", category: "", stock: "", price: "" });
            fetchInventory();
        } catch (error) {
            console.error("Error adding product:", error);
            setAlert("❌ Failed to add product.");
        }
    };

    const handleUpdateStock = async (id, change) => {
        const product = products.find(p => p.id === id);
        const newStock = product.stock + change;
        if (newStock < 0) {
            setAlert("⚠️ Stock cannot go below 0!");
            return;
        }

        try {
            await API.patch(`/inventory/update/${id}/`, { stock: change });
            setAlert(`✅ Stock updated for ${product.name}`);
            fetchInventory();
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    const handleProcurement = async (id, quantity) => {
        try {
            const product = products.find(p => p.id === id);
            await API.post("/procurement/", { product_id: id, quantity, supplier });
            setAlert(`📦 Procurement for ${product.name} (${quantity}) sent to ${supplier}`);
        } catch (error) {
            console.error("Error sending procurement request:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>📊 Inventory Management</Typography>

            {alert && <Alert severity="info" sx={{ mb: 2 }}>{alert}</Alert>}

            {/* Product Input Form */}
            <Box mb={4}>
                <Typography variant="h6" gutterBottom>Add New Product</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth label="Product Name" name="name" value={newProduct.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth label="Category" name="category" value={newProduct.category}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth label="Stock" name="stock" type="number" value={newProduct.stock}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth label="Price" name="price" type="number" value={newProduct.price}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleAddProduct}>
                            ➕ Add Product
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Product Inventory Table */}
            <Typography variant="h6" gutterBottom>📦 Product Inventory</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell><b>Category</b></TableCell>
                        <TableCell><b>Stock</b></TableCell>
                        <TableCell><b>Price</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id} style={{ backgroundColor: product.low_stock ? "#ffebee" : "inherit" }}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                                <Grid container spacing={1}>
                                    {product.low_stock && (
                                        <Grid item xs={12}>
                                            <Typography color="error" variant="body2">Low Stock!</Typography>
                                        </Grid>
                                    )}
                                    <Grid item>
                                        <Button
                                            size="small" color="secondary" variant="contained"
                                            onClick={() => handleUpdateStock(product.id, -1)}
                                        >
                                            -1
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            size="small" color="success" variant="contained"
                                            onClick={() => handleUpdateStock(product.id, 1)}
                                        >
                                            +1
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            size="small" color="warning" variant="contained"
                                            onClick={() => handleProcurement(product.id, 10)}
                                        >
                                            Procure 10
                                        </Button>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default Inventory;
