import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import Room from "./components/rooms/Room";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Loading />
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Room />
    </>
  );
}

export default App;
