import { Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImagesList from "./ImagesList";
import ProgressList from "./progressList/ProgressList";

function AddImages() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });
  return (
    <>
    <Paper
      sx={{
        cursor: "pointer",
        background: "#fafafa",
        color: "#bdbdbd",
        border: "1px dashed #ccc",
        "&:hover": { border: "1px solid #ccc" },
      }}
    >
      <div style={{ padding: "16px" }} {...getRootProps()}>
        <input type="text" {...getInputProps()} />
        {isDragActive ? (
          <p style={{ color: "green" }}>Drop the files here...</p>
        ) : (
          <p> Drag 'n' Drop some images here, or click to select images </p>
        )}
        <em>
          images with *.jpeg, *.png and *.jpg extensions will be accepted{" "}
        </em>
      </div>
    </Paper>
    <ProgressList {...{files}}/>
    <ImagesList/>
    </>
  );
}

export default AddImages;
