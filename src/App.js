import React from "react";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import BottomNav from "./components/BottomNav";
import Login from "./components/user/Login";
import Room from "./components/rooms/Room";

function App() {
  return (
    <>
      <Loading />
      <Notification />
      <Login />
      <Navbar />
      <BottomNav />
      <Room />
    </>
  );
}

export default App;
