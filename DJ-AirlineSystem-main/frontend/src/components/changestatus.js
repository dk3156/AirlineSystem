import React, { useEffect, useState, useContext } from "react";
import { Link} from "react-router-dom";
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
    flight_status: "",
  });
  const [flightData, setFlightData] = useState([]);
  const [formDetails, setformDetails] = useState({
    airline_name: myInitObject.someProp,
    });

  if (localStorage.getItem("loggedIn") === "false") {
    console.log("not logged in!");
    alert("you are not logged in");
    navigate("/home");
    return (
      <Link to="/home">
        <button className="btn">Go back to Home</button>
      </Link>
    );
  }

  async function CreateFlightResult(details) {
    for (const item in details) {
        if (details[item] === "") {
          alert("Please fill in all the fields");
          return;
        }
      }

    let display = await axios.post(
      "http://localhost:3001/changestatus",
      details
    );
    display = display.data;
    if (display){
        alert("Status successfully changed");
    } else {
        alert("Cannot change status");
    }
    }


  return (
    <div>
      <h2>Change Status</h2>
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
        <label htmlFor="arrivalDate"> Change Status to: </label>
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

      <button onClick={() => CreateFlightResult(details)}> Submit </button>
      <br></br>
      <br></br>
      <Link to="/staffhomepage">
          <button>Go to home</button>
        </Link>
        <br />
      
    </div>
  );
}

export default CreateFlight;
