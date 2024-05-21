'use client'
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserInfo() {
    const { data: session } = useSession();
    const [logoutTimer, setLogoutTimer] = useState(null);

    useEffect(() => {
        // Function to handle logout
        const handleLogout = async () => {
            await signOut();
        };

        // Start the logout timer when the component mounts or the session changes
        const startLogoutTimer = () => {
            // Clear existing timer
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
            // Set new timer for 30 minutes
            const timer = setTimeout(handleLogout, 30 * 60 * 1000);
            setLogoutTimer(timer);
        };

        // Start the logout timer
        startLogoutTimer();

        // Clear the timer when the component unmounts
        return () => {
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
        };
    }, [session]);

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
                <div>
                    Name: <span className="font-bold">{session?.user?.name}</span>
                </div>
                <div>
                    Email: <span className="font-bold">{session?.user?.email}</span>
                </div>
                <button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
                    Log Out
                </button>
            </div>
        </div>
    );
}
