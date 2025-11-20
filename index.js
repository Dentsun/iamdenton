// index.tsx
import React7 from "react";
import ReactDOM from "react-dom/client";

// App.tsx
import { useState as useState6 } from "react";

// context/WindowContext.tsx
import { createContext, useContext, useState } from "react";
import { jsx } from "react/jsx-runtime";
var WindowContext = createContext(void 0);
var WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [windowOrder, setWindowOrder] = useState([]);
  const openWindow = (id, title, content, icon, defaultSize = { width: 600, height: 400 }) => {
    if (windows.find((w) => w.id === id)) {
      setWindows(
        (prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: false } : w)
      );
      focusWindow(id);
      return;
    }
    const newWindow = {
      id,
      title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: windowOrder.length + 1,
      content,
      icon,
      defaultSize
    };
    setWindows((prev) => [...prev, newWindow]);
    setWindowOrder((prev) => [...prev, id]);
    setActiveWindowId(id);
  };
  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setWindowOrder((prev) => prev.filter((wId) => wId !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };
  const minimizeWindow = (id) => {
    setWindows(
      (prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w)
    );
    setActiveWindowId(null);
  };
  const maximizeWindow = (id) => {
    setWindows(
      (prev) => prev.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
    );
    focusWindow(id);
  };
  const focusWindow = (id) => {
    setActiveWindowId(id);
    setWindowOrder((prev) => {
      const newOrder = prev.filter((wId) => wId !== id);
      newOrder.push(id);
      return newOrder;
    });
    setWindows((prev) => prev.map((w) => {
      const wIndex = windowOrder.indexOf(w.id);
      return w;
    }));
  };
  const getZIndex = (id) => {
    return windowOrder.indexOf(id) + 10;
  };
  const windowsWithZIndex = windows.map((w) => ({
    ...w,
    zIndex: getZIndex(w.id)
  }));
  return /* @__PURE__ */ jsx(
    WindowContext.Provider,
    {
      value: {
        windows: windowsWithZIndex,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow
      },
      children
    }
  );
};
var useWindow = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindow must be used within a WindowProvider");
  }
  return context;
};

// components/os/DesktopIcon.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var DesktopIcon = ({ title, icon, onClick }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex flex-col items-center w-36 gap-2 p-2 cursor-pointer hover:bg-white/20 border border-transparent hover:border-white/30 rounded-lg group transition-colors",
      onDoubleClick: onClick,
      onClick: (e) => {
        e.stopPropagation();
      },
      children: [
        /* @__PURE__ */ jsx2("div", { className: "drop-shadow-xl filter transition-transform group-hover:scale-110 duration-200", children: icon }),
        /* @__PURE__ */ jsx2("span", { className: "text-white text-sm text-center font-sans px-2 bg-[#008080]/0 group-hover:bg-[#000080]/60 rounded retro-text-shadow leading-tight shadow-black drop-shadow-md", children: title })
      ]
    }
  );
};
var DesktopIcon_default = DesktopIcon;

// components/os/WindowFrame.tsx
import { Rnd } from "react-rnd";
import { X, Minus, Square } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var WindowFrame = ({
  id,
  title,
  children,
  isMinimized,
  isMaximized,
  zIndex,
  defaultSize = { width: 600, height: 400 },
  defaultPosition
}) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useWindow();
  const isActive = activeWindowId === id;
  const startX = defaultPosition?.x || (window.innerWidth - defaultSize.width) / 2 + (Math.random() * 40 - 20);
  const startY = defaultPosition?.y || (window.innerHeight - defaultSize.height) / 2 + (Math.random() * 40 - 20);
  if (isMinimized) return null;
  return /* @__PURE__ */ jsx3(
    Rnd,
    {
      default: {
        x: startX,
        y: startY,
        width: defaultSize.width,
        height: defaultSize.height
      },
      minWidth: 300,
      minHeight: 200,
      bounds: "window",
      dragHandleClassName: "window-title-bar",
      style: { zIndex },
      disableDragging: isMaximized,
      enableResizing: !isMaximized,
      size: isMaximized ? { width: "100%", height: "calc(100% - 48px)" } : void 0,
      position: isMaximized ? { x: 0, y: 0 } : void 0,
      onDragStart: () => focusWindow(id),
      onMouseDown: () => focusWindow(id),
      className: "flex flex-col pointer-events-auto",
      children: /* @__PURE__ */ jsxs2("div", { className: `flex flex-col h-full bg-[#c0c0c0] border-2 retro-border shadow-xl overflow-hidden`, children: [
        /* @__PURE__ */ jsxs2(
          "div",
          {
            className: `window-title-bar h-8 flex items-center justify-between px-1 select-none cursor-default ${isActive ? "bg-gradient-to-r from-[#000080] to-[#1084d0] text-white" : "bg-[#808080] text-[#c0c0c0]"}`,
            children: [
              /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2 pl-1 pointer-events-none", children: [
                /* @__PURE__ */ jsx3("div", { className: "w-4 h-4 bg-white/20 rounded-sm" }),
                /* @__PURE__ */ jsx3("span", { className: "font-bold text-sm tracking-wide truncate max-w-[200px] sm:max-w-md", children: title })
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      minimizeWindow(id);
                    },
                    className: "w-5 h-5 bg-[#c0c0c0] retro-border flex items-center justify-center active:retro-border-inset",
                    "aria-label": "Minimize",
                    onMouseDown: (e) => e.stopPropagation(),
                    children: /* @__PURE__ */ jsx3(Minus, { size: 10, color: "black", strokeWidth: 4 })
                  }
                ),
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      maximizeWindow(id);
                    },
                    className: "w-5 h-5 bg-[#c0c0c0] retro-border flex items-center justify-center active:retro-border-inset",
                    "aria-label": "Maximize",
                    onMouseDown: (e) => e.stopPropagation(),
                    children: /* @__PURE__ */ jsx3(Square, { size: 10, color: "black", strokeWidth: 3 })
                  }
                ),
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      closeWindow(id);
                    },
                    className: "w-5 h-5 bg-[#c0c0c0] retro-border flex items-center justify-center active:retro-border-inset ml-1",
                    "aria-label": "Close",
                    onMouseDown: (e) => e.stopPropagation(),
                    children: /* @__PURE__ */ jsx3(X, { size: 12, color: "black", strokeWidth: 3 })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx3("div", { className: "flex-1 overflow-auto p-1 relative bg-[#c0c0c0]", children: /* @__PURE__ */ jsx3("div", { className: "h-full w-full bg-white text-gray-900 border-2 border-t-gray-800 border-l-gray-800 border-r-white border-b-white overflow-auto custom-scrollbar", children }) })
      ] })
    }
  );
};
var WindowFrame_default = WindowFrame;

