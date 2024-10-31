import { Box } from "@mui/material";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="h-screen flex items-center justify-center">{children}</Box>
  );
};

export default AuthLayout;
