import { Box, CircularProgress, Fab, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Check, DeleteForever, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { deleteUser, getUsers, updateStatus } from "../../../actions/user";
import { useValue } from "../../../context/ContextProvider";

function UsersActions({ params, rowId, setRowId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  // to change the button to save after the successfull submit
  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  const handleSubmit = async () => {
    setLoading(true);

    const { role, active, _id } = params.row;
    const result = await updateStatus(
      { role, active },
      _id,
      dispatch,
      currentUser
    );
    if (result) {
      setSuccess(true);
      setRowId(null);
      getUsers(dispatch, currentUser);
    }
    setLoading(false);
  };
  const handleDelete = async () => {
    deleteUser(params.row, currentUser, dispatch);
  };

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
      <Tooltip title="Delete User">
        <IconButton
          onClick={handleDelete}
          disabled={currentUser?.role !== "admin"}
        >
          <DeleteForever />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default UsersActions;