// components/os/Taskbar.tsx
import { useState as useState2, useEffect, useRef } from "react";
import { User, LogOut, Mail, MapPin } from "lucide-react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var Taskbar = ({ onLogout }) => {
  const { windows, activeWindowId, focusWindow, minimizeWindow } = useWindow();
  const [time, setTime] = useState2(/* @__PURE__ */ new Date());
  const [isStartOpen, setIsStartOpen] = useState2(false);
  const startMenuRef = useRef(null);
  useEffect(() => {
    const timer = setInterval(() => setTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target)) {
        setIsStartOpen(false);
      }
    };
    if (isStartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStartOpen]);
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const handleWindowClick = (id) => {
    if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };
  return /* @__PURE__ */ jsxs3("div", { className: "h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-1 fixed bottom-0 left-0 right-0 z-50 select-none", children: [
    isStartOpen && /* @__PURE__ */ jsxs3(
      "div",
      {
        ref: startMenuRef,
        className: "absolute bottom-10 left-0 w-64 bg-white border-2 border-blue-800 shadow-2xl rounded-t-lg overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-2 fade-in duration-200",
        children: [
          /* @__PURE__ */ jsxs3("div", { className: "bg-blue-600 p-3 flex items-center gap-3 border-b-2 border-orange-400 shadow-sm", children: [
            /* @__PURE__ */ jsx4("div", { className: "bg-white rounded-full p-1 border-2 border-white shadow-sm", children: /* @__PURE__ */ jsx4(User, { className: "text-blue-600", size: 32 }) }),
            /* @__PURE__ */ jsx4("span", { className: "text-white font-bold text-lg tracking-wide shadow-black drop-shadow-sm", children: "Denton Sun" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "flex flex-col p-2 bg-white h-full border-l-4 border-blue-200", children: [
            /* @__PURE__ */ jsx4("div", { className: "py-2 px-2 text-gray-700 font-bold text-sm border-b border-gray-200 mb-2", children: "Software Engineer" }),
            /* @__PURE__ */ jsxs3("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 px-2 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded transition-colors group", children: [
                /* @__PURE__ */ jsx4(MapPin, { size: 16, className: "text-gray-500 group-hover:text-white" }),
                /* @__PURE__ */ jsx4("span", { className: "text-sm text-gray-800 group-hover:text-white", children: "Vancouver, BC" })
              ] }),
              /* @__PURE__ */ jsxs3("a", { href: "mailto:dentonjdsun@gmail.com", className: "flex items-center gap-2 px-2 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded transition-colors group decoration-0", children: [
                /* @__PURE__ */ jsx4(Mail, { size: 16, className: "text-gray-500 group-hover:text-white" }),
                /* @__PURE__ */ jsx4("span", { className: "text-sm text-gray-800 group-hover:text-white", children: "Contact Me" })
              ] })
            ] }),
            /* @__PURE__ */ jsx4("div", { className: "mt-auto border-t border-gray-200 pt-2 flex justify-end", children: /* @__PURE__ */ jsxs3(
              "div",
              {
                onClick: onLogout,
                className: "flex items-center gap-2 px-3 py-1 hover:bg-red-500 hover:text-white cursor-pointer rounded text-gray-600 transition-colors text-xs font-bold uppercase tracking-wider",
                children: [
                  /* @__PURE__ */ jsx4(LogOut, { size: 12 }),
                  /* @__PURE__ */ jsx4("span", { children: "Log Off" })
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center h-full gap-1 flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxs3(
        "button",
        {
          onClick: () => setIsStartOpen(!isStartOpen),
          className: `h-8 px-2 flex items-center gap-1 bg-[#c0c0c0] retro-border font-bold mr-2 hover:bg-white/20 transition-colors text-black
            ${isStartOpen ? "retro-border-inset bg-[#d0d0d0]" : "active:retro-border-inset"}
          `,
          children: [
            /* @__PURE__ */ jsx4("span", { className: "italic font-serif text-xl px-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-transparent bg-clip-text select-none", children: "\u2756" }),
            /* @__PURE__ */ jsx4("span", { className: "text-black", children: "Start" })
          ]
        }
      ),
      /* @__PURE__ */ jsx4("div", { className: "w-[2px] h-6 bg-gray-400 mx-1 border-r border-white" }),
      /* @__PURE__ */ jsx4("div", { className: "flex gap-1 overflow-x-auto h-full items-center w-full scrollbar-hide", children: windows.map((win) => /* @__PURE__ */ jsxs3(
        "button",
        {
          onClick: () => handleWindowClick(win.id),
          className: `h-7 px-2 min-w-[120px] max-w-[160px] flex items-center gap-2 truncate text-sm transition-colors
                ${activeWindowId === win.id && !win.isMinimized ? "retro-border-inset bg-[#e0e0e0] font-bold" : "retro-border bg-[#c0c0c0] hover:bg-[#d0d0d0]"}`,
          children: [
            /* @__PURE__ */ jsx4("div", { className: "w-2 h-2 bg-gray-500 rounded-full flex-shrink-0" }),
            /* @__PURE__ */ jsx4("span", { className: "truncate", children: win.title })
          ]
        },
        win.id
      )) })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "h-8 px-3 retro-border-inset bg-[#c0c0c0] flex items-center gap-2 ml-2 text-xs font-sans text-black", children: [
      /* @__PURE__ */ jsx4("span", { className: "hidden sm:inline", children: "\u{1F50A}" }),
      /* @__PURE__ */ jsx4("span", { children: formatTime(time) })
    ] })
  ] });
};
var Taskbar_default = Taskbar;

// components/widgets/WeatherWidget.tsx
import { CloudRain, MapPin as MapPin2 } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var WeatherWidget = () => {
  return /* @__PURE__ */ jsxs4("div", { className: "w-[250px] bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-2xl p-6 flex flex-col items-center pointer-events-auto hover:bg-white/80 transition-colors cursor-default select-none", children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2 text-gray-800 text-lg font-bold uppercase tracking-wider mb-4", children: [
      /* @__PURE__ */ jsx5(MapPin2, { size: 20 }),
      /* @__PURE__ */ jsx5("span", { children: "Vancouver" })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx5(CloudRain, { size: 100, className: "text-blue-600 drop-shadow-xl mb-2" }),
      /* @__PURE__ */ jsx5("span", { className: "text-7xl font-bold text-gray-900 leading-none", children: "12\xB0" }),
      /* @__PURE__ */ jsx5("span", { className: "text-2xl text-gray-800 font-medium mt-2", children: "Rainy" })
    ] })
  ] });
};
var WeatherWidget_default = WeatherWidget;

// components/widgets/StockWidget.tsx
import { TrendingUp, TrendingDown } from "lucide-react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var StockWidget = () => {
  const stocks = [
    { symbol: "BTC", price: "94,320", change: "+2.4%", up: true },
    { symbol: "ETH", price: "3,120", change: "+1.1%", up: true },
    { symbol: "S&P 500", price: "5,980", change: "+0.5%", up: true },
    { symbol: "NVDA", price: "142.50", change: "+3.2%", up: true }
  ];
  return /* @__PURE__ */ jsxs5("div", { className: "w-[250px] bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-2xl p-6 flex flex-col pointer-events-auto hover:bg-white/80 transition-colors cursor-default select-none", children: [
    /* @__PURE__ */ jsx6("div", { className: "text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b-2 border-gray-500/30 pb-2 text-center", children: "Market Watch" }),
    /* @__PURE__ */ jsx6("div", { className: "flex flex-col gap-4", children: stocks.map((s) => /* @__PURE__ */ jsxs5("div", { className: "flex flex-col border-b border-gray-300/50 pb-2 last:border-0", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex justify-between items-baseline", children: [
        /* @__PURE__ */ jsx6("span", { className: "font-bold text-gray-900 text-xl", children: s.symbol }),
        /* @__PURE__ */ jsxs5("span", { className: `text-sm font-bold flex items-center ${s.up ? "text-green-700" : "text-red-700"}`, children: [
          s.up ? /* @__PURE__ */ jsx6(TrendingUp, { size: 14, className: "mr-1" }) : /* @__PURE__ */ jsx6(TrendingDown, { size: 14, className: "mr-1" }),
          s.change
        ] })
      ] }),
      /* @__PURE__ */ jsx6("span", { className: "text-gray-800 font-mono text-lg", children: s.price })
    ] }, s.symbol)) })
  ] });
};
var StockWidget_default = StockWidget;

