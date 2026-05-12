"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-20 font-serif text-3xl animate-pulse text-slate-300">
        Loading your adventures...
      </div>
    );
  }

  return (
    <main className="w-full bg-white min-h-screen font-sans">
      {/* Header */}
      <section className="bg-slate-900 py-32 px-6 md:px-24">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-col gap-4">
            <span className="text-[#12a8bc] text-[10px] font-black tracking-[0.4em] uppercase">Your Journey</span>
            <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none">
              My Bookings
            </h1>
            <p className="text-white/40 text-lg font-medium max-w-xl">
              All your upcoming adventures and past explorations in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="max-w-[100rem] mx-auto px-6 md:px-24 py-32">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-8 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-serif text-slate-900">No bookings yet</h2>
              <p className="text-slate-400 font-medium">Your dream destination is just a click away.</p>
            </div>
            <Link 
              href="/destinations" 
              className="px-12 py-5 bg-[#12a8bc] text-white text-[10px] font-black tracking-[0.4em] uppercase hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-500/20"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="group flex flex-col md:flex-row gap-10 p-8 border border-slate-100 hover:border-slate-900 transition-all duration-500 rounded-[2.5rem] overflow-hidden"
              >
                {/* Image */}
                <div className="w-full md:w-80 h-64 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img 
                    src={booking.imageUrl || "/assets/placeholder.png"} 
                    alt={booking.destinationName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1 py-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#12a8bc] tracking-[0.3em] uppercase">
                        {booking.status}
                      </span>
                      <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">
                        {new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-4xl font-serif text-slate-900 tracking-tight leading-tight">
                        {booking.destinationName}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-200"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                        {booking.country}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total Paid</span>
                      <span className="text-2xl font-bold text-slate-900">${booking.price}</span>
                    </div>
                    <Link 
                      href={`/destinations/${booking.destinationId}`}
                      className="px-8 py-4 border-2 border-slate-100 text-slate-500 text-[9px] font-black tracking-widest uppercase hover:border-slate-900 hover:text-slate-900 transition-all rounded-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
