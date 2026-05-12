import React from "react";
import Link from "next/link";

export default function DestinationCard({ destination }) {
  const {
    _id,
    destinationName,
    country,
    price,
    duration,
    imageUrl,
    rating = "4.5",
  } = destination;

  return (
    <div className="flex flex-col min-w-[320px] md:min-w-[420px] gap-5 group bg-white">
      {/* Flat Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imageUrl || "/assets/placeholder.png"}
          alt={destinationName}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 text-sm font-bold px-3 py-1.5 flex items-center gap-1 shadow-sm">
          {rating}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-500"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 pt-1">
        <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#12a8bc]"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {country}
        </p>

        <div className="flex items-baseline justify-between">
          <h3 className="text-3xl font-serif text-slate-900 group-hover:text-[#12a8bc] transition-colors leading-tight">
            {destinationName}
          </h3>
          <div className="text-2xl font-bold text-slate-900">
            ${price}
            <span className="text-xs font-normal text-slate-500 ml-1">/Person</span>
          </div>
        </div>

        <p className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          {duration}
        </p>

        <Link
          href={`/destinations/${_id}`}
          className="inline-flex items-center gap-1 mt-4 text-sm font-extrabold transition-all text-[#12a8bc] hover:text-cyan-700 w-fit group/link"
        >
          <span className="border-b-2 border-transparent group-hover/link:border-[#12a8bc] pb-0.5 transition-all uppercase tracking-wider">
            BOOK NOW
          </span>
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
            className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
