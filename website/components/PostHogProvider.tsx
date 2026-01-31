"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useState } from "react";
import { CookieConsent, getConsentStatus, type ConsentStatus } from "./CookieConsent";

function initPostHog() {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_POSTHOG_KEY &&
    !posthog.__loaded
  ) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      persistence: "localStorage+cookie",
      respect_dnt: true,
      opt_out_capturing_by_default: false,
    });
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");

  useEffect(() => {
    const status = getConsentStatus();
    setConsentStatus(status);

    // Initialize PostHog only if consent was previously granted
    if (status === "granted") {
      initPostHog();
    }
  }, []);

  const handleConsentChange = (status: ConsentStatus) => {
    setConsentStatus(status);
    if (status === "granted") {
      initPostHog();
      // Capture the initial pageview now that we have consent
      posthog.capture("$pageview");
    }
  };

  // If no API key, just render children without analytics
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      {children}
      <CookieConsent onConsentChange={handleConsentChange} />
    </PHProvider>
  );
}
