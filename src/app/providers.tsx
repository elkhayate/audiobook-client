"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryProvider>
          <AuthProvider>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </AuthProvider>
        </QueryProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
} 