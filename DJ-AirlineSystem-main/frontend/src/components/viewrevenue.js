import React, { useEffect, useState, useContext, cloneElement } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import myInitObject from "../components/staffstorage";

function ViewRevenue() {
  const [flightData, setFlightData] = useState([]);
  const [flightData2, setFlightData2] = useState([]);
  const [details, setDetails] = useState({
    airline_name: myInitObject.someProp,
  });

  useEffect(() => {
    async function fetchData() {
      let display = await axios.post(
        "http://localhost:3001/monthrevenue",
        details
      );

      display = display.data;
      console.log(display);
      let totalrev = 0;
      for (let i = 0; i < display.length; i++) {
        totalrev += display[i].sold_price;
      }
      setFlightData(totalrev);
    }
    fetchData();

    async function fetchData2() {
        let display = await axios.post(
          "http://localhost:3001/yearrevenue",
          details
        );
  
        display = display.data;
        console.log(display);
        let totalrev = 0;
        for (let i = 0; i < display.length; i++) {
          totalrev += display[i].sold_price;
        }
        setFlightData2(totalrev);
      }
      fetchData2();
  }, []);
  return (
    <div>
    <h1> View Revenue Last Year</h1>
      <div>Revenue = {flightData} $</div>
      <br></br>
      <div>
      <h1> View Revenue Last Month</h1>
      <div>Revenue = {flightData2} $</div>
      <br></br>
      </div>
      <br />
    <Link to="/staffhomepage">
        <button>Go to home</button>
      </Link>
      <br />
  </div>

  );
}

export default ViewRevenue;