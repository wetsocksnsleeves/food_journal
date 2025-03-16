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
        <div className="p-5 bg-foreground m-5 rounded-lg flex justify-center active:brightness-150 drop-shadow-md" onClick={handleSignOut}>
            Sign Out
        </div>
    );
}
