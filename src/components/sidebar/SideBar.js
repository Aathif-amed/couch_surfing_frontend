import { ChevronLeft } from "@mui/icons-material";
import { Box, Drawer, IconButton, styled, Typography } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";
import Priceslider from "./Priceslider";

function SideBar({ isOpen, setIsOpen }) {
  const { containerRef } = useValue();
  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawHeader>
        <Typography>Apply Search or Filter:</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <Box ref={containerRef}></Box>
        <Priceslider />
      </Box>
    </Drawer>
  );
}

const DrawHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default SideBar;
