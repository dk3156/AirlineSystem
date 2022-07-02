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
import Home from "../components/home";

function ViewFlightRating() {
  const [details, setDetails] = useState({
    airline_name: "",
    flight_num: "",
  });
  const [flightData, setFlightData] = useState([]);

  async function SearchResult(details) {
    let display = await axios.post(
      "http://localhost:3001/viewflightrating",
      details
    );
    display = display.data;
    let results = [];
    for (let i = 0; i < display.length; i++) {
        let email = display[i].email;
        let rating = display[i].rating;
        let comment = display[i].comment;
        results.push([email, rating, comment]);
    }
    setFlightData(results);
  }

  return (
    <div>
      <h2>View Flight's rating</h2>
      <div>
        <label> Airline Name: </label>
        <input
          type="text"
          name="airline_name"
          id="airline_name"
          onChange={(e) =>
            setDetails({ ...details, airline_name: e.target.value })
          }
          value={details.airline_name}
        />
      </div>
      <br />
      <div>
        <label htmlFor="destination"> Flight Number </label>
        <input
          type="text"
          name="airline_name"
          id="airline_name"
          onChange={(e) =>
            setDetails({ ...details, flight_num: e.target.value })
          }
          value={details.flight_num}
        />
      </div>
      <br></br>
      <button onClick={() => SearchResult(details)}> Show Results </button>
      <div>
        <br></br>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Customer's Email</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flightData.map((thisflight, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{thisflight[0]}</TableCell>
                  <TableCell align="right">{thisflight[1]}</TableCell>
                  <TableCell align="right">{thisflight[2]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br/>
        <Link to="/staffhomepage">
          <button>Go to Home</button>
        </Link>
        <br />
    </div>
  );
}

export default ViewFlightRating;
