import { type Viewport, type Metadata } from "next";
import { Suspense } from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { THEME_COLOUR } from "../lib/constants";

import "~/styles/globals.css";
import LocalStorageChecker from "~/components/utils/local-storage-checker";

export const metadata: Metadata = {
  title: "Artist Grid App",
  description: "An app for creating art together",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOUR,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col bg-bg bg-[radial-gradient(#80808080_1px,transparent_1px)] font-sans antialiased [background-size:16px_16px]`}
      >
        <TRPCReactProvider>
          <LocalStorageChecker />
          <main className="flex flex-1">
            <Suspense>{children}</Suspense>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
