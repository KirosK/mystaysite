"use client";

import { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/language-context";

const EMAIL_TO = "info@mystaysite.gr";

type Step =
  | "greeting"
  | "askLink"
  | "askContact"
  | "done";

interface Message {
  from: "bot" | "user";
  text: string;
}

export default function ChatBot() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("greeting");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [bookingLink, setBookingLink] = useState("");
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBot = (text: string) =>
    setMessages((prev) => [...prev, { from: "bot", text }]);
  const addUser = (text: string) =>
    setMessages((prev) => [...prev, { from: "user", text }]);

  const handleOpen = () => {
    setOpen(true);
    setPulse(false);
    if (messages.length === 0) {
      setMessages([{ from: "bot", text: t.chatbot.greeting }]);
    }
  };

  const handleQuickReply = (idx: number) => {
    const label = t.chatbot.options[idx];
    addUser(label);

    if (idx === 0) {
      setTimeout(() => {
        addBot(t.chatbot.askLink);
        setStep("askLink");
      }, 600);
    } else if (idx === 1) {
      setTimeout(() => {
        addBot(t.chatbot.pricingReply);
      }, 600);
    } else {
      setTimeout(() => {
        addBot(t.chatbot.howReply);
      }, 600);
    }
  };

  const handleYesMockup = () => {
    addUser(t.chatbot.yesOption);
    setTimeout(() => {
      addBot(t.chatbot.askLink);
      setStep("askLink");
    }, 600);
  };

  const handleSend = () => {
    const val = input.trim();
    if (!val) return;
    addUser(val);
    setInput("");

    if (step === "askLink") {
      setBookingLink(val);
      setTimeout(() => {
        addBot(t.chatbot.askContact);
        setStep("askContact");
      }, 600);
    } else if (step === "askContact") {
      sendLead(bookingLink, val);
      setTimeout(() => {
        addBot(t.chatbot.thanks);
        setStep("done");
      }, 600);
    }
  };

  const sendLead = (link: string, contactInfo: string) => {
    const subject = encodeURIComponent("New Lead - MyStaySite ChatBot");
    const body = encodeURIComponent(
      `New mockup request from ChatBot:\n\nBooking/Airbnb Link: ${link}\nContact: ${contactInfo}\n\nSent from MyStaySite.gr chatbot`
    );

    const mailWindow = window.open(
      `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`,
      "_self"
    );
    if (!mailWindow) {
      window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
    }
  };

  const showQuickReplies = step === "greeting" && messages.length === 1;
  const showYesMockup =
    step === "greeting" &&
    messages.length > 2 &&
    messages[messages.length - 1].from === "bot";
  const showInput = step === "askLink" || step === "askContact";

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-4 lg:bottom-24 lg:right-6 z-50 w-[340px] sm:w-[380px] max-h-[520px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-[#0F172A] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-bold">{t.chatbot.title}</p>
                <p className="text-gray-400 text-[11px]">{t.chatbot.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 min-h-0">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-white text-text-primary border border-gray-100 shadow-sm rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick reply buttons */}
            {showQuickReplies && (
              <div className="flex flex-col gap-2 pt-1">
                {t.chatbot.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(i)}
                    className="text-left px-3.5 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* "Yes I want mockup" after pricing/how replies */}
            {showYesMockup && (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={handleYesMockup}
                  className="text-left px-3.5 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
                >
                  {t.chatbot.yesOption}
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          {showInput && (
            <div className="border-t border-gray-200 px-3 py-3 bg-white shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    step === "askLink"
                      ? t.chatbot.linkPlaceholder
                      : t.chatbot.contactPlaceholder
                  }
                  className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40"
                >
                  {t.chatbot.send}
                </button>
              </form>
            </div>
          )}

          {/* Done state - no input */}
          {step === "done" && (
            <div className="border-t border-gray-200 px-4 py-3 bg-white text-center shrink-0">
              <p className="text-xs text-text-secondary">{t.chatbot.thanksTitle}</p>
            </div>
          )}
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        className={`fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 ${
          open
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-primary hover:bg-primary-dark"
        } ${pulse ? "animate-bounce" : ""}`}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        )}
      </button>
    </>
  );
}
