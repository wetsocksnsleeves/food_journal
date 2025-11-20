"use client";

import { useState } from "react";
import { auth, provider } from "@/firebase"; // Import from your firebase.js
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            let res = await signInWithPopup(auth, provider);

            if (res) {
                router.push("/");
            }
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
