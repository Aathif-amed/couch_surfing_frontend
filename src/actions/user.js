import fetchData from "../utils/fetchData";
import { v4 as uuidv4 } from "uuid";
import uploadFile from "../firebase/uploadFile";
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
  }
  dispatch({ type: "END_LOADING" });
};

export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const { fName, lName, file } = updatedFields;
  let body = { fName, lName };
  try {
    if (file) {
      const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
      const photoURL = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`
      );
      body = { ...body, photoURL };
    }
    const result = await fetchData(
      {
        url: url + "/updateProfile",
        method: "PATCH",
        body,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_USER", payload: { ...currentUser, ...result } });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Your Profile has been Updated Successfully",
        },
      });
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { open: false, file: null, photoURL: result.photoURL },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: "END_LOADING" });
};

export const getUsers = async (dispatch, currentUser) => {
  const result = await fetchData(
    { url, method: "GET", token: currentUser.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_USERS",
      payload: result,
    });
  }
};
export const updateStatus = async (
  updatedFields,
  userId,
  dispatch,
  currentUser
) => {
  return fetchData(
    {
      url: url + `/updateStatus/${userId}`,
      method: "PATCH",
      token: currentUser.token,
      body: updatedFields,
    },
    dispatch
  );
};
export const deleteUser = async (user, currentUser, dispatch) => {
  dispatch({ type: "START_LOADING" });
  console.log(user);
  const result = await fetchData(
    { url: `${url}/${user._id}`, method: "DELETE", token: currentUser?.token },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "User has been deleted successfully",
      },
    });

    dispatch({
      type: "DELETE_USER",
      payload: result._id,
    });
  }
  dispatch({ type: "END_LOADING" });
};

export const logout = (dispatch) => {
  dispatch({ type: "UPDATE_USER", payload: null });
  dispatch({ type: "RESET_ROOM_DETAILS" });
  dispatch({ type: "UPDATE_USERS", payload: [] });
};
