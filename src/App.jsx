import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle File Upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://your-backend-url.vercel.app/upload", formData);
      alert("File uploaded successfully!");
      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // Fetch Files from Backend
  const fetchFiles = async () => {
    try {
      const response = await axios.get("https://your-backend-url.vercel.app/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h3>Uploaded Files</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={`https://your-backend-url.vercel.app/${file.path}`} target="_blank" rel="noopener noreferrer">
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