// components/Desktop.tsx
import { Briefcase as Briefcase2, Cpu as Cpu2, GraduationCap, Gamepad2, Mail as Mail2, FileText } from "lucide-react";
import { FaHardHat } from "react-icons/fa";

// data/portfolioData.ts
var workExperience = [
  {
    id: "movmint",
    company: "Movmint",
    role: "Software Engineer",
    location: "Vancouver, British Columbia",
    dates: "Jan 2024 - Present",
    description: "Building next-generation payment infrastructure for Central Bank Digital Currencies (CBDCs).",
    achievements: [
      "Spearheaded offline CBDC payments solution, attracting 3 new potential business deals with international central banks.",
      "Enhanced project visibility by 60% within the first quarter of demo launch.",
      "Configured Hardware Security Modules (HSMs) and rotated JWTs for secure payment signing/verification.",
      "Developed RESTful API backend using Node.js/Express, leveraging Redis (<500ms latency) and BullMQ.",
      "Led IAM security layer integration with Golang, Ory, and Kong Gateway for OAuth 2.0 & RBAC.",
      "Implemented automated financial reconciliation reducing uncaught errors by 95%."
    ],
    tech: ["Node.js", "Express", "Golang", "Redis", "PostgreSQL", "AWS", "Docker", "Kubernetes", "HSM", "Ory", "Kong"]
  },
  {
    id: "ubc-ta",
    company: "University of British Columbia",
    role: "Undergraduate Teaching Assistant (SCIE_V 100)",
    location: "Vancouver, British Columbia",
    dates: "Oct 2022 - Jan 2023",
    description: "Interdisciplinary science course introducing computational thinking.",
    achievements: [
      "Designed and led interactive tutorials for 15 students.",
      "Implemented hands-on coding exercises improving problem-solving skills.",
      "Increased program grades performance 12% above class averages."
    ],
    tech: ["Python", "Pedagogy", "Mentorship"]
  },
  {
    id: "whatifi",
    company: "Whatifi",
    role: "Software Developer Intern",
    location: "Vancouver, British Columbia",
    dates: "Jan 2022 - Oct 2022",
    description: "Fintech startup providing no-code financial modeling tools.",
    achievements: [
      "Developed codeless node-based financial modeling app in TypeScript/React.",
      "Extended product features enabling models to handle 100s of unique use-cases.",
      "Increased efficiency for large financial models by over 300% by simplifying back-end calculations in Golang."
    ],
    tech: ["TypeScript", "React", "Golang", "D3.js", "Node.js"]
  }
];
var projects = [
  {
    id: "esports",
    title: "Esports Game Analyzer",
    description: "A tool to help competitive gamers improve performance by analyzing match data.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "RiotGames API"],
    highlights: [
      "Integrated RiotGames API to fetch and analyze live match data.",
      "Used NumPy/Pandas to clean and transform gameplay statistics.",
      "Created interactive plots highlighting critical game-winning metrics."
    ]
  },
  {
    id: "thoughtsloth",
    title: "ThoughtSlothAI Mental Health Journaling",
    description: "HackTheNorth Hackathon Project. AI-powered journaling app.",
    tech: ["Android", "Java", "Firebase", "TensorFlow", "TensorFlow Lite"],
    highlights: [
      "Developed native Android app with intuitive UI.",
      "Integrated TensorFlow NLP model for sentiment classification (90% accuracy).",
      "Implemented Firebase for real-time sync and auth."
    ]
  }
];
var skills = [
  { name: "Python", icon: "SiPython", years: "Experienced", category: "Languages" },
  { name: "JavaScript", icon: "SiJavascript", years: "Experienced", category: "Languages" },
  { name: "TypeScript", icon: "SiTypescript", years: "Experienced", category: "Languages" },
  { name: "Golang", icon: "SiGo", years: "Experienced", category: "Languages" },
  { name: "Java", icon: "SiJava", years: "Proficient", category: "Languages" },
  { name: "SQL", icon: "SiPostgresql", years: "Proficient", category: "Languages" },
  { name: "Node.js", icon: "SiNodedotjs", years: "Experienced", category: "Backend" },
  { name: "Express", icon: "SiExpress", years: "Proficient", category: "Backend" },
  { name: "React", icon: "SiReact", years: "Experienced", category: "Frontend" },
  { name: "Redis", icon: "SiRedis", years: "Experienced", category: "Data" },
  { name: "PostgreSQL", icon: "SiPostgresql", years: "Experienced", category: "Data" },
  { name: "MongoDB", icon: "SiMongodb", years: "Proficient", category: "Data" },
  { name: "AWS", icon: "SiAmazonaws", years: "Proficient", category: "Cloud/DevOps" },
  { name: "Docker", icon: "SiDocker", years: "Proficient", category: "Cloud/DevOps" },
  { name: "Kubernetes", icon: "SiKubernetes", years: "Proficient", category: "Cloud/DevOps" },
  { name: "Git", icon: "SiGit", years: "Experienced", category: "Cloud/DevOps" }
];

