import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Calender from 'react-calendar';
import "./chart/Calendar.css";
import moment from "moment";
function About() {


  useEffect(() => {
    axios({
      url: "http://localhost:8123/view",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        console.log(result.data)
      }
    });
  }, []);
  const marks = [
    "01-10-2023",
    "03-10-2023",
    "07-10-2023",
    "12-10-2023",
    "13-10-2023",
    "15-10-2023",
  ];

  return (
    <>
    <Calender
      tileContent = {({ date }) => {
        if (marks.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
          return "mark";
        }
      }}/>
    <div>About</div>
    </>
  )
}

export default About;