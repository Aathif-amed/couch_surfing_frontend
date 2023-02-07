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
import { useValue } from "../../context/ContextProvider";
import AddDetails from "./addDetails/AddDetails";
import AddImages from "./addImages/AddImages";
import AddLocation from "./addLocation/AddLocation";

function AddRoom() {
  const {
    state: { images },
  } = useValue();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: "Location", completed: false },
    { label: "Details", completed: false },
    { label: "Images", completed: true },
  ]);

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
    if (activeStep < steps.length - 1) {
      return false;
    }
    const index = steps.findIndex((step) => !step.completed);
    if (index !== -1) {
      return false;
    }
    return true;
  };
  const findUnfinished = () => {
    //checking the unfinished step
    return steps.findIndex((step) => !step.completed);
  };

  useEffect(()=>{
    if(images.length){
        if(!steps[2].completed){
            setComplete(2,true)
        }
    }
    else{
        if(steps[2].completed){
            setComplete(2,false)
        }
    }
  },[images])
const setComplete=(index,status)=>{
    setSteps(steps=>{
        steps[index].completed=status;
        return [...steps]
    })
}
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
      <Box>
        {
          {
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImages />,
          }[activeStep]
        }
      </Box>
      <Stack
        direction="row"
        sx={{ pt: 2, pb: 7, justifyContent: "space-around" }}
      >
        <Button
          color="inherit"
          disabled={!activeStep}
          onClick={() => {
            setActiveStep((activeStep) => activeStep - 1);
          }}
        >
          Back
        </Button>
        <Button color="inherit" disabled={checkDisabled()} onClick={handleNext}>
          Next
        </Button>
      </Stack>
    </Container>
  );
}

export default AddRoom;
