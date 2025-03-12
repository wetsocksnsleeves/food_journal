"use client";

import { useState } from "react";
import { auth, provider } from "@/firebase"; // Import from your firebase.js
import { signInWithPopup } from "firebase/auth";

export default function GoogleSignInButton() {
    const [error, setError] = useState(null);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err.message);
            console.error("Google Sign-in Error:", err);
        }
    };

    return (
        <form action={handleGoogleSignIn}>
            <button className="p-5 bg-gray-900 rounded-lg" type="submit">
                Sign In
            </button>
        </form>
    );
}
