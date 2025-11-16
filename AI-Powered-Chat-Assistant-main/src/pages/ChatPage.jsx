"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";
import {
  sendMessage,
  sendAIMessage,
  setActiveSession,
  sendGeminiReply
} from "@/store/chatSlice";
import { AppSidebar } from "@/components/app-sidebar"; 


export default function ChatPage() {
const dispatch = useDispatch();
  const { sessions, activeSessionId, isTyping } = useSelector((state) => state.chat);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messagesEndRef = useRef(null);

  const handleSend = (text) => {
    dispatch(sendGeminiReply(text));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages]);



  return (
    <div className="flex flex-col h-[85vh] bg-gradient-to-br from-[#faf6ff] to-[#f1f5ff]">
    <main className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6">


      {(!activeSession?.messages || activeSession?.messages.length === 0) && (
        <div className="max-w-2xl mx-auto mt-16 ">
          <h2 className="font-heading">
            Introducing your Chat Assistant
          </h2>
          <p className=".font-paragraph">
            Start by asking anything—your assistant is ready to help.
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        <ChatMessages messages={activeSession?.messages || []} />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

    </main>

  
    <footer className="px-4 md:px-8 py-4  bg-white/70 backdrop-blur">
      <div className="max-w-2xl mx-auto">
        <ChatInput onSend={handleSend } />
      </div>
      <div className= " paragraph max-w-2xl mx-auto mt-2 text-xs ">
        Press Enter to send • Use sidebar to switch chats
      </div>
    </footer>
  </div>
  );
}








    