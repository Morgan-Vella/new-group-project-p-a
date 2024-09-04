import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Link to = '/artwork/create'> Create</Link>
    </>
  );
};

export default Dashboard;
