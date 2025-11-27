
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { createChatSession, sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';
import { Chat } from '@google/genai';
import { useLanguage } from '../services/i18n';

export const AIChatbot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, []);

  // Update initial greeting when language changes, BUT only if no conversation has started yet
  useEffect(() => {
    // If messages are empty OR there is only 1 message and it is from the model (the welcome message)
    const isInitialState = messages.length === 0 || (messages.length === 1 && messages[0].role === 'model');

    if (isInitialState) {
      setMessages([
        { role: 'model', text: t.chat.welcome, timestamp: new Date() }
      ]);
    }
  }, [t]); 

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(chatSessionRef.current, userMsg.text);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto w-[350px] md:w-[400px] h-[500px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 p-4 border-b border-neutral-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-neon-400/20 p-1.5 rounded-lg">
                <Sparkles size={18} className="text-neon-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">CarbonBot AI</h3>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-neutral-700' : 'bg-neon-500/20 text-neon-400'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-neutral-700 text-white rounded-tr-sm' 
                    : 'bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-500/20 text-neon-400 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-2xl rounded-tl-sm flex items-center">
                  <Loader2 size={16} className="animate-spin text-neon-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-neutral-900 border-t border-neutral-800">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t.chat.placeholder}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neon-400/50 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neon-400 hover:bg-neon-400/10 rounded-lg transition disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group flex items-center gap-3 bg-neon-500 hover:bg-neon-400 text-neutral-950 px-4 py-3 rounded-full shadow-lg shadow-neon-500/20 transition-all duration-300 transform hover:scale-105"
      >
        <span className={`font-bold text-sm hidden ${isOpen ? '' : 'md:block'} overflow-hidden whitespace-nowrap`}>
          {t.chat.toggle}
        </span>
        <MessageSquare size={24} className="fill-current" />
      </button>
    </div>
  );
};
