"use client";

import { useState } from "react";
import { auth, provider } from "@/firebase"; // Import from your firebase.js
import { signInWithPopup } from "firebase/auth";

export default function GoogleSignInButton() {

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Google Sign-in Error:", err);
        }
    };

    return (
        <div className="bg-accent-one m-5 p-5 rounded-lg flex justify-center active:brightness-150 drop-shadow-md text-white" onClick={handleGoogleSignIn}>
                Sign In
        </div>
    );
}
