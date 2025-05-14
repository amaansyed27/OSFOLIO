import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, MapPin, Book, Heart, Code, ExternalLink } from 'lucide-react';

const AboutApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="h-full flex flex-col bg-[#202020] text-white overflow-hidden">
      
      {/* Main content with tabs */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <Tabs 
          defaultValue="general" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full h-full flex flex-col"
        >
          <TabsList className="grid grid-cols-5 h-10 bg-[#333333]">
            <TabsTrigger value="general" className="text-sm data-[state=active]:bg-[#444444] data-[state=active]:text-white">
              General
            </TabsTrigger>
            <TabsTrigger value="personal" className="text-sm data-[state=active]:bg-[#444444] data-[state=active]:text-white">
              Personal
            </TabsTrigger>
            <TabsTrigger value="education" className="text-sm data-[state=active]:bg-[#444444] data-[state=active]:text-white">
              Education
            </TabsTrigger>
            <TabsTrigger value="interests" className="text-sm data-[state=active]:bg-[#444444] data-[state=active]:text-white">
              Interests
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-sm data-[state=active]:bg-[#444444] data-[state=active]:text-white">
              Contact
            </TabsTrigger>
          </TabsList>
          
          {/* Content area with scroll */}
          <div className="flex-1 p-4 mt-2 bg-[#2a2a2a] border border-[#444444] overflow-y-auto scrollbar-dark">
            <TabsContent value="general" className="mt-0 h-full">
              <div className="flex flex-col md:flex-row gap-4 h-full">
                {/* System icon */}
                <div className="flex items-center justify-center md:w-1/3">
                  <div className="bg-[#1a1a1a] border border-[#444444] p-6 rounded-md">
                    <User className="h-24 w-24 text-[#0078d4] mx-auto" />
                    <div className="text-center mt-2">
                      <h2 className="text-xl font-semibold">Amaan Syed</h2>
                      <p className="text-sm text-[#0078d4]">Tech Geek — Native Android Developer</p>
                    </div>
                  </div>
                </div>
                
                {/* System specs */}
                <div className="md:w-2/3 space-y-4">
                  <div className="bg-[#1a1a1a] border border-[#444444] p-3 rounded-md">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="py-1 text-[#cccccc] w-1/3">Status:</td>
                          <td className="py-1">
                            <span className="text-green-400">● Active</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-[#cccccc]">Role:</td>
                          <td className="py-1">Native Android Developer</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-[#cccccc]">Location:</td>
                          <td className="py-1">Pune, India</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-[#cccccc]">Experience:</td>
                          <td className="py-1">Android Club, MakeMyCards</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-[#1a1a1a] border border-[#444444] p-3 rounded-md">
                    <h3 className="text-sm font-semibold mb-2">About</h3>
                    <p className="text-sm leading-relaxed text-[#dddddd]">
                      Hi, I'm Amaan, a tech geek and Native Android Developer based in Pune, India. 
                      I'm passionate about user-centric design and enhancing digital experiences. 
                      With skills in Figma and a strong background in research and evaluation, 
                      I'm dedicated to delivering designs that align with user needs and business goals.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="personal" className="mt-0 space-y-4">
              <div className="bg-[#1a1a1a] border border-[#444444] p-4 rounded-md">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-[#dddddd]">Current:</p>
                  <p className="text-[#0078d4]">Pune, India</p>
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#444444] p-4 rounded-md">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Motivation
                </h3>
                <blockquote className="border-l-2 border-[#0078d4] pl-3 italic text-[#dddddd] text-sm">
                  I believe in creating technology that enhances human experiences. My passion lies in building 
                  intuitive, user-friendly applications that solve real problems. I'm constantly exploring new 
                  technologies and methodologies to improve my craft and deliver exceptional results.
                </blockquote>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#444444] p-4 rounded-md">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  Personal Quote
                </h3>
                <div className="bg-[#004275] text-[#ffffff] p-2 rounded text-sm">
                  "Racing through code, one pixel at a time"
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] border border-[#444444] p-4 rounded-md">
                  <h3 className="text-sm font-semibold mb-2 flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    Academic Background
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="border-b border-[#333333] pb-2">
                      <h4 className="text-[#0078d4]">Vellore Institute of Technology</h4>
                      <p className="text-xs text-[#999999]">Computer Science Engineering • 2019-2023</p>
                      <p className="text-sm mt-1">Bachelor's degree focused on software development and computer systems.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-[#0078d4]">Certifications</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 mt-1 text-[#dddddd]">
                        <li>Android Developer Certification</li>
                        <li>UI/UX Design Fundamentals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="interests" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#1a1a1a] border border-[#444444] p-4 rounded-md">
                  <h3 className="text-sm font-semibold mb-2">Technical Interests</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-[#dddddd]">
                    <li>Android Development</li>
                    <li>Kotlin & Java Programming</li>
                    <li>UI/UX Design</li>
                    <li>API Integration</li>
                    <li>Mobile Architecture</li>
                  </ul>
                </div>
                
                <div className="bg-[#1a1a1a] border border-[#444444] p-4 rounded-md">
                  <h3 className="text-sm font-semibold mb-2">Other Interests</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-[#dddddd]">
                    <li>User-centric Design</li>
                    <li>Digital Experiences</li>
                    <li>Technology Trends</li>
                    <li>High-impact Projects</li>
                    <li>Interactive Systems</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="mt-0">
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] border border-[#444444] p-4 rounded-md">
                  <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-[#333333]">
                      <span className="text-[#cccccc]">Email:</span>
                      <a href="mailto:amaan@example.com" className="text-[#0078d4] hover:underline flex items-center">
                        amaan@example.com 
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-[#333333]">
                      <span className="text-[#cccccc]">GitHub:</span>
                      <a href="https://github.com/Amaan27" target="_blank" rel="noopener noreferrer" className="text-[#0078d4] hover:underline flex items-center">
                        github.com/Amaan27
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-[#333333]">
                      <span className="text-[#cccccc]">LinkedIn:</span>
                      <a href="#" className="text-[#0078d4] hover:underline flex items-center">
                        linkedin.com/in/amaan-syed
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1a1a1a] border border-[#444444] p-4 rounded-md">
                  <div className="flex justify-center">
                    <button className="bg-[#0078d4] hover:bg-[#0086f0] text-white py-2 px-4 rounded">
                      Contact Me
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      {/* Dialog bottom buttons */}
      <div className="bg-[#202020] p-3 border-t border-[#444444] flex justify-end space-x-2">
        <Button 
          variant="secondary" 
          className="bg-[#333333] hover:bg-[#444444] text-white"
        >
          OK
        </Button>
        <Button 
          variant="secondary"
          className="bg-[#333333] hover:bg-[#444444] text-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AboutApp;