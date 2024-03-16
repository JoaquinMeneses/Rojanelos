import { Providers } from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Rojanelos",
  description: "Todos los Rojanelos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
