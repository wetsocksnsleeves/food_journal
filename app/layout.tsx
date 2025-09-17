import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeProvider";
import Themer from "./components/Themer";

export const metadata: Metadata = {
    title: "Food Journal",
    description: "Minimalist calorie tracking application. No bloat.",
    manifest: "/manifest.json",
    other: {
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider>
            <Themer>
                <head>
                    <link rel="apple-touch-icon" href="/icon-192x192.png" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/icon-192x192.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href="/icon-192x192.png"
                    />
                    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
                    </meta>
                </head>
                <div className="flex justify-center items-center ">
                    <NavBar />
                </div>
                <div>{children}</div>
                <ToastContainer />
            </Themer>
        </ThemeProvider>
    );
}
