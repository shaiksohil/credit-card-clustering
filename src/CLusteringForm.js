import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const ClusteringForm = () => {
    const [formData, setFormData] = useState({
        balance: "",
        purchases: "",
        creditLimit: "",
        payments: "",
        tenure: "",
    });
    const [cluster, setCluster] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        // Validate inputs
        const values = Object.values(formData).map((v) => parseFloat(v));
        if (values.some((v) => isNaN(v) || v <= 0)) {
            setError("All inputs must be positive numbers.");
            return;
        }
    
        try {
            const response = await axios.post("http://backend-url/predict", {
                features: values,
            });
            setCluster(response.data.cluster);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Credit Card Clustering
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Balance"
                            name="balance"
                            value={formData.balance}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Purchases"
                            name="purchases"
                            value={formData.purchases}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Credit Limit"
                            name="creditLimit"
                            value={formData.creditLimit}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Payments"
                            name="payments"
                            value={formData.payments}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Tenure"
                            name="tenure"
                            value={formData.tenure}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
                {cluster !== null && (
                    <Typography variant="h6" color="success.main" sx={{ marginTop: 2 }}>
                        Cluster: {cluster}
                    </Typography>
                )}
                {error && (
                    <Typography variant="h6" color="error" sx={{ marginTop: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default ClusteringForm;