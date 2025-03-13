"use client"
import Link from "next/link";
import { headers } from "next/headers";
import { usePathname } from "next/navigation";

interface Route {
    route: string,
    label: string,
}

export default function NavBar() {
    const currentRoute = usePathname();

    const routes: Route[] = [
        { route: "/", label: "Home" },
        { route: "/profile", label: "Settings" },
    ]

    return (
        <div className="bg-accent-one rounded-full my-3 mx-3 p-2 flex justify-center items-center w-fit gap-2 select-none">
            {routes.map((route: Route, index) => {
                return (
                <span key={index} className={`px-5 py-2 rounded-full ${currentRoute === route.route? "bg-foreground text-black" : "bg-primary text-foreground"}`}>
                    <Link href={route.route}>{route.label}</Link>
                </span>
                );})}
        </div>
    );
}
