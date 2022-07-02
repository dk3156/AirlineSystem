const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const moment = require("moment");
const md5 = require("md5");

const db = mysql.createPool({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'airlinesystem',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/home", (req, res) => {
    let departDate = new Date();
    let future30 = new Date();
    departDate = moment(departDate).format("YYYY-MM-DD");
    future30 = moment(departDate).format("YYYY-MM-DD");
    future30 = moment(future30).add(30, "days");
    console.log(future30);
  
    db.query("SELECT * FROM Flight", (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => future30.diff(moment(row["dept_date"]), "days") < 30
        );
        res.send(filteredRows);
      } else {
        res.status(500).send(err);
        console.log(err);
      }
    });
  });

  app.post("/publicsearch", (req, res) => {
    const { destination, sourceCity, departureDate, arriveDate } = req.body;
    console.log(req.body);
    db.query(
      `SELECT * FROM Flight WHERE dept_airport='${sourceCity}' AND arr_airport ='${destination}'`,
      (err, result) => {
        res.send(result);
        console.log(result);
      }
    );
  });

  app.post("/clientregister", (req, res) => {
    const {
      email,
      password,
      name,
      building,
      street,
      city,
      state,
      phone,
      passportnumber,
      passportexpire,
      passportcountry,
      birthday,
    } = req.body;
    console.log(req.body);
    const hashedPassword = md5(password); 
    db.query(
      `INSERT INTO Customer 
      (email, password, name, building_num, street, city, state, phone_num, passport_num, passport_exp_date, passport_country, date_of_birth) 
      VALUES ('${email}', '${hashedPassword}', '${name}', '${building}', '${street}', '${city}', '${state}', '${phone}', '${passportnumber}', '${passportexpire}', '${passportcountry}', '${birthday}')`,
      (err, result) => {
        if(err){
          console.log(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );
  })

  app.post("/clientlogin", (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = md5(password); // hash the password
    console.log(req.body);
    db.query(
      `SELECT * FROM Customer WHERE email = '${email}'`, // find the client
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          console.log(result[0].password);
          console.log(hashedPassword);
          if (result[0].password === hashedPassword) {
            res.send(true);
          } else {
            console.log("wrong");
            res.status(500).send("Incorrect password");
          }
        }
        return;
      }
    );
  });
  
  app.post("/viewflight", (req, res) => {
    if (req.body.airline_name) {
      db.query(
        `SELECT *
          FROM Flight
          WHERE airline_name = ?
          AND flight_num IN
          (
              SELECT Ticket.flight_num
              FROM Ticket
              WHERE Ticket.ID IN
              (
                  SELECT Purchase.ticket_id
                  FROM Purchase
                  WHERE Purchase.email = ?
              )
          )`,
        [req.body.airline_name, req.body.email],
        (err, rows) => {
          if (!err) {
            console.log(rows);
            res.send({
              flights: rows,
            });
          } else {
            res.send(err);
            console.log(err);
          }
        }
      );
    } else {
      db.query(
        `SELECT *
          FROM Flight
          WHERE flight_num IN
          (
              SELECT Ticket.flight_num
              FROM Ticket
              WHERE Ticket.ID IN
              (
                  SELECT Purchase.ticket_id
                  FROM Purchase
                  WHERE Purchase.email = ?
              )
          )`,
  
        [req.body.email],
        (err, rows) => {
          if (!err) {
            res.send({
              flights: rows,
              cust_email: req.body.email,
            });
          } else {
            res.send(err);
            console.log(err);
          }
        }
      );
    }
  });

app.post("/staffregister", (req, res) => {
  const {
    name,
    password,
    airline_name,
    first_name,
    last_name,
    date_of_birth,
  } = req.body;
  console.log(req.body);
  const hashedPassword = md5(password); 
    db.query(
      `INSERT INTO Airline_Staff
      (airline_name, username, password, first_name, last_name, date_of_birth) 
      VALUES ('${airline_name}', '${name}', '${hashedPassword}', '${first_name}', '${last_name}', '${date_of_birth}')`,
      (err, result) => {
        if(err){
          console.log(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );
});

app.post("/stafflogin", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = md5(password); // hash the password
  console.log(req.body);
  db.query(
    `SELECT * FROM Airline_Staff WHERE username = '${username}'`, // find the client
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(result[0].password);
        console.log(hashedPassword);
        if (result[0].password === hashedPassword) {
          res.send({loggedin : true, airline_name: result[0].airline_name});
        } else {
          console.log("wrong");
          res.status(500).send("Incorrect password");
        }
      }
      return;
    }
  );
});

app.post("/ratemyflight", (req, res) => {
  const { email, flightnum, airlinename, deptdate, depttime, comment, rating } = req.body;
    db.query(
      `INSERT INTO Interact (email, flight_num, airline_name, dept_date, dept_time, comment, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [email, flightnum, airlinename, deptdate, depttime, comment, rating],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log("review successfully submitted");
      }
      return;
    }
    );
});

app.post("/getreview", (req, res) => {
  const email = req.body.email;
  db.query(`SELECT * FROM Interact WHERE email ='${email}'`, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      res.status(500).send(err);
      console.log(err);
    }
  });
});

app.post("/getspending", (req, res) => {
  console.log(req.body);
  if(req.body.date_begin == "" && req.body.date_end == ""){
    req.body.date_end = new Date();
    req.body.date_begin = req.body.date_end.getDate() - 183;
  }
  db.query(
    `SELECT * FROM Ticket WHERE ID IN (SELECT Ticket.ID FROM Ticket WHERE Ticket.ID IN (SELECT Purchase.ticket_id FROM Purchase WHERE email = ?)) AND purchase_date BETWEEN ? AND ?`,
      [req.body.email, req.body.date_begin, req.body.date_end],
      (err, result) => {
        if (!err) {
          res.send(result);
          console.log(result);
        } else {
          console.log(err);
        }
      }
  );
});

app.post("/purchaseticket", (req, res) => {
  console.log("this is purchase");
  console.log(req.body);
  let ticket_id = Math.floor(Math.random() * 10000);
  let purchase_date = new Date();
  let purchase_time = new Date();
  purchase_date = moment(purchase_date).format("YYYY-MM-DD");
  purchase_time = moment(purchase_time).format("HH:mm:ss");

  const {
    name,
    card_number,
    card_type,
    exp_date,
    email,
    airline_name,
    flight_num,
    sold_price,
  } = req.body;

  db.query(
    `INSERT INTO Ticket (name_on_card, card_number, card_type, exp_date, cust_email, airline_name, flight_num, sold_price, ID, purchase_date, purchase_time)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `,
    [ name,
      card_number,
      card_type,
      exp_date,
      email,
      airline_name,
      flight_num,
      sold_price,
      ticket_id,
      purchase_date,
      purchase_time,
    ],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          `INSERT INTO Purchase (email,ticket_id)
          values (?,?)`,
          [email, ticket_id],
          (err, rows) => {
            if (!err) {
              console.log("purchase successful")
            } else {
              res.send(err);
              console.log(err);
            }
          }
        );
      }
    }
  );
});

app.post("/staffviewflight", (req, res) => {
  console.log(req.body);
  const { airline_name } = req.body;
  let departDate = new Date();
    let future30 = new Date();
    departDate = moment(departDate).format("YYYY-MM-DD");
    future30 = moment(departDate).format("YYYY-MM-DD");
    future30 = moment(future30).add(30, "days");
  db.query(
    `SELECT * FROM Flight WHERE airline_name = '${airline_name}'`,
    (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => future30.diff(moment(row["dept_date"]), "days") < 30
        );
        res.send(filteredRows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/createflight", (req, res) => {
  console.log(req.body);
  db.query(
    `INSERT INTO Flight
  (flight_num, airline_name, dept_airport, arr_airport, dept_date, dept_time, arr_date, arr_time, airplane_id, flight_status, base_price)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.flight_num,
      req.body.airline_name,
      req.body.dept_airport,
      req.body.arr_airport,
      req.body.dept_date,
      req.body.dept_time,
      req.body.arr_date,
      req.body.arr_time,
      req.body.airplane_id,
      req.body.flight_status,
      req.body.base_price,
    ],
    (err, result) => {
      if (!err) {
        res.send(true);
      } else {
        res.send(false);
        console.log(err);
      }
    }
  );
});

