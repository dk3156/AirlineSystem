import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import Home from "./home";
import myInitObject from "../components/staffstorage";

function StaffLogin(props) {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  async function Login() {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }

    let res = await axios.post("http://localhost:3001/stafflogin", details);
    console.log(res.data);
    let loggedin = res.data.loggedin;
    let airlinename = res.data.airline_name;
    const setLocalStorage = loggedin ? true : false;
    localStorage.setItem("loggedIn", setLocalStorage);

    if (loggedin) {
      console.log("you are logged in");
      navigate("/staffhomepage");
      myInitObject.someProp = airlinename;
      console.log(myInitObject.someProp);
    } else {
      alert("wrong username or password");
    }
  }

  return (
    <div>
      <h2>Staff login</h2>
      <div>
        <label htmlFor="username"> Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setDetails({ ...details, username: e.target.value })}
          value={details.username}
        />
      </div>
      <br />
      <div>
        <label htmlFor="password"> Password: </label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
          value={details.password}
        />
      </div>
      <br></br>

      <button onClick={Login}> Login </button>

      <Link to="/home">
        <button onClick={Home}> Back to Home </button>
      </Link>
    </div>
  );
}

export default StaffLogin;
