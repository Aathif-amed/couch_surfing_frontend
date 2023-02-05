import fetchData from "../utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/api/user";

export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  //sending request with overall fetchData function
  const result = await fetchData(
    { url: url + "/register", body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Your Account has been Created Successfully",
      },
    });
  } else {
    dispatch({ type: "END_LOADING" });
  }
  dispatch({ type: "END_LOADING" });
};
export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  //sending request with overall fetchData function
  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Logged In Successfully",
      },
    });
  } else {
    dispatch({ type: "END_LOADING" });
  }
  dispatch({ type: "END_LOADING" });
};
