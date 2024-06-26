'use client'
import React from 'react';
import {SessionProvider} from "next-auth/react";
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
type Props = {
    children : React.ReactNode;
};

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem {...props}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextThemesProvider>
  )
};

export default Providers