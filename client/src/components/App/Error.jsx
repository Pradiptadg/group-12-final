import { useState, useEffect } from "react";
import axios from "axios";

const Error = () => {
  const [entryList, setEntryList] = useState([]);

  // READ (GET)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/api/stringError`)
      .then((response) => {
        setEntryList(response.data);
      });
  }, []);

  return (
   
   0
   
  );
};

export default Error;