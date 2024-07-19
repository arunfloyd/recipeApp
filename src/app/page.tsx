"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const { push } = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const encodedValue = encodeURIComponent(inputVal.trim());
    push(`/predition/${encodedValue}`);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 "
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dbl8uexjf/image/upload/v1721387001/h3s7nuavllkmpzolzay9.png')",
      }}
    >
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 opacity-90">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Search Your Hot Recipe !!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="What can i prepare for You...?"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Lets Grill it
          </button>
        </form>
      </div>
    </div>
  );
}
