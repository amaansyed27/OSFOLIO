
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactApp: React.FC = () => {
  const { toast } = useToast();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="text-white h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Mail className="mr-2 h-5 w-5 text-os-accent" />
          Contact & Connect
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-black/20 rounded-lg p-4 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold text-os-accent mb-4">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white/80 mb-1">Name</label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white/80 mb-1">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white/80 mb-1">Message</label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                className="bg-black/20 border-white/20 text-white placeholder-white/50 min-h-[100px]"
                placeholder="Your message here..."
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-os-primary hover:bg-os-secondary text-white"
            >
              Send Message
            </Button>
          </form>
        </motion.div>

        <motion.div
          className="bg-black/20 rounded-lg p-4 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-os-accent mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-white/70 mr-3" />
              <a href="mailto:amaansyed27@gmail.com" className="text-white/80 hover:text-white">
                amaansyed27@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-white/70 mr-3" />
              <a href="tel:+919325491427" className="text-white/80 hover:text-white">
                +91 9325491427
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-white/70 mr-3" />
              <span className="text-white/80">Pune, India</span>
            </div>
            <div className="flex items-center">
              <Linkedin className="h-5 w-5 text-white/70 mr-3" />
              <a 
                href="https://linkedin.com/in/amaan-syed" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-white"
              >
                linkedin.com/in/amaan-syed
              </a>
            </div>
            <div className="flex items-center">
              <Github className="h-5 w-5 text-white/70 mr-3" />
              <a 
                href="https://github.com/amaan-syed" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-white"
              >
                github.com/amaan-syed
              </a>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              className="w-full bg-os-accent hover:bg-os-accent/80 text-white"
              onClick={() => {
                // In a real app, this would link to a resume download
                toast({
                  title: "Resume",
                  description: "Resume download would start here in the real app.",
                });
              }}
            >
              Download Resume (PDF)
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactApp;
