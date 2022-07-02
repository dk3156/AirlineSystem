import React from "react";
import { Link } from "react-router-dom";

function StaffHomePage() {
  return (
    <div>
      <h1> Staff Home Page </h1>
      <div>
        <Link to="/staffviewflight">
          <button>View flights</button>
        </Link>
        <br />
        <br />
        <Link to="/createflight">
          <button>Create flight</button>
        </Link>
        <br />
        <br />
        <Link to="/changestatus">
          <button>Change flight status</button>
        </Link>
        <br />
        <br />
        <Link to="/addairplane">
          <button>Add an airplane</button>
        </Link>
        <br />
        <br />
        <Link to="/addairport">
          <button>Add an airport</button>
        </Link>
        <br />
        <br />
        <Link to="/viewflightrating">
          <button>View flight ratings</button>
        </Link>
        <br />
        <br />
        <Link to="/frequentcustomer">
          <button>View frequent customers</button>
        </Link>
        <br />
        <br />
        <Link to="/viewticketreport">
          <button>View ticket reports</button>
        </Link>
        <br />
        <br />
        <Link to="/viewrevenue">
          <button>View earned revenue</button>
        </Link>
        <br />
        <br />
        <Link to="/home">
          <button>Logout</button>
        </Link>
      </div>
      <br></br>
    </div>
  );
}

export default StaffHomePage;
