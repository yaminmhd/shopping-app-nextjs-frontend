"use client";

import {Alert, Box, Button, Modal, Stack, TextField} from "@mui/material";
import React, {CSSProperties, useState} from "react";
import createProduct from "../actions/create-product";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import {z, ZodIssue} from "zod";

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

type FormCustomError = {
  path: string | number
  message: string
}

type ProductModalResponse = {
  error: string
  data: any
}

const CreateProductModal = ({open, handleClose}: CreateProductFabProps) => {
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg"];
  const [errors, setErrors] = useState<FormCustomError[]>();
  const [response, setResponse] = useState<ProductModalResponse>();
  const [fileName, setFileName] = useState("");

  const imageSchema = z.object({
    image: z.any()
      .refine((files) => files?.[0]?.size <= 700000, `Max image size is 700KB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg formats are supported."
      )
  })

  const schema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    description: z.string().min(1, {message: "Description is required"}),
    price: z.coerce.number().min(0.01, {message: "Price must be greater than 0"}),
  })

  const onClose = () => {
    handleClose();
    setResponse(undefined);
    setErrors(undefined);
    setFileName("");
  };

  const validateForm = async (formData: FormData) => {
    const schemaValidateResponse = await schema.safeParseAsync({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
    })

    if (schemaValidateResponse.error) {
      const parsedErrors = schemaValidateResponse.error.errors.map((error: ZodIssue) => ({
        path: error.path[0],
        message: error.message
      }))
      setErrors(parsedErrors);
      return false;
    }
    return true;
  }


  const onSubmit = async (formData: FormData) => {
    const response = await createProduct(formData);
    if (!response.error) {
      setErrors(undefined);
      setResponse(response);
      onClose();
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        {response?.error && <Alert severity="error">{response?.error}</Alert>}
        <form
          action={async (formData) => {
            const result = await validateForm(formData)
            if (!result) {
              return;
            }
            await onSubmit(formData)
          }}
          className="w-full max-w-xs"
          noValidate
        >
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              required
              helperText={errors?.find((error) => error.path === "name")?.message}
              error={!!errors?.find((error) => error.path === "name")?.message}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              required
              helperText={errors?.find((error) => error.path === "description")?.message}
              error={!!errors?.find((error) => error.path === "description")?.message}
            />
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              required
              helperText={errors?.find((error) => error.path === "price")?.message}
              error={!!errors?.find((error) => error.path === "price")?.message}
            />
            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon/>}>
              Upload File
              <input type="file" name="image" style={fileInputStyles}
                     onChange={(e) => {
                       setErrors(prevErrors => {
                         return prevErrors?.filter(error => error.path !== "image")
                       })

                       if (e.target.files) {
                         const imageSchemaResponse = imageSchema.safeParse({image: e.target.files})
                         if (!imageSchemaResponse.success) {
                           const parsedErrors = imageSchemaResponse.error.errors.map((error: ZodIssue) => ({
                             path: error.path[0],
                             message: error.message
                           }))
                           setErrors(prevErrors => {
                             return [...(prevErrors || []), ...parsedErrors]
                           });
                           setFileName("")
                           return;
                         }
                         setFileName(e.target.files[0].name)
                       }
                     }}></input>
            </Button>
            <Typography sx={{color: 'red'}}>{errors?.find((error) => error.path === "image")?.message}</Typography>
            {fileName && <Typography>{fileName}</Typography>}
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
