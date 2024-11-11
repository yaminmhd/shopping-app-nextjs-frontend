"use client";

import { Button, Link, Stack, TextField, Alert } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import createUser from "./create-user";

const Signup = () => {
  const [state, formAction] = useFormState(createUser, {
    error: {
      email: "",
      password: "",
      name: "",
      description: "",
      price: "",
      server: "",
    },
  });

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        {!!state.error.server && (
          <Alert severity="error">{state.error.server}</Alert>
        )}
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
          Signup
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center">
          Login
        </Link>
      </Stack>
    </form>
  );
};

export default Signup;
