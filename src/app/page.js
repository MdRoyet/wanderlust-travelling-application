import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function Home() {
  const activePath = "/";

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* 1. Main Background Image and Dark Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/banner.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 2. Floating White NavBar */}
      <div className="relative z-50 w-full px-4 pt-4 mx-auto sm:px-8 sm:pt-6 max-w-[100rem]">
        {/* Added 'relative' here to ensure the absolute logo centers correctly within the nav */}
        <nav className="relative flex items-center w-full px-6 bg-white h-16 shadow-lg">
          {/* Left Content */}
          <ul className="hidden sm:flex gap-8">
            <li>
              <Link
                href="/"
                className={`text-sm font-medium ${activePath === "/" ? "text-[#12a8bc] underline underline-offset-4 decoration-2" : "text-slate-800 no-underline hover:text-[#12a8bc]"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/destinations"
                className={`text-sm font-medium ${activePath === "/destinations" ? "text-[#12a8bc] underline underline-offset-4 decoration-2" : "text-slate-800 no-underline hover:text-[#12a8bc]"}`}
              >
                Destinations
              </Link>
            </li>
            <li>
              <Link
                href="/bookings"
                className={`text-sm font-medium ${activePath === "/bookings" ? "text-[#12a8bc] underline underline-offset-4 decoration-2" : "text-slate-800 no-underline hover:text-[#12a8bc]"}`}
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className={`text-sm font-medium ${activePath === "/admin" ? "text-[#12a8bc] underline underline-offset-4 decoration-2" : "text-slate-800 no-underline hover:text-[#12a8bc]"}`}
              >
                Admin
              </Link>
            </li>
          </ul>

          {/* Center Content: Logo Image (Now correctly centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/">
              <Image
                src="/assets/Wanderlast.png"
                alt="Wanderlust Logo"
                width={160}
                height={40}
                className="w-auto h-7 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right Content */}
          <ul className="flex items-center gap-6 ml-auto">
            <li className="hidden md:flex">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium transition-colors text-slate-800 hover:text-[#12a8bc] no-underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-sm font-medium transition-colors text-slate-800 hover:text-[#12a8bc] no-underline"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-sm font-medium transition-colors text-slate-800 hover:text-[#12a8bc] no-underline"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* 3. Hero Content */}
      <main className="relative z-10 flex items-center justify-center flex-1 w-full px-6 text-center">
        <div className="flex flex-col items-center max-w-6xl">
          <h1 className="mb-6 text-5xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl">
            Discover Your <br className="hidden sm:block" /> Next Adventure
          </h1>

          <p className="max-w-2xl mb-12 text-lg font-medium text-white/95 sm:text-xl">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-[#12a8bc] text-white font-bold px-10 rounded-none h-14"
              endContent={<span className="text-2xl font-normal">→</span>}
            >
              EXPLORE NOW
            </Button>

            <Button
              size="lg"
              className="px-10 font-bold text-white rounded-none bg-white/30 backdrop-blur-sm hover:bg-white/40 h-14"
            >
              VIEW DESTINATION
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
