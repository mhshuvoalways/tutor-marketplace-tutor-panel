import { dbConnect } from "@/app/services/mongodb";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tim's Tutors",
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
      <body className={`${outfit.className} bg-[#F7F8FC]`}>{children}</body>
    </html>
  );
}
