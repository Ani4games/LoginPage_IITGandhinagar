import { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, MoreVertical, ArrowLeft, Smile, Paperclip, Mic } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const botResponses = [
  "Hello! How can I help you today?",
  "I'm here to assist you. What would you like to know?",
  "That's a great question! Let me help you with that.",
  "Thanks for reaching out! I'm processing your request.",
  "I understand. Is there anything specific you'd like to know?",
  "Sure! I can help you with that.",
  "Let me check that for you...",
  "Great! What else can I help you with?",
];

export function WhatsAppChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your WhatsApp assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col
    h-full w-full
    max-w-full
    sm:max-w-[480px]
    md:max-w-[720px]
    lg:max-w-[900px]
    xl:max-w-[1100px]
    bg-[#0b141a]
    shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#202c33] px-4 py-2.5 border-b border-[#2a3942]">
        <button className="lg:hidden">
          <ArrowLeft className="w-6 h-6 text-[#aebac1]" />
        </button>
        <div className="w-10 h-10 rounded-full bg-[#6a7c85] flex items-center justify-center">
          <span className="text-[#111b21] font-medium">AI</span>
        </div>
        <div className="flex-1">
          <h2 className="text-white">Assistant Bot</h2>
          <p className="text-xs text-[#8696a0]">
            {isTyping ? "typing..." : "online"}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <button className="text-[#aebac1] hover:text-white transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="text-[#aebac1] hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="text-[#aebac1] hover:text-white transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Background Pattern */}
      <div
  className="flex-1 overflow-y-auto px-4 py-3 bg-[#0b141a] chat-scrollbar scroll-smooth"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23182229' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  }}
>
  <div className="flex flex-col gap-2">
    {messages.map((message) => (
      <div
        key={message.id}
        className={`flex ${
          message.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[75%] rounded-lg px-3 py-2 ${
            message.sender === "user"
              ? "bg-[#005c4b] text-white rounded-br-none"
              : "bg-[#202c33] text-white rounded-bl-none"
          }`}
        >
          <p className="text-sm leading-relaxed break-words">
            {message.text}
          </p>
          <p
            className={`text-[10px] mt-1 text-right ${
              message.sender === "user"
                ? "text-[#b8d3cc]"
                : "text-[#8696a0]"
            }`}
          >
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    ))}

    {isTyping && (
      <div className="flex justify-start">
        <div className="bg-[#202c33] rounded-lg rounded-bl-none px-4 py-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    )}

    <div ref={messagesEndRef} />
  </div>
</div>

      {/* Input Area */}
      <div className="bg-[#202c33] px-3 py-2 flex items-end gap-2">
        <button className="text-[#8696a0] hover:text-white transition-colors mb-2">
          <Smile className="w-6 h-6" />
        </button>
        <button className="text-[#8696a0] hover:text-white transition-colors mb-2">
          <Paperclip className="w-6 h-6" />
        </button>
        <div className="flex-1 bg-[#2a3942] rounded-lg px-3 py-2 max-h-32 overflow-y-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="w-full bg-transparent text-white text-sm placeholder-[#8696a0] outline-none"
          />
        </div>
        <button
          onClick={handleSend}
          className="mb-2 transition-colors"
        >
          {inputValue.trim() ? (
            <div className="bg-[#00a884] rounded-full p-2 hover:bg-[#06cf9c] transition-colors">
              <Send className="w-5 h-5 text-[#0b141a]" />
            </div>
          ) : (
            <Mic className="w-6 h-6 text-[#8696a0] hover:text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
