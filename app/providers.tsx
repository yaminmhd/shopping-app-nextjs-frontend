"use client";

import { ThemeProvider } from "@mui/material";
import AppRouterCacheProvider from "@mui/material-nextjs/v13-appRouter/appRouterV13";
import React, { ReactElement } from "react";
import darkTheme from "./dark.theme";
import { AuthContext } from "./auth/auth-context";

interface ProviderProps {
  children: ReactElement[];
  authenticated: boolean;
}

const Providers = ({ children, authenticated }: ProviderProps) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
