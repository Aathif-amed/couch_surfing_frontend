import fetchData from "../utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/api/room";

export const createRoom = async (room, currentUser, dispatch,setPage) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    { url, body: room, token: currentUser?.token },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Room has been added successfully",
      },
    });
    dispatch({type:'RESET_ROOM'})
    setPage(0)
  }
  dispatch({ type: "END_LOADING" });
};