// components/apps/WorkExperience.tsx
import { Briefcase } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var WorkExperience = () => {
  return /* @__PURE__ */ jsxs6("div", { className: "p-6 bg-white min-h-full font-sans", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-4 mb-8 border-b-2 border-gray-200 pb-4", children: [
      /* @__PURE__ */ jsx7("div", { className: "p-3 bg-blue-100 rounded-full border-2 border-blue-800", children: /* @__PURE__ */ jsx7(Briefcase, { size: 32, className: "text-blue-800" }) }),
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx7("h1", { className: "text-3xl font-bold text-gray-800", children: "Professional Experience" }),
        /* @__PURE__ */ jsx7("p", { className: "text-gray-600", children: "Back-end focus full stack software engineer with 2+ years of exerience in the fintech space" })
      ] })
    ] }),
    /* @__PURE__ */ jsx7("div", { className: "space-y-8", children: workExperience.map((job) => /* @__PURE__ */ jsxs6("div", { className: "relative pl-4 sm:pl-8 border-l-4 border-gray-300 hover:border-blue-500 transition-colors", children: [
      /* @__PURE__ */ jsx7("div", { className: "absolute -left-[10px] top-1 w-4 h-4 bg-white border-4 border-gray-400 rounded-full" }),
      /* @__PURE__ */ jsxs6("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2", children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("h2", { className: "text-xl font-bold text-blue-900", children: job.company }),
          /* @__PURE__ */ jsx7("h3", { className: "text-lg font-semibold text-gray-700", children: job.role })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx7("span", { className: "inline-block px-2 py-1 bg-gray-100 border border-gray-300 text-sm font-mono rounded", children: job.dates }),
          /* @__PURE__ */ jsx7("p", { className: "text-sm text-gray-500 mt-1", children: job.location })
        ] })
      ] }),
      /* @__PURE__ */ jsx7("p", { className: "text-gray-700 italic mb-3", children: job.description }),
      /* @__PURE__ */ jsx7("ul", { className: "list-disc list-inside space-y-1 text-sm text-gray-800 mb-4 bg-gray-50 p-3 rounded border border-gray-200", children: job.achievements.map((achievement, idx) => /* @__PURE__ */ jsx7("li", { className: "leading-relaxed", children: achievement }, idx)) }),
      /* @__PURE__ */ jsx7("div", { className: "flex flex-wrap gap-2", children: job.tech.map((t) => /* @__PURE__ */ jsx7("span", { className: "px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs rounded shadow-sm", children: t }, t)) })
    ] }, job.id)) })
  ] });
};
var WorkExperience_default = WorkExperience;

// components/apps/Projects.tsx
import { FolderGit2, Star } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var Projects = () => {
  return /* @__PURE__ */ jsxs7("div", { className: "p-6 bg-gray-50 min-h-full", children: [
    /* @__PURE__ */ jsxs7("div", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ jsx8("h1", { className: "text-2xl font-bold text-gray-800 font-mono", children: "<Projects />" }),
      /* @__PURE__ */ jsx8("p", { className: "text-gray-600 text-sm", children: "Technical implementations and hackathons" })
    ] }),
    /* @__PURE__ */ jsx8("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: projects.map((project) => /* @__PURE__ */ jsxs7("div", { className: "bg-white border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] p-4 flex flex-col", children: [
      /* @__PURE__ */ jsx8("div", { className: "flex items-start justify-between mb-3", children: /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx8(FolderGit2, { size: 20, className: "text-purple-700" }),
        /* @__PURE__ */ jsx8("h2", { className: "font-bold text-lg leading-tight", children: project.title })
      ] }) }),
      /* @__PURE__ */ jsx8("p", { className: "text-sm text-gray-700 mb-4 flex-grow", children: project.description }),
      /* @__PURE__ */ jsxs7("div", { className: "mb-4 bg-yellow-50 p-2 border border-yellow-200 rounded text-xs text-gray-800", children: [
        /* @__PURE__ */ jsxs7("strong", { className: "block mb-1 flex items-center gap-1 text-yellow-700", children: [
          /* @__PURE__ */ jsx8(Star, { size: 10, fill: "currentColor" }),
          " Highlights:"
        ] }),
        /* @__PURE__ */ jsx8("ul", { className: "list-disc list-inside space-y-1", children: project.highlights.map((h, idx) => /* @__PURE__ */ jsx8("li", { children: h }, idx)) })
      ] }),
      /* @__PURE__ */ jsx8("div", { className: "mt-auto pt-3 border-t border-gray-100", children: /* @__PURE__ */ jsx8("div", { className: "flex flex-wrap gap-1", children: project.tech.map((t) => /* @__PURE__ */ jsx8("span", { className: "px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider font-bold border border-gray-300", children: t }, t)) }) })
    ] }, project.id)) })
  ] });
};
var Projects_default = Projects;

// components/apps/Skills.tsx
import * as SiIcons from "react-icons/si";
import { Cpu } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var Skills = () => {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const getIcon = (iconName) => {
    const Icon = SiIcons[iconName];
    return Icon ? /* @__PURE__ */ jsx9(Icon, { size: 32 }) : /* @__PURE__ */ jsx9(Cpu, { size: 32 });
  };
  return /* @__PURE__ */ jsxs8("div", { className: "p-6 bg-[#f0f0f0] min-h-full select-text", children: [
    /* @__PURE__ */ jsx9("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsx9("h1", { className: "text-2xl font-bold uppercase tracking-widest text-gray-800 border-b-4 border-double border-gray-800 inline-block pb-1", children: "Technical Arsenal" }) }),
    /* @__PURE__ */ jsx9("div", { className: "space-y-8", children: categories.map((category) => /* @__PURE__ */ jsxs8("div", { children: [
      /* @__PURE__ */ jsx9("h3", { className: "text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1", children: category }),
      /* @__PURE__ */ jsx9("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3", children: skills.filter((s) => s.category === category).map((skill) => /* @__PURE__ */ jsxs8("div", { className: "bg-white p-3 border border-gray-300 shadow-sm flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform hover:shadow-md group", children: [
        /* @__PURE__ */ jsx9("div", { className: "text-gray-600 group-hover:text-blue-600 transition-colors", children: getIcon(skill.icon) }),
        /* @__PURE__ */ jsxs8("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx9("div", { className: "font-bold text-sm text-gray-800", children: skill.name }),
          /* @__PURE__ */ jsx9("div", { className: "text-xs text-gray-500", children: skill.years })
        ] })
      ] }, skill.name)) })
    ] }, category)) })
  ] });
};
var Skills_default = Skills;

