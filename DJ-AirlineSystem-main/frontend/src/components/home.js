import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Home() {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // get the data from backend
      let display = await axios.get("http://localhost:3001/home");

      display = display.data;
      let results = [];
      // for each of the flights
      for (let i = 0; i < display.length; i++) {
        let result = [];
        let thisflight = display[i];
        result = [
          // the data we need
          thisflight.flight_num,
          thisflight.airline_name,
          thisflight.dept_airport,
          thisflight.arr_airport,
        ];
        // console.log(result);
        results.push(result);
      };
      setFlightData(results);
      // console.log(results);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <h1>Homepage </h1>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button> Register </button>
        </Link>
        <Link to="/publicsearch">
          <button>Public Search</button>
        </Link>
      </div>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell align="right">Departure Airport</TableCell>
              <TableCell align="right">Arrival Airport</TableCell>
              <TableCell align="right">Company</TableCell>
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
    </div>
  );
}

export default Home;
