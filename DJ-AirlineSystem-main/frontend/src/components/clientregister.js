import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Home from "./home";

function StaffRegister(props) {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    name: "",
    building: "",
    street: "",
    city: "",
    state: "",
    phone: "",
    passportnumber: "",
    passportexpire: "",
    passportcountry: "",
    birthday: "",
  });

  async function Login() {
    let res = await axios.post("http://localhost:3001/clientregister", details);
    res = res.data;
    console.log(res); 
    if (res) {
      console.log("successfully registered");
      navigate("/clientlogin");
    }
  }

  return (
    <div>
      <h2>Client register</h2>
      <div>
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
        <label htmlFor="name"> Full name: </label>
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
        <label htmlFor="building"> Building Number: </label>
        <input
          type="text"
          name="building"
          id="building"
          onChange={(e) => setDetails({ ...details, building: e.target.value })}
          value={details.building}
        />
      </div>
      <br />
      <div>
        <label htmlFor="street"> Street Name: </label>
        <input
          type="text"
          name="street"
          id="street"
          onChange={(e) => setDetails({ ...details, street: e.target.value })}
          value={details.street}
        />
      </div>
      <br />
      <div>
        <label htmlFor="city"> City: </label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={(e) => setDetails({ ...details, city: e.target.value })}
          value={details.city}
        />
      </div>
      <br />
      <div>
        <label htmlFor="state"> State: </label>
        <input
          type="text"
          name="state"
          id="state"
          onChange={(e) => setDetails({ ...details, state: e.target.value })}
          value={details.state}
        />
      </div>
      <br />
      <div>
        <label htmlFor="phone"> Cellphone Number: </label>
        <input
          type="text"
          name="phone"
          id="phone"
          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          value={details.phone}
        />
      </div>
      <br />
      <div>
        <label htmlFor="passportnumber"> Passport Number: </label>
        <input
          type="text"
          name="passportnumber"
          id="passportnumber"
          onChange={(e) =>
            setDetails({ ...details, passportnumber: e.target.value })
          }
          value={details.passportnumber}
        />
      </div>
      <br />
      <div>
        <label htmlFor="passportexpire"> Passport Expiration Date: </label>
        <input
          type="text"
          name="passportexpire"
          id="passportexpire"
          onChange={(e) =>
            setDetails({ ...details, passportexpire: e.target.value })
          }
          value={details.passportexpire}
        />
      </div>
      <br />
      <div>
        <label htmlFor="passportcountry"> Passport Issued Country: </label>
        <input
          type="text"
          name="passportcountry"
          id="passportcountry"
          onChange={(e) =>
            setDetails({ ...details, passportcountry: e.target.value })
          }
          value={details.passportcountry}
        />
      </div>
      <br />
      <div>
        <label htmlFor="birthday"> Date of Birth: </label>
        <input
          type="text"
          name="birthday"
          id="birthday"
          onChange={(e) => setDetails({ ...details, birthday: e.target.value })}
          value={details.birthday}
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
