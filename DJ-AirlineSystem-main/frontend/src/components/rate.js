import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import myInitObject from "../components/storage";
import Home from "../components/home";
import Review from "../components/review";

function Rate() {
  const email = myInitObject.someProp;
  console.log(email);
  const [details, setDetails] = useState({
    email,
    flightnum: "",
    airlinename: "",
    deptdate: "",
    depttime: "",
    rating: "",
    comment: "",
  });
  const [flightData, setFlightData] = useState([]);

  async function submitRating(details) {
    axios.post(
      "http://localhost:3001/ratemyflight",
      details
    );
  }

  return (
    <div>
      <h2>Rate my flight</h2>
      <div>
        <label htmlFor="flightnum"> Flight Number: </label>
        <input
          type="text"
          name="flightnum"
          id="flightnum"
          onChange={(e) =>
            setDetails({ ...details, flightnum: e.target.value })
          }
          value={details.flightnum}
        />
      </div>
      <br />
      <div>
        <label htmlFor="airlinename"> Airline name: </label>
        <input
          type="text"
          name="airlinename"
          id="airlinename"
          onChange={(e) =>
            setDetails({ ...details, airlinename: e.target.value })
          }
          value={details.airlinename}
        />
      </div>
      <br />
      <div>
        <label htmlFor="deptdate"> Departure date: </label>
        <input
          type="text"
          name="deptdate"
          id="deptdate"
          onChange={(e) =>
            setDetails({ ...details, deptdate: e.target.value })
          }
          value={details.deptdate}
        />
      </div>
      <br />
      <div>
        <label htmlFor="depttime"> Departure time: </label>
        <input
          type="text"
          name="depttime"
          id="depttime"
          onChange={(e) =>
            setDetails({ ...details, depttime: e.target.value })
          }
          value={details.depttime}
        />
      </div>
      <br />
      <div>
        <label htmlFor="rating"> Rating: </label>
        <input
          type="text"
          name="rating"
          id="rating"
          onChange={(e) =>
            setDetails({ ...details, rating: e.target.value })
          }
          value={details.rating}
        />
      </div>
      <br />
      <div>
        <label htmlFor="comment"> Comment: </label>
        <input
          type="text"
          name="comment"
          id="comment"
          onChange={(e) =>
            setDetails({ ...details, comment: e.target.value })
          }
          value={details.comment}
        />
      </div>
      <br></br>
      <button onClick={() => submitRating(details)}> Submit </button>
      <Link to="/clienthomepage">
        <button> Back to Home </button>
      </Link>
      <br></br>
      <Link to="/review">
        <button onClick={Review}> Go to Review </button>
      </Link>
      </div>
      
  );
}

export default Rate;
