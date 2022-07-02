import React from "react";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Axios from 'axios';
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import ClientLogin from "./components/clientlogin";
import StaffLogin from "./components/stafflogin";
import ClientRegister from "./components/clientregister";
import StaffRegister from "./components/staffregister";
import Search from "./components/publicsearch";
import ClientHomePage from "./components/clienthomepage";
import ViewFlight from "./components/viewflight";
import Rate from "./components/rate";
import TrackSpending from "./components/trackspending";
import Review from "./components/review";
import PurchaseTicket from "./components/purchaseticket";
import StaffViewFlight from "./components/staffviewflight";
import StaffHomePage from "./components/staffhomepage";
import ChangeStatus from "./components/changestatus";
import AddAirplane from "./components/addairplane";
import AddAirport from "./components/addairport";
import FreqCust from "./components/frequentcustomer";
import ViewTicketReport from "./components/viewticketreport";
import ViewRevenue from "./components/viewrevenue";
import ViewFlightRating from "./components/viewflightrating";
import CreateFlight from "./components/createflight";
import Added from "./components/added";
import ClientSearch from "./components/clientsearch";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientlogin" element={<ClientLogin />} />
        <Route path="/stafflogin" element={<StaffLogin />} />
        <Route path="/clientregister" element={<ClientRegister />} />
        <Route path="/staffregister" element={<StaffRegister />} />
        <Route path="/publicsearch" element={<Search />} />
        <Route path="/clienthomepage" element={<ClientHomePage />} />
        <Route path="/viewflight" element={<ViewFlight />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/trackspending" element={<TrackSpending />} />
        <Route path="/review" element={<Review />} />
        <Route path="/trackspending" element={<TrackSpending/>} />
        <Route path="/purchaseticket" element={<PurchaseTicket/>} />
        <Route path="/staffviewflight" element={<StaffViewFlight />} />
        <Route path="/staffhomepage" element={<StaffHomePage />} /> 
        <Route path="/changestatus" element={<ChangeStatus />} />
        <Route path="/addairplane" element={<AddAirplane />} />
        <Route path="/addairport" element={<AddAirport />} />
        <Route path="/frequentcustomer" element={<FreqCust />} />
        <Route path="/viewticketreport" element={<ViewTicketReport />} />
        <Route path="/viewrevenue" element={<ViewRevenue />} />
        <Route path="/viewflightrating" element={<ViewFlightRating />} />
        <Route path="/createflight" element={<CreateFlight />} />
        <Route path="/added" element={<Added />} />
        <Route path="/clientsearch" element={<ClientSearch />} />
      </Routes>
    </div>
  );
}

export default App;
