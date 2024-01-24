"use client";

import { useEffect } from "react";

import Footer from "@/components/ui/footer";

export default function DefaultLayout({ children }) {
  return (
    <>
      {typeof window !== "undefined" && (
        <main className="grow  ">{children}</main>
      )}

      <Footer />
    </>
  );
}
