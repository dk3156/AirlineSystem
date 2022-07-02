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
import myInitObject from "../components/staffstorage";


function Added() {
  const [flightData, setFlightData] = useState([]);

  const [formDetails, setDetails] = useState({
    airline_name: myInitObject.someProp,
  });
  
  useEffect(() => {
    async function sendRequest() {
      console.log(formDetails.airline_name);
      let res = await axios.post("http://localhost:3001/added", formDetails);
      res = res.data;
      console.log(res);
      let display = [];
      for (let i = 0; i < res.length; i++) {
        let flight_num = res[i].flight_num;
        let airline_name = res[i].airline_name;
        let dept_airport = res[i].dept_airport;
        let arr_airport = res[i].arr_airport;
        display.push([flight_num, airline_name, dept_airport, arr_airport]);
      }
      setFlightData(display);
    }
    sendRequest();
  }, []);
  return (
    <div>
      <h1> View added flights </h1>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell align="right">Airline</TableCell>
              <TableCell align="right">Departure Airport</TableCell>
              <TableCell align="right">Arrival Airport</TableCell>  
            </TableRow>
          </TableHead>
          <TableBody>
            {flightData.map((thisflight, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell aligh="right">{thisflight[0]} </TableCell>
                <TableCell align="right">{thisflight[1]}</TableCell>
                <TableCell align="right">{thisflight[2]}</TableCell>
                <TableCell align="right">{thisflight[3]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Link to="/staffhomepage">
          <button>Back to home</button>
        </Link>
        <br />
    </div>
  );
}

export default Added;
