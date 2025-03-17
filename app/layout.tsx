import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, useTheme } from "./context/ThemeProvider";
import Themer from "./components/Themer";

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
        <ThemeProvider>
            <Themer>
                <div className="flex justify-center items-center ">
                    <NavBar />
                </div>
                <div>{children}</div>
                <ToastContainer />
            </Themer>
        </ThemeProvider>
    );
}
