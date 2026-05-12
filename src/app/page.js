import React from "react";
import Banner from "./components/Banner";
import Destinations from "./components/Destinations";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-white">
      {/* Hero/Banner Section */}
      <Banner />

      {/* Destinations Grid Section */}
      <Destinations />
    </div>
  );
}
