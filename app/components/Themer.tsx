"use client";
import { useTheme } from "../context/ThemeProvider";

export default function Themer({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <html lang="en" data-theme={`${theme === 1 ? "dark" : theme === 2 ? "pink":""}`}>
            <body
                className={`antialiased overflow-x-hidden mx-auto select-none`}
            >
                {children}
            </body>
        </html>
    );
}
