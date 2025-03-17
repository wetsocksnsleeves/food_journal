"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase"; // Your firebase config
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import Image from "next/image";
import {
    query,
    where,
    addDoc,
    collection,
    getDocs,
    doc,
    onSnapshot,
    getDoc,
    updateDoc,
    setDoc
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Firestore
    const [username, setUsername] = useState("");
    const [editUsername, setEditUsername] = useState(false);
    const [userGoal, setUserGoal] = useState("");

    async function handleUserNameEdit() {
        if (editUsername) {
            // Update the username
            setEditUsername(false);
            const newUsername = document.getElementById("Username").value;

            if (newUsername) {
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    username: newUsername,
                });
            }
        } else {
            setEditUsername(true);
        }
    }

    async function handleUserGoalEdit() {
        // Update the username
        setEditUsername(false);
        const newUserGoal = document.getElementById("Goal").value;

        if (newUserGoal) {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                goal: newUserGoal,
            });
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(authUser);
            if (authUser) {
                try {
                    const userDocRef = doc(db, "users", authUser.uid); // Create docRef with uid as ID
                    const docSnapshot = await getDoc(userDocRef);

                    if (docSnapshot.exists()) {
                        console.log(
                            "User document already exists. Fetching user data",
                        );
                        const unsubscribe = onSnapshot(
                            userDocRef,
                            (docSnapshot) => {
                                if (docSnapshot.exists()) {
                                    setUsername(docSnapshot.data().username);
                                    setUserGoal(docSnapshot.data().goal);
                                } else {
                                    console.log("User document not found.");
                                }
                            },
                            (error) => {
                                console.error(
                                    "Error listening to username: ",
                                    error,
                                );
                            },
                        );
                    } else {
                        await setDoc(
                            userDocRef,
                            {
                                // Create or update document
                                email: authUser.email,
                                username: authUser.displayName,
                                uid: authUser.uid,
                                goal: 0,
                            },
                            { merge: true },
                        ); // Use merge to prevent overwriting existing data

                        console.log(
                            "User document created with ID: ",
                            authUser.uid,
                        );
                    }
                } catch (error) {
                    console.error("Error handling user document: ", error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup the listener
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        ); // Loading indicator
    }

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
                            {editUsername ? (
                                <div className="flex flex-col justify-center items-center gap-1">
                                    <input
                                        type="text"
                                        id="Username"
                                        placeholder={username}
                                        className="rounded-sm p-1 bg-white w-full mb-2 text-center"
                                    />
                                    <label
                                        onClick={handleUserNameEdit}
                                        className="text-sm text-accent-two cursor-pointer active:brightness-150"
                                    >
                                        Confirm
                                    </label>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center gap-1">
                                    <h1 className="text-2xl">{username}</h1>
                                    <label
                                        onClick={handleUserNameEdit}
                                        className="text-sm text-accent-two cursor-pointer active:brightness-150"
                                    >
                                        Edit
                                    </label>
                                </div>
                            )}
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
                                id="Goal"
                                placeholder={userGoal}
                                className="rounded-sm p-1 bg-white w-full"
                            />
                            <button
                                className="px-4 bg-accent-one text-white rounded-sm active:brightness-150"
                                onClick={handleUserGoalEdit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
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
            <div>
                <SignIn />
                <div className="text-center">
                    Made with 🔥 by{" "}
                    <a href="https://www.linkedin.com/in/etao12">Etao</a>
                </div>
            </div>
        );
    }
}
