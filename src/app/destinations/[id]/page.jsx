"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Select as HeroSelect,
  ListBox,
  ListBoxItem,
  Popover,
  SelectTrigger,
  SelectValue,
  SelectIndicator
} from "@heroui/react";
import { useSession } from "@/lib/auth-client";

export default function DestinationDetails({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Custom Success Popup State
  const [showStatus, setShowStatus] = useState(null); // 'booking-success' | 'update-success' | 'delete-success' | null
  
  // Form/Action State
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    fetchDestination();
  }, [id]);

  const fetchDestination = () => {
    fetch(`http://localhost:5000/destinations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDestination(data);
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch destination:", err);
        setLoading(false);
      });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`http://localhost:5000/destinations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchDestination();
        setIsModalOpen(false);
        setShowStatus('update-success');
        setTimeout(() => setShowStatus(null), 3000);
      } else {
        alert("Failed to update details");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/destinations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowStatus('delete-success');
        setTimeout(() => {
          router.push("/destinations");
        }, 2000);
      } else {
        alert("Failed to delete destination");
        setDeleting(false);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
      setDeleting(false);
    }
  };

  const handleBooking = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setBooking(true);
    const bookingData = {
      destinationId: destination._id,
      destinationName: destination.destinationName,
      country: destination.country,
      price: destination.price,
      imageUrl: destination.imageUrl,
      bookingDate: new Date().toISOString(),
      status: "Confirmed"
    };

    try {
      const response = await fetch(`http://localhost:5000/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setShowStatus('booking-success');
        setTimeout(() => {
          router.push("/my-bookings");
        }, 2500);
      } else {
        alert("Reservation failed");
        setBooking(false);
      }
    } catch (error) {
      console.error("Booking error:", error);
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-20 font-serif text-3xl animate-pulse text-slate-300">
        Discovering your next adventure...
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-20 gap-8">
        <h1 className="text-4xl font-serif text-slate-900">Destination Not Found</h1>
        <Link href="/destinations" className="text-[#12a8bc] font-bold border-b-2 border-[#12a8bc]">
          Back to Explore
        </Link>
      </div>
    );
  }

  const {
    destinationName,
    country,
    price,
    duration,
    imageUrl,
    description,
    category,
    rating = "4.8",
  } = destination;

  return (
    <main className="w-full bg-white animate-in fade-in duration-1000 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[75vh] min-h-[650px] bg-slate-900 overflow-hidden">
        <img
          src={imageUrl || "/assets/placeholder.png"}
          alt={destinationName}
          className="object-cover w-full h-full opacity-60 animate-in zoom-in duration-[3000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-12 md:p-24 max-w-[100rem] mx-auto">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-[#12a8bc] text-white text-[10px] font-black tracking-[0.2em] uppercase">
                {category || "Uncategorized"}
              </span>
              <div className="flex items-center gap-1.5 text-white/90 text-sm font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                {rating} (240 Reviews)
              </div>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif text-white tracking-tighter leading-none">
              {destinationName}
            </h1>
            <div className="flex flex-wrap items-center gap-12 text-white/80 font-medium uppercase tracking-widest text-lg">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#12a8bc]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                {country}
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#12a8bc]"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                {duration}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="max-w-[100rem] mx-auto px-6 md:px-24 py-32 grid grid-cols-1 lg:grid-cols-3 gap-24">
        
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-24">
          <div className="flex flex-col gap-10">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Description</h2>
            <p className="text-3xl text-slate-700 leading-relaxed font-serif italic">
              "{description || "Experience the breathtaking beauty and unique culture of this incredible destination."}"
            </p>
          </div>

          {/* Itinerary */}
          <div className="flex flex-col gap-12">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">The Itinerary</h2>
            <div className="flex flex-col gap-0">
              {[
                { day: "01", title: "Arrival & Welcome", desc: "Private airport transfer and luxury check-in." },
                { day: "02", title: "Cultural Deep Dive", desc: "Expert-led walking tour of the local heritage sites." },
                { day: "03", title: "Departure Adventure", desc: "Morning exploration before your afternoon flight." }
              ].map((item, idx) => (
                <div key={idx} className="group flex gap-8 pb-12 last:pb-0 border-l-2 border-slate-100 pl-8 relative ml-3">
                  <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-white border-2 border-slate-200 group-hover:border-[#12a8bc] group-hover:bg-[#12a8bc] transition-all"></div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-black text-[#12a8bc] tracking-widest uppercase">Day {item.day}</span>
                    <h3 className="text-2xl font-serif text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 p-12 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white flex flex-col gap-10 rounded-[2.5rem]">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase">Estimated Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-slate-900">${price}</span>
                <span className="text-slate-400 font-serif italic text-lg">/ person</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleBooking}
                isLoading={booking}
                className="w-full py-8 bg-[#12a8bc] text-white text-[10px] font-black tracking-[0.3em] uppercase hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-500/20 active:scale-95 rounded-none"
              >
                {session ? "RESERVE NOW" : "LOGIN TO RESERVE"}
              </Button>
            </div>

            <div className="pt-8 border-t border-slate-50 flex flex-col gap-4 text-center">
               <span className="text-[9px] font-black tracking-[0.3em] text-slate-300 uppercase">Admin Management</span>
               <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setIsModalOpen(true)} className="py-4 bg-slate-50 text-slate-600 text-[9px] font-black tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all border border-slate-100">
                   EDIT INFO
                 </button>
                 <button onClick={() => setIsDeleteModalOpen(true)} className="py-4 bg-red-50 text-red-600 text-[9px] font-black tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all border border-red-50">
                   DELETE
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- POPUPS & MODALS -------------------- */}

      {/* STATUS SUCCESS POPUP (The "Stylish" Windows Pop up) */}
      {showStatus && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"></div>
          <div className="relative w-full max-w-md bg-white rounded-[3rem] p-16 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center text-center gap-10 border border-slate-100">
            <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-in slide-in-from-bottom-2 duration-500"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-serif text-slate-900 leading-tight">
                {showStatus === 'booking-success' ? "Trip Confirmed!" : showStatus === 'update-success' ? "Info Updated!" : "Trip Deleted!"}
              </h2>
              <p className="text-slate-500 font-medium text-lg">
                {showStatus === 'booking-success' ? "Pack your bags, your adventure is waiting." : showStatus === 'update-success' ? "Your changes are now live across the platform." : "The destination has been removed from your gallery."}
              </p>
            </div>
            <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 animate-progress duration-[2500ms]"></div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-12 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col gap-10">
            <header className="flex flex-col gap-2">
              <h2 className="text-4xl font-serif text-slate-900">Edit Destination</h2>
              <p className="text-slate-400 font-medium">Refine the details for {destinationName}</p>
            </header>
            <div className="flex flex-col gap-6 max-h-[50vh] overflow-y-auto no-scrollbar pr-2">
              <div className="grid grid-cols-2 gap-6">
                <Input label="Name" value={formData.destinationName || ""} onChange={e => setFormData({...formData, destinationName: e.target.value})} variant="bordered" />
                <Input label="Country" value={formData.country || ""} onChange={e => setFormData({...formData, country: e.target.value})} variant="bordered" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Input label="Price ($)" type="number" value={formData.price || ""} onChange={e => setFormData({...formData, price: e.target.value})} variant="bordered" />
                <Input label="Duration" value={formData.duration || ""} onChange={e => setFormData({...formData, duration: e.target.value})} variant="bordered" />
              </div>
              
              <HeroSelect 
                label="Category" 
                selectedKeys={[formData.category?.toLowerCase() || ""]}
                onSelectionChange={keys => setFormData({...formData, category: Array.from(keys)[0]})}
              >
                <SelectTrigger className="w-full h-14 px-4 border-2 border-slate-100 rounded-xl flex items-center justify-between">
                  <SelectValue />
                  <SelectIndicator />
                </SelectTrigger>
                <Popover className="bg-white border border-slate-100 shadow-xl rounded-xl min-w-[200px] z-[110]">
                  <ListBox>
                    {["Beach", "Mountain", "City", "Adventure", "Cultural"].map(c => (
                      <ListBoxItem key={c.toLowerCase()} id={c.toLowerCase()} className="p-3 hover:bg-slate-50 font-bold uppercase text-[10px] tracking-widest text-slate-600">{c}</ListBoxItem>
                    ))}
                  </ListBox>
                </Popover>
              </HeroSelect>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase ml-1">Description</label>
                <textarea 
                  className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:border-[#12a8bc] outline-none transition-all min-h-[140px] text-slate-700 font-medium text-sm"
                  value={formData.description || ""} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
            <footer className="flex gap-4 justify-end pt-8 border-t border-slate-50">
              <Button onClick={() => setIsModalOpen(false)} variant="light" className="font-bold">Cancel</Button>
              <Button 
                onClick={handleUpdate} 
                isLoading={updating}
                className="bg-[#12a8bc] text-white font-black tracking-widest px-10 rounded-full h-14"
              >
                SAVE CHANGES
              </Button>
            </footer>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] p-12 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center text-center gap-8">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </div>
            <h2 className="text-3xl font-serif text-slate-900 leading-tight">Delete Trip?</h2>
            <p className="text-slate-500 font-medium">This action cannot be undone.</p>
            <div className="flex gap-4 w-full">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 text-xs font-black tracking-widest text-slate-400 hover:text-slate-900 transition-all uppercase">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-4 bg-red-600 text-white font-black tracking-[0.2em] text-[10px] rounded-full shadow-xl shadow-red-500/30 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50">{deleting ? "DELETING..." : "YES, DELETE"}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
