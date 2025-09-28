"use client";

import "../styles/tailwind.css";   // ou ./styles.css
import { HeroUIProvider } from "@heroui/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
