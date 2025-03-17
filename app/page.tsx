"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase";
import HoldDetector from "./components/HoldDetector";
import debounce from "lodash/debounce";
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
    setDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";

interface Item {
    name: string;
    calories: number;
}

export default function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addNew, setAddNew] = useState(false);
    const router = useRouter();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const [todaysDate, setTodaysDate] = useState(`${year}-${month}-${day}`);
    const [isEditing, setIsEditing] = useState(false);
    const [allowEdit, setAllowEdit] = useState(false);

    // Firestore
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const [userGoal, setUserGoal] = useState(0);
    const userResult = sumCalories(data);

    function sumCalories(data: Item[]) {
        let sum = 0;
        for (const item of data) {
            sum += Number(item.calories);
        }
        return sum;
    }

    async function handleAddNew() {
        const foodValue = document.getElementById("Food").value;
        const calorieValue = document.getElementById("Calories").value;

        setAddNew(false);

        // Send the info to the datebase
        if (foodValue !== "" && calorieValue != "") {
            const newEntry: Item = { name: foodValue, calories: calorieValue };
            const dateDocRef = doc(db, "users", user.uid, "dates", todaysDate);

            await updateDoc(dateDocRef, {
                data: arrayUnion(newEntry),
            });
        }
    }

    const handleStopEditing = () => {
        setIsEditing(false);
        setAllowEdit(false);
    };

    const handleHold = () => {
        setIsEditing(true);
        setTimeout(() => {
            setAllowEdit(true);
        }, 500);
    };

    async function handleEdit(item: Item) {
        if (allowEdit) {
            toast.warning(`Deleted "${item.name}"`, {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
            });

            // Remove the item from Firestore
            try {
                const dateDocRef = doc(
                    db,
                    "users",
                    user.uid,
                    "dates",
                    todaysDate,
                );

                await updateDoc(dateDocRef, {
                    data: arrayRemove(item),
                });

                console.log("Item removed from array.");
            } catch (error) {
                console.error("Error removing item: ", error);
            }
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(authUser);

            if (!authUser) {
                router.push("/profile");
            } else if (authUser) {
                try {
                    console.log("Fetching user information");

                    const userDocRef = doc(db, "users", authUser.uid); // Create docRef with uid as ID
                    const docSnapshot = await getDoc(userDocRef);

                    if (docSnapshot.exists()) {
                        setUsername(docSnapshot.data().username);
                        setUserGoal(docSnapshot.data().goal);
                    }

                    const dailyNotesDoc = doc(
                        db,
                        "users",
                        authUser.uid,
                        "dates",
                        todaysDate,
                    );

                    const dailyNotesSnapshot = await getDoc(dailyNotesDoc);

                    if (dailyNotesSnapshot.exists()) {
                        console.log(
                            "Attaching listener to today's data. Fetching...",
                        );
                        const unsubscribe = onSnapshot(
                            dailyNotesDoc,
                            (docSnapshot) => {
                                if (docSnapshot.exists()) {
                                    setData(docSnapshot.data().data);
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
                        console.log(
                            "No daily note found for today. Creating one...",
                        );
                        try {
                            await setDoc(dailyNotesDoc, { data: [] }); // Create the document with an empty data array
                            console.log("New date document created.");
                            setData([]); // Set data to empty array in state
                        } catch (error) {
                            console.error(
                                "Error creating date document: ",
                                error,
                            );
                            setData([]); // Still set data to empty array in state, but log error
                        }
                    }
                } catch (error) {
                    console.error("Error handling user document: ", error);
                }
            }
            setLoading(false);
        });

        // Close the snapshot listener
        return () => unsubscribe();
    }, [router]); // Added router to dependency array

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        ); // Loading indicator
    }

    if (!user) {
        return null; // or a loading state. This will prevent a react error.
    }

    return (
        <div
            className="py-6 mx-4 flex flex-col items-center gap-2 drop-shadow-lg"
            onClick={handleStopEditing}
        >
            <div className="flex flex-col justify-center items-center text-center mb-8">
                <span className="text-3xl mb-2">Welcome Back, {username}</span>
                <span className="text-lg italic">
                    Lets track your diet today.
                </span>
            </div>
            <div className="pt-[23px] pb-[23px] w-full relative">
                <div className="text-text flex flex-col justify-start items-center px-3 py-8 bg-white w-full min-h-50 break-all">
                    <div className="px-3 w-full flex justify-between">
                        <span className="w-1/4 text-2xl active:scale-150 transition-all">{`<`}</span>
                        <h1 className="text-xl font-bold">{todaysDate}</h1>
                        <span className="text-right w-1/4 text-2xl active:scale-150 transition-all">{`>`}</span>
                    </div>
                    <hr className="m-2 w-[98%] border-1 border-text border-dashed" />
                    <div className="mb-2 px-2 w-full flex justify-between font-bold">
                        <h1>ITEMS</h1>
                        <h1>CALORIES</h1>
                    </div>
                    <HoldDetector
                        onHold={handleHold}
                        onClick={(event) => event.stopPropagation()}
                        className="w-full"
                    >
                        {data.map((item: Item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`w-full flex justify-between ${isEditing ? "px-1" : "px-2"}`}
                                    onClick={() => handleEdit(item)}
                                >
                                    <div className="flex justify-center gap-1">
                                        {isEditing ? (
                                            <img
                                                src="/remove.svg"
                                                alt="Delete"
                                                className="scale-75"
                                            />
                                        ) : (
                                            ""
                                        )}
                                        <p>{item.name}</p>
                                    </div>
                                    <p>{item.calories}</p>
                                </div>
                            );
                        })}
                    </HoldDetector>

                    {addNew ? (
                        <div>
                            <div className="mt-2 px-2 py-1 w-full rounded-lg flex justify-center gap-2">
                                <input
                                    type="text"
                                    id="Food"
                                    placeholder="e.g. Steak"
                                    className="rounded-sm outline p-1 bg-white flex-grow-1"
                                />
                                <input
                                    type="number"
                                    id="Calories"
                                    placeholder="e.g. 270"
                                    className="rounded-sm outline p-1 bg-white w-full text-right"
                                />
                            </div>
                            <div
                                className="mt-2 px-2 py-1 w-full rounded-lg flex justify-center font-bold"
                                onClick={handleAddNew}
                            >
                                Confirm
                            </div>
                        </div>
                    ) : (
                        <div
                            className="mt-2 px-2 py-1 w-full rounded-lg flex justify-center font-bold"
                            onClick={() => setAddNew(true)}
                        >
                            Add new
                        </div>
                    )}
                    <hr className="m-2 w-[98%] border-1 border-text border-dashed" />
                    <div className="px-2 w-full flex justify-between">
                        <h1 className="font-bold">GOAL</h1>
                        <h1 className="">{`≤ ${userGoal}`}</h1>
                    </div>
                    <div className="px-2 w-full flex justify-between">
                        <h1 className="font-bold">TOTAL</h1>
                        <h1 className="">{userResult}</h1>
                    </div>
                    <hr className="m-2 w-[98%] border-1 border-text border-dashed" />
                    <div className="px-2 w-full flex justify-between">
                        <h1 className="font-bold">REMAINING</h1>
                        <h1 className="">{userGoal - userResult}</h1>
                    </div>
                    <div className="mt-4 px-2 py-3 w-full">
                        <img
                            src="/barcode.png"
                            alt="Amor vincit omnia"
                            className="opacity-100 object-fill"
                        />
                    </div>
                </div>
                <div className="absolute left-0 top-0 w-full h-[23px] bg-[url('/serrated-edge.svg')] bg-repeat-x bg-cover"></div>
                <div className="absolute left-0 bottom-[1px] w-full h-[23px] bg-[url('/serrated-edge.svg')] bg-repeat-x bg-cover transform scale-y-[-1]"></div>
            </div>
        </div>
    );
}
