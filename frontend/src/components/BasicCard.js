import * as React from "react";
//import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ data }) {
  return (
    <Card sx={{ minWidth: 275, mb: 2, overflow: "hidden" }} elevation={0}>
      {" "}
      {/* Add margin for spacing between cards */}
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Customer Name
        </Typography>
        <Typography variant="h5" component="div">
          {data.customerName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.tireBrand}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Tire Size: {data.tireSize}
          <br />
          Location Note: {data.locationNote}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
