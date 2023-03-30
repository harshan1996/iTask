import React from "react";
import "./Table.css";

const Table = ({ data }) => {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row[0]}</td>
        <td>{row[1]}</td>
        <td>
          <div>
            <img
              src={`data:image/jpeg;base64,${row[2]}`}
              alt="Decoded"
              style={{ height: "200px", width: "300px" }}
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Image Name</th>
          <th>Detections</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
