import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  User,
  ChevronDown,
  Minimize2,
  Maximize2,
  Paperclip,
} from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can we help you today?",
      sender: "support",
      timestamp: new Date().toISOString(),
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = {
        room: "general-support",
        text: message,
        sender: "user",
        timestamp: new Date().toISOString(),
      };

      // Add user message to local state
      setMessages((prev) => [...prev, { ...messageData, id: Date.now() }]);
      setMessage("");

      // Simulate dummy response
      setTimeout(() => {
        const dummyResponse = {
          id: Date.now() + 1,
          text: "Thanks for reaching out! This is a demo response. Our support team will get back to you shortly.",
          sender: "support",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, dummyResponse]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end selection:bg-lime-500/30">
      {/* Chat Window */}
      <div
        className={`
          transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom-right
          mb-4 ${
            isExpanded ? "w-[90vw] sm:w-[500px]" : "w-[380px] sm:w-[400px]"
          } max-w-[calc(100vw-2rem)]
          bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-4 pointer-events-none absolute bottom-0 right-0"
          }
        `}
      >
        {/* Header */}
        <div className="bg-navy-500 p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <User className="w-5 h-5 text-lime-400" />
              </div>
              <span
                className="absolute bottom-0 right-0 w-3 h-3 border-2 border-navy-500 rounded-full bg-green-500"
              ></span>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">
                Support Team
              </h3>
              <p className="text-navy-200 text-xs flex items-center gap-1">
                We are online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-navy-200 relative z-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className={`${
          isExpanded ? "h-[500px]" : "h-[400px]"
        } overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white/50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent transition-all duration-300`}>
          <div className="text-center text-xs text-gray-400 my-4 flex items-center justify-center gap-2 before:h-px before:w-12 before:bg-gray-200 after:h-px after:w-12 after:bg-gray-200">
            Today
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`
                  max-w-[80%] p-3.5 rounded-2xl text-sm relative shadow-sm
                  ${
                    msg.sender === "user"
                      ? "bg-navy-500 text-white rounded-tr-none"
                      : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                  }
                `}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[10px] mt-1 block w-full text-right ${
                    msg.sender === "user" ? "text-navy-200" : "text-gray-400"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 border-t border-gray-100 backdrop-blur-sm">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-full border border-gray-200 focus-within:border-navy-500 focus-within:ring-1 focus-within:ring-navy-500/20 transition-all shadow-inner"
          >
            <button
              type="button"
              className="p-2.5 text-gray-400 hover:text-navy-500 hover:bg-white rounded-full transition-all"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400 min-w-0"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className={`
                p-2.5 rounded-full flex items-center justify-center transition-all duration-200
                ${
                  message.trim()
                    ? "bg-lime-500 text-navy-900 shadow-md shadow-lime-500/20 hover:bg-lime-400 transform hover:scale-105 active:scale-95"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
              Powered by{" "}
              <span className="font-bold text-navy-500">Fixonic AI</span>
            </span>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl shadow-navy-500/30 transition-all duration-300 z-50 overflow-hidden
          ${
            isOpen
              ? "bg-navy-400 rotate-90"
              : "bg-navy-500 hover:bg-navy-600 hover:scale-110 rotate-0"
          }
        `}
      >
        <span
          className={`absolute inset-0 bg-lime-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out origin-center`}
        ></span>

        {isOpen ? (
          <ChevronDown className="w-7 h-7 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