// components/games/Minesweeper.tsx
import { useState as useState3, useEffect as useEffect2, useCallback } from "react";
import { Smile, Frown } from "lucide-react";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var ROWS = 10;
var COLS = 10;
var MINES = 15;
var Minesweeper = () => {
  const [grid, setGrid] = useState3([]);
  const [gameOver, setGameOver] = useState3(false);
  const [win, setWin] = useState3(false);
  const [timer, setTimer] = useState3(0);
  const initGame = useCallback(() => {
    const newGrid = Array(ROWS).fill(null).map(
      () => Array(COLS).fill(null).map(() => ({ value: 0, state: "hidden" }))
    );
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (newGrid[r][c].value !== "mine") {
        newGrid[r][c].value = "mine";
        minesPlaced++;
      }
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (newGrid[r][c].value === "mine") continue;
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (r + i >= 0 && r + i < ROWS && c + j >= 0 && c + j < COLS) {
              if (newGrid[r + i][c + j].value === "mine") neighbors++;
            }
          }
        }
        newGrid[r][c].value = neighbors;
      }
    }
    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
    setTimer(0);
  }, []);
  useEffect2(() => {
    initGame();
  }, [initGame]);
  useEffect2(() => {
    let interval;
    if (!gameOver && !win) {
      interval = setInterval(() => setTimer((t) => t + 1), 1e3);
    }
    return () => clearInterval(interval);
  }, [gameOver, win]);
  const reveal = (r, c, currentGrid) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || currentGrid[r][c].state !== "hidden") return;
    currentGrid[r][c].state = "visible";
    if (currentGrid[r][c].value === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          reveal(r + i, c + j, currentGrid);
        }
      }
    }
  };
  const handleClick = (r, c) => {
    if (gameOver || win || grid[r][c].state === "flagged") return;
    const newGrid = [...grid.map((row) => [...row])];
    if (newGrid[r][c].value === "mine") {
      newGrid[r][c].state = "visible";
      newGrid.forEach((row) => row.forEach((cell) => {
        if (cell.value === "mine") cell.state = "visible";
      }));
      setGrid(newGrid);
      setGameOver(true);
    } else {
      reveal(r, c, newGrid);
      setGrid(newGrid);
      checkWin(newGrid);
    }
  };
  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameOver || win || grid[r][c].state === "visible") return;
    const newGrid = [...grid.map((row) => [...row])];
    if (newGrid[r][c].state === "hidden") newGrid[r][c].state = "flagged";
    else if (newGrid[r][c].state === "flagged") newGrid[r][c].state = "hidden";
    setGrid(newGrid);
  };
  const checkWin = (currentGrid) => {
    let hiddenNonMines = 0;
    currentGrid.forEach((row) => row.forEach((cell) => {
      if (cell.value !== "mine" && cell.state !== "visible") hiddenNonMines++;
    }));
    if (hiddenNonMines === 0) setWin(true);
  };
  const getCellContent = (cell) => {
    if (cell.state === "hidden") return "";
    if (cell.state === "flagged") return "\u{1F6A9}";
    if (cell.value === "mine") return "\u{1F4A3}";
    if (cell.value === 0) return "";
    return cell.value;
  };
  const getCellColor = (val) => {
    const colors = ["", "text-blue-600", "text-green-600", "text-red-600", "text-purple-800", "text-red-800", "text-teal-600", "text-black", "text-gray-600"];
    return colors[val] || "";
  };
  return /* @__PURE__ */ jsxs9("div", { className: "flex flex-col items-center justify-center p-4 bg-[#c0c0c0] h-full", children: [
    /* @__PURE__ */ jsxs9("div", { className: "bg-[#c0c0c0] p-1 retro-border mb-2 flex justify-between items-center w-[280px]", children: [
      /* @__PURE__ */ jsx10("div", { className: "bg-black text-red-600 font-mono text-2xl px-1 border-2 border-gray-500 inset-shadow", children: String(MINES - grid.flat().filter((c) => c.state === "flagged").length).padStart(3, "0") }),
      /* @__PURE__ */ jsx10("button", { onClick: initGame, className: "retro-border p-1 active:retro-border-inset", children: gameOver ? /* @__PURE__ */ jsx10(Frown, { size: 24 }) : win ? /* @__PURE__ */ jsx10(Smile, { size: 24 }) : /* @__PURE__ */ jsx10("div", { className: "w-6 h-6 bg-yellow-400 rounded-full border-2 border-black flex items-center justify-center text-xs", children: ":)" }) }),
      /* @__PURE__ */ jsx10("div", { className: "bg-black text-red-600 font-mono text-2xl px-1 border-2 border-gray-500 inset-shadow", children: String(timer).padStart(3, "0") })
    ] }),
    /* @__PURE__ */ jsx10("div", { className: "bg-gray-400 border-4 border-gray-500 p-1", style: { display: "grid", gridTemplateColumns: `repeat(${COLS}, 24px)` }, children: grid.map(
      (row, r) => row.map((cell, c) => /* @__PURE__ */ jsx10(
        "div",
        {
          className: `w-6 h-6 flex items-center justify-center text-sm font-bold select-none cursor-pointer
                ${cell.state === "visible" ? "border border-gray-400 bg-[#c0c0c0] " + (typeof cell.value === "number" ? getCellColor(cell.value) : "") : "retro-border bg-[#c0c0c0] active:retro-border-inset"}
              `,
          onClick: () => handleClick(r, c),
          onContextMenu: (e) => handleRightClick(e, r, c),
          children: getCellContent(cell)
        },
        `${r}-${c}`
      ))
    ) }),
    win && /* @__PURE__ */ jsx10("div", { className: "mt-2 font-bold text-green-700", children: "You Win!" }),
    gameOver && /* @__PURE__ */ jsx10("div", { className: "mt-2 font-bold text-red-700", children: "Game Over!" })
  ] });
};
var Minesweeper_default = Minesweeper;

