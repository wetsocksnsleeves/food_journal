"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import Image from "next/image";
import AddEntry from "./components/AddEntry";

interface Item {
    name: string;
    calories: number;
}

export default function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addNew, setAddNew] = useState(false);
    const router = useRouter();

    function sumCalories(data: Item[]) {
        let sum = 0;
        for (const item of data) {
            sum += item.calories;
        }
        return sum;
    }

    function handleAddNew(){
        setAddNew(false);
    }

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
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        ); // Loading indicator
    }

    if (!user) {
        return null; // or a loading state. This will prevent a react error.
    }

    const mockData = [
        { name: "Chicken wings", calories: 100 },
        { name: "Meatballs", calories: 80 },
        { name: "Coke", calories: 100 },
        { name: "Meth", calories: 10 },
        { name: "Cheese burger", calories: 150 },
        { name: "Pussy", calories: 5 },
        { name: "Her titty milk", calories: 50 },
        { name: "Pussy", calories: 5 },
        { name: "Her titty milk", calories: 50 },
        { name: "Pussy", calories: 5 },
        { name: "Her titty milk", calories: 50 },
        { name: "Pussy", calories: 5 },
        { name: "Her titty milk", calories: 50 },
        { name: "Pussy", calories: 5 },
        { name: "Her titty milk", calories: 50 },
        { name: "Pussy", calories: 5 },
        { name: "Her titty milk", calories: 50 },
        { name: "Steak", calories: 271 },
    ];

    const mockResult = sumCalories(mockData);
    const mockGoal = 1000;

    return (
        <div className="py-6 mx-4 flex flex-col items-center gap-2">
            <span className="text-3xl">Welcome Back, {user.displayName}</span>
            <span className="text-xl italic mb-8">
                Lets track your diet today.
            </span>
            <div className="pt-[23px] pb-[23px] w-full relative">
                <div className="text-gray-700 flex flex-col justify-start items-center px-3 py-1 bg-white w-full min-h-50 break-all">
                    <div className="px-3 w-full flex justify-between">
                        <span className="w-1/4 text-2xl active:scale-150 transition-all">{`<`}</span>
                        <h1 className="text-xl font-bold">31/12/2003</h1>
                        <span className="text-right w-1/4 text-2xl active:scale-150 transition-all">{`>`}</span>
                    </div>
                    <p>---------------------------------------------</p>
                    <div className="mb-2 px-2 w-full flex justify-between font-bold">
                        <h1>ITEMS</h1>
                        <h1>CALORIES</h1>
                    </div>
                    {mockData.map((item: Item, index) => {
                        return (
                            <div
                                key={index}
                                className="px-2 w-full flex justify-between"
                            >
                                <p>{item.name}</p>
                                <p>{item.calories}</p>
                            </div>
                        );
                    })}
                    {addNew ? (
                        <div>
                            <div className="mt-2 px-2 py-1 w-full rounded-lg flex justify-center font-bold gap-2">
                                <input
                                    type="text"
                                    name="Food"
                                    placeholder="e.g. Steak"
                                    className="rounded-sm outline p-1 bg-white flex-grow-1"
                                />
                                <input
                                    type="text"
                                    name="Calories"
                                    placeholder="e.g. 270"
                                    className="rounded-sm outline p-1 bg-white w-full"
                                />
                            </div>
                            <div className="mt-2 px-2 py-1 w-full rounded-lg flex justify-center font-bold" onClick={handleAddNew}>
                               Confirm 
                            </div>
                        </div>
                    ) : (
                        <div className="mt-2 px-2 py-1 w-full rounded-lg flex justify-center font-bold" onClick={() => setAddNew(true)}>
                            Add new
                        </div>
                    )}
                    <p>---------------------------------------------</p>
                    <div className="px-2 w-full flex justify-between">
                        <h1 className="font-bold">GOAL</h1>
                        <h1 className="">{mockGoal}</h1>
                    </div>
                    <div className="px-2 w-full flex justify-between">
                        <h1 className="font-bold">TOTAL</h1>
                        <h1 className="">{mockResult}</h1>
                    </div>
                    <p>---------------------------------------------</p>
                    <div className="px-2 w-full flex justify-between">
                        <h1 className="font-bold">RESULT</h1>
                        <h1 className="">{mockGoal - mockResult}</h1>
                    </div>
                    <div className="mt-4 px-2 py-3 w-full">
                        <img
                            src="/barcode.png"
                            alt="Amor vincit omnia"
                            className="opacity-100 object-fill"
                        />
                    </div>
                </div>
                <img
                    src="/serrated-edge.svg"
                    alt="top edge"
                    className="absolute left-0 top-0 "
                />
                <img
                    src="/serrated-edge.svg"
                    alt="bottom edge"
                    className="absolute left-0 bottom-0 scale-y-[-1]"
                />
            </div>
        </div>
    );
}
