"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import DestinationCard from "./DestinationCard";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Only show the first 5 for the featured section
  const featuredOnly = destinations.slice(0, 5);

  useEffect(() => {
    fetch("http://localhost:5000/destinations")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch destinations:", err);
        setLoading(false);
      });
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (loading || featuredOnly.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      if (currentIndex < featuredOnly.length) {
        scrollRight();
      } else {
        // Loop back to start
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
          setCurrentIndex(1);
        }
      }
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, [loading, featuredOnly.length, currentIndex, isPaused]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -450, behavior: "smooth" });
      setCurrentIndex((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 450, behavior: "smooth" });
      setCurrentIndex((prev) =>
        prev < featuredOnly.length ? prev + 1 : featuredOnly.length
      );
    }
  };

  if (loading) {
    return (
      <section className="w-full py-24 bg-white">
        <div className="px-4 mx-auto max-w-[100rem] sm:px-8">
          <div className="h-10 w-64 bg-slate-100 animate-pulse mb-12"></div>
          <div className="flex gap-8 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[400px] aspect-[4/3] bg-slate-50 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) return null;

  return (
    <section 
      className="w-full py-24 bg-white animate-in fade-in slide-in-from-bottom-10 duration-1000"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="px-4 mx-auto max-w-[100rem] sm:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-8 mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-5xl font-serif text-slate-900 sm:text-6xl tracking-tight leading-tight">
              Featured Destinations
            </h2>
            <p className="text-xl text-slate-500 font-medium">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="flex items-center gap-3 px-8 py-3.5 text-xs font-black tracking-[0.2em] text-[#12a8bc] border-2 border-[#12a8bc] hover:bg-[#12a8bc] hover:text-white transition-all duration-500 uppercase"
          >
            ALL DESTINATIONS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Slider Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-10 pb-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredOnly.map((dest, index) => (
            <div key={index} className="snap-start">
              <DestinationCard destination={dest} />
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-8 mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-serif text-slate-900">
              {currentIndex.toString().padStart(2, "0")}
            </span>
            <span className="text-sm font-bold text-slate-300">
              / {featuredOnly.length.toString().padStart(2, "0")}
            </span>
          </div>
          
          <div className="flex-1 h-[2px] bg-slate-100 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#12a8bc] transition-all duration-500"
              style={{ width: `${(currentIndex / featuredOnly.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 1}
              className="flex items-center justify-center w-14 h-14 transition-all border-2 rounded-full border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-x-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              disabled={currentIndex === featuredOnly.length}
              className="flex items-center justify-center w-14 h-14 transition-all border-2 rounded-full border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
