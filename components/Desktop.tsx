import React from "react";
import { useWindow } from "../context/WindowContext";
import DesktopIcon from "./os/DesktopIcon";
import WindowFrame from "./os/WindowFrame";
import Taskbar from "./os/Taskbar";
import WeatherWidget from "./widgets/WeatherWidget";
import StockWidget from "./widgets/StockWidget";
import {
  Briefcase,
  Cpu,
  GraduationCap,
  Gamepad2,
  Mail,
  FileText,
} from "lucide-react";
import { FaHardHat } from "react-icons/fa"; // Using FontAwesome for solid fill

// App Components
import WorkExperience from "./apps/WorkExperience";
import Projects from "./apps/Projects";
import Skills from "./apps/Skills";
import PDFViewer from "./apps/PDFViewer";
import Minesweeper from "./games/Minesweeper";
import Snake from "./games/Snake";

interface DesktopProps {
  onLogout: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ onLogout }) => {
  const { windows, openWindow } = useWindow();

  const getPDFUrl = () => {
    // Smart URL detection - automatically works for:
    // - Local dev (localhost)
    // - GitHub Pages user page (dentsun.github.io)
    // - GitHub Pages project page (dentsun.github.io/iamdenton)
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // Check if we're on GitHub Pages
    if (hostname.includes("github.io")) {
      // Detect if project page or user page
      if (pathname.includes("/iamdenton")) {
        // Project page
        return "https://dentsun.github.io/iamdenton/Denton_Sun_Resume.pdf";
      } else {
        // User page
        return "https://dentsun.github.io/iamdenton/Denton_Sun_Resume.pdf";
      }
    } else {
      // Local development or other hosting - use relative path
      return "/Denton_Sun_Resume.pdf";
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden select-none">
      {/* CSS Generated XP Bliss Background */}
      <div className="absolute inset-0 -z-50 bg-[#0099CC] overflow-hidden pointer-events-none">
        {/* Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#246BB4] via-[#68AEF3] to-[#B7DEED] h-[70%]"></div>

        {/* Clouds - Stylized CSS Shapes */}
        <div className="absolute top-[10%] left-[15%] w-48 h-16 bg-white/40 rounded-full blur-lg"></div>
        <div className="absolute top-[15%] left-[12%] w-32 h-12 bg-white/50 rounded-full blur-md"></div>

        <div className="absolute top-[20%] right-[20%] w-64 h-20 bg-white/30 rounded-full blur-xl"></div>
        <div className="absolute top-[18%] right-[15%] w-40 h-14 bg-white/40 rounded-full blur-lg"></div>

        <div className="absolute top-[8%] left-[60%] w-24 h-8 bg-white/20 rounded-full blur-md"></div>

        {/* Hills Layering */}
        {/* Back Hill (Darker Green) */}
        <div className="absolute bottom-0 left-[-20%] w-[140%] h-[50%] bg-[#528F2D] rounded-[100%_100%_0_0/60%_60%_0_0] translate-y-[10%]"></div>

        {/* Middle Hill (Medium Green) */}
        <div className="absolute bottom-[-5%] right-[-10%] w-[120%] h-[45%] bg-[#65A638] rounded-[100%_0_0_0] -rotate-2"></div>

        {/* Front Hill (Iconic Bright Green) */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[150%] h-[45%] bg-gradient-to-t from-[#6B9D28] to-[#85C134] rounded-[60%_100%_0_0] rotate-1"></div>
      </div>

      {/* Icons Grid - Now with absolute positioning for drag support */}
      <div className="absolute top-0 left-0 p-6 h-[calc(100%-40px)] z-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          <DesktopIcon
            title="Work Experience"
            icon={
              <Briefcase
                className="text-yellow-500 fill-yellow-100 drop-shadow-md"
                size={54}
              />
            }
            onClick={() =>
              openWindow(
                "work",
                "Work Experience",
                <WorkExperience />,
                undefined,
                { width: 700, height: 550 }
              )
            }
            initialPosition={{ x: 0, y: 0 }}
          />
          <DesktopIcon
            title="Projects"
            icon={
              <FaHardHat className="text-orange-500 drop-shadow-md" size={54} />
            }
            onClick={() =>
              openWindow("projects", "Projects", <Projects />, undefined, {
                width: 800,
                height: 600,
              })
            }
            initialPosition={{ x: 0, y: 120 }}
          />
          <DesktopIcon
            title="Skills"
            icon={
              <Cpu
                className="text-gray-300 fill-gray-600 drop-shadow-md"
                size={54}
              />
            }
            onClick={() =>
              openWindow("skills", "Technical Arsenal", <Skills />, undefined, {
                width: 650,
                height: 500,
              })
            }
            initialPosition={{ x: 0, y: 240 }}
          />
          <DesktopIcon
            title="Education"
            icon={
              <GraduationCap
                className="text-blue-300 fill-blue-800 drop-shadow-md"
                size={54}
              />
            }
            onClick={() =>
              openWindow(
                "education",
                "Education",
                <div className="p-6 bg-white h-full text-gray-900">
                  <h2 className="text-2xl font-bold mb-4">Education</h2>
                  <div className="border-l-4 border-blue-800 pl-4">
                    <h3 className="text-xl font-bold">
                      University of British Columbia
                    </h3>
                    <p className="font-mono text-sm">
                      BSc Computer Science | May 2024
                    </p>
                    <p className="mt-2 text-gray-700">
                      Exchange Term: NTU Singapore
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      Relevant Coursework:
                    </p>
                    <ul className="list-disc list-inside text-sm">
                      <li>AI & Machine Learning</li>
                      <li>Distributed Systems</li>
                      <li>Cloud Computing</li>
                    </ul>
                  </div>
                </div>,
                undefined,
                { width: 500, height: 400 }
              )
            }
            initialPosition={{ x: 0, y: 360 }}
          />
          <DesktopIcon
            title="Games"
            icon={
              <Gamepad2
                className="text-purple-400 fill-purple-900 drop-shadow-md"
                size={54}
              />
            }
            onClick={() =>
              openWindow(
                "games-menu",
                "Game Center",
                <div className="flex flex-col gap-4 p-8 items-center justify-center h-full bg-[#008080]">
                  <button
                    onClick={() =>
                      openWindow(
                        "minesweeper",
                        "Minesweeper",
                        <Minesweeper />,
                        undefined,
                        { width: 340, height: 420 }
                      )
                    }
                    className="px-6 py-3 bg-[#c0c0c0] retro-border font-bold active:retro-border-inset w-full hover:bg-white text-black"
                  >
                    Play Minesweeper
                  </button>
                  <button
                    onClick={() =>
                      openWindow("snake", "Snake", <Snake />, undefined, {
                        width: 450,
                        height: 550,
                      })
                    }
                    className="px-6 py-3 bg-[#c0c0c0] retro-border font-bold active:retro-border-inset w-full hover:bg-white text-black"
                  >
                    Play Snake
                  </button>
                </div>,
                undefined,
                { width: 300, height: 300 }
              )
            }
            initialPosition={{ x: 0, y: 480 }}
          />
          <DesktopIcon
            title="Contact"
            icon={
              <Mail
                className="text-blue-200 fill-blue-600 drop-shadow-md"
                size={54}
              />
            }
            onClick={() =>
              openWindow(
                "contact",
                "Contact Info",
                <div className="flex flex-col items-center justify-center h-full bg-[#c0c0c0] p-6 text-center text-gray-900">
                  <div className="bg-white p-8 retro-border shadow-lg max-w-sm">
                    <h2 className="text-2xl font-bold mb-6">Denton Sun</h2>
                    <a
                      href="mailto:dentonjdsun@gmail.com"
                      className="block text-blue-600 underline mb-2 hover:text-blue-800"
                    >
                      dentonjdsun@gmail.com
                    </a>
                    <a
                      href="https://linkedin.com/in/dentonjdsun/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 underline hover:text-blue-800"
                    >
                      LinkedIn Profile
                    </a>
                    <p className="mt-6 text-gray-500 text-sm">
                      Vancouver, British Columbia
                    </p>
                  </div>
                </div>,
                undefined,
                { width: 400, height: 400 }
              )
            }
            initialPosition={{ x: 0, y: 600 }}
          />
          <DesktopIcon
            title="Resume.pdf"
            icon={
              <FileText
                className="text-red-500 fill-white drop-shadow-md"
                size={54}
              />
            }
            onClick={() =>
              openWindow(
                "resume",
                "Denton Sun - Resume",
                <PDFViewer
                  pdfUrl={getPDFUrl()}
                  fileName="Denton_Sun_Resume.pdf"
                />,
                undefined,
                { width: 900, height: 700 }
              )
            }
            initialPosition={{ x: 160, y: 0 }}
          />
        </div>
      </div>

      {/* Widgets Area */}
      <div className="absolute top-6 right-6 flex flex-col items-end gap-6 z-0 pointer-events-none">
        <WeatherWidget />
        <StockWidget />
      </div>

      {/* Windows Area */}
      <div className="absolute top-0 left-0 w-full h-[calc(100%-40px)] z-10 pointer-events-none">
        {windows.map((win) => (
          <WindowFrame key={win.id} {...win}>
            {win.content}
          </WindowFrame>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar onLogout={onLogout} />
    </div>
  );
};

export default Desktop;
