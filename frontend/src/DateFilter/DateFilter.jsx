import React, { useState } from "react";

const DateFilter = ({ getDates }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilterClick = () => {
    getDates({ startDate, endDate });
    console.log(startDate, endDate);
  };

  return (
    <div>
      <label htmlFor="start-date">
        <h3>Start date:</h3>
      </label>
      <input
        id="start-date"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
      />

      <label htmlFor="end-date">
        <h3>End date:</h3>
      </label>
      <input
        id="end-date"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
      />
      <br />
      <br />
      <button onClick={handleFilterClick} id="fetch-data">
        <b>Fetch Data And Generate Report</b>
      </button>
    </div>
  );
};

export default DateFilter;
