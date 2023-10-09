import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
function About() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:8123/view",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        setData(result.data);
        console.log(result.data)
      }
    });
  }, []);
  return (
    <div>About</div>
  )
}

export default About;