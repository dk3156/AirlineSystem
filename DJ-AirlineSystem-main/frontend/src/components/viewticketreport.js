import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import myInitObject from "../components/staffstorage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ViewTicketReport() {
  const [flightData, setFlightData] = useState([]);

  const [details, setDetails] = useState({
    airline_name: myInitObject.someProp,
  });

  useEffect(() => {
    async function fetchData() {
      let display = await axios.post(
        "http://localhost:3001/ticketreport",
        details
      );

      display = display.data;
      console.log(display);
      let results = [];
      for (let i = 0; i < display.length; i++) {
        let result = [
          display[i].ID, //0
          display[i].airline_name,
          display[i].card_number,
          display[i].card_type,
          display[i].cust_email,
          display[i].exp_date.split("T")[0],
          display[i].flight_num,
          display[i].name_on_card,
          display[i].purchase_date.split("T")[0],
          display[i].purchase_time,
          display[i].sold_price,
        ];
        results.push(result);
      }
      setFlightData(results);
      console.log(results);
    }
    fetchData();
  }, []);
  return (
    <div>
    <h1> View last month's tickets</h1>
    <br></br>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Ticket ID</TableCell>
            <TableCell align="right">Airline</TableCell>
            <TableCell align="right">Card num</TableCell> 
            <TableCell align="right">Card type</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Exp date</TableCell>  
            <TableCell align="right">Flight num</TableCell>
            <TableCell align="right">Name on card</TableCell>
            <TableCell align="right">Purchase date</TableCell>
            <TableCell align="right">Purchase time</TableCell>  
            <TableCell align="right">Sold price</TableCell>
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
              <TableCell aligh="right">{thisflight[4]} </TableCell>
              <TableCell align="right">{thisflight[5]}</TableCell>
              <TableCell align="right">{thisflight[6]}</TableCell>
              <TableCell align="right">{thisflight[7]}</TableCell>
              <TableCell align="right">{thisflight[8]}</TableCell>
              <TableCell align="right">{thisflight[9]}</TableCell>
              <TableCell align="right">{thisflight[10]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <Link to="/staffhomepage">
        <button>Go to home</button>
      </Link>
      <br />
  </div>
  );
}

export default ViewTicketReport;