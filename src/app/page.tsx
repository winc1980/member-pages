"use client";

// import Image from "next/image";
// import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Profile />
      <Footer />
    </main>
  );
}
