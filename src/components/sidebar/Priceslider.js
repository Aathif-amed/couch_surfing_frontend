import { Box, Slider, Typography } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

function Priceslider() {
  const {
    state: { priceFilter },
    dispatch,
  } = useValue();

  const marks = [
    {
      value: 1,
      label: "₹1",
    },
    {
      value: 250,
      label: "₹250",
    },
    {
      value: 500,
      label: "₹500",
    },
  ];
  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Max Price: {"₹ " + priceFilter}</Typography>
      <Slider
        min={1}
        max={500}
        defaultValue={100}
        valueLabelDisplay="auto"
        marks={marks}
        value={priceFilter}
        onChange={(event, price) =>
          dispatch({ type: "PRICE_FILTER", payload: price })
        }
      />
    </Box>
  );
}

export default Priceslider;
