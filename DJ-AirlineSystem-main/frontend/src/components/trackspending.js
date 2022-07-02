import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Home from "../components/home";
import myInitObject from "../components/storage";

function TrackSpending(){
const [details, setDetails] = useState({
  email: myInitObject.someProp,
  date_begin: "",
  date_end: "",
});
const [monthlyspending, setSpending] = useState([]);
let month_now = [];
let date_now = new Date();
console.log(date_now);


async function getSpending(details){
  
  let result = [];
  let start;
  let end;
  if (details.date_begin == "" && details.date_end == "") {
    end = date_now.getMonth() + 1;
    start = end - 5;
    if (start <= 0) {
      if (start == 0) {
        start = 12;
      } else {
        start = 12 + start;
      }
    }
  } else {
    start = parseInt(details.date_begin.split("T")[0].split("-")[1]);
    end = parseInt(details.date_end.split("T")[0].split("-")[1]); 
  }
  if (start > end) {
    for (let i = start; i <= 12; i++) {
      month_now.push(i);
    }
    for (let j = 1; j <= end; j++) {
      month_now.push(j);
    }
  } else {
    for (let i = start; i <= end; i++) {
      month_now.push(i);
    }
  }
  let display = await axios.post("http://localhost:3001/getspending", details);
  display = display.data;
  for (let j = 0; j < month_now.length; j++) {
    let monthly_spend = 0;
      for (let i = 0; i < display.length; i++) {
        const { purchase_date, sold_price } = display[i];
        let month = purchase_date.split("T")[0].split("-")[1];
        console.log("query: month", month);
        if (month == month_now[j]) {
          monthly_spend += sold_price;
        }
      }
      result.push([month_now[j], monthly_spend]);
    }
    for (let i = 0; i < result.length; i++) {
      console.log("monthly spent", result[i]);
    }
    setSpending(result);
}

  return (
      <div className = "card">
      <h1>My flight spending</h1>
      <br/>
      <div className="form-group">
        <label htmlFor="date_begin"> Enter Start Date</label>
        <input
          type="text"
          name="date_begin"
          id="date_begin"
          onChange={(e) => setDetails({ ...details, date_begin: e.target.value })
        }
        />
      </div>
      <br/>
      <div className="form-group">
        <label htmlFor="date_end"> Enter End Date</label>
        <input
          type="text"
          name="date_end"
          id="date_end"
          onChange={(e) => setDetails({ ...details, date_end: e.target.value })}
        />
      </div>
      <br></br>
      <button className="button" onClick={() => getSpending(details)}>
        {" "} Display monthly spendng{" "}
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Month</TableCell>
              <TableCell align="right">Spending</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyspending.map((month, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{month[0]}</TableCell>
                <TableCell align="right">{month[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/clienthomepage">
        <button> Go to Home </button>
      </Link>
      <br></br>
    </div>
  );
}

export default TrackSpending;