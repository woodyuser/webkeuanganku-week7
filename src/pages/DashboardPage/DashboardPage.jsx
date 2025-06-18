import React from "react";
// Hapus: import { Sidebar } from "./Sidebar";

// Path ke MainContent disesuaikan, diasumsikan MainContent ada di folder components
import { MainContent } from "./MainContent";

// Komponen halaman sekarang hanya merender konten utamanya saja
function DashboardPage() {
  return <MainContent />;
}

export default DashboardPage;