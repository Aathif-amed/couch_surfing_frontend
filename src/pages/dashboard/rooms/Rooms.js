import React, { useEffect } from "react";

function Rooms({ setSelectedLink, link }) {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Rooms</div>;
}

export default Rooms;
