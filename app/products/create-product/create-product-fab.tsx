"use client";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import React from "react";
import CreateProductModal from "./create-product-modal";

const CreateProductFab = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <CreateProductModal open={open} handleClose={() => setOpen(false)} />
      <div className="absolute left-10 bottom-10">
        <Fab color="primary" onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
};

export default CreateProductFab;
