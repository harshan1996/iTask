import React, { useState } from "react";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

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

    const result = await res.json();
    setResult(result.message);
    console.log(result.message);
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
      {result === "successfully saved" && (
        <div id="success">successfully uploaded</div>
      )}
      {result === "please upload a CSV file" && (
        <div id="failure">invalid file format</div>
      )}
    </>
  );
};

export default FileUploader;
