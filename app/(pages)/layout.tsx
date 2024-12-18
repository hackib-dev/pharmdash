"use client";

import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function App({ children }: LayoutProps) {
  return <div>{children}</div>;
}
