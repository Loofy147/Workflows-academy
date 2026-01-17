import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader, Zap, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "clarification" | "workflow_ready" | "suggestion";
  suggestions?: string[];
}

const EXAMPLE_PROMPTS = [
  "I need to scrape product listings from Ouedkniss",
  "Create an Instagram auto-reply bot in Darja",
  "Send me daily email reports of new job postings",
  "Automatically categorize customer emails",
];

export default function AIWorkflowBuilder() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Hi! I'm your AI Workflow Builder. Describe what you want to automate, and I'll create a workflow for you. No coding required!",
      timestamp: new Date(),
      type: "text",
      suggestions: EXAMPLE_PROMPTS,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI agent response
    setTimeout(() => {
      const responses: Message[] = [
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Great! I understand you want to automate this task. Let me ask a few clarifying questions to build the perfect workflow for you.",
          timestamp: new Date(),
          type: "clarification",
          suggestions: [
            "Which platform should I integrate with?",
            "How often should this run?",
            "What should happen with the results?",
          ],
        },
      ];

      setMessages((prev) => [...prev, ...responses]);
      setLoading(false);
    }, 1500);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            AI Workflow Builder
          </h1>
          <p className="text-slate-400 text-sm mt-1">Describe what you want to automate, and I'll build it for you</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-cyan-500/20 border border-cyan-500/30 text-slate-100"
                    : "bg-slate-800/50 border border-slate-700/50 text-slate-100"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>

                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-slate-400 font-semibold">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestion(suggestion)}
                          className="px-3 py-1 rounded-full bg-slate-700/30 border border-slate-600/30 text-xs text-slate-300 hover:border-cyan-500/50 transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-500 mt-2">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin text-cyan-400" />
                <span className="text-sm text-slate-400">AI Agent is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-slate-800/50 border-t border-slate-700/50 backdrop-blur-sm px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Describe what you want to automate..."
              className="flex-1 bg-slate-700/30 border-slate-600 text-slate-100 placeholder-slate-500"
              disabled={loading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-cyan-600 hover:bg-cyan-700 text-white border-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {messages.length === 1 && (
            <div className="mt-4">
              <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Try these examples:
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestion(prompt)}
                    className="px-3 py-1 rounded-lg bg-slate-700/30 border border-slate-600/30 text-xs text-slate-300 hover:border-cyan-500/50 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
