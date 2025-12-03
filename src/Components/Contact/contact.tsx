//src/Components/Contact/contact.tsx
"use client";

import { useState } from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaPaperPlane,
  FaCheckCircle,
  FaLinkedin,
  FaGithub,
  FaPhone,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { sendContactEmail } from "@/app/actions/contact.action";

interface ApiError {
  message: string;
  error?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
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
      // Call the Server Action directly (no fetch needed!)
      const result = await sendContactEmail(formData);

      if (!result.success) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSuccessMessage(result.message || "Message sent successfully!");
      
    } catch (error) {
      const err = error as Error;
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
        setSuccessMessage("");
        setError("");
      }, 5000);
    }
  };

  return (
    <WrapperLayout firstPosition="Get in" secondPosition="Touch">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Connect
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Have a question or want to work together? Feel free to reach out!
              I'm always open to discussing new projects, creative ideas, or
              opportunities.
            </p>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:ajaythorat988@gmail.com"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-300 group border border-gray-200 dark:border-gray-700"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <IoMdMail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ajaythorat988@gmail.com
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ajay-thorat-24b4b6215"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-300 group border border-gray-200 dark:border-gray-700"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FaLinkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    LinkedIn
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Connect with me
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/AjayBThorat-20"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-300 group border border-gray-200 dark:border-gray-700"
              >
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    GitHub
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    View my repositories
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Response Badge */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <FaCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Quick Response
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                Sending your message...
              </p>
            </div>
          ) : submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <FaCheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-green-600 dark:text-green-400 font-semibold">
                {successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send a Message
                </h3>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-600 dark:text-red-400 font-semibold text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  <FaUser className="w-4 h-4" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  <FaEnvelope className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  <FaTag className="w-4 h-4" />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="What's this about?"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  <FaCommentDots className="w-4 h-4" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                  rows={5}
                  placeholder="Your message here..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FaPaperPlane className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </WrapperLayout>
  );
}