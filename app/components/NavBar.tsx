import Link from "next/link";
import SignIn from "./SignIn";

export default function NavBar() {
    return (
        <div className="my-3 flex justify-center w-full gap-5">
            <span className="px-5 py-3 bg-gray-800 rounded-lg">
                <Link href="/">Home</Link>
            </span>
            <span className="px-5 py-3 bg-gray-800 rounded-lg">
                <Link href="/profile">Profile</Link>
            </span>
        </div>
    );
}
