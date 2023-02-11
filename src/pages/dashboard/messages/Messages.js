import React, { useEffect } from "react";

function Messages({ setSelectedLink, link }) {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Messages</div>;
}

export default Messages;
