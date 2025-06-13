"use client";

import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
} 