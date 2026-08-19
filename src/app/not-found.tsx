import type { Metadata } from "next";
import Link from "next/link";
import { FaHome, FaEnvelope } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Page Not Found | Ajay Thorat",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container-custom section flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm font-bold text-primary">404</p>
      <h1 className="mt-4 text-3xl md:text-4xl font-black">
        <span className="gradient-text">Page Not Found</span>
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or may have moved. Here are a few places to go instead.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary magnetic px-6 py-3">
          <FaHome className="w-4 h-4" />
          Back to Home
        </Link>
        <Link href="/contact" className="btn-secondary magnetic px-6 py-3">
          <FaEnvelope className="w-4 h-4" />
          Contact Me
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
        <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link>
        <Link href="/experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</Link>
      </div>
    </div>
  );
}
