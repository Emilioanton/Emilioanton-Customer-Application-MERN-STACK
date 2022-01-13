import React, { useContext } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import EditUser from "./Components/EditUser";
import AddUser from "./Components/AddUser";
import NotFound from "./Components/NotFound";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "1fr 10fr",
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/admin" element={user.role == "admin" ? <Admin /> : <Navigate to="/" />} />
          <Route path="/edit/:id" element={user.role == "admin" ? <EditUser /> : <Navigate to="/" />} />
          <Route path="/adduser" element={user.role == "admin" ? <AddUser /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
