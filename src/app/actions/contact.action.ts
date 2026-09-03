//src/app/actions/contact.action.ts
"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Anti-spam fields (not shown to real users)
  website?: string; // honeypot - must stay empty
  formStartTime?: number; // timestamp (ms) when the form was rendered
}

// Domains that are either throwaway/disposable inboxes or obvious
// placeholders (example.com, test.com, etc.) rather than real contacts.
const BLOCKED_EMAIL_DOMAINS = new Set([
  "example.com", "example.org", "example.net", "test.com", "testing.com",
  "sample.com", "domain.com", "email.test", "test.test", "asdf.com",
  "notreal.com", "fake.com", "noemail.com",
  "mailinator.com", "guerrillamail.com", "guerrillamail.info", "sharklasers.com",
  "grr.la", "trashmail.com", "trashmail.net", "temp-mail.org", "tempmail.com",
  "tempmail.net", "10minutemail.com", "10minutemail.net", "yopmail.com",
  "yopmail.net", "throwawaymail.com", "getnada.com", "fakeinbox.com",
  "dispostable.com", "mailnesia.com", "mintemail.com", "spamgourmet.com",
  "mytrashmail.com", "tempinbox.com", "discard.email", "maildrop.cc",
  "mohmal.com", "moakt.com", "emailondeck.com", "fakemailgenerator.com",
  "einrot.com", "mailcatch.com", "mailsac.com", "burnermail.io",
]);

// Local-parts that only ever show up on dummy/test submissions.
const BLOCKED_LOCAL_PARTS = new Set([
  "test", "test123", "testing", "dummy", "fake", "sample", "asdf",
  "asdfasdf", "admin", "noreply", "no-reply", "foo", "foobar", "xyz",
  "abc", "qwerty", "example", "demo", "user", "spam", "aaa", "xxx",
]);

function isValidEmail(email: string): { valid: boolean; reason?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, reason: "Please enter a valid email address" };
  }

  const [localPart, domain] = email.toLowerCase().split("@");

  if (BLOCKED_EMAIL_DOMAINS.has(domain)) {
    return { valid: false, reason: "Please use a real, reachable email address" };
  }

  if (BLOCKED_LOCAL_PARTS.has(localPart)) {
    return { valid: false, reason: "Please use a real, reachable email address" };
  }

  return { valid: true };
}

// Rejects obvious link-spam ("check out http://... http://... http://...").
function isSpammyMessage(message: string): boolean {
  const urlMatches = message.match(/https?:\/\/|www\./gi) || [];
  return urlMatches.length > 2;
}

// Best-effort in-memory rate limiter (per server instance).
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissionLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return false;
}

const MIN_SUBMIT_TIME_MS = 3000; // real users take at least a few seconds to fill the form

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Honeypot: real visitors never see or fill this field.
    // Pretend success so bots don't learn to avoid it.
    if (formData.website) {
      return {
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      };
    }

    // Submitted implausibly fast after the form rendered -> likely a bot.
    if (
      formData.formStartTime &&
      Date.now() - formData.formStartTime < MIN_SUBMIT_TIME_MS
    ) {
      return {
        success: false,
        error: "Submission rejected. Please try again.",
      };
    }

    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    const emailCheck = isValidEmail(formData.email);
    if (!emailCheck.valid) {
      return {
        success: false,
        error: emailCheck.reason,
      };
    }

    if (formData.message.trim().length < 10) {
      return {
        success: false,
        error: "Please provide a bit more detail in your message",
      };
    }

    if (isSpammyMessage(formData.message)) {
      return {
        success: false,
        error: "Your message looks like spam. Please remove excess links and try again.",
      };
    }

    const requestHeaders = await headers();
    const ip =
      requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() ||
      requestHeaders.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return {
        success: false,
        error: "You've sent several messages recently. Please wait a while before trying again.",
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email service
      auth: {
        user: process.env.FROM_EMAIL_USER,
        pass: process.env.FROM_EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.FROM_EMAIL_USER,
      to: process.env.TO_EMAIL_USER,
      subject: `Contact Form: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Name:</strong>
              <span style="color: #6b7280;">${formData.name}</span>
            </p>

            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Email:</strong>
              <span style="color: #6b7280;">${formData.email}</span>
            </p>

            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Subject:</strong>
              <span style="color: #6b7280;">${formData.subject}</span>
            </p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #6b7280; line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
      text: `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}
