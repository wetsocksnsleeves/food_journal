"use client";

import { auth } from "@/firebase"; // Your Firebase config
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function SignOut() {
    const [error, setError] = useState(null);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);
            console.error("Sign-out Error:", err);
        }
    };

    return (
        <form action={handleSignOut}>
            <button className="p-5 bg-white text-black rounded-lg" type="submit">
                Sign Out
            </button>
        </form>
    );
}
