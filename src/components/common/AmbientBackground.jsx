import { useEffect, useState } from "react";

const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#030303]">
      {/* Dynamic Ambient Blur Blobs */}
      <div 
        className="absolute -top-[20%] left-[10%] h-[600px] w-[600px] rounded-full bg-accent opacity-10 blur-[130px] transition-colors duration-1000 animate-pulse"
        style={{ animationDuration: "12s" }}
      />
      <div 
        className="absolute top-[40%] -right-[10%] h-[500px] w-[500px] rounded-full bg-accent opacity-5 blur-[120px] transition-colors duration-1000"
        style={{ 
          animation: "floatSlow 25s infinite ease-in-out",
        }}
      />
      <div 
        className="absolute -bottom-[20%] left-[20%] h-[600px] w-[600px] rounded-full bg-accent opacity-8 blur-[140px] transition-colors duration-1000"
        style={{ 
          animation: "floatSlowReverse 30s infinite ease-in-out",
        }}
      />

      {/* Grid Pattern Layer */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Fine Noise Texture Overlay */}
      <div className="absolute inset-0 noise-bg" />

      {/* Embedded CSS for keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatSlow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-50px, 40px) scale(1.1);
          }
          66% {
            transform: translate(30px, -60px) scale(0.95);
          }
        }
        @keyframes floatSlowReverse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -50px) scale(0.9);
          }
          66% {
            transform: translate(-30px, 40px) scale(1.15);
          }
        }
      `}} />
    </div>
  );
};

export default AmbientBackground;
