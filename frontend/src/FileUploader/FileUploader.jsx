import React, { useState } from "react";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusCode, setstatusCode] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch(`http://127.0.0.1:5005/upload`, {
      method: "POST",
      body: formData,
    });

    const { status_code } = await res.json();
    setstatusCode(status_code);
  };

  return (
    <>
      <h3 className="file-input">FILE INPUT</h3>
      <h4 className="file-format">Supported Format: CSV</h4>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileInputChange} />
          <br />
          <br />
          <button type="submit" id="upload">
            UPLOAD
          </button>
        </form>
      </div>
      {statusCode === 200 && (
        <div id="success" style={{ backgroundColor: "green" }}>
          successfully uploaded
        </div>
      )}
      {statusCode === 406 && (
        <div id="failure" style={{ backgroundColor: "red" }}>
          Invalid file format
        </div>
      )}
      {statusCode === 400 && (
        <div id="empty" style={{ backgroundColor: "darkorange" }}>
          No file uploaded
        </div>
      )}
    </>
  );
};

export default FileUploader;
