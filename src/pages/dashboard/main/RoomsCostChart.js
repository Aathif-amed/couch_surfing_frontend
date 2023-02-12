import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useValue } from "../../../context/ContextProvider";

const colors = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];

export default function RoomsCostChart() {
  const {
    state: { rooms },
  } = useValue();
  const [costGroups, setCostGroups] = useState([]);
  useEffect(() => {
    let free = 0,
      Price0_150 = 0,
      Price151_300 = 0,
      Above300 = 0;

    rooms.forEach((room) => {
      if (room.price === 0) return free++;
      if (room.price >= 1 && room.price <= 150) return Price0_150++;
      if (room.price >= 151 && room.price <= 300) return Price151_300++;
      Above300++;
    });

    setCostGroups([
      { name: "Free Stay", rooms: free },
      { name: "₹1-₹150 ", rooms: Price0_150 },
      { name: "₹151-₹300", rooms: Price151_300 },
      { name: "₹301-₹500", rooms: Above300 },
    ]);
  }, [rooms]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <BarChart
        width={500}
        height={300}
        data={costGroups}
        margin={{
          top: 50,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="rooms" fill="#8884d8" label={{ position: "top" }}>
          {costGroups.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
      <Stack gap={2}>
        <Typography variant="h6">Rooms Cost</Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {colors.map((color, index) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {costGroups[index]?.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {"No.of.Rooms: " + costGroups[index]?.rooms}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
