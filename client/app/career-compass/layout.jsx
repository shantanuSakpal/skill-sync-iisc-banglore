"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/ui/footer";
import { UserAuth } from "@/context/AuthContext";

export default function DefaultLayout({ children }) {
  const { user } = UserAuth();

  return (
    <>
      <main className="grow ">{children}</main>
      {typeof window !== "undefined" && (
        <main className="grow  ">{children}</main>
      )}

      <Footer />
    </>
  );
}
