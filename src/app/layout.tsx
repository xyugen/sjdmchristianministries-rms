import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { title } from "@/constants/title";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: "A record management system for the SJDM Christian Ministry",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      url: "/site.webmanifest",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Toaster />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
