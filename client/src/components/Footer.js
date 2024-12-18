//Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ bgcolor: "#f8f8f8", p: 2, mt: 4, textAlign: "center" }}>
            <Typography variant="body2">&copy; 2024 Grocery Shop. All Rights Reserved.</Typography>
        </Box>
    );
};

export default Footer;
