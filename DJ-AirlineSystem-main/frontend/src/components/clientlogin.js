import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "../components/home";
import axios from "axios";
import myInitObject from "../components/storage";

function ClientLogin(props) {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  async function Login() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    let res = await axios.post("http://localhost:3001/clientlogin", details);
    res = res.data;
    console.log(res);
    const setLocalStorage = res ? true : false;
    localStorage.setItem("loggedIn", setLocalStorage);

    if (res) {
      console.log("you are logged in");
      navigate("/clienthomepage");
      myInitObject.someProp = details.email;
      // Object.freeze(myInitObject);
    } else {
      alert("wrong username or password");
    }
  }

  return (
    <div className="card">
      <div className="actions">
        <h2>Logging in as a client</h2>
        <div className="form-group">
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <br></br>

        <button className="btn" onClick={Login}>
          {" "}
          Login{" "}
        </button>

        <Link to="/home">
          <button className="btn" onClick={Home}>
            {" "}
            Go back to homepage{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ClientLogin;
