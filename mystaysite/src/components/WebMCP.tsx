"use client";

import { useEffect } from "react";

/**
 * WebMCP (Experimental)
 * https://webmachinelearning.github.io/webmcp/
 *
 * Exposes MyStaySite's key actions to in-browser AI agents via the
 * experimental `navigator.modelContext.provideContext()` API. Browsers
 * that do not implement the API silently ignore this script.
 */

type Tool = {
  name: string;
  description: string;
  inputSchema: unknown;
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
};

type ModelContext = {
  provideContext: (ctx: { tools: Tool[] }) => void;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const PHONE = "306974585063";
const CONTACT_EMAIL = "info@mystaysite.com";

function openUrl(url: string) {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function WebMCP() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.modelContext) return;

    const tools: Tool[] = [
      {
        name: "mystaysite_request_quote",
        description:
          "Start a WhatsApp conversation pre-filled with a request for a website quote. Use when the user wants a price or to hire MyStaySite.",
        inputSchema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description:
                "Optional custom message in Greek or English (defaults to a friendly quote request).",
            },
          },
        },
        execute: (args) => {
          const msg =
            (args?.message as string) ||
            "Γεια! Θα ήθελα μια προσφορά για website.";
          openUrl(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`);
          return { status: "ok", channel: "whatsapp" };
        },
      },
      {
        name: "mystaysite_send_email",
        description:
          "Open an email draft addressed to the MyStaySite team. Use when the user wants to send a detailed inquiry.",
        inputSchema: {
          type: "object",
          properties: {
            subject: { type: "string" },
            body: { type: "string" },
          },
        },
        execute: (args) => {
          const subject = (args?.subject as string) || "Website inquiry";
          const body = (args?.body as string) || "";
          openUrl(
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
          );
          return { status: "ok", channel: "email" };
        },
      },
      {
        name: "mystaysite_open_services",
        description:
          "Navigate to the MyStaySite services page listing all available packages and prices.",
        inputSchema: { type: "object", properties: {} },
        execute: () => {
          window.location.href = "/el/services";
          return { status: "ok" };
        },
      },
      {
        name: "mystaysite_open_portfolio",
        description:
          "Navigate to the MyStaySite portfolio case study (Achilleas Peaceful Place).",
        inputSchema: { type: "object", properties: {} },
        execute: () => {
          window.location.href = "/el/portfolio/achilleas-peaceful-place";
          return { status: "ok" };
        },
      },
      {
        name: "mystaysite_open_blog",
        description:
          "Navigate to the MyStaySite blog with articles about SEO, direct bookings, and vacation rental marketing.",
        inputSchema: { type: "object", properties: {} },
        execute: () => {
          window.location.href = "/el/blog";
          return { status: "ok" };
        },
      },
    ];

    try {
      navigator.modelContext.provideContext({ tools });
    } catch {
      // Silently ignore — browser has the API shape but not the permission.
    }
  }, []);

  return null;
}
