import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <h1> Register </h1>
      <div>
        <Link to="/clientregister">
          <button>Client</button>
        </Link>
        <Link to="/staffregister">
          <button>Staff</button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
