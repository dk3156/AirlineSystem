import React from "react";
import { Link } from "react-router-dom";

function ClientHomePage() {
  return (
    <div>
      <h1> Customer Home Page </h1>
      <div>
        <Link to="/viewflight">
          <button>View my flights</button>
        </Link>
        <br />
        <br />
        <Link to="/clientsearch">
          <button>Search flight</button>
        </Link>
        <br />
        <br />
        <Link to="/rate">
          <button>Rate my flights</button>
        </Link>
        <br />
        <br />
        <Link to="/trackspending">
          <button>Track my spending</button>
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

export default ClientHomePage;
