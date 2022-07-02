import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Home from "./home";

function StaffRegister(props) {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    password: "",
    airline_name: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
  });

  async function Login() {
    let res = await axios.post("http://localhost:3001/staffregister", details);
    res = res.data;
    console.log(res); 
    if (res) {
      console.log("successfully registered");
      navigate("/stafflogin");
    }
  }

  return (
    <div>
      <h2>Staff register</h2>
      <div>
        <label htmlFor="name"> name: </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          value={details.name}
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
      <br />
      <div>
        <label htmlFor="airline_name"> Airline name: </label>
        <input
          type="text"
          name="airline_name"
          id="airline_name"
          onChange={(e) =>
            setDetails({ ...details, airline_name: e.target.value })
          }
          value={details.airline_name}
        />
      </div>
      <br />
      <div>
        <label htmlFor="first_name"> First name: </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          onChange={(e) =>
            setDetails({ ...details, first_name: e.target.value })
          }
          value={details.first_name}
        />
      </div>
      <br />
      <div>
        <label htmlFor="last_name"> Last name: </label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          onChange={(e) => setDetails({ ...details, last_name: e.target.value })}
          value={details.last_name}
        />
      </div>
      <br />
      <div>
        <label htmlFor="date_of_birth"> Date of Birth: </label>
        <input
          type="text"
          name="date_of_birth"
          id="date_of_birth"
          onChange={(e) => setDetails({ ...details, date_of_birth: e.target.value })}
          value={details.date_of_birth}
        />
      </div>
      <br></br>

      <button className="btn" onClick={Login}>
        {" "}
        Register{" "}
      </button>

      <Link to="/home">
        <button className="btn" onClick={Home}>
          {" "}
          Back to Home{" "}
        </button>
      </Link>
    </div>
  );
}

export default StaffRegister;
