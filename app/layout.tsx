import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "sonner";
import { ModalProvider } from "@/components/provider/modal-provider";
import { QueryProvider } from "@/components/provider/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={inter.className}>
            <Toaster />
            <ModalProvider />
            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