// components/games/Snake.tsx
import { useState as useState4, useEffect as useEffect3, useRef as useRef2, useCallback as useCallback2 } from "react";
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
var GRID_SIZE = 20;
var BOARD_SIZE = 400;
var Snake = () => {
  const [snake, setSnake] = useState4([{ x: 10, y: 10 }]);
  const [food, setFood] = useState4({ x: 15, y: 15 });
  const [direction, setDirection] = useState4("RIGHT");
  const [gameOver, setGameOver] = useState4(false);
  const [score, setScore] = useState4(0);
  const [gameStarted, setGameStarted] = useState4(false);
  const moveInterval = useRef2(null);
  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * (BOARD_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (BOARD_SIZE / GRID_SIZE))
    };
  };
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };
  const moveSnake = useCallback2(() => {
    if (gameOver) return;
    setSnake((prev) => {
      const newHead = { ...prev[0] };
      switch (direction) {
        case "UP":
          newHead.y -= 1;
          break;
        case "DOWN":
          newHead.y += 1;
          break;
        case "LEFT":
          newHead.x -= 1;
          break;
        case "RIGHT":
          newHead.x += 1;
          break;
      }
      if (newHead.x < 0 || newHead.x >= BOARD_SIZE / GRID_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE / GRID_SIZE || prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prev;
      }
      const newSnake = [newHead, ...prev];
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [direction, food, gameOver]);
  useEffect3(() => {
    if (gameStarted && !gameOver) {
      moveInterval.current = setInterval(moveSnake, 150);
    } else {
      clearInterval(moveInterval.current);
    }
    return () => clearInterval(moveInterval.current);
  }, [gameStarted, gameOver, moveSnake]);
  useEffect3(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);
  return /* @__PURE__ */ jsxs10("div", { className: "flex flex-col items-center justify-center p-4 bg-gray-900 h-full text-white", children: [
    /* @__PURE__ */ jsxs10("div", { className: "mb-4 text-xl font-mono flex gap-4", children: [
      /* @__PURE__ */ jsxs10("span", { children: [
        "Score: ",
        score
      ] }),
      /* @__PURE__ */ jsx11(
        "button",
        {
          onClick: resetGame,
          className: "px-2 bg-green-600 hover:bg-green-500 text-white text-sm border border-white",
          children: gameOver ? "Try Again" : gameStarted ? "Restart" : "Start Game"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs10(
      "div",
      {
        className: "relative bg-black border-4 border-gray-600",
        style: { width: BOARD_SIZE, height: BOARD_SIZE },
        children: [
          gameOver && /* @__PURE__ */ jsx11("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 text-red-500 font-bold text-3xl z-10", children: "GAME OVER" }),
          /* @__PURE__ */ jsx11(
            "div",
            {
              className: "absolute bg-red-500 rounded-full shadow-[0_0_10px_red]",
              style: {
                left: food.x * GRID_SIZE,
                top: food.y * GRID_SIZE,
                width: GRID_SIZE,
                height: GRID_SIZE
              }
            }
          ),
          snake.map((segment, i) => /* @__PURE__ */ jsx11(
            "div",
            {
              className: "absolute bg-green-500 border border-black",
              style: {
                left: segment.x * GRID_SIZE,
                top: segment.y * GRID_SIZE,
                width: GRID_SIZE,
                height: GRID_SIZE,
                opacity: i === 0 ? 1 : 0.7
                // Head is brighter
              }
            },
            i
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsx11("div", { className: "mt-4 text-xs text-gray-400 font-mono", children: "Use Arrow Keys to Move" })
  ] });
};
var Snake_default = Snake;

// components/Desktop.tsx
import { jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
var Desktop = ({ onLogout }) => {
  const { windows, openWindow } = useWindow();
  const openResume = () => {
    window.open("/Denton_Sun_Resume.pdf", "_blank");
  };
  return /* @__PURE__ */ jsxs11("div", { className: "h-screen w-screen relative overflow-hidden select-none", children: [
    /* @__PURE__ */ jsxs11("div", { className: "absolute inset-0 -z-50 bg-[#0099CC] overflow-hidden pointer-events-none", children: [
      /* @__PURE__ */ jsx12("div", { className: "absolute inset-0 bg-gradient-to-b from-[#246BB4] via-[#68AEF3] to-[#B7DEED] h-[70%]" }),
      /* @__PURE__ */ jsx12("div", { className: "absolute top-[10%] left-[15%] w-48 h-16 bg-white/40 rounded-full blur-lg" }),
      /* @__PURE__ */ jsx12("div", { className: "absolute top-[15%] left-[12%] w-32 h-12 bg-white/50 rounded-full blur-md" }),
      /* @__PURE__ */ jsx12("div", { className: "absolute top-[20%] right-[20%] w-64 h-20 bg-white/30 rounded-full blur-xl" }),
      /* @__PURE__ */ jsx12("div", { className: "absolute top-[18%] right-[15%] w-40 h-14 bg-white/40 rounded-full blur-lg" }),
      /* @__PURE__ */ jsx12("div", { className: "absolute top-[8%] left-[60%] w-24 h-8 bg-white/20 rounded-full blur-md" }),
      /* @__PURE__ */ jsx12("div", { className: "absolute bottom-0 left-[-20%] w-[140%] h-[50%] bg-[#528F2D] rounded-[100%_100%_0_0/60%_60%_0_0] translate-y-[10%]" }),
      /* @__PURE__ */ jsx12("div", { className: "absolute bottom-[-5%] right-[-10%] w-[120%] h-[45%] bg-[#65A638] rounded-[100%_0_0_0] -rotate-2" }),
      /* @__PURE__ */ jsx12("div", { className: "absolute bottom-[-10%] left-[-10%] w-[150%] h-[45%] bg-gradient-to-t from-[#6B9D28] to-[#85C134] rounded-[60%_100%_0_0] rotate-1" })
    ] }),
    /* @__PURE__ */ jsxs11("div", { className: "absolute top-0 left-0 p-6 flex flex-col flex-wrap content-start gap-6 h-[calc(100%-40px)] z-0 pointer-events-auto", children: [
      /* @__PURE__ */ jsx12(
        DesktopIcon_default,
        {
          title: "Work Experience",
          icon: /* @__PURE__ */ jsx12(Briefcase2, { className: "text-yellow-500 fill-yellow-100 drop-shadow-md", size: 54 }),
          onClick: () => openWindow("work", "Work Experience", /* @__PURE__ */ jsx12(WorkExperience_default, {}), void 0, { width: 700, height: 550 })
        }
      ),
      /* @__PURE__ */ jsx12(
        DesktopIcon_default,
        {
          title: "Projects",
          icon: /* @__PURE__ */ jsx12(FaHardHat, { className: "text-orange-500 drop-shadow-md", size: 54 }),
          onClick: () => openWindow("projects", "Projects", /* @__PURE__ */ jsx12(Projects_default, {}), void 0, { width: 800, height: 600 })
        }
      ),
      /* @__PURE__ */ jsx12(
        DesktopIcon_default,
        {
          title: "Skills",
          icon: /* @__PURE__ */ jsx12(Cpu2, { className: "text-gray-300 fill-gray-600 drop-shadow-md", size: 54 }),
          onClick: () => openWindow("skills", "Technical Arsenal", /* @__PURE__ */ jsx12(Skills_default, {}), void 0, { width: 650, height: 500 })
        }
      ),
      /* @__PURE__ */ jsx12(
        DesktopIcon_default,
        {
          title: "Education",
          icon: /* @__PURE__ */ jsx12(GraduationCap, { className: "text-blue-300 fill-blue-800 drop-shadow-md", size: 54 }),
          onClick: () => openWindow("education", "Education", /* @__PURE__ */ jsxs11("div", { className: "p-6 bg-white h-full text-gray-900", children: [
            /* @__PURE__ */ jsx12("h2", { className: "text-2xl font-bold mb-4", children: "Education" }),
            /* @__PURE__ */ jsxs11("div", { className: "border-l-4 border-blue-800 pl-4", children: [
              /* @__PURE__ */ jsx12("h3", { className: "text-xl font-bold", children: "University of British Columbia" }),
              /* @__PURE__ */ jsx12("p", { className: "font-mono text-sm", children: "BSc Computer Science | May 2024" }),
              /* @__PURE__ */ jsx12("p", { className: "mt-2 text-gray-700", children: "Exchange Term: NTU Singapore" }),
              /* @__PURE__ */ jsx12("p", { className: "text-sm text-gray-500 mt-4", children: "Relevant Coursework:" }),
              /* @__PURE__ */ jsxs11("ul", { className: "list-disc list-inside text-sm", children: [
                /* @__PURE__ */ jsx12("li", { children: "AI & Machine Learning" }),
                /* @__PURE__ */ jsx12("li", { children: "Distributed Systems" }),
                /* @__PURE__ */ jsx12("li", { children: "Cloud Computing" })
              ] })
            ] })
          ] }), void 0, { width: 500, height: 400 })
        }
      ),
      /* @__PURE__ */ jsx12(
        DesktopIcon_default,
        {
          title: "Games",
          icon: /* @__PURE__ */ jsx12(Gamepad2, { className: "text-purple-400 fill-purple-900 drop-shadow-md", size: 54 }),
          onClick: () => openWindow("games-menu", "Game Center", /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-4 p-8 items-center justify-center h-full bg-[#008080]", children: [
            /* @__PURE__ */ jsx12("button", { onClick: () => openWindow("minesweeper", "Minesweeper", /* @__PURE__ */ jsx12(Minesweeper_default, {}), void 0, { width: 340, height: 420 }), className: "px-6 py-3 bg-[#c0c0c0] retro-border font-bold active:retro-border-inset w-full hover:bg-white text-black", children: "Play Minesweeper" }),
            /* @__PURE__ */ jsx12("button", { onClick: () => openWindow("snake", "Snake", /* @__PURE__ */ jsx12(Snake_default, {}), void 0, { width: 450, height: 550 }), className: "px-6 py-3 bg-[#c0c0c0] retro-border font-bold active:retro-border-inset w-full hover:bg-white text-black", children: "Play Snake" })
          ] }), void 0, { width: 300, height: 300 })
        }
      ),
      /* @__PURE__ */ jsx12(
        DesktopIcon_default,
        {
          title: "Contact",
          icon: /* @__PURE__ */ jsx12(Mail2, { className: "text-blue-200 fill-blue-600 drop-shadow-md", size: 54 }),
          onClick: () => openWindow("contact", "Contact Info", /* @__PURE__ */ jsx12("div", { className: "flex flex-col items-center justify-center h-full bg-[#c0c0c0] p-6 text-center text-gray-900", children: /* @__PURE__ */ jsxs11("div", { className: "bg-white p-8 retro-border shadow-lg max-w-sm", children: [
            /* @__PURE__ */ jsx12("h2", { className: "text-2xl font-bold mb-6", children: "Denton Sun" }),
            /* @__PURE__ */ jsx12("a", { href: "mailto:dentonjdsun@gmail.com", className: "block text-blue-600 underline mb-2 hover:text-blue-800", children: "dentonjdsun@gmail.com" }),
            /* @__PURE__ */ jsx12("a", { href: "https://linkedin.com/in/dentonjdsun/", target: "_blank", rel: "noopener noreferrer", className: "block text-blue-600 underline hover:text-blue-800", children: "LinkedIn Profile" }),
            /* @__PURE__ */ jsx12("p", { className: "mt-6 text-gray-500 text-sm", children: "Vancouver, British Columbia" })
          ] }) }), void 0, { width: 400, height: 400 })
        }
      ),
      /* @__PURE__ */ jsx12(
        DesktopIcon_default,
        {
          title: "Resume.pdf",
          icon: /* @__PURE__ */ jsx12(FileText, { className: "text-red-500 fill-white drop-shadow-md", size: 54 }),
          onClick: openResume
        }
      )
    ] }),
    /* @__PURE__ */ jsxs11("div", { className: "absolute top-6 right-6 flex flex-col items-end gap-6 z-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx12(WeatherWidget_default, {}),
      /* @__PURE__ */ jsx12(StockWidget_default, {})
    ] }),
    /* @__PURE__ */ jsx12("div", { className: "absolute top-0 left-0 w-full h-[calc(100%-40px)] z-10 pointer-events-none", children: windows.map((win) => /* @__PURE__ */ jsx12(WindowFrame_default, { ...win, children: win.content }, win.id)) }),
    /* @__PURE__ */ jsx12(Taskbar_default, { onLogout })
  ] });
};
var Desktop_default = Desktop;

// components/LoginScreen.tsx
import { useState as useState5 } from "react";
import { User as User2 } from "lucide-react";
import { jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
var LoginScreen = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState5(false);
  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 1e3);
  };
  return /* @__PURE__ */ jsxs12("div", { className: `h-screen w-screen bg-[#003399] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${isLoggingIn ? "opacity-0" : "opacity-100"}`, children: [
    /* @__PURE__ */ jsxs12("div", { className: "absolute bottom-0 w-full h-[15vh] bg-[#003399] flex justify-between items-end p-8 border-t border-white/10", children: [
      /* @__PURE__ */ jsx13("div", { className: "text-white text-xl opacity-50 font-bold italic", children: "Windows Retro Edition" }),
      /* @__PURE__ */ jsx13("div", { className: "text-white opacity-50", children: "To turn off your computer, click Turn Off Computer." })
    ] }),
    /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-8 z-10", children: [
      /* @__PURE__ */ jsxs12("div", { className: "hidden md:flex flex-col items-end border-r-2 border-white/30 pr-8 py-12", children: [
        /* @__PURE__ */ jsx13("div", { className: "text-white font-bold text-5xl italic drop-shadow-md mb-2", children: "Denton" }),
        /* @__PURE__ */ jsx13("div", { className: "text-white text-3xl font-light", children: "Portfolio OS" })
      ] }),
      /* @__PURE__ */ jsx13("div", { className: "pl-4 md:pl-0", children: /* @__PURE__ */ jsxs12(
        "div",
        {
          onClick: handleLogin,
          className: "group flex items-center gap-4 p-4 rounded hover:bg-[#0044cc] transition-colors cursor-pointer border border-transparent hover:border-white/30",
          children: [
            /* @__PURE__ */ jsx13("div", { className: "w-20 h-20 bg-yellow-400 rounded border-4 border-white shadow-lg flex items-center justify-center group-hover:border-yellow-200 overflow-hidden", children: /* @__PURE__ */ jsx13(User2, { size: 48, className: "text-yellow-700" }) }),
            /* @__PURE__ */ jsxs12("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx13("span", { className: "text-white text-2xl font-bold group-hover:underline", children: "Denton Sun" }),
              /* @__PURE__ */ jsx13("span", { className: "text-blue-200 text-sm", children: isLoggingIn ? "Loading settings..." : "Click to enter" })
            ] })
          ]
        }
      ) })
    ] })
  ] });
};
var LoginScreen_default = LoginScreen;

// App.tsx
import { jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
var MobileLayout = () => {
  return /* @__PURE__ */ jsxs13("div", { className: "min-h-screen bg-gray-100 p-4 font-sans", children: [
    /* @__PURE__ */ jsxs13("header", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx14("h1", { className: "text-3xl font-bold text-gray-900", children: "Denton Sun" }),
      /* @__PURE__ */ jsx14("p", { className: "text-gray-600", children: "Software Engineer" }),
      /* @__PURE__ */ jsxs13("div", { className: "flex justify-center gap-4 mt-4", children: [
        /* @__PURE__ */ jsx14("a", { href: "mailto:dentonjdsun@gmail.com", className: "px-4 py-2 bg-blue-600 text-white rounded", children: "Email" }),
        /* @__PURE__ */ jsx14("a", { href: "https://linkedin.com/in/dentonjdsun", className: "px-4 py-2 bg-blue-800 text-white rounded", children: "LinkedIn" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs13("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs13("div", { className: "bg-white p-6 rounded shadow", children: [
        /* @__PURE__ */ jsx14("h2", { className: "text-xl font-bold mb-4 border-b pb-2", children: "Experience" }),
        /* @__PURE__ */ jsxs13("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs13("div", { children: [
            /* @__PURE__ */ jsx14("h3", { className: "font-bold", children: "Movmint" }),
            /* @__PURE__ */ jsx14("p", { className: "text-sm text-gray-500", children: "Software Engineer | 2024 - Present" }),
            /* @__PURE__ */ jsx14("p", { className: "mt-1 text-gray-700 text-sm", children: "Offline CBDC payments, HSM security, Backend logic." })
          ] }),
          /* @__PURE__ */ jsxs13("div", { children: [
            /* @__PURE__ */ jsx14("h3", { className: "font-bold", children: "Whatifi" }),
            /* @__PURE__ */ jsx14("p", { className: "text-sm text-gray-500", children: "Developer Intern | 2022" }),
            /* @__PURE__ */ jsx14("p", { className: "mt-1 text-gray-700 text-sm", children: "Fintech modeling tools in React & Golang." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs13("div", { className: "bg-white p-6 rounded shadow", children: [
        /* @__PURE__ */ jsx14("h2", { className: "text-xl font-bold mb-4 border-b pb-2", children: "Projects" }),
        /* @__PURE__ */ jsxs13("ul", { className: "list-disc pl-4 text-sm text-gray-700 space-y-2", children: [
          /* @__PURE__ */ jsxs13("li", { children: [
            /* @__PURE__ */ jsx14("strong", { children: "Esports Game Analyzer:" }),
            " Python data analysis for LoL matches."
          ] }),
          /* @__PURE__ */ jsxs13("li", { children: [
            /* @__PURE__ */ jsx14("strong", { children: "ThoughtSlothAI:" }),
            " Android mental health journaling app with NLP."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs13("div", { className: "bg-white p-6 rounded shadow", children: [
        /* @__PURE__ */ jsx14("h2", { className: "text-xl font-bold mb-4 border-b pb-2", children: "Skills" }),
        /* @__PURE__ */ jsx14("p", { className: "text-sm text-gray-700", children: "Python, JavaScript, TypeScript, Golang, React, Node.js, AWS, Docker, SQL, Redis." })
      ] }),
      /* @__PURE__ */ jsx14("div", { className: "text-center text-gray-500 text-xs mt-8", children: "Visit on Desktop for full interactive OS experience" })
    ] })
  ] });
};
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState6(false);
  const [isMobile] = useState6(window.innerWidth < 768);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  if (isMobile) {
    return /* @__PURE__ */ jsx14(MobileLayout, {});
  }
  return /* @__PURE__ */ jsx14(WindowProvider, { children: isLoggedIn ? /* @__PURE__ */ jsx14(Desktop_default, { onLogout: handleLogout }) : /* @__PURE__ */ jsx14(LoginScreen_default, { onLogin: () => setIsLoggedIn(true) }) });
}
var App_default = App;

// index.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx15(React7.StrictMode, { children: /* @__PURE__ */ jsx15(App_default, {}) })
);
