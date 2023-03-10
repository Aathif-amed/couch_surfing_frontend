import { Cancel, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearRoom, createRoom, updateRoom } from "../../actions/room";
import { useValue } from "../../context/ContextProvider";
import AddDetails from "./addDetails/AddDetails";
import AddImages from "./addImages/AddImages";
import AddLocation from "./addLocation/AddLocation";

function AddRoom() {
  const {
    state: {
      location,
      details,
      images,
      currentUser,
      updatedRoom,
      deletedImages,
      addedImages,
    },
    dispatch,
  } = useValue();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: "Location", completed: false },
    { label: "Details", completed: false },
    { label: "Images", completed: false },
  ]);
  //to show submit button only if all steps are completed
  const [showSubmit, setShowSubmit] = useState(false);
  const handleNext = () => {
    //checking whether steps is out of index
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };
  const checkDisabled = () => {
    //checking whether steps is out of index
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    if (index !== -1) return false;
    return true;
  };
  const findUnfinished = () => {
    //checking the unfinished step
    return steps.findIndex((step) => !step.completed);
  };

  //checking whether location step completed
  useEffect(() => {
    if (location.longitude || location.latitude) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [location]);
  //checking whether details step completed
  useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [details]);

  //checking whether images step completed
  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true);
    } else {
      if (steps[2].completed) setComplete(2, false);
    }
  }, [images]);

  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status;
      return [...steps];
    });
  };

  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true);
    } else {
      if (showSubmit) setShowSubmit(false);
    }
  }, [steps]);
  const handleSubmit = () => {
    const room = {
      longitude: location.longitude,
      latitude: location.latitude,
      price: details.price,
      title: details.title,
      description: details.description,
      images,
    };
    if (updatedRoom)
      return updateRoom(
        room,
        currentUser,
        dispatch,
        updatedRoom,
        deletedImages
      );
    createRoom(room, currentUser, dispatch);
  };
  const handleCancel = () => {
    if (updatedRoom) {
      navigate("/dashboard/rooms");
      clearRoom(dispatch, currentUser, addedImages, updatedRoom);
    } else {
      dispatch({ type: "UPDATE_SECTION", payload: 0 });
      clearRoom(dispatch, currentUser, images);
    }
  };
  return (
    <Container sx={{ my: 4 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 3 }}
      >
        {steps.map((step, index) => {
          return (
            <Step key={step.label} completed={step.completed}>
              <StepButton onClick={() => setActiveStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ pb: 7 }}>
        {
          {
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImages />,
          }[activeStep]
        }
        <Stack direction="row" sx={{ pt: 2, justifyContent: "space-around" }}>
          <Button
            color="inherit"
            disabled={!activeStep}
            onClick={() => {
              setActiveStep((activeStep) => activeStep - 1);
            }}
          >
            Back
          </Button>
          <Button
            color="inherit"
            disabled={checkDisabled()}
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>

        <Stack
          sx={{ alignItems: "center", justifyContent: "center", gap: 2 }}
          direction="row"
        >
          {showSubmit && (
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              {updatedRoom ? "Update" : "Submit"}
            </Button>
          )}
          <Button
            variant="outlined"
            color="error"
            endIcon={<Cancel />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default AddRoom;
