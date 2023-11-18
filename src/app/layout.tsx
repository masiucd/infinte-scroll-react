import "./globals.css";

import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {type PropsWithChildren} from "react";

import {cn} from "@/utils/css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "My working journal",
  description: "A journal of my work and life",
};

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-gray-50 h-full",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
