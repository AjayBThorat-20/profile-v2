"use client";

import { useState } from "react";
import WrapperLayout from "../layout/WrapperLayout";



interface ApiError {
  message: string;
  error?: string;
}



export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    setError("All fields are required");
    return;
  }

  if (!validateEmail(formData.email)) {
    setError("Please enter a valid email address");
    return;
  }

  setLoading(true);
  setError("");
  setSuccessMessage("");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSuccessMessage("Thank you! Your message has been sent successfully.");
  } catch (error) {
    const err = error as ApiError;
    setError(err.message || "Failed to send message. Please try again.");
  } finally {
    setLoading(false);
    setTimeout(() => {
      setSubmitted(false);
      setSuccessMessage("");
      setError("");
    }, 3000);
  }
};
  return (
    <WrapperLayout firstPosition="Get in" secondPosition="Touch">
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center pb-6">
        Please fill out the form below to get in touch.
      </p>

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 mx-auto">
        {loading ? (
          <div className="text-center">
            <p className="text-blue-600 dark:text-blue-400 font-semibold">Processing...</p>
          </div>
        ) : submitted ? (
          <div className="text-center">
            {/* ✅ SVG Checkmark Icon */}
            <svg className="w-16 h-16 mx-auto mb-4 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-600 dark:text-green-400 font-semibold">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

            <div>
              <label className="text-left block text-gray-700 dark:text-gray-300 mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="text-left block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-left block text-gray-700 dark:text-gray-300 mb-1 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Subject"
                required
              />
            </div>

            <div>
              <label className="text-left block text-gray-700 dark:text-gray-300 mb-1 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </WrapperLayout>
  );
}
