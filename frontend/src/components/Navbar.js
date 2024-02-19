import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SearchAutocomplete from "./SearchAutocomplete";
import axios from "axios";
import BasicCard from "./BasicCard";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = async (searchText) => {
    if (!searchText.trim()) {
      setSearchResults([]); // Clear results if search text is empty
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:2500/api/customer-tires/search?q=${searchText}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "white", color: "black", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: "flex",
              mr: 2,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="https://i.postimg.cc/Y96Wn3Lt/Costas-Logo.png"
              alt="Logo"
              style={{ height: "50px", marginTop: "7px" }}
            />
          </Typography>
          {/* Centered Title "Costas Mobile" */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              marginLeft: "10px",
            }}
          >
            Costas Mobile
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ p: 0 }} onClick={handleClickOpen} color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <SearchAutocomplete onSearchChange={handleSearchChange} />
          {searchResults.map((result) => (
            <BasicCard key={result._id} data={result} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
