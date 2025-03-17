import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export const metadata: Metadata = {
    title: "Food Journal",
    description: "Minimalist calorie tracking application. No bloat.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased overflow-x-hidden mx-auto select-none`}>
                <div className="flex justify-center items-center ">
                    <NavBar />
                </div>
                <div>{children}</div>
                <ToastContainer/>
            </body>
        </html>
    );
}
