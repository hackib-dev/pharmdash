"use client";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Home({ children }: LayoutProps) {
  return (
    <div className="bg-[#FAFBFF]">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
