import React, { useState } from 'react';
import { WindowProvider } from './context/WindowContext';
import Desktop from './components/Desktop';
import LoginScreen from './components/LoginScreen';

// Mobile Layout Component (Simplified)
const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
       <header className="mb-8 text-center">
         <h1 className="text-3xl font-bold text-gray-900">Denton Sun</h1>
         <p className="text-gray-600">Software Engineer</p>
         <div className="flex justify-center gap-4 mt-4">
             <a href="mailto:dentonjdsun@gmail.com" className="px-4 py-2 bg-blue-600 text-white rounded">Email</a>
             <a href="https://linkedin.com/in/dentonjdsun" className="px-4 py-2 bg-blue-800 text-white rounded">LinkedIn</a>
         </div>
       </header>

       <div className="space-y-6">
          <div className="bg-white p-6 rounded shadow">
             <h2 className="text-xl font-bold mb-4 border-b pb-2">Experience</h2>
             <div className="space-y-4">
                 <div>
                     <h3 className="font-bold">Movmint</h3>
                     <p className="text-sm text-gray-500">Software Engineer | 2024 - Present</p>
                     <p className="mt-1 text-gray-700 text-sm">Offline CBDC payments, HSM security, Backend logic.</p>
                 </div>
                  <div>
                     <h3 className="font-bold">Whatifi</h3>
                     <p className="text-sm text-gray-500">Developer Intern | 2022</p>
                     <p className="mt-1 text-gray-700 text-sm">Fintech modeling tools in React & Golang.</p>
                 </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
             <h2 className="text-xl font-bold mb-4 border-b pb-2">Projects</h2>
             <ul className="list-disc pl-4 text-sm text-gray-700 space-y-2">
                 <li><strong>Esports Game Analyzer:</strong> Python data analysis for LoL matches.</li>
                 <li><strong>ThoughtSlothAI:</strong> Android mental health journaling app with NLP.</li>
             </ul>
          </div>

          <div className="bg-white p-6 rounded shadow">
             <h2 className="text-xl font-bold mb-4 border-b pb-2">Skills</h2>
             <p className="text-sm text-gray-700">Python, JavaScript, TypeScript, Golang, React, Node.js, AWS, Docker, SQL, Redis.</p>
          </div>
          
          <div className="text-center text-gray-500 text-xs mt-8">
             Visit on Desktop for full interactive OS experience
          </div>
       </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile] = useState(window.innerWidth < 768);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isMobile) {
      return <MobileLayout />;
  }

  return (
    <WindowProvider>
      {isLoggedIn ? (
        <Desktop onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </WindowProvider>
  );
}

export default App;