import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";

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
            <body className={`antialiased overflow-x-hidden`}>
                <div className="flex justify-center items-center ">
                    <NavBar />
                </div>
                <div>{children}</div>
            </body>
        </html>
    );
}
