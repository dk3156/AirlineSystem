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
import { useNavigate } from "react-router-dom";
import myInitObject from "../components/staffstorage";

function CreateFlight() {
    let navigate = useNavigate();
  const [details, setDetails] = useState({
    flight_num: "",
    airline_name: "",
    dept_airport: "",
    arr_airport: "",
    dept_date: "",
    dept_time: "",
    arr_date: "",
    arr_time: "",
    airplane_id: "",
    flight_status: "",
    base_price: "",
  });
  const [flightData, setFlightData] = useState([]);
  const [formDetails, setformDetails] = useState({airline_name: myInitObject.someProp,});

  useEffect(() => {
    async function sendRequest() {
      console.log(formDetails.airline_name);
      let res = await axios.post("http://localhost:3001/staffviewflight", formDetails);
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

  async function CreateFlightResult(details) {
    for (const item in details) {
        if (details[item] === "") {
          alert("Please fill in all the fields");
          return;
        }
      }
    console.log(details);
    let display = await axios.post(
      "http://localhost:3001/createflight",
      details
    );
    display = display.data;
    console.log(display);
    if (display){
        alert("Flight created successfully");
        navigate("/staffhomepage");
    } else {
        alert("Cannot create new flight");
    }
}


  return (
    <div>
      <h2>Create a new flight</h2>
      <div>
        <label htmlFor="sourceCity"> Flight Number: </label>
        <input
          type="text"
          name="sourceCity"
          id="sourceCity"
          onChange={(e) =>
            setDetails({ ...details, flight_num: e.target.value })
          }
          value={details.flight_num}
        />
      </div>
      <br />
      <div>
        <label htmlFor="destination"> Airline Name: </label>
        <input
          type="text"
          name="destination"
          id="destination"
          onChange={(e) =>
            setDetails({ ...details, airline_name: e.target.value })
          }
          value={details.airline_name}
        />
      </div>
      <br />
      <div>
        <label htmlFor="departureDate"> Departure Airport: </label>
        <input
          type="text"
          name="departureDate"
          id="departureDate"
          onChange={(e) =>
            setDetails({ ...details, dept_airport: e.target.value })
          }
          value={details.dept_airport}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Arrival Airport: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, arr_airport: e.target.value })
          }
          value={details.arr_airport}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Departure Date: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, dept_date: e.target.value })
          }
          value={details.dept_date}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Departure Time: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, dept_time: e.target.value })
          }
          value={details.dept_time}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Arrival Date: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, arr_date: e.target.value })
          }
          value={details.arr_date}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Arrival Time: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, arr_time: e.target.value })
          }
          value={details.arr_time}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Airplane ID: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, airplane_id: e.target.value })
          }
          value={details.airplane_id}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Flight Status: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, flight_status: e.target.value })
          }
          value={details.flight_status}
        />
      </div>
      <br />
      <div>
        <label htmlFor="arrivalDate"> Base Price: </label>
        <input
          type="text"
          name="arrivalDate"
          id="arrivalDate"
          onChange={(e) =>
            setDetails({ ...details, base_price: e.target.value })
          }
          value={details.base_price}
        />
      </div>
      <br></br>
      <button onClick={() => CreateFlightResult(details)}> Create </button>

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
          <button>Go to home</button>
        </Link>
        <br />
    </div>
  );
}

export default CreateFlight;
