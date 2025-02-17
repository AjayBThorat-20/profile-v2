"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";

export default function Footer() {
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <>
      {/* Divider */}
      <hr
        className={`border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      />

      {/* Footer */}
      <footer
        className={`w-full text-center py-4 z-50 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ajay Bhimrao Thorat. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
