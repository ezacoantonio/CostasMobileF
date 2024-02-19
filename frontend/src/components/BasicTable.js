import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("http://localhost:2500/api/customer-tires");
        // Assuming result.data is an array of objects
        const sortedData = result.data.sort((a, b) => {
          // Assuming 'customerName' is the key you want to sort by
          return a.customerName.localeCompare(b.customerName);
        });
        setRows(sortedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditOpen = (row) => {
    setCurrentEdit(row);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEdit({ ...currentEdit, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:2500/api/customer-tires/${currentEdit._id}`,
        currentEdit
      );
      setSnackbarMessage("Customer updated successfully");
      setSnackbarSeverity("success");
      setEditOpen(false);
      setRows(
        rows.map((row) => (row._id === currentEdit._id ? currentEdit : row))
      );
    } catch (error) {
      console.error("Failed to update customer:", error);
      setSnackbarMessage("Failed to update customer");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:2500/api/customer-tires/${id}`);
        setSnackbarMessage("Customer deleted successfully");
        setSnackbarSeverity("success");
        setRows(rows.filter((row) => row._id !== id));
      } catch (error) {
        console.error("Failed to delete customer:", error);
        setSnackbarMessage("Failed to delete customer");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: 2, // Adjust margin as needed
          border: "1px solid black", // Add border
          borderRadius: "20px", // Rounded corners
          maxWidth: "calc(100% - 32px)", // Adjust max width as needed, considering the margin
        }}
      >
        <Table sx={{ minwidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold", // Make the header bold
                  backgroundColor: "lightgrey", // Add a light grey background
                }}
              >
                Customer Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold", // Make the header bold
                  backgroundColor: "lightgrey", // Add a light grey background
                }}
                align="right"
              >
                Tire Brand
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold", // Make the header bold
                  backgroundColor: "lightgrey", // Add a light grey background
                }}
                align="right"
              >
                Tire Size
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold", // Make the header bold
                  backgroundColor: "lightgrey", // Add a light grey background
                }}
                align="right"
              >
                Tire Set
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold", // Make the header bold
                  backgroundColor: "lightgrey", // Add a light grey background
                }}
                align="right"
              >
                Location Note
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold", // Make the header bold
                  backgroundColor: "lightgrey", // Add a light grey background
                }}
                align="right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.customerName}
                </TableCell>
                <TableCell align="right">{row.tireBrand}</TableCell>
                <TableCell align="right">{row.tireSize}</TableCell>
                <TableCell align="right">{row.tireSet}</TableCell>
                <TableCell align="right">{row.locationNote}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleEditOpen(row)}
                    color="primary"
                  >
                    <EditIcon sx={{ color: "black" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(row._id)}
                    color="secondary"
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="customerName"
            label="Customer Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentEdit.customerName}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="tireBrand"
            label="Tire Brand"
            type="text"
            fullWidth
            variant="outlined"
            value={currentEdit.tireBrand}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="tireSize"
            label="Tire Size"
            type="text"
            fullWidth
            variant="outlined"
            value={currentEdit.tireSize}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="tireSet"
            label="Tire Set"
            type="number"
            fullWidth
            variant="outlined"
            value={currentEdit.tireSet}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="locationNote"
            label="Location Note"
            type="text"
            fullWidth
            variant="outlined"
            value={currentEdit.locationNote}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
