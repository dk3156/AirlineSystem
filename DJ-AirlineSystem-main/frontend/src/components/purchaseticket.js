import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import myInitObject from "../components/storage";
import flight_info from "../components/flightstorage";


function PurchaseTicket() {

  let [details, setDetails] = useState({
    name: "",
    card_number: "",
    card_type: "",
    exp_date: "",
    email: myInitObject.someProp,
    airline_name: flight_info.airline_name,
    flight_num: flight_info.flight_num,
    sold_price: flight_info.sold_price,
  });
  console.log(details.sold_price);

  function purchase(details) {
    console.log(details);
    axios.post("http://localhost:3001/purchaseticket", details);
  }

  return (
    <div>
      <h1>Purchase ticket </h1>
      <div>
        <label> Name on Card </label>
        <input type="text" name="name_on_card" onChange={(e) => setDetails({ ...details, name: e.target.value })} />
      </div>
      <br />
      <div>
        <label> Card Number </label>
        <input type="text" name="card_number" onChange={(e) => setDetails({ ...details, card_number: e.target.value })} />
      </div>
      <br />
      <div>
        <label> Card Type </label>
        <input type="text" name="card_type" onChange={(e) => setDetails({ ...details, card_type: e.target.value })} />
      </div>
      <br />
      <div>
        <label> Expiration Date </label>
        <input type="text" name="exp_date" onChange={(e) => setDetails({ ...details, exp_date: e.target.value })} />
      </div>
      <br />
      <button
        className="btn"
        onClick={() => {
          purchase(details);
        }}
      >
        Purchase Ticket
      </button>
      <br /><br />
      <Link to="/viewflight">
          <button>View my flights</button>
        </Link>
        <br />
      <div className="actions">
        <Link to="/clienthomepage">
          <button className="btn">Go to home</button>
        </Link>
        <br />
        
      </div>
    </div>
  );
}

export default PurchaseTicket;