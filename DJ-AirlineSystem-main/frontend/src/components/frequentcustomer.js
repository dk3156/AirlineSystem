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


function FreqCust() {
  let navigate = useNavigate();
  const [flightData, setFlightData] = useState([]);

  const [formDetails, setDetails] = useState({
    airline_name: myInitObject.someProp,
  });

  useEffect(() => {
    async function sendRequest() {
        let res = await axios.post("http://localhost:3001/freqcust", formDetails);
        res = res.data;
        let display = [];
        for (let i = 0; i < res.length; i++) {
            let name = res[i].name;
            let email = res[i].email;
            display.push([name, email]);
          }
          setFlightData(display);
      }
      sendRequest();
  }, []);

  if (localStorage.getItem("loggedIn") === "false") {
    alert("please login");
    navigate("/home");
    return (
      <Link to="/home">
        <button className="btn">Home</button>
      </Link>
    );
  }
  

  return (
    <div className="card">
      <h1> View Frequent Customers </h1>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Customer Email</TableCell>
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

export default FreqCust;
