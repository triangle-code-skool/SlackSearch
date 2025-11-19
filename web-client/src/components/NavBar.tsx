import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
        setIsDark(false);
        document.body.classList.add("light-mode");
        } else {
        setIsDark(true);
        document.body.classList.remove("light-mode");
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (isDark) {
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
        } else {
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="px-4 py-3 flex items-center justify-between"> 
                <span className="text-3xl font-semibold text-white">
                    SlackSearch
                </span>
                <div className="flex gap-6">
                    <Link href="/" className="text-gray-200 hover:text-white">
                        Home
                    </Link>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white">
                        Dashboard
                    </Link>

                    <div className="relative group">
                        <button
                            type="button"
                            onClick={() => setIsDark((prev) => !prev)}
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-600 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform ${
                                isDark ? "translate-x-1" : "translate-x-6"
                            }`}
                            />

                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                                Toggle Dark Mode
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}