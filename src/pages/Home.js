import React from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import Login from "../components/user/Login";

function Home() {
  return (
    <>
      <Login />
      <Navbar />
      <BottomNav />
    </>
  );
}

export default Home;
