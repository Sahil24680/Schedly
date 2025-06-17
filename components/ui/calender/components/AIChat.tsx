"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, X } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi, I'm your AI Assistant! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Focus input when opening
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: "ai", content: `You said: ${trimmed} 😊` },
      ]);
    }, 800);
  };

  const panelClasses = [
    "fixed top-0 right-0 h-screen",
    "w-[90vw] max-w-full sm:w-[410px]",
    "transform transition-transform duration-300",
    "bg-gradient-to-tr from-[#181822] to-[#232334]",
    "shadow-2xl border-l border-[#232334]",
    "flex flex-col rounded-l-2xl overflow-hidden",
    open ? "translate-x-0" : "translate-x-full",   // ← key toggle
  ].join(" ");

  return (
    <>
      {/* Open button (only when closed) */}
      {!open && (
        <button
          className="fixed z-50 bottom-6 right-8 bg-[#29293a] hover:bg-[#232334] 
                     shadow-lg rounded-full w-14 h-14 flex items-center justify-center 
                     transition-all focus:outline-none border border-[#393959]"
          onClick={() => setOpen(true)}
          aria-label="Open AI chat"
        >
          <Bot size={24} />
        </button>
      )}

      {/* Chat panel (always mounted) */}
      <div className={panelClasses}>
        {/* Header */}
        <div className="relative px-6 pt-6 pb-2 flex items-center gap-3 border-b border-[#232334]">
          <div className="bg-[#35354d] rounded-full p-2 flex items-center justify-center">
            <Bot size={26} className="text-[#aad0ff]" />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">Gemini AI</h2>
            <p className="text-xs text-[#a9adc1]">Ask anything</p>
          </div>
          <button
            className="ml-auto bg-[#29293a] hover:bg-red-500/90 shadow-lg 
                       rounded-full w-14 h-14 flex items-center justify-center border border-red-500 transition"
            onClick={() => setOpen(false)}
            aria-label="Close AI chat"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col px-4 py-2">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#295bff] to-[#415b9d] text-white"
                      : "bg-[#232334] text-[#dde2ef] border border-[#2c2c3e]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Input */}
          <div className="mt-2 pb-4 pt-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl px-4 py-2 bg-[#25253a] text-white placeholder-[#9c99b2] focus:ring-2 focus:ring-[#373750] transition"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="shrink-0 bg-[#282855] hover:bg-[#223157] text-white rounded-full w-12 h-12 flex items-center justify-center transition"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
