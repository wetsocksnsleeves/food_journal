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
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-2xl">{user.displayName}</h1>
                            <label className="text-sm text-accent-two cursor-pointer active:brightness-150">Edit</label>
                        </div>
                    </div>
                    <div className="mx-5">
                        <h1 className="text-lg font-bold mb-1">
                            Goal (Calories)
                        </h1>
                        <p>
                            Head to{" "}
                            <a
                                href="https://www.calculator.net/calorie-calculator.html"
                                target="_blank"
                                className="text-accent-two underline"
                            >
                                this website
                            </a>{" "}
                            to calculate your calorie needs. Come back and enter
                            your value.
                        </p>
                        <div className="flex gap-2 justify-between mt-2">
                            <input
                                type="text"
                                name="Food"
                                placeholder="e.g. 2000"
                                className="rounded-sm p-1 bg-white w-full"
                            />
                            <button className="px-4 bg-accent-one text-white rounded-sm active:brightness-150">
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="bg-foreground rounded-xl mt-10 m-5 flex justify-center drop-shadow-sm active:brightness-75">
                        <SignOut />
                    </div>
                    <div className="text-center">
                        Made with 🔥 by{" "}
                        <a href="https://www.linkedin.com/in/etao12">Etao</a>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="m-5 rounded-xl bg-accent-one text-white flex gap-3 drop-shadow-md justify-center active:brightness-150">
                <SignIn />
                <div className="text-center">
                    Made with 🔥 by{" "}
                    <a href="https://www.linkedin.com/in/etao12">Etao</a>
                </div>
            </div>
        );
    }
}
