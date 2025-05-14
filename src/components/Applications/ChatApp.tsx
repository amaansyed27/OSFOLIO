
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, MessageSquare } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  color: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      username: 'System',
      text: 'Welcome to the chat! Enter your username to start chatting.',
      timestamp: new Date(),
      color: '#9b87f5'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [usernameSet, setUsernameSet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Array of colors for different users
  const userColors = [
    '#9b87f5', '#F97316', '#0EA5E9', '#D946EF', 
    '#8B5CF6', '#1EAEDB', '#33C3F0', '#ea384c'
  ];

  // Auto-scrolling when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Set a random username color when username is set
  const handleSetUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername);
      setUsernameSet(true);
      const randomColor = userColors[Math.floor(Math.random() * userColors.length)];
      
      // Add a system message that the user has joined
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          username: 'System',
          text: `${tempUsername} has joined the chat!`,
          timestamp: new Date(),
          color: '#9b87f5'
        }
      ]);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && username) {
      const newMessage: Message = {
        id: Date.now().toString(),
        username,
        text: inputMessage,
        timestamp: new Date(),
        color: userColors[username.length % userColors.length] // Deterministic color based on username
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!usernameSet) {
        handleSetUsername();
      } else {
        handleSendMessage();
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-os-accent" />
          Live Chat
        </h2>
        {usernameSet && (
          <div className="flex items-center bg-black/30 rounded-full px-3 py-1">
            <User className="h-4 w-4 mr-2 text-os-accent" />
            <span className="text-sm">{username}</span>
          </div>
        )}
      </div>

      {!usernameSet ? (
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-md p-6 bg-black/20 rounded-lg border border-white/10">
            <h3 className="text-xl font-medium text-os-accent mb-4">Choose a username</h3>
            <div className="space-y-4">
              <Input
                placeholder="Enter username..."
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="bg-black/30"
              />
              <Button 
                onClick={handleSetUsername} 
                className="w-full bg-os-accent hover:bg-os-accent/80"
                disabled={!tempUsername.trim()}
              >
                Join Chat
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-2 scrollbar-thin">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={cn(
                  "p-3 rounded-lg",
                  msg.username === 'System' 
                    ? "bg-black/30 border border-white/5 text-white/70 text-center text-sm" 
                    : msg.username === username 
                      ? "bg-os-accent/20 ml-8" 
                      : "bg-black/30 mr-8"
                )}
                initial={{ opacity: 0, x: msg.username === username ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {msg.username !== 'System' && (
                  <div className="flex items-center mb-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback style={{ backgroundColor: msg.color }}>
                        {msg.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm" style={{ color: msg.color }}>
                      {msg.username}
                    </span>
                    <span className="ml-auto text-xs text-white/50">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                )}
                <p className={cn(
                  "text-sm",
                  msg.username === 'System' ? "text-white/70" : "text-white"
                )}>
                  {msg.text}
                </p>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-black/30 border-white/10"
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-os-accent hover:bg-os-accent/80 px-4"
              disabled={!inputMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatApp;
