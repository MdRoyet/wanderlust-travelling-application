"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
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

export default function DestinationDetails({ params }) {
  const { id } = use(params);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Custom Modal State (Stable alternative to avoid library errors)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Edit Form State
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);

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
        setIsModalOpen(false); // Close popup
      } else {
        alert("Failed to update destination");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setUpdating(false);
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

      {/* Main Layout Grid */}
      <section className="max-w-[100rem] mx-auto px-6 md:px-24 py-32 grid grid-cols-1 lg:grid-cols-3 gap-24">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-24">
          
          {/* 1. Description */}
          <div className="flex flex-col gap-10">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">Description</h2>
            <p className="text-3xl text-slate-700 leading-relaxed font-serif italic">
              "{description || "Experience the breathtaking beauty and unique culture of this incredible destination. From stunning landscapes to hidden gems, this experience is curated for those who seek the extraordinary."}"
            </p>
          </div>

          {/* 2. Realistic Itinerary */}
          <div className="flex flex-col gap-12">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">The Itinerary</h2>
            <div className="flex flex-col gap-0">
              {[
                { day: "01", title: "Arrival & Sunset Welcome", desc: "Arrive at the international airport where our private shuttle will greet you. Check into your luxury suite and enjoy a welcome dinner overlooking the horizon." },
                { day: "02", title: "Local Discovery & Hidden Gems", desc: "A guided walking tour through the historic districts, visiting local artisans and tasting authentic regional delicacies away from the crowds." },
                { day: "03", title: "Adventure & Farewell", desc: "Choose between a sunrise hike or a morning coastal cruise. Spend the afternoon at leisure before a private farewell ceremony in the evening." }
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

          <div className="h-px bg-slate-100 w-full"></div>

          {/* 3. Trip Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Weather", value: "24°C / 75°F" },
              { label: "Language", value: "English / Local" },
              { label: "Best Time", value: "May - Sept" },
              { label: "Activity", value: "Moderate" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-300 tracking-[0.1em] uppercase">{stat.label}</span>
                <span className="text-slate-900 font-bold tracking-tight uppercase text-sm">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* 4. Realistic Reviews Section */}
          <div className="flex flex-col gap-12 bg-slate-50 p-12 rounded-[2rem]">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">Guest Reviews</h2>
              <button className="text-[10px] font-black text-[#12a8bc] tracking-widest uppercase border-b-2 border-[#12a8bc] pb-1">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { name: "Sarah J.", city: "New York", text: "An absolutely transformative experience. The attention to detail in the itinerary was flawless. Will definitely book again!", rating: 5 },
                { name: "Marc K.", city: "Berlin", text: "Luxury meets authenticity. We saw things we never would have found on our own. Truly world-class service.", rating: 5 }
              ].map((rev, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(rev.rating)].map((_, s) => <svg key={s} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  </div>
                  <p className="text-slate-600 font-medium italic">"{rev.text}"</p>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">{rev.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{rev.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY BOOKING */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 p-12 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white flex flex-col gap-10 rounded-[2.5rem]">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase">Estimated Starting From</span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-slate-900">${price}</span>
                <span className="text-slate-400 font-serif italic text-lg">/ person</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button className="w-full py-6 bg-[#12a8bc] text-white text-xs font-black tracking-[0.3em] uppercase hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-500/20 active:scale-95">
                RESERVE NOW
              </button>
            </div>

            {/* Admin Management Section */}
            <div className="pt-8 border-t border-slate-50 flex flex-col gap-4">
               <span className="text-[9px] font-black tracking-[0.3em] text-slate-300 uppercase text-center mb-1">Administrative Controls</span>
               <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setIsModalOpen(true)} className="py-4 px-4 bg-slate-50 text-slate-500 text-[9px] font-black tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all border border-slate-100">
                   EDIT INFO
                 </button>
                 <button className="py-4 px-4 bg-red-50 text-red-500 text-[9px] font-black tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all border border-red-50">
                   DELETE
                 </button>
               </div>
            </div>

            <div className="flex items-center gap-5 pt-6 border-t border-slate-50">
              <div className="flex -space-x-4 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-white bg-slate-200"></div>
                ))}
              </div>
              <span className="text-xs text-slate-400 font-bold italic underline decoration-[#12a8bc] decoration-2 underline-offset-4">
                +42 explorers interested
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM EDIT POPUP (Stable & Functioning) */}
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
                      <ListBoxItem key={c.toLowerCase()} id={c.toLowerCase()} className="p-3 hover:bg-slate-50 transition-colors font-bold uppercase text-[10px] tracking-widest text-slate-600">{c}</ListBoxItem>
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
                className="bg-[#12a8bc] text-white font-black tracking-widest px-10 rounded-full h-14 shadow-xl shadow-cyan-500/20"
              >
                SAVE CHANGES
              </Button>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}
