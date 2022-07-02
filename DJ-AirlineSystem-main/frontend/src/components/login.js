import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1> Login </h1>
      <div>
        <Link to="/clientlogin">
          <button>Client</button>
        </Link>
        <Link to="/stafflogin">
          <button>Staff</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
