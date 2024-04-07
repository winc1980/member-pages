"use client";

// import Image from "next/image";
// import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Home({ initialData }) {
  const [sheetData, setSheetData] = useState(initialData);

  const getData = async () => {
    try {
      // APIKeyは各自で取得
      const response = await axios.get("https://sheets.googleapis.com/v4/spreadsheets/1bzBTNLWFxNaKZG9Lud41QR9OrtfbJaQCOAOJZQePQqQ/values/シート1?key=");
      const team = response['data']['values'][0];
      const budget = response['data']['values'][1];
      console.log(team);
      console.log(budget);
      setSheetData(response['data']['values']);
      console.log(sheetData);
    } catch(error) {
      console.error("Error fetching data:", error);
    }
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
        {sheetData && (
        <div>
          {/* <p>{ sheetData }</p> */}
          <p>{ sheetData[0][0] }</p>
          <p>{ sheetData[0][1] } : { sheetData[1][0]}</p>
          <p>{ sheetData[0][2] } : { sheetData[1][1]}</p>
          <p>{ sheetData[0][3] } : { sheetData[1][2]}</p>
        </div>
      )}
      </div>
    </main>
  );
}
