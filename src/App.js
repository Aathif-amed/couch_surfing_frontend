import React from "react";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import BottomNav from "./components/BottomNav";
import Login from "./components/user/Login";

function App() {
  return (
    <>
      <Loading />
      <Notification />
      <Navbar />
      <Login />
      <BottomNav />
    </>
  );
}

export default App;
