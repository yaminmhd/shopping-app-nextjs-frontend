"use client";

import {Box, Button, Modal, Stack, TextField} from "@mui/material";
import React, {CSSProperties, useState} from "react";
import createProduct from "../actions/create-product";
import {FormError} from "../../util/errors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const fileInputStyles: CSSProperties = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
}

interface CreateProductFabProps {
  open: boolean;
  handleClose: () => void;
}

const CreateProductModal = ({open, handleClose}: CreateProductFabProps) => {
  const [response, setResponse] = useState<FormError>();
  const [fileName, setFileName] = useState("");

  const onClose = () => {
    setResponse(undefined);
    handleClose();
    setFileName("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form
          action={async (formData) => {
            const response = await createProduct(formData);
            setResponse(response);
            if (Object.values(response.error).every((value) => value === "")) {
              onClose();
            }
          }}
          className="w-full max-w-xs"
        >
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              required
              helperText={response?.error.name}
              error={!!response?.error.name}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              required
              helperText={response?.error.description}
              error={!!response?.error.description}
            />
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              required
              helperText={response?.error.price}
              error={!!response?.error.price}
            />
            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon/>}>
              Upload File
              <input type="file" name="image" style={fileInputStyles}
                     onChange={(e) => e.target.files && setFileName(e.target.files[0].name
                     )}></input>
            </Button>
            <Typography>{fileName}</Typography>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateProductModal;
