import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Pretty Good Docs",
  description: "Edit Documents Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right"/>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
