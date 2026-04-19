import React from "react";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function ImersaoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.variable} ${outfit.variable} font-sans text-[#1a1c18] min-h-screen m-0 p-0`}>
            {children}
        </div>
    );
}
