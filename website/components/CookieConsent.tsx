"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "stringly-typed-cookie-consent";

export type ConsentStatus = "granted" | "denied" | "pending";

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "pending";
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "granted" || stored === "denied") return stored;
  return "pending";
}

export function CookieConsent({
  onConsentChange,
}: {
  onConsentChange?: (status: ConsentStatus) => void;
}) {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const stored = getConsentStatus();
    setStatus(stored);
    if (stored === "pending") {
      // Small delay for a nicer entrance
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (consent: "granted" | "denied") => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      localStorage.setItem(CONSENT_KEY, consent);
      setStatus(consent);
      setIsVisible(false);
      onConsentChange?.(consent);
    }, 300);
  };

  // Don't render if consent already given or not yet ready to show
  if (status !== "pending" || !isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isAnimatingOut
          ? "opacity-0 translate-y-4"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="rounded-lg overflow-hidden shadow-2xl w-[340px] border border-[var(--chocolate-brown)]/20">
        {/* Terminal Header */}
        <div className="bg-[#2D1F1A] px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--burnt-sienna)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--mustard-gold)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#6B8E6B]" />
          </div>
          <span className="ml-2 text-[var(--warm-cream)] opacity-60 text-xs font-mono">
            privacy.sh
          </span>
        </div>

        {/* Terminal Body */}
        <div className="bg-[var(--chocolate-brown)] p-4 font-mono text-xs leading-relaxed scan-lines">
          {/* Command */}
          <div className="text-[var(--warm-cream)]">
            <span className="text-[var(--mustard-gold)]">$</span> cat cookies.txt
          </div>

          {/* Output */}
          <div className="text-[var(--warm-cream)] opacity-90 mt-2 mb-3">
            <p>We use privacy-friendly analytics</p>
            <p>to improve your experience.</p>
            <p className="mt-1 text-[var(--warm-cream)]/60">
              Data stored in EU. Never sold.
            </p>
          </div>

          {/* Prompt */}
          <div className="text-[var(--warm-cream)] mb-3">
            <span className="text-[var(--mustard-gold)]">$</span> enable_tracking?{" "}
            <span className="text-[var(--warm-cream)]/50">[Y/n]</span>
            <span className="animate-pulse ml-1">_</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleConsent("granted")}
              className="flex-1 bg-[var(--mustard-gold)] text-[var(--chocolate-brown)] px-3 py-1.5 rounded text-xs font-bold hover:bg-[var(--mustard-gold)]/90 transition-colors cursor-pointer"
            >
              [Y] Accept
            </button>
            <button
              onClick={() => handleConsent("denied")}
              className="flex-1 bg-transparent text-[var(--warm-cream)] px-3 py-1.5 rounded text-xs border border-[var(--warm-cream)]/30 hover:border-[var(--warm-cream)]/50 transition-colors cursor-pointer"
            >
              [n] Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