app.post("/changestatus", (req, res) => {
  console.log(req.body);
  db.query(
    `UPDATE Flight SET flight_status = ? WHERE flight_num = ? AND airline_name = ? AND dept_airport = ? AND arr_airport = ? AND dept_date = ? AND dept_time = ?`,
    [
      req.body.flight_status,
      req.body.flight_num,
      req.body.airline_name,
      req.body.dept_airport,
      req.body.arr_airport,
      req.body.dept_date,
      req.body.dept_time,
    ],
    (err, result) => {
      if (!err) {
        res.send(true);
      } else {
        res.send(false);
        console.log(err);
      }
    }
  );
});

app.post("/addairplane", (req, res) => {
  console.log(req.body);
  db.query(
    `INSERT INTO Airplane
  (ID, airline_name, seat_num, manufacture_company, age_plane)
  VALUES (?, ?, ?, ?, ?)`,
    [
      req.body.airplane_id,
      req.body.airline_name,
      req.body.seat_num,
      req.body.manu_comp,
      req.body.age_plane,
    ],
    (err, result) => {
      if (!err) {
        res.send(true);
      } else {
        res.send(false);
        console.log(err);
      }
    }
  );
});

app.post("/added", (req, res) => {
  console.log(req.body);
  const { airline_name } = req.body;
  db.query(
    `SELECT * FROM Flight WHERE airline_name = '${airline_name}'`,
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/addairport", (req, res) => {
  console.log(req.body);
  db.query(
    `INSERT INTO Airport
  (code, airport_name, city)
  VALUES (?, ?, ?)`,
    [
      req.body.code,
      req.body.airport_name,
      req.body.city,
    ],
    (err, result) => {
      if (!err) {
        res.send(true);
      } else {
        res.send(false);
        console.log(err);
      }
    }
  );
});

app.post("/viewflightrating", (req, res) => {
  console.log(req.body);
  db.query(
    `SELECT * FROM Interact WHERE airline_name = ? AND flight_num = ?`,
    [req.body.airline_name, req.body.flight_num],
    (err, rows) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/freqcust", (req, res) => {
  console.log(req.body);
  const { airline_name } = req.body;
  db.query(
    `SELECT COUNT(*) AS purchase_num, Customer.email 
    FROM Customer, Purchase 
    WHERE Customer.email = Purchase.email 
    AND Purchase.ticket_id IN 
    (
        SELECT Ticket.ID 
        FROM Ticket 
        WHERE Ticket.airline_name = '${airline_name}'
    ) 
    GROUP BY Customer.email`,
    [req.body.airline_name],
    (err, result) => {
      if (!err) {
        console.log(result);
        customer_email = result[0].email;
        db.query(
          `SELECT *
              FROM Customer
                WHERE email = ?`,
          [customer_email],
          (err, rows) => {
            if (!err) {
              console.log(rows);
              res.send(rows);
            } else {
              console.log(err);
            }
          }
        );
        }
      }
  );
});

app.post("/ticketreport", (req, res) => {
  let date_now = new Date();
  date_now = moment(date_now).format("YYYY-MM-DD");
  date_now = moment(date_now).add(0, "days");
  const { airline_name } = req.body;
  console.log(airline_name);
  db.query(
    `SELECT * FROM Ticket WHERE airline_name = '${airline_name}'`,
    (err, result) => {
      if (!err) {
        let filteredRows = result.filter(
          (row) => date_now.diff(moment(row["purchase_date"]), "days") < 30
        );
        res.send(filteredRows);
      } else {
        res.status(500).send(err);
        console.log(err);
      }
    }
  );
});

app.post("/monthrevenue", (req, res) => {
  const { airline_name } = req.body;
  console.log(airline_name);
  let date_now = new Date();
  date_now = moment(date_now).format("YYYY-MM-DD");
  date_now = moment(date_now).add(0, "days");
  db.query(
    `SELECT *
    FROM Ticket
    WHERE Ticket.airline_name = '${airline_name}'`,
    // [req.body.company],
    (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => date_now.diff(moment(row["purchase_date"]), "month") < 1
        );
        res.send(filteredRows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/yearrevenue", (req, res) => {
  const { airline_name } = req.body;
  console.log(airline_name);
  let date_now = new Date();
  date_now = moment(date_now).format("YYYY-MM-DD");
  date_now = moment(date_now).add(0, "days");
  db.query(
    `SELECT *
    FROM Ticket
    WHERE Ticket.airline_name = '${airline_name}'
    `,
    // [req.body.company],
    (err, rows) => {
      if (!err) {
        let filteredRows = rows.filter(
          (row) => date_now.diff(moment(row["purchase_date"]), "years") < 1
        );
        res.send(filteredRows);
        //console.log(filteredRows);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.listen(3001, () => {
    console.log("running on port 3001");
});