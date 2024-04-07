"use client";

// import Image from "next/image";
// import Link from "next/link";
import axios from "axios";

export default function Home() {
  const getData = async () => {
    const response = await axios.get("https://sheets.googleapis.com/v4/spreadsheets/1bzBTNLWFxNaKZG9Lud41QR9OrtfbJaQCOAOJZQePQqQ/values/シート1?key=AIzaSyDSvgOu2Dxm2v41opbiIOk3gSVdQakmQRI");
    console.log(response);
  };

  const handleClick = () => {
    getData();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          getDate
        </button>
        
      </div>
    </main>
  );
}

