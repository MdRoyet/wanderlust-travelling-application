import React from "react";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* 1. Main Background Image and Dark Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/banner.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 2. Hero Content */}
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
