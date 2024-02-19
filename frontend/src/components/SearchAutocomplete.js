import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";

export default function SearchAutocomplete({ onSearchChange }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue) {
        try {
          const response = await axios.get(
            `${API_ENDPOINTS.SEARCH_CUSTOMER_TIRES}?q=${inputValue}`
          );
          setOptions(response.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setOptions([]);
        }
      }
    };

    fetchData();
  }, [inputValue]);

  return (
    <Autocomplete
      disablePortal
      id="search-autocomplete"
      options={options}
      sx={{ width: "240px" }}
      getOptionLabel={(option) => option.customerName} // Removed tireSize from the label
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Customers/Tires"
          variant="outlined"
        />
      )}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_, newValue) => {
        setInputValue(""); // Clear the input
        if (newValue && typeof onSearchChange === "function") {
          onSearchChange(newValue.customerName); // Trigger search based on customerName
        }
      }}
      inputValue={inputValue} // Control the input value to clear it upon selection
    />
  );
}
