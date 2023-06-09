import "./index.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});

  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    const config = {
      headers: {
        "Content-type":
          "multipart/form-data" /* This content-type must be set when sending form-data */,
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpvc2giLCJpYXQiOjE2ODEyOTU3MTQsImV4cCI6MTY4MTkwMDUxNH0.0Qs_Xdb4V3d6AUes64U7AazaNjpxGBJLxwOIRYhl33s",
      },
    };
    try {
      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post(
        "http://localhost:3500/parts/upload",
        // "http://localhost:3024/upload",

        data,
        config
      );
      // const res = await axios.post("http://localhost:3024/upload", data);

      setRes(res.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <label htmlFor="file" className="btn-grey">
        {" "}
        select file
      </label>
      {file && <center> {file.name}</center>}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      <code>
        {Object.keys(res).length > 0
          ? Object.keys(res).map((key) => (
              <p className="output-item" key={key}>
                <span>{key}:</span>
                <span>
                  {typeof res[key] === "object" ? "object" : res[key]}
                </span>
              </p>
            ))
          : null}
      </code>
      {file && (
        <>
          <button onClick={handleUpload} className="btn-green">
            {loading ? "uploading..." : "upload to cloudinary"}
          </button>
        </>
      )}
    </div>
  );
}
export default App;
