"use client";

import {Alert, Button, Link, Stack, TextField} from "@mui/material";
import NextLink from "next/link";
import {useFormState} from "react-dom";
import createUser from "./create-user";


const Signup = () => {

  const [state, formAction] = useFormState(createUser, {error: {client: {email: "", password: ""}, server: ""}});

  return (
    <form action={formAction} className="w-full max-w-xs" noValidate={true}>
      <Stack spacing={2}>
        {!!state.error.server && (
          <Alert severity="error">{state.error.server}</Alert>
        )}
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          helperText={state.error.client.email}
          error={!!state.error.client.email}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          helperText={state.error.client.password}
          error={!!state.error.client.password}
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
