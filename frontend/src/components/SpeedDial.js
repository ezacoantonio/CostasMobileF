import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { API_ENDPOINTS } from "../apiConfig";

export default function BasicSpeedDial() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [formData, setFormData] = useState({
    customerName: "",
    tireBrand: "",
    tireSize: "",
    tireSet: "",
    locationNote: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAddCustomer = async () => {
    try {
      await axios.post(API_ENDPOINTS.ADD_CUSTOMER_TIRE, formData);
      setSnackbarMessage("Customer added successfully!");
      setSnackbarSeverity("success");
      setOpenDialog(false);
    } catch (error) {
      setSnackbarMessage("Failed to add customer. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
      <SpeedDial
        ariaLabel="SpeedDial add customer"
        sx={{
          "& .MuiSpeedDial-fab": {
            bgcolor: "black",
            "&:hover": { bgcolor: "black" },
          },
        }}
        icon={<SpeedDialIcon icon={<AddIcon sx={{ color: "white" }} />} />}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Add Customer"
          onClick={handleClickOpen}
        />
      </SpeedDial>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            // Targeting the Dialog's Paper component
            border: "1px solid black",
            borderRadius: "15px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Customer</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              autoFocus
              margin="dense"
              id={key}
              label={
                key.charAt(0).toUpperCase() +
                key
                  .slice(1)
                  .replace(/([A-Z])/g, " $1")
                  .trim()
              }
              type={key === "tireSet" ? "number" : "text"}
              value={formData[key]}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddCustomer}>Add</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
