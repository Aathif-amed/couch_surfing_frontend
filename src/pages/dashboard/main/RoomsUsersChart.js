import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useValue } from "../../../context/ContextProvider";

const months = 4;
const today = new Date();
const tempData = [];
for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  );
  tempData.push({
    date,
    name: moment(date).format("MMM YYYY"),
    users: 0,
    rooms: 0,
  });
}
function RoomsUsersChart() {
  const {
    state: { rooms, users },
  } = useValue();
  const [data, setData] = useState([]);
  useEffect(() => {
    for (let index = 0; index < months; index++) {
      tempData[index].users = 0;
    }
    users.forEach((user) => {
      for (let index = 0; index < months; index++) {
        if (moment(tempData[index].date).isSame(user?.createdAt, "month")) {
          return tempData[index].users++;
        }
      }
    });
    setData([...tempData]);
  }, [users]);
  useEffect(() => {
    for (let index = 0; index < months; index++) {
      tempData[index].rooms = 0;
    }
    rooms.forEach((room) => {
      for (let index = 0; index < months; index++) {
        if (moment(tempData[index].date).isSame(room?.createdAt, "month")) {
          return tempData[index].rooms++;
        }
      }
    });
    setData([...tempData]);
  }, [rooms]);
  return (
    <div style={{ width: "100%", height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="#E63F01"
            fill="#E63F00"
          />
          <Area
            type="monotone"
            dataKey="rooms"
            stackId="1"
            stroke="#00c50f"
            fill="#00c49f"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RoomsUsersChart;
