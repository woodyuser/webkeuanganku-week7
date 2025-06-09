"use client";
import React from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";

function DashboardPage() {
  return (
    <div className="overflow-hidden pl-16 bg-white max-md:pl-5 font-poppins">
      <div className="flex gap-5 max-md:flex-col max-md:">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default DashboardPage;
