
import React, { useRef, useEffect, useState } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    // Load the user's profile image
    const img = new Image();
    img.src = '/lovable-uploads/f3fe388e-8395-4e81-b6a8-41447ff0d7f2.png';
    img.onload = () => {
      setUserImage(img);
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation constants
    const fontSize = 18;
    const smallFontSize = 12;
    const textColor = 'rgba(255, 255, 255, 0.5)';
    const accentColor = 'rgba(0, 198, 207, 0.8)';
    
    // Create ASCII representation with the improved art
    const createASCII = () => {
      return [
        "   █████╗ ███╗   ███╗ █████╗  █████╗ ███╗   ██╗    ███████╗██╗   ██╗███████╗██████╗ ",
        "   ██╔══██╗████╗ ████║██╔══██╗██╔══██╗████╗  ██║    ██╔════╝╚██╗ ██╔╝██╔════╝██╔══██╗",
        "   ███████║██╔████╔██║███████║███████║██╔██╗ ██║    ███████╗ ╚████╔╝ █████╗  ██║  ██║",
        "   ██╔══██║██║╚██╔╝██║██╔══██║██╔══██║██║╚██╗██║    ╚════██║  ╚██╔╝  ██╔══╝  ██║  ██║",
        "   ██║  ██║██║ ╚═╝ ██║██║  ██║██║  ██║██║ ╚████║    ███████║   ██║   ███████╗██████╔╝",
        "   ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚══════╝   ╚═╝   ╚═╝╚═════╝╚═════╝"
      ];
    };

    // Animation vars
    let frame = 0;
    let asciiYOffset = 0;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a'); // Dark blue
      gradient.addColorStop(1, '#1e293b'); // Slightly lighter blue
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate positions (centered)
      const centerX = canvas.width / 2;
      const topY = canvas.height * 0.15;
      
      // Draw profile image (centered at the top)
      if (userImage) {
        const imageSize = 100;
        ctx.save();
        
        // Create circular clip
        ctx.beginPath();
        ctx.arc(centerX, topY + imageSize/2, imageSize/2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        // Draw the image in the circular clip
        ctx.drawImage(
          userImage, 
          centerX - imageSize/2, 
          topY, 
          imageSize, 
          imageSize
        );
        
        ctx.restore();
      }
      
      // Draw main heading
      ctx.font = `bold ${fontSize + 10}px monospace`;
      ctx.fillStyle = accentColor;
      ctx.textAlign = 'center';
      ctx.fillText("Amaan Syed | Tech Geek | L0L", centerX, topY + 140);
      
      // Draw ASCII art
      const ascii = createASCII();
      ctx.font = `${fontSize - 4}px monospace`;
      ctx.fillStyle = textColor;
      
      // Calculate ASCII text position
      const asciiY = topY + 200;
      asciiYOffset = Math.sin(frame / 30) * 5; // Subtle floating effect
      
      // Draw each line of ASCII
      for (let i = 0; i < ascii.length; i++) {
        ctx.fillText(ascii[i], centerX, asciiY + i * fontSize + asciiYOffset);
      }
      
      // Welcome text
      ctx.font = `bold ${fontSize + 6}px monospace`;
      ctx.fillStyle = accentColor;
      ctx.fillText("Welcome to Osfolio!!!", centerX, asciiY + (ascii.length + 2) * fontSize + asciiYOffset);
      
      // Instructions text
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = textColor;
      ctx.fillText("Use apps and oscar to know about me, or chat with others online", centerX, asciiY + (ascii.length + 4) * fontSize + asciiYOffset);
      
      // Small text
      ctx.font = `${smallFontSize}px monospace`;
      ctx.fillText("in the chat app anonymously", centerX, asciiY + (ascii.length + 5) * fontSize + asciiYOffset);
      
      // Quote
      ctx.font = `italic ${fontSize}px monospace`;
      ctx.fillStyle = accentColor;
      ctx.fillText("\"Racing through code, one pixel at a time\"", centerX, asciiY + (ascii.length + 7) * fontSize + asciiYOffset);
      
      // Update animation frame
      frame++;
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [userImage]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0"
    />
  );
};

export default AnimatedBackground;
