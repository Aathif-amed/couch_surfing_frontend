import React, { useEffect } from "react";

function Requests({ setSelectedLink, link }) {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Requests</div>;
}

export default Requests;
