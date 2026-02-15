"use client";

import React, { useState, FormEvent } from "react";
import { FaEnvelope, FaUser, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaGithub, FaTag, FaCommentDots } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { sendContactEmail } from "@/app/actions/contact.action";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setSuccessMessage("");

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("All fields are required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setStatus("success");
        setSuccessMessage(result.message || "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setSuccessMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isLoading = status === "loading";

  return (
    <div className="container-custom section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Side - Contact Info */}
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
                <FaEnvelope className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Get In Touch</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black gradient-text-animated">
                Let's Work Together
              </h2>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Have a project in mind or want to discuss opportunities? Feel free to reach out. 
                I'm always open to new challenges and collaborations.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {/* Email */}
              <div className="group glass-card rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-red-600 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <IoMdMail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                      ajaythorat988@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="group glass-card rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FaLinkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">LinkedIn</p>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                      Connect on LinkedIn
                    </p>
                  </div>
                </div>
              </div>

              {/* GitHub */}
              <div className="group glass-card rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-700 dark:from-white dark:to-gray-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FaGithub className="w-6 h-6 text-white dark:text-gray-900" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">GitHub</p>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                      View My Repositories
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Badge */}
            <div className="glass-card p-6 rounded-2xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <FaCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Quick Response</h4>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Quote */}
            <div className="glass-card p-6 rounded-2xl border-2 border-primary/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="relative text-base italic text-foreground/80 leading-relaxed">
                "The best way to predict the future is to create it." 
                <span className="block mt-2 text-sm font-semibold text-primary">
                  — Let's build something amazing together
                </span>
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <div className="glass-card rounded-3xl p-8 md:p-10 border-2 border-border/50 relative overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50"></div>

              {status === "loading" ? (
                <div className="relative flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-primary font-semibold text-lg">
                    Sending your message...
                  </p>
                </div>
              ) : status === "success" ? (
                <div className="relative flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <FaCheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    {successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Send a Message
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form below and I'll get back to you soon.
                    </p>
                  </div>

                  {/* Error Message */}
                  {status === "error" && errorMessage && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border-2 border-red-500/20 rounded-xl animate-fadeIn">
                      <FaExclamationCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className=" text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <FaUser className="w-4 h-4 text-primary" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className=" text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <FaEnvelope className="w-4 h-4 text-primary" />
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="name"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className=" text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <FaTag className="w-4 h-4 text-primary" />
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className=" text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                      <FaCommentDots className="w-4 h-4 text-primary" />
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-300 outline-none resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="magnetic w-full group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    
                    <span className="relative flex items-center justify-center gap-2">
                      <FaPaperPlane className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}