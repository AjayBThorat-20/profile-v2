import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import DefaultLayout from "@/Components/Layout/defaultLayout";
import React from 'react';

export const metadata: Metadata = {
  title: "Ajay Thorat",
  description: "This is a static web application",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" data-new-gr-c-s-check-loaded="14.1223.0" data-gr-ext-installed="">
        <ReduxProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}