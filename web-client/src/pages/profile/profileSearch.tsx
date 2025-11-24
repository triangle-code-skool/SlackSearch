import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
    console.log("Searching for:", query);
        router.push(`/profile/${query}`);
    };

    return (
    <div>
        <h1 className="text-3xl">
            Profile
        </h1>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="bg-gray-800 text-white rounded border border-gray-600"/>
        <button onClick={handleSearch} className="bg-blue-600 text-white rounded hover:bg-blue-500">
        Search
        </button>
    </div>
    );
}