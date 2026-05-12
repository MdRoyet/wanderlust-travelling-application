import React from "react";
import { Button } from "@heroui/react";

export default function Banner() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/assets/banner.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-2xl font-serif">
          Discover Your <br className="hidden sm:block" /> Next Adventure
        </h1>

        <p className="max-w-2xl mb-12 text-lg font-medium text-white/90 sm:text-xl md:text-2xl drop-shadow-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-[#12a8bc] text-white font-bold px-10 rounded-full h-16 shadow-xl shadow-[#12a8bc]/20 hover:bg-cyan-400 transition-all hover:scale-105"
          >
            EXPLORE NOW →
          </Button>

          <Button
            size="lg"
            className="px-10 font-bold text-white rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 h-16 transition-all hover:scale-105"
          >
            VIEW DESTINATIONS
          </Button>
        </div>
      </div>
    </section>
  );
}
