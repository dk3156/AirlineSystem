import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import flight_info from "../components/flightstorage";
import Home from "../components/home";

function ClientSearch() {
  const [details, setDetails] = useState({
    sourceCity: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
  });
  const [flightData, setFlightData] = useState([]);

  async function SearchResult(details) {
    let display = await axios.post(
      "http://localhost:3001/publicsearch",
      details
    );
    display = display.data;
    let results = [];
    for (let i = 0; i < display.length; i++) {
      if (
        display[i].arr_date.split("T")[0] == details.arrivalDate &&
        display[i].dept_date.split("T")[0] == details.departureDate
      ) {
        let result = [];
        let thisflight = display[i];
        flight_info.airline_name = thisflight.airline_name;
        flight_info.flight_num = thisflight.flight_num;
        flight_info.sold_price = thisflight.base_price;
        // Object.freeze(flight_info);
        result = [
          thisflight.airline_name, // 0
          thisflight.arr_airport, // 1
          thisflight.dept_airport, // 2
          thisflight.dept_date, // 3
          thisflight.dept_time, // 4
          thisflight.arr_time, // 5
          thisflight.base_price, // 6
          thisflight.flight_num, // 7
        ];
        results.push(result);
      }
    }
    setFlightData(results);
  }

  return (
    <div>
      <h2>Search for flight</h2>
      <div>
        <label htmlFor="sourceCity"> Leaving from: </label>
        <input
          type="text"
          name="sourceCity"
          id="sourceCity"
          onChange={(e) =>
            setDetails({ ...details, sourceCity: e.target.value })
          }
          value={details.sourceCity}
        />
      </div>
      <br />
      <div>
        <label htmlFor="destination"> Going to: </label>
        <input
          type="text"
          name="destination"
          id="destination"
          onChange={(e) =>
            setDetails({ ...details, destination: e.target.value })
          }
          value={details.destination}
        />
      </div>
      <br />
      <div>
        <label htmlFor="departureDate"> Date of departure: </label>
        <input
          type="text"
          name="departureDate"
          id="departureDate"
          onChange={(e) =>
            setDetails({ ...details, departureDate: e.target.value })
          }
          value={details.departureDate}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Date of arrival: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, arrivalDate: e.target.value })
          }
          value={details.arrivalDate}
        />
      </div>
      <br></br>
      <button onClick={() => SearchResult(details)}> Show Results </button>
      <Link to="/home">
        <button onClick={Home}> Back to Home </button>
      </Link>
      <div>
        <br></br>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Flight Number</TableCell>
                <TableCell align="right">Departure Airport</TableCell>
                <TableCell align="right">Arrival Airport</TableCell>
                <TableCell align="right">Base Price</TableCell>
                <TableCell align="right">Departure Time</TableCell>
                <TableCell align="right">Arrival Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flightData.map((thisflight, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="thisflight">
                    {thisflight[0] + " " + thisflight[7]}
                  </TableCell>
                  <TableCell align="right">{thisflight[2]}</TableCell>
                  <TableCell align="right">{thisflight[1]}</TableCell>
                  <TableCell align="right">{thisflight[6]}</TableCell>
                  <TableCell align="right">{thisflight[4]}</TableCell>
                  <TableCell align="right">{thisflight[5]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br />
        <Link to="/purchaseticket">
          <button>Purchase tickets</button>
        </Link>
        <br />
    </div>
  );
}

export default ClientSearch;
