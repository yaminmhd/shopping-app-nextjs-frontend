"use client";

import { Button, Stack, Link, TextField, Alert } from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { useFormState } from "react-dom";
import login from "./login";

const Login = () => {
  const [state, formAction] = useFormState(login, {
    error: { email: "", password: "", server: "" },
  });
  return (
    <form action={formAction} className="w-full max-w-xs">
      {!!state.error.server && (
        <Alert severity="error">{state.error.server}</Alert>
      )}
      <Stack spacing={2}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          helperText={state.error.email}
          error={!!state.error.email}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          helperText={state.error.password}
          error={!!state.error.password}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  );
};

export default Login;
