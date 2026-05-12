"use client";

import React, { useEffect, useState, useMemo } from "react";
// 1. These are the ONLY three imports you need for the dropdowns
import { Select, ListBox, ListBoxItem } from "@heroui/react";
import DestinationCard from "../components/DestinationCard";

export default function AllDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

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

  const filteredDestinations = useMemo(() => {
    let result = [...destinations];
    if (category !== "all") {
      result = result.filter(
        (d) => d.category.toLowerCase() === category.toLowerCase(),
      );
    }
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((d) => {
        const p = Number(d.price);
        if (max) return p >= min && p <= max;
        return p >= min;
      });
    }
    result.sort((a, b) => {
      if (sortBy === "price-low") return Number(a.price) - Number(b.price);
      if (sortBy === "price-high") return Number(b.price) - Number(a.price);
      if (sortBy === "name")
        return a.destinationName.localeCompare(b.destinationName);
      return 0;
    });
    return result;
  }, [destinations, category, priceRange, sortBy]);

  if (loading)
    return (
      <div className="p-20 font-serif text-2xl text-center">
        Loading Destinations...
      </div>
    );

  return (
    <main className="max-w-[100rem] mx-auto px-6 sm:px-12 py-16 animate-in fade-in duration-1000">
      <header className="mb-12">
        <h1 className="mb-4 font-serif text-5xl tracking-tight text-slate-900">
          Explore All Destinations
        </h1>
        <p className="max-w-2xl font-medium text-xl text-slate-500">
          Find your perfect travel experience from our curated collection
        </p>
      </header>

      {/* Unified Filter Bar */}
      <div className="grid grid-cols-1 overflow-hidden bg-white border shadow-sm md:grid-cols-3 border-slate-200 rounded-xl mb-10">
        {/* Category Dropdown */}
        <Select
          placeholder="All Categories"
          selectedKeys={[category]}
          onSelectionChange={(keys) => setCategory(Array.from(keys)[0])}
          className="w-full border-b md:border-b-0 md:border-r border-slate-200"
        >
          <Select.Trigger className="flex items-center justify-between w-full px-8 bg-transparent border-none rounded-none shadow-none outline-none h-20 hover:bg-slate-50 data-[open=true]:bg-slate-50 transition-colors group cursor-pointer">
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-[10px] font-black tracking-[0.15em] text-slate-400 uppercase mb-1">
                Category
              </span>
              <Select.Value className="text-sm font-bold truncate text-slate-800" />
            </div>
            <Select.Indicator className="transition-colors text-slate-300 group-hover:text-[#12a8bc]">
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Select.Indicator>
          </Select.Trigger>

          {/* THE FIX: ListBoxItem is now wrapped safely inside ListBox! */}
          <Select.Popover className="bg-white border border-slate-100 shadow-2xl rounded-xl min-w-[250px] z-50 p-1.5">
            <ListBox className="outline-none">
              <ListBoxItem
                id="all"
                textValue="All Categories"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                All Categories
              </ListBoxItem>
              <ListBoxItem
                id="beach"
                textValue="Beach"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                Beach
              </ListBoxItem>
              <ListBoxItem
                id="mountain"
                textValue="Mountain"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                Mountain
              </ListBoxItem>
              <ListBoxItem
                id="city"
                textValue="City"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                City
              </ListBoxItem>
              <ListBoxItem
                id="adventure"
                textValue="Adventure"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                Adventure
              </ListBoxItem>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Price Dropdown */}
        <Select
          placeholder="Any Price"
          selectedKeys={[priceRange]}
          onSelectionChange={(keys) => setPriceRange(Array.from(keys)[0])}
          className="w-full border-b md:border-b-0 md:border-r border-slate-200"
        >
          <Select.Trigger className="flex items-center justify-between w-full px-8 bg-transparent border-none rounded-none shadow-none outline-none h-20 hover:bg-slate-50 data-[open=true]:bg-slate-50 transition-colors group cursor-pointer">
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-[10px] font-black tracking-[0.15em] text-slate-400 uppercase mb-1">
                Price Range
              </span>
              <Select.Value className="text-sm font-bold truncate text-slate-800" />
            </div>
            <Select.Indicator className="transition-colors text-slate-300 group-hover:text-[#12a8bc]">
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Select.Indicator>
          </Select.Trigger>

          <Select.Popover className="bg-white border border-slate-100 shadow-2xl rounded-xl min-w-[250px] z-50 p-1.5">
            <ListBox className="outline-none">
              <ListBoxItem
                id="all"
                textValue="Any Price"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                Any Price
              </ListBoxItem>
              <ListBoxItem
                id="0-500"
                textValue="$0 - $500"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                $0 - $500
              </ListBoxItem>
              <ListBoxItem
                id="500-1500"
                textValue="$500 - $1500"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                $500 - $1500
              </ListBoxItem>
              <ListBoxItem
                id="1500"
                textValue="$1500+"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                $1500+
              </ListBoxItem>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Sort Dropdown */}
        <Select
          placeholder="Newest First"
          selectedKeys={[sortBy]}
          onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
          className="w-full"
        >
          <Select.Trigger className="flex items-center justify-between w-full px-8 bg-transparent border-none rounded-none shadow-none outline-none h-20 hover:bg-slate-50 data-[open=true]:bg-slate-50 transition-colors group cursor-pointer">
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-[10px] font-black tracking-[0.15em] text-slate-400 uppercase mb-1">
                Sort By
              </span>
              <Select.Value className="text-sm font-bold truncate text-slate-800" />
            </div>
            <Select.Indicator className="transition-colors text-slate-300 group-hover:text-[#12a8bc]">
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Select.Indicator>
          </Select.Trigger>

          <Select.Popover className="bg-white border border-slate-100 shadow-2xl rounded-xl min-w-[250px] z-50 p-1.5">
            <ListBox className="outline-none">
              <ListBoxItem
                id="newest"
                textValue="Newest First"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                Newest First
              </ListBoxItem>
              <ListBoxItem
                id="price-low"
                textValue="Price: Low to High"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                Price: Low to High
              </ListBoxItem>
              <ListBoxItem
                id="price-high"
                textValue="Price: High to Low"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                Price: High to Low
              </ListBoxItem>
              <ListBoxItem
                id="name"
                textValue="Alphabetical"
                className="p-3 text-sm font-bold transition-colors rounded-lg cursor-pointer text-slate-700 data-[hover=true]:bg-cyan-50 data-[hover=true]:text-[#12a8bc]"
              >
                Alphabetical
              </ListBoxItem>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="mb-10 text-sm font-medium text-slate-500">
        Showing{" "}
        <span className="text-slate-900 font-bold underline decoration-[#12a8bc] decoration-2 underline-offset-4">
          {filteredDestinations.length}
        </span>{" "}
        destinations
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 gap-x-12">
        {filteredDestinations.map((dest, index) => (
          <div
            key={dest._id}
            className="duration-700 animate-in fade-in slide-in-from-bottom-8"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <DestinationCard destination={dest} />
          </div>
        ))}
      </div>
    </main>
  );
}
