import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Sparkles, BrainCircuit, Mic, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OscarAI } from '@/data/oscar-ai';
import { greetings } from '@/data/oscar-knowledge-base';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Suggested questions for users to quickly ask OSCAR
const suggestedQuestions = [
  "What are Amaan's skills?",
  "Tell me about Amaan's projects",
  "What is Amaan's education?",
  "What experience does Amaan have?",
  "What achievements does Amaan have?",
  "How can I contact Amaan?",
  "Tell me about Dataweave",
  "What is OSCAR?",
  "What is Amaan working on now?",
  "Where is Amaan from?"
];

const OscarApp: React.FC = () => {
  // Initial greeting is randomly selected
  const initialGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: initialGreeting,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // Generate response with a realistic delay
    setTimeout(() => {
      const response = OscarAI.generateResponse(userMessage.text);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsThinking(false);
    }, Math.random() * 500 + 800); // Random delay between 800-1300ms
  };

  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    
    // Focus the input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
  
  // Format timestamp for messages
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-black/30 rounded-lg overflow-hidden">  
      {/* Tab navigation */}
      <div className="bg-black/20 w-full flex p-1 border-b border-white/10">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center justify-center flex-1 py-2 px-3 text-sm font-medium transition-colors ${
            activeTab === 'chat' 
              ? 'text-white border-b-2 border-purple-500' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Bot className="h-4 w-4 mr-2" />
          Chat
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center justify-center flex-1 py-2 px-3 text-sm font-medium transition-colors ${
            activeTab === 'about' 
              ? 'text-white border-b-2 border-purple-500' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Info className="h-4 w-4 mr-2" />
          About
        </button>
      </div>

      {/* Main content area with tabs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col h-full"
        >
          {activeTab === 'chat' ? (
            <div className="flex-1 flex flex-col m-0 p-0 h-full">
              {/* Chat messages display - updated with scrollbar-dark class */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-dark" style={{ maxHeight: 'calc(100% - 115px)', overflowY: 'auto' }}>
                <AnimatePresence mode="sync">
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                        message.isBot 
                          ? 'bg-gradient-to-r from-purple-700/60 to-blue-600/60 text-white border border-purple-500/20' 
                          : 'bg-white/10 text-white border border-white/10'
                      }`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center">
                            {message.isBot ? (
                              <>
                                <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full mr-1.5">
                                  <BrainCircuit className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-purple-300">OSCAR</span>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center justify-center w-5 h-5 bg-blue-500/30 rounded-full mr-1.5">
                                  <User className="h-3 w-3 text-blue-200" />
                                </div>
                                <span className="text-xs font-semibold text-blue-300">You</span>
                              </>
                            )}
                          </div>
                          <span className="text-xs opacity-50">{formatTime(message.timestamp)}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Separate AnimatePresence for thinking indicator - Updated delay classes */}
                <AnimatePresence>
                  {isThinking && (
                    <motion.div
                      key="thinking-indicator"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gradient-to-r from-purple-700/40 to-blue-600/40 text-white px-4 py-2 rounded-2xl border border-purple-500/20 flex items-center space-x-2">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full mr-1.5">
                            <BrainCircuit className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-xs font-semibold text-purple-300">OSCAR</span>
                        </div>
                        <span className="text-white flex items-center">
                          <span className="animate-pulse mx-0.5">•</span>
                          <span className="animate-pulse delay-200 mx-0.5">•</span>
                          <span className="animate-pulse delay-400 mx-0.5">•</span>
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Suggested questions - updated with scrollbar-dark class */}
              <div className="px-4">
                <div className="flex overflow-x-auto py-3 space-x-2 scrollbar-dark">
                  {suggestedQuestions.map((q, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap bg-white/5 border-white/10 hover:bg-white/10 flex-shrink-0"
                      onClick={() => handleSuggestedQuestion(q)}
                    >
                      <Sparkles className="h-3 w-3 mr-1.5 text-purple-400" />
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Input area */}
              <div className="p-4 bg-black/40">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={inputRef}
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 pr-10 py-6"
                      placeholder="Ask OSCAR about Amaan..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSend();
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 hover:bg-transparent"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSend}
                    disabled={!input.trim() || isThinking}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-5"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto m-0 p-4 scrollbar-dark h-full" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 10px)' }}>
              <div className="space-y-6 pb-8">
                <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">About OSCAR</h3>
                  <p className="text-white/80 leading-relaxed">
                    OSCAR (Optimized System for Commands and Assistance) is Amaan's personal AI assistant, designed to help you learn more about him. OSCAR can answer questions about Amaan's background, skills, experience, education, projects, and achievements.
                  </p>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">What can OSCAR do?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-purple-500/20 p-2 rounded mr-3 mt-1">
                        <BrainCircuit className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Personal Information</h4>
                        <p className="text-sm text-white/70">Learn about Amaan's background, interests, and personal details.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-500/20 p-2 rounded mr-3 mt-1">
                        <Bot className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Professional Information</h4>
                        <p className="text-sm text-white/70">Discover Amaan's skills, experience, and professional background.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-500/20 p-2 rounded mr-3 mt-1">
                        <Send className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Project Information</h4>
                        <p className="text-sm text-white/70">Get details about Amaan's current and upcoming projects.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Try These Example Questions</h3>
                  <div className="space-y-2">
                    {suggestedQuestions.slice(0, 5).map((question, i) => (
                      <div 
                        key={i} 
                        className="bg-white/5 hover:bg-white/10 rounded-lg p-3 cursor-pointer transition"
                        onClick={() => {
                          handleSuggestedQuestion(question);
                          setActiveTab('chat');
                        }}
                      >
                        <div className="flex items-center">
                          <Sparkles className="h-3 w-3 mr-2 text-purple-400" />
                          <span className="text-white/80">{question}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Future Development</h3>
                      <p className="text-white/80 leading-relaxed">
                        OSCAR is an actual upcoming project Amaan is working on, which will be a second-brain operating system for Windows – inspired by the concept of JARVIS but built using Python, locally-running LLMs, and a custom neural voice model. The version you're interacting with is just a preview of OSCAR's capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OscarApp;