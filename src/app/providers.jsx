"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

export function Providers({ children }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <main className="flex h-screen flex-col dark text-foreground bg-background">
          {children}
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
