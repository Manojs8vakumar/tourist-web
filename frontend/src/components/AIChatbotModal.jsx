import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { askGeminiTravelAssistant } from '../services/geminiService';

export default function AIChatbotModal({ 
  isOpen, 
  onClose, 
  initialDestination = 'Rajasthan',
  onTriggerItineraryGeneration 
}) {
  const [destination, setDestination] = useState(initialDestination);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your AI Travel Concierge powered by Google Gemini. Ask me anything about exploring ${initialDestination}—ideal duration, hidden gems, weather advisories, or budget breakdowns.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialDestination) setDestination(initialDestination);
  }, [initialDestination]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (customPrompt) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await askGeminiTravelAssistant(textToSend, destination);
      const aiMsg = {
        sender: 'ai',
        text: res.response,
        source: res.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `I experienced a temporary network connection hiccup. However, for ${destination}, we generally recommend 4 to 6 days for the best experience. Would you like me to construct a visual day-by-day itinerary?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPills = [
    `How many days should I spend in ${destination}?`,
    `What are the must-see highlights in ${destination}?`,
    `When is the best season to visit ${destination}?`,
    `What is the estimated budget per day in ${destination}?`
  ];

  return (
    <div className="gemini-chatbot-overlay animate-fade-in" onClick={onClose}>
      <div className="gemini-chatbot-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-brand-col">
            <div className="chatbot-avatar">
              <Bot size={20} className="bot-icon" />
              <span className="online-indicator" />
            </div>
            <div>
              <div className="chatbot-title-row">
                <h3 className="chatbot-title font-serif">Gemini Travel Concierge</h3>
                <span className="gemini-badge font-mono">Google Gemini AI</span>
              </div>
              <p className="chatbot-sub">
                Ask anything about visiting <strong>{destination}</strong>
              </p>
            </div>
          </div>

          <div className="chatbot-header-actions">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="chatbot-dest-select font-mono"
            >
              <option value="Rajasthan">Rajasthan</option>
              <option value="South India (Namakkal & Tamil Nadu)">South India (Tamil Nadu)</option>
              <option value="Kashmir">Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Kerala">Kerala</option>
              <option value="Uttar Pradesh (Agra & Varanasi)">Uttar Pradesh (Agra)</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Sikkim">Sikkim</option>
            </select>

            <button onClick={onClose} className="chatbot-close-btn" aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Structured Itinerary Action Banner */}
        <div className="chatbot-itinerary-banner">
          <div>
            <span className="ib-tag font-mono">VISUAL ITINERARY PLANNER</span>
            <p className="ib-text">
              Want a real, readable day-by-day plan with morning/evening milestones?
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onTriggerItineraryGeneration?.(destination);
            }}
            className="ib-btn font-mono"
          >
            <Calendar size={14} />
            <span>Generate Day-by-Day Plan</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="chatbot-messages-stream">
          {messages.map((m, idx) => (
            <div key={idx} className={`chat-bubble-row ${m.sender}`}>
              {m.sender === 'ai' && (
                <div className="bubble-avatar">
                  <Bot size={15} />
                </div>
              )}
              <div className="bubble-content-wrap">
                <div className="bubble-body">
                  <p className="bubble-text">{m.text}</p>
                </div>
                <div className="bubble-meta">
                  <span className="bubble-time font-mono">{m.timestamp}</span>
                  {m.source && <span className="bubble-source font-mono">{m.source}</span>}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-bubble-row ai">
              <div className="bubble-avatar">
                <Bot size={15} />
              </div>
              <div className="bubble-body loading-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Pills */}
        <div className="chatbot-quick-pills">
          {quickPills.map((pill, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(pill)}
              disabled={isLoading}
              className="quick-pill-btn"
            >
              <Sparkles size={12} />
              <span>{pill}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="chatbot-input-bar"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask about sights, timing, food, or safety in ${destination}...`}
            className="chat-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="chat-send-btn"
            aria-label="Send query"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      <style>{`
        .gemini-chatbot-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 7, 12, 0.75);
          backdrop-filter: blur(8px);
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .gemini-chatbot-window {
          background: #ffffff;
          border-radius: 16px;
          max-width: 680px;
          width: 100%;
          height: 82vh;
          max-height: 720px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 60px rgba(10, 25, 47, 0.35);
          overflow: hidden;
          border: 1px solid #cbd5e1;
        }
        .chatbot-header {
          padding: 1.25rem 1.5rem;
          background: #0f172a;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .chatbot-brand-col {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .chatbot-avatar {
          position: relative;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #1e3a8a;
          border: 1.5px solid #38bdf8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #38bdf8;
        }
        .online-indicator {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #0f172a;
        }
        .chatbot-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .chatbot-title {
          font-size: 1.15rem;
          color: #ffffff;
          line-height: 1.2;
        }
        .gemini-badge {
          background: linear-gradient(135deg, #2563eb 0%, #38bdf8 100%);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 10px;
        }
        .chatbot-sub {
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .chatbot-header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .chatbot-dest-select {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
          outline: none;
        }
        .chatbot-dest-select option {
          background: #0f172a;
          color: #ffffff;
        }
        .chatbot-close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .chatbot-close-btn:hover {
          color: #ffffff;
        }
        .chatbot-itinerary-banner {
          background: #eff6ff;
          border-bottom: 1px solid #bfdbfe;
          padding: 0.75rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .ib-tag {
          font-size: 0.65rem;
          font-weight: 800;
          color: #1d4ed8;
          letter-spacing: 0.1em;
          display: block;
        }
        .ib-text {
          font-size: 0.8rem;
          color: #1e3a8a;
        }
        .ib-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #2563eb;
          color: #ffffff;
          border: none;
          padding: 0.45rem 0.95rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease;
        }
        .ib-btn:hover {
          background: #1d4ed8;
        }
        .chatbot-messages-stream {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #f8fafc;
        }
        .chat-bubble-row {
          display: flex;
          gap: 0.65rem;
          max-width: 85%;
        }
        .chat-bubble-row.ai {
          align-self: flex-start;
        }
        .chat-bubble-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .bubble-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #2563eb;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .bubble-body {
          padding: 0.85rem 1.1rem;
          border-radius: 12px;
          font-size: 0.88rem;
          line-height: 1.6;
        }
        .chat-bubble-row.ai .bubble-body {
          background: #ffffff;
          color: #1e293b;
          border: 1px solid #e2e8f0;
          border-top-left-radius: 2px;
        }
        .chat-bubble-row.user .bubble-body {
          background: #2563eb;
          color: #ffffff;
          border-top-right-radius: 2px;
        }
        .bubble-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
          font-size: 0.65rem;
          color: #94a3b8;
        }
        .chat-bubble-row.user .bubble-meta {
          justify-content: flex-end;
        }
        .loading-bubble {
          display: flex;
          gap: 0.35rem;
          align-items: center;
          padding: 0.75rem 1rem;
        }
        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3b82f6;
          animation: blink 1.4s infinite both;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        .chatbot-quick-pills {
          padding: 0.65rem 1.25rem;
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
        }
        .quick-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #334155;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.74rem;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quick-pill-btn:hover {
          background: #eff6ff;
          color: #2563eb;
          border-color: #93c5fd;
        }
        .chatbot-input-bar {
          display: flex;
          align-items: center;
          padding: 0.85rem 1.25rem;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          gap: 0.75rem;
        }
        .chat-input {
          flex: 1;
          border: 1px solid #cbd5e1;
          border-radius: 24px;
          padding: 0.65rem 1.15rem;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .chat-input:focus {
          border-color: #2563eb;
        }
        .chat-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #2563eb;
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .chat-send-btn:hover {
          background: #1d4ed8;
        }
        .chat-send-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
