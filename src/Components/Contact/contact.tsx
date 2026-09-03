"use client";

import React, { useRef, useState, FormEvent } from "react";
import { FaEnvelope, FaUser, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaGithub, FaTag, FaCommentDots } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { sendContactEmail } from "@/app/actions/contact.action";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";
import RevealText from "@/Components/UI/RevealText";

type FormStatus = "idle" | "loading" | "success" | "error";

const BLOCKED_EMAIL_DOMAINS = new Set([
  "example.com", "example.org", "example.net", "test.com", "testing.com",
  "sample.com", "domain.com", "asdf.com", "notreal.com", "fake.com", "noemail.com",
  "mailinator.com", "guerrillamail.com", "guerrillamail.info", "sharklasers.com",
  "grr.la", "trashmail.com", "trashmail.net", "temp-mail.org", "tempmail.com",
  "tempmail.net", "10minutemail.com", "10minutemail.net", "yopmail.com",
  "yopmail.net", "throwawaymail.com", "getnada.com", "fakeinbox.com",
  "dispostable.com", "mailnesia.com", "mintemail.com", "mytrashmail.com",
  "tempinbox.com", "discard.email", "maildrop.cc", "mohmal.com", "moakt.com",
  "emailondeck.com", "fakemailgenerator.com", "mailcatch.com", "mailsac.com",
]);

const BLOCKED_LOCAL_PARTS = new Set([
  "test", "test123", "testing", "dummy", "fake", "sample", "asdf",
  "asdfasdf", "admin", "noreply", "no-reply", "foo", "foobar", "xyz",
  "abc", "qwerty", "example", "demo", "user", "spam", "aaa", "xxx",
]);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot - must remain empty
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);
  const formStartTimeRef = useRef<number>(Date.now());

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return false;

    const [localPart, domain] = email.toLowerCase().split("@");
    if (BLOCKED_EMAIL_DOMAINS.has(domain)) return false;
    if (BLOCKED_LOCAL_PARTS.has(localPart)) return false;

    return true;
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
      setErrorMessage("Please use a real, reachable email address");
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please provide a bit more detail in your message");
      return;
    }

    try {
      const result = await sendContactEmail({
        ...formData,
        formStartTime: formStartTimeRef.current,
      });

      if (result.success) {
        setStatus("success");
        setSuccessMessage(result.message || "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
        formStartTimeRef.current = Date.now();
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
    <div ref={sectionRef} className={`container-custom section scroll-reveal ${isRevealed ? "is-visible" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Side - Contact Info */}
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="space-y-4">
              <SectionEyebrow index="01" icon={FaEnvelope} label="Get In Touch" />

              <RevealText
                as="h2"
                text="Let's Work Together"
                className="text-3xl md:text-4xl font-black text-foreground"
              />

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Have a project in mind or want to discuss opportunities? Feel free to reach out.
                I'm always open to new challenges and collaborations.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="panel rounded-2xl p-2 md:p-4">
              {[
                { icon: IoMdMail, label: "Email", value: "ajaythorat988@gmail.com" },
                { icon: FaLinkedin, label: "LinkedIn", value: "Connect on LinkedIn" },
                { icon: FaGithub, label: "GitHub", value: "View My Repositories" },
              ].map((method, index) => {
                const accent = getAccent(index);
                return (
                  <div key={method.label} className="list-row px-2">
                    <IconTile icon={method.icon} accent={accent} size="md" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{method.label}</p>
                      <p className="font-bold text-foreground">{method.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Response Badge */}
            <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
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
            <div className="panel p-6 rounded-2xl border-l-4 border-l-primary">
              <p className="text-base italic text-foreground/80 leading-relaxed">
                "The best way to predict the future is to create it."
                <span className="block mt-2 text-sm font-semibold text-primary">
                  — Let's build something amazing together
                </span>
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="animate-fadeIn" style={{ animationDelay: '120ms' }}>
            <div className="panel rounded-2xl p-8 md:p-10">
              {status === "loading" ? (
                <div className="relative flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-primary font-semibold text-lg">
                    Sending your message...
                  </p>
                </div>
              ) : status === "success" ? (
                <div className="relative flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4 animate-fadeInScale">
                    <FaCheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 animate-fadeIn" style={{ animationDelay: '80ms' }}>
                    Message Sent!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-semibold animate-fadeIn" style={{ animationDelay: '140ms' }}>
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
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border-2 border-red-500/20 rounded-2xl animate-shake">
                      <FaExclamationCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  {/* Honeypot field - hidden from real users, catches bots */}
                  <div className="absolute -left-2499.75 w-px h-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
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
                      className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-foreground/5 rounded-2xl text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
                      <FaEnvelope className="w-4 h-4 text-primary" />
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-foreground/5 rounded-2xl text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
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
                      className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-foreground/5 rounded-2xl text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
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
                      className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-foreground/5 rounded-2xl text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full group px-8 py-4 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                    <span>Send Message</span>
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