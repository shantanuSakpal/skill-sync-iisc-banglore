"use client";
import React, {useEffect} from "react";
import Stepper from "../../components/roadmap/Stepper";
import data from "@/data/data.json";
import { UserAuth } from "@/context/AuthContext";

export default function CareerCompass() {

  const { user } = UserAuth();

  useEffect(() => {
    if (!user) {
      window.location.href = "/signin";
    }
  }, [user]);

  // const roadmap = data.roadmap;
  return (
    <div>
      {/* <Stepper roadmap={roadmap} />   */}
    </div>
  );
}
