"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase"; // Your firebase config
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import Image from "next/image";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup the listener
    }, []);

    if (user) {
        return (
            <div className="mt-5 flex flex-col justify-center">
                <div className="flex flex-col justify-center">
                    <div className="p-8 flex flex-col justify-center items-center">
                        <span className="rounded-full bg-gray-200 overflow-hidden w-fit h-fit m-3">
                            <Image
                                src={user.photoURL}
                                alt={`User profile picture`}
                                width={100}
                                height={100}
                            />
                        </span>
                        <h1 className="text-2xl">{user.displayName}</h1>
                    </div>
                    <div className="m-5 flex justify-center">
                        <SignOut />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex gap-3 justify-center">
                <SignIn />
            </div>
        );
    }
}
