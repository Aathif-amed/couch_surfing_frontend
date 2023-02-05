import { Button } from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import Gicon from "./Gicon";
import jwtDecode from "jwt-decode";

function GoogleOneTapLogin() {
  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);

  const handleResponse = (response) => {
   const token = response.credential;
   const decodedToken =jwtDecode(token);
   const{sub:id,email,name,picture:photoURL}= decodedToken
   dispatch({type:"UPDATE_USER",payload:{id,email,name,photoURL,token,google:true}})
   dispatch({type:"CLOSE_LOGIN"})
  };
  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {

        if (notification.isNotDisplayed()) {
          setDisabled(false);
          throw new Error(`Try to Clear Cookies or try again later!
          Hint: GoTo: Application=>Cookies>set gstate:{"i_l":0}`);
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: error.message },
      });
      console.log(error);
    }
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<Gicon/>}
      disabled={disabled}
      onClick={handleGoogleLogin}
    >
      Login In With Google
    </Button>
  );
}

export default GoogleOneTapLogin;
