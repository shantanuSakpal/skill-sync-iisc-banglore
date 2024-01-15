"use client";
import React from "react";

export default function page() {
  //get the last part of url
  let url = window.location.href.split("/").at(-1);

  return <div>{url}</div>;
}
