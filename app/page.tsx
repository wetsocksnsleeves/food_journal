"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase";

export default function Home() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (authUser) => {

            setUser(authUser);
            setLoading(false);
            if (!authUser) {
                router.push("/profile");
            }
        });

        return () => unsubscribe();
    }, [router]); // Added router to dependency array

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>; // Loading indicator
    }

    if (!user) {
        return null; // or a loading state. This will prevent a react error.
    }

    return (
        <div className="outline py-8 flex flex-col items-center gap-2">
            <span className="text-3xl">Welcome Back, {user.displayName}</span>
            <span className="text-xl italic">Lets track your diet today.</span>
        </div>
    );
}
