"use client";

import React from "react";
// Look how much cleaner the imports are now using dot-notation!
import {
  TextField,
  Input,
  Label,
  FieldError,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";

export default function AddDestination() {
  const categories = [
    { id: "Beach", label: "Beach" },
    { id: "Mountain", label: "Mountain" },
    { id: "City", label: "City" },
    { id: "Adventure", label: "Adventure" },
    { id: "Cultural", label: "Cultural" },
    { id: "Luxury", label: "Luxury" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Gradient Header */}
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 text-center drop-shadow-sm">
        Add New Travel Package
      </h1>

      {/* Main Form Container with Glassmorphism */}
      <form className="relative space-y-8 bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-white overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <TextField
            name="destinationName"
            isRequired
            className="md:col-span-2 flex flex-col gap-2 group"
          >
            <Label className="text-sm font-semibold text-slate-700 group-focus-within:text-cyan-600 transition-colors">
              Destination Name
            </Label>
            <Input
              placeholder="e.g. Bali Paradise"
              className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition-all shadow-sm group-hover:border-cyan-400"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <TextField
            name="country"
            isRequired
            className="flex flex-col gap-2 group"
          >
            <Label className="text-sm font-semibold text-slate-700 group-focus-within:text-cyan-600 transition-colors">
              Country
            </Label>
            <Input
              placeholder="e.g. Indonesia"
              className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition-all shadow-sm group-hover:border-cyan-400"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Corrected Category Dropdown using HeroUI v3 Dot Notation */}
          <Select
            name="category"
            isRequired
            className="flex flex-col gap-2 group"
          >
            <Label className="text-sm font-semibold text-slate-700 group-focus-within:text-cyan-600 transition-colors">
              Category
            </Label>
            <Select.Trigger className="flex items-center justify-between p-3 border rounded-xl bg-white shadow-sm hover:border-cyan-400 data-[focus-visible=true]:border-cyan-500 data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-cyan-100 outline-none transition-all cursor-pointer">
              <Select.Value
                placeholder="Select a category"
                className="text-sm data-[placeholder]:text-slate-400"
              />
              <Select.Indicator>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-400 group-hover:text-cyan-500 transition-colors"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden min-w-[var(--trigger-width)] animate-in fade-in zoom-in-95 duration-200 origin-top z-50">
              <ListBox className="p-1 outline-none">
                {categories.map((cat) => (
                  <ListBox.Item
                    key={cat.id}
                    id={cat.id}
                    textValue={cat.label}
                    className="p-3 text-sm rounded-lg cursor-pointer hover:bg-cyan-50 outline-none data-[focused=true]:bg-cyan-50 transition-colors flex items-center justify-between group"
                  >
                    {({ isSelected }) => (
                      <>
                        <span
                          className={
                            isSelected
                              ? "font-bold text-cyan-600"
                              : "text-slate-700"
                          }
                        >
                          {cat.label}
                        </span>
                        {isSelected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-cyan-600"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </>
                    )}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField
            name="price"
            type="number"
            isRequired
            className="flex flex-col gap-2 group"
          >
            <Label className="text-sm font-semibold text-slate-700 group-focus-within:text-cyan-600 transition-colors">
              Price (USD)
            </Label>
            <Input
              placeholder="1299"
              className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition-all shadow-sm group-hover:border-cyan-400"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <TextField
            name="duration"
            isRequired
            className="flex flex-col gap-2 group"
          >
            <Label className="text-sm font-semibold text-slate-700 group-focus-within:text-cyan-600 transition-colors">
              Duration
            </Label>
            <Input
              placeholder="7 Days / 6 Nights"
              className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition-all shadow-sm group-hover:border-cyan-400"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <TextField
            name="departureDate"
            isRequired
            className="md:col-span-2 flex flex-col gap-2 group"
          >
            <Label className="text-sm font-semibold text-slate-700 group-focus-within:text-cyan-600 transition-colors">
              Departure Date
            </Label>
            <Input
              type="date"
              className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition-all shadow-sm group-hover:border-cyan-400"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <TextField
            name="imageUrl"
            isRequired
            className="md:col-span-2 flex flex-col gap-2 group"
          >
            <Label className="text-sm font-semibold text-slate-700 group-focus-within:text-cyan-600 transition-colors">
              Image URL
            </Label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition-all shadow-sm group-hover:border-cyan-400"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>

          <TextField
            name="description"
            isRequired
            className="md:col-span-2 flex flex-col gap-2 group"
          >
            <Label className="text-sm font-semibold text-slate-700 group-focus-within:text-cyan-600 transition-colors">
              Description
            </Label>
            <TextArea
              placeholder="Describe the travel experience..."
              className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-cyan-100 focus:border-cyan-500 outline-none transition-all shadow-sm group-hover:border-cyan-400 min-h-[120px] resize-none"
            />
            <FieldError className="text-xs text-red-500" />
          </TextField>
        </div>

        {/* Animated Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full relative z-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold h-14 rounded-2xl shadow-lg shadow-cyan-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-300 hover:from-cyan-400 hover:to-blue-400 active:scale-95"
        >
          Add Travel Package
        </Button>
      </form>
    </div>
  );
}
