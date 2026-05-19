"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function MyBookings() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Custom Modal States
  const [showStatus, setShowStatus] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session) {
      fetchBookings();
    }
  }, [session]);

  const fetchBookings = () => {
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
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const confirmCancel = async () => {
    if (!selectedBooking) return;
    setCancelling(true);
    
    try {
      const response = await fetch(`http://localhost:5000/bookings/${selectedBooking._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsDeleteModalOpen(false);
        setShowStatus(true);
        fetchBookings();
        setTimeout(() => setShowStatus(false), 2500);
      } else {
        alert("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Cancel error:", error);
    } finally {
      setCancelling(false);
      setSelectedBooking(null);
    }
  };

  if (isPending || loading || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen p-20 font-serif text-3xl animate-pulse text-slate-300">
        Loading your adventures...
      </div>
    );
  }

  return (
    <main className="w-full bg-white min-h-screen font-sans relative">
      {/* Header */}
      <section className="bg-slate-900 py-32 px-6 md:px-24">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-col gap-4">
            <span className="text-[#12a8bc] text-[10px] font-black tracking-[0.4em] uppercase">Your Journey</span>
            <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none">
              My Bookings
            </h1>
            <p className="text-white/40 text-lg font-medium max-w-xl">
              Manage your upcoming adventures and past explorations.
            </p>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="max-w-[100rem] mx-auto px-6 md:px-24 py-32">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-8 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h2 className="text-3xl font-serif text-slate-900">No active bookings</h2>
            <Link href="/destinations" className="px-12 py-5 bg-[#12a8bc] text-white text-[10px] font-black tracking-[0.4em] uppercase shadow-xl shadow-cyan-500/20">Explore Destinations</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="group flex flex-col md:flex-row gap-10 p-8 border border-slate-100 hover:border-slate-900 transition-all duration-500 rounded-[2.5rem] overflow-hidden"
              >
                <div className="w-full md:w-80 h-64 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={booking.imageUrl || "/assets/placeholder.png"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="flex flex-col justify-between flex-1 py-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#12a8bc] tracking-[0.3em] uppercase">{booking.status}</span>
                      <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-4xl font-serif text-slate-900 tracking-tight">{booking.destinationName}</h3>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Amount Paid</span>
                      <span className="text-2xl font-bold text-slate-900">${booking.price}</span>
                    </div>
                    <div className="flex gap-4">
                      <Link href={`/destinations/${booking.destinationId}`} className="px-8 py-4 border-2 border-slate-100 text-slate-500 text-[9px] font-black tracking-widest uppercase hover:border-slate-900 hover:text-slate-900 transition-all rounded-full">View Trip</Link>
                      <button 
                        onClick={() => handleCancelClick(booking)}
                        className="px-8 py-4 bg-red-50 text-red-600 text-[9px] font-black tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all rounded-full border border-red-50"
                      >
                        Cancel Trip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SUCCESS STATUS POPUP */}
      {showStatus && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"></div>
          <div className="relative w-full max-w-md bg-white rounded-[3rem] p-16 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center text-center gap-10">
            <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-serif text-slate-900 leading-tight">Trip Cancelled</h2>
              <p className="text-slate-500 font-medium text-lg">Your booking has been removed and your refund is being processed.</p>
            </div>
            <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 animate-progress duration-[2500ms]"></div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] p-12 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center text-center gap-8">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-serif text-slate-900 leading-tight">Cancel this Trip?</h2>
              <p className="text-slate-500 font-medium">Are you sure you want to cancel your journey to <span className="text-slate-900 font-bold">{selectedBooking?.destinationName}</span>?</p>
            </div>
            <div className="flex gap-4 w-full">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 text-xs font-black tracking-widest text-slate-400 hover:text-slate-900 transition-all uppercase">Back</button>
              <button onClick={confirmCancel} disabled={cancelling} className="flex-1 py-4 bg-red-600 text-white font-black tracking-[0.2em] text-[10px] rounded-full shadow-xl shadow-red-500/30 active:scale-95 disabled:opacity-50">
                {cancelling ? "CANCELLING..." : "YES, CANCEL"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
