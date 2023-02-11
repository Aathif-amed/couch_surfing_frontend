import React, { useEffect } from "react";

function Users({ setSelectedLink, link }) {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Users</div>;
}

export default Users;
