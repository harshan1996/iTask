import React, { useState } from "react";
import FileUploader from "./FileUploader/FileUploader";
import DateFilter from "./DateFilter/DateFilter";
import Table from "./Table/Table";
import "./App.css";

const App = () => {
  const [data, setData] = useState("");
  const getDates = async (dates) => {
    let start = dates.startDate;
    let end = dates.endDate;

    const res = await fetch(
      `http://127.0.0.1:5005/fetch?start_date=${start}&end_date=${end}`
    );
    const { data } = await res.json();
    setData(data);
  };

  return (
    <div>
      <FileUploader />
      <br />
      <DateFilter getDates={getDates} />
      <br />
      <br />
      {data && <Table data={data} />}
    </div>
  );
};

export default App;
