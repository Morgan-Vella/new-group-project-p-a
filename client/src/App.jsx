import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./LoginReg.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx";
import CreateArt from "./views/CreateArt.jsx";
import EditArt from "./views/EditArt.jsx";
import PublicRoute from "./views/PublicRoute.jsx";
import ProtectedRoute from "./views/ProtectedRoute.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/create" element= {<CreateArt />} />
        <Route path="/edit" element= {<EditArt />} />
      </Routes>
    </>
  );
}

export default App;
