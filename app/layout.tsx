import { dbConnect } from "@/app/services/mongodb";
import StoreProvider from "@/app/StoreProvider";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutor panel of Tim's Tutor",
  description: "Tim's Tutors is a tutors marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/all.css"
        />
      </head>
      <body className={`${outfit.className} bg-[#F7F8FC]`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
