import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import myInitObject from "../components/storage";
import Home from "../components/home";
import { Link } from "react-router-dom";
import Rate from "../components/rate";


function Review() {
    const [details, setDetails] = useState({
        email: myInitObject.someProp
      });
  console.log(details);
  const [flightData, setFlightData] = useState([]);
  
  useEffect(() => {
    async function getReview() {
        let display = await axios.post("http://localhost:3001/getreview", details);
            display = display.data;
            let results = [];
            // for each of the review
            for (let i = 0; i < display.length; i++) {
            display[i].dept_date = display[i].dept_date.split("T")[0];
            let result = [];
            let temp = display[i];
            result = [
                // the data we need
                temp.airline_name, //0
                temp.flight_num, //1
                temp.dept_date, //2
                temp.dept_time, //3
                temp.rating, //4
                temp.comment, //5
            ];
            console.log(result);
            results.push(result);
            }

            setFlightData(results);
      }
      getReview();
  }, []);
  
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Flight Number</TableCell>
              <TableCell align="right">Airline</TableCell>
              <TableCell align="right">Departure Date</TableCell>
              <TableCell align="right">Departure Time</TableCell>
              <TableCell align="right">rating</TableCell>
              <TableCell align="right">comment</TableCell>
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
                <TableCell align="right">{thisflight[3]}</TableCell>
                <TableCell align="right">{thisflight[4]}</TableCell>
                <TableCell align="right">{thisflight[5]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/clienthomepage">
        <button> Back to Home </button>
      </Link>
      <br></br>
      <Link to="/rate">
        <button onClick={Rate}> Back to previous page </button>
      </Link>
    </div>
  );
}

export default Review;
