import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddAirport() {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    code: "",
    airport_name: "",
    city: "",
  });

  if (localStorage.getItem("loggedIn") === "false") {
    console.log("not logged in!");
    alert("you are not logged in");
    navigate("/home");
    return (
      <Link to="/home">
        <button className="btn">Go back to Home</button>
      </Link>
    );
  }

  async function addairport(details) {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }
    let display= await axios.post("http://localhost:3001/addairport", details);
    display = display.data;
    if (display){
        alert("Successfully added");
    } else {
        alert("Cannot add airplane");
    }
  }

  return (
    <div >
      <h1>Add a new airport </h1>
      <div>
        <div>
          <div>
            <label> Airport Code: </label>
            <input
              type="text"
              name="airplane_id"
              id="airplane_id"
              onChange={(e) =>
                setDetails({ ...details, code: e.target.value })
              }
              value={details.code}
            />
          </div>
        </div>
        <br/>
        <div>
            <label> Airport Name: </label>
            <input
              type="text"
              name="airplane_id"
              id="airplane_id"
              onChange={(e) =>
                setDetails({ ...details, airport_name: e.target.value })
              }
              value={details.airport_name}
            />
          </div>
          <br/>
        <div>
          <label> City: </label>
          <input
            type="text"
            name="airplane_id"
            id="airplane_id"
            onChange={(e) =>
              setDetails({ ...details, city: e.target.value })
            }
            value={details.city}
          />
          <br/>
          <br/>
           <button onClick={() => addairport(details)}> 
          {" "}
          Submit{" "}
        </button>
        <Link to="/staffhomepage">
          <button>Back to home</button>
        </Link>
        </div>
        </div>
    </div>
  );
}

export default AddAirport;