import React, { useState } from 'react';
import { User } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Simulate loading time
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className={`h-screen w-screen bg-[#003399] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${isLoggingIn ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 w-full h-[15vh] bg-[#003399] flex justify-between items-end p-8 border-t border-white/10">
         <div className="text-white text-xl opacity-50 font-bold italic">Windows Retro Edition</div>
         <div className="text-white opacity-50">To turn off your computer, click Turn Off Computer.</div>
      </div>

      <div className="flex items-center gap-8 z-10">
         {/* Left Side Logo Area */}
         <div className="hidden md:flex flex-col items-end border-r-2 border-white/30 pr-8 py-12">
             <div className="text-white font-bold text-5xl italic drop-shadow-md mb-2">Denton</div>
             <div className="text-white text-3xl font-light">Portfolio OS</div>
         </div>

         {/* Right Side User Area */}
         <div className="pl-4 md:pl-0">
             <div 
               onClick={handleLogin}
               className="group flex items-center gap-4 p-4 rounded hover:bg-[#0044cc] transition-colors cursor-pointer border border-transparent hover:border-white/30"
             >
                 <div className="w-20 h-20 bg-yellow-400 rounded border-4 border-white shadow-lg flex items-center justify-center group-hover:border-yellow-200 overflow-hidden">
                    <User size={48} className="text-yellow-700" />
                 </div>
                 <div className="flex flex-col">
                     <span className="text-white text-2xl font-bold group-hover:underline">Denton Sun</span>
                     <span className="text-blue-200 text-sm">{isLoggingIn ? 'Loading settings...' : 'Click to enter'}</span>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default LoginScreen;