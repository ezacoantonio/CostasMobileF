import React from "react";
import Navbar from "./Navbar"; // Ensure the path is correct based on your project structure
import BasicSpeedDial from "./SpeedDial"; // Ensure the path is correct
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BasicTable from "./BasicTable"; // Ensure the path is correct

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Costas Tire Inventory
        </Typography>
        <BasicTable />
      </Container>
      <BasicSpeedDial />
    </Box>
  );
}

export default HomePage;
