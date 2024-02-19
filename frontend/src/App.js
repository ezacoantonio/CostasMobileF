import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BasicTable from "./components/BasicTable";
import axios from "axios";
import BasicSpeedDial from "./components/SpeedDial";
import { API_ENDPOINTS } from "./apiConfig";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchAllRecords(); // Call this when the component mounts to load all records initially
  }, []);

  const fetchAllRecords = async () => {
    try {
      const result = await axios(API_ENDPOINTS.FETCH_CUSTOMER_TIRES);
      setSearchResults(result.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Function to update search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Navbar onSearchResults={handleSearchResults} />
      <BasicTable rows={searchResults} />
      <BasicSpeedDial />
    </div>
  );
}

export default App;
