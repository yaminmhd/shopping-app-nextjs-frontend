"use client";

import { Modal, Box, Button, TextField, Stack } from "@mui/material";
import React, { useState } from "react";
import createProduct from "./create-product";
import { FormError } from "../util/errors";

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

interface CreateProductFabProps {
  open: boolean;
  handleClose: () => void;
}

const CreateProductModal = ({ open, handleClose }: CreateProductFabProps) => {
  const [response, setResponse] = useState<FormError>();

  const onClose = () => {
    setResponse(undefined);
    handleClose();
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
