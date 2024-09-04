import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx";
import CreateArt from "./views/CreateArt.jsx";
import EditArt from "./views/EditArt.jsx";
import PublicRoute from "./views/PublicRoute.jsx";
import ProtectedRoute from "./views/ProtectedRoute.jsx";
import "./LoginReg.css";
import ArtworkDetails from "./views/ArtworkDetails.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path="/create"
          element={<ProtectedRoute element={<CreateArt />} />}
        />
        <Route
          path="/edit/:id"
          element={<ProtectedRoute element={<EditArt />} />}
        />
        <Route
          path="/details/:id"
          element={<ProtectedRoute element={<ArtworkDetails />} />}
        />
      </Routes>
    </>
  );
}

export default App;
