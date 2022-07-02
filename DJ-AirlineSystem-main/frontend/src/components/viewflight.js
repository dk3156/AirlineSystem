import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import myInitObject from "../components/storage";



function ViewFlight() {
  let navigate = useNavigate();
  const [flightData, setFlightData] = useState([]);

  const [formDetails, setDetails] = useState({
    email: myInitObject.someProp,
  });

  if (localStorage.getItem("loggedIn") === "false") {
    alert("please login");
    navigate("/home");
    return (
      <Link to="/home">
        <button className="btn">Home</button>
      </Link>
    );
  }
  
  async function sendRequest(formDetails) {
    let res = await axios.post("http://localhost:3001/viewflight", formDetails);
    res = res.data.flights;
    let display = [];
    for (let i = 0; i < res.length; i++) {
      const { airline_name, arr_airport, base_price, dept_airport } = res[i];
      display.push([airline_name, arr_airport, base_price, dept_airport]);
    }
    setFlightData(display);
  }
  sendRequest(formDetails);

  return (
    <div className="card">
      <h1> View My Flights </h1>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Airline</TableCell>
              <TableCell align="right">Base Price</TableCell>
              <TableCell align="right">Departure Airport</TableCell>
              <TableCell align="right">Arrival</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flightData.map((thisflight, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="thisflight">
                  {thisflight[0]}
                </TableCell>
                <TableCell align="right">{thisflight[2]}</TableCell>
                <TableCell align="right">{thisflight[3]}</TableCell>
                <TableCell align="right">{thisflight[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Link to="/clienthomepage">
          <button>Go to home</button>
        </Link>
        <br />
    </div>
  );
}

export default ViewFlight;
