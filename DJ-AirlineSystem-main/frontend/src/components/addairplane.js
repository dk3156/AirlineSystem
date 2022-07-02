import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddAirplane() {
  

  const [details, setDetails] = useState({
    airplane_id: "",
    airline_name: "",
    seat_num: "",
    age_plane: "",
    manu_comp: "",
  });

  let navigate = useNavigate();
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

  async function addairplane(details) {
    for (const item in details) {
      if (details[item] === "") {
        alert("Please fill in all the fields");
        return;
      }
    }
    let display= await axios.post("http://localhost:3001/addairplane", details);
    display = display.data;
    if (display){
        alert("Successfully added");
        navigate("/added")
    } else {
        alert("Cannot add airplane");
    }
  }

  return (
    <div >
      <h1>Add a new airplane </h1>
      <div>
        <div>
          <div>
            <label> Airplane ID: </label>
            <input
              type="text"
              name="airplane_id"
              id="airplane_id"
              onChange={(e) =>
                setDetails({ ...details, airplane_id: e.target.value })
              }
              value={details.airplane_id}
            />
          </div>
        </div>
        <br/>
        <div>
          <label> Airline Name: </label>
          <input
            type="text"
            name="airplane_id"
            id="airplane_id"
            onChange={(e) =>
              setDetails({ ...details, airline_name: e.target.value })
            }
            value={details.airline_name}
          />
        </div>
        <br/>
        <div>
          <label> Seat Number: </label>
          <input
            type="text"
            name="airplane_id"
            id="airplane_id"
            onChange={(e) =>
              setDetails({ ...details, seat_num: e.target.value })
            }
            value={details.seat_amt}
          />
        </div>
        <br/>
        <div>
          <label> Plane Age: </label>
          <input
            type="text"
            name="airplane_id"
            id="airplane_id"
            onChange={(e) =>
              setDetails({ ...details, age_plane: e.target.value })
            }
            value={details.age_plane}
          />
        </div>
        <br/>
        <div>
          <label> Manufacturing Company: </label>
          <input
            type="text"
            name="airplane_id"
            id="airplane_id"
            onChange={(e) =>
              setDetails({ ...details, manu_comp: e.target.value })
            }
            value={details.manu_comp}
          />
        </div>
        <br/>
        <button onClick={() => addairplane(details)}> 
          {" "}
          Submit{" "}
        </button>
        <Link to="/staffhomepage">
          <button>Back to home</button>
        </Link>
      </div>
    </div>
  );
}

export default AddAirplane;