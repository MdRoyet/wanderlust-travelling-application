"use client";

import React from "react";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavBar() {
  const pathname = usePathname();

  // Solid white background, drop shadow to separate it from the banner
  return (
    <nav className="w-full h-16 bg-white shadow-sm border-b border-slate-100">
      <div className="relative flex items-center justify-between h-full px-4 mx-auto max-w-7xl sm:px-6">
        {/* Left Content */}
        <ul className="hidden sm:flex gap-8">
          <li>
            <Link
              color={pathname === "/" ? "primary" : "foreground"}
              href="/"
              className={`text-sm font-medium ${pathname === "/" ? "underline underline-offset-4 decoration-2" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              color={pathname === "/destinations" ? "primary" : "foreground"}
              href="/destinations"
              className={`text-sm font-medium ${pathname === "/destinations" ? "underline underline-offset-4 decoration-2" : ""}`}
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              color={pathname === "/bookings" ? "primary" : "foreground"}
              href="/bookings"
              className={`text-sm font-medium ${pathname === "/bookings" ? "underline underline-offset-4 decoration-2" : ""}`}
            >
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              color={pathname === "/add-destination" ? "primary" : "foreground"}
              href="/add-destination"
              className={`text-sm font-medium ${pathname === "/add-destination" ? "underline underline-offset-4 decoration-2" : ""}`}
            >
              Add Destinations
            </Link>
          </li>
        </ul>

        {/* Center Content: Logo Image */}
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
              className="flex items-center gap-2 text-sm font-medium transition-colors text-foreground hover:text-primary"
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
              className="text-sm font-medium transition-colors text-foreground hover:text-primary"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
              className="text-sm font-medium transition-colors text-foreground hover:text-primary"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
