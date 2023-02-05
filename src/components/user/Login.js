import { Close, Send } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { login, register } from "../../actions/user";
import { useValue } from "../../context/ContextProvider";
import GoogleOneTapLogin from "./GoogleOneTapLogin";
import PasswordField from "./PasswordField";

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState(false);
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log(email);
    const password = passwordRef.current.value;
    //send login request if its not register and return
    if (!isRegister) {
      return login({ email, password }, dispatch);
    }

    const fName = fNameRef.current.value;
    const lName = lNameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      return dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Password does not match",
        },
      });
    }
    //send register request
    register({ fName, lName, email, password }, dispatch);
  };

  useEffect(() => {
    isRegister ? setTitle("Register") : setTitle("Login");
  }, [isRegister]);
  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <>
              <TextField
                autoFocus
                margin="normal"
                variant="standard"
                id="fName"
                label="First Name"
                type="text"
                fullWidth
                inputRef={fNameRef}
                inputProps={{ minLength: 2 }}
                required
              />
              <TextField
                margin="normal"
                variant="standard"
                id="lName"
                label="Last Name"
                type="text"
                fullWidth
                inputRef={lNameRef}
              />
            </>
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: "center" }}>
        {isRegister
          ? "Do you have an account? Sign in now "
          : "Don't you have an account? Create one now "}
        <Button
          color="info"
          onClick={() => setIsRegister(!isRegister)}
          sx={{ marginTop: "4px" }}
        >
          {isRegister ? "Login" : "Register"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
