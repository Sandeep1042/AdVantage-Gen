import { useState, useRef, useEffect } from "react";
import {
  Ban, Sun, Contrast, Lightbulb, Moon, Sunrise, Lamp, SunMedium, MoonStar, CircleDot, Sunset,
  Palette, Layout, Image as ImageIcon, Check, MousePointer2, Box, Sparkles, Wand2
} from "lucide-react";



import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import Sidebar from "../components/Sidebar";

// --- Types & Constants ---

type Option = {
  label: string;
  value: string;
  Icon?: React.ElementType;
};

const lightingOptions: Option[] = [
  { label: "None", value: "none", Icon: Ban },
  { label: "Backlight", value: "backlight", Icon: Sun },
  { label: "Dramatic", value: "dramatic", Icon: Contrast },
  { label: "Volumetric", value: "volumetric", Icon: Lightbulb },
  { label: "Dimly Lit", value: "dimly-lit", Icon: Moon },
  { label: "Crepuscular", value: "crepuscular", Icon: Sunrise },
  { label: "Studio", value: "studio", Icon: Lamp },
  { label: "Sunlight", value: "sunlight", Icon: SunMedium },
  { label: "Low Light", value: "low-light", Icon: MoonStar },
  { label: "Rim Lighting", value: "rim", Icon: CircleDot },
  { label: "Golden Hour", value: "golden-hour", Icon: Sunset },
];

const styleOptions: Option[] = [
  { label: "No Style", value: "none", Icon: Ban },
  { label: "Minimalist", value: "minimalist", Icon: Sparkles },
  { label: "Realistic", value: "realistic", Icon: ImageIcon },
  { label: "Cyberpunk", value: "cyberpunk", Icon: Box },
  { label: "Abstract", value: "abstract", Icon: MousePointer2 },
  { label: "Gouache", value: "gouache", Icon: Palette },
  { label: "Pixel Art", value: "pixel-art", Icon: Layout },
];

const colorOptions: Option[] = [
  { label: "No Tone", value: "none", Icon: Ban },
  { label: "Vibrant", value: "vibrant" },
  { label: "Pastel", value: "pastel" },
  { label: "Monochrome", value: "monochrome" },
  { label: "Neon", value: "neon" },
  { label: "Earth Tones", value: "earth-tones" },
  { label: "Cool", value: "cool" },
  { label: "Warm", value: "warm" },
];

const compositionOptions: Option[] = [
  { label: "No Composition", value: "none", Icon: Ban },
  { label: "Symmetrical", value: "symmetrical" },
  { label: "Rule of Thirds", value: "rule-of-thirds" },
  { label: "Wide Angle", value: "wide-angle" },
  { label: "Macro", value: "macro" },
  { label: "Isometric", value: "isometric" },
  { label: "Top Down", value: "top-down" },
];

const aspectRatios = [
  { label: "1:1", value: "square" },
  { label: "16:9", value: "horizontal" },
  { label: "9:16", value: "vertical" },
];

// --- Helper Component: Dropdown ---

interface DropdownProps {
  trigger: (selected: Option | undefined, isOpen: boolean) => React.ReactNode;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const Dropdown = ({ trigger, options, selectedValue, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const selectedOption = options.find(o => o.value === selectedValue);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Default to opening below
      let top = rect.bottom + 8;
      let left = rect.left;

      // Simple collision detection (optional, keep simple for now)
      setCoords({ top, left });
    }
  }

  const toggle = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close if clicking outside both trigger and dropdown menu
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    // Also update position on scroll/resize
    const handleResize = () => {
      if (isOpen) updatePosition();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleResize, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleResize, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div onClick={toggle} className="cursor-pointer">
        {trigger(selectedOption, isOpen)}
      </div>
      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-[#1a1f3c]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 min-w-[220px] animate-in fade-in zoom-in-95 duration-200"
          style={{ top: coords.top, left: coords.left }}
        >
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-sm text-left flex items-center gap-3 transition-colors
                    ${selectedValue === option.value ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'}
                  `}
              >
                {option.Icon && <option.Icon className="w-4 h-4 opacity-70" />}
                {!option.Icon && <span className="w-4" />}
                <span>{option.label}</span>
                {selectedValue === option.value && <Check className="w-3 h-3 ml-auto" />}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("No Tone");
  const [platform, setPlatform] = useState("Any platform");
  const [ratio, setRatio] = useState("square");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logo, setLogo] = useState<File | null>(null);
  const [opacity, setOpacity] = useState(100);

  // Advanced styling state
  const [lighting, setLighting] = useState("none");
  const [style, setStyle] = useState("none");
  const [color, setColor] = useState("none");
  const [composition, setComposition] = useState("none");

  // Mode Slider State
  const [activeMode, setActiveMode] = useState("Ad Generator AI");
  const modes = ["Ad Generator AI", "Logo Maker AI", "Campaign Editor"];

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const triggerLogoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (activeMode === "Ad Generator AI") {
              navigate("/editor");
            }
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const renderBadgeButton = (label: string, isActive: boolean, icon: React.ReactNode = null) => (
    <div className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm
                    rounded-full border transition-all duration-200
                    flex items-center gap-2 select-none
                    ${isActive
        ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'}
                  `}>
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="flex min-h-screen gradient-bg-blue-3 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-8">
          <div className="mx-auto max-w-5xl">

            {/* Mode Slider */}
            <div className="flex justify-center mb-8">
              <div className="backdrop-blur-md p-1 rounded-xl flex space-x-1 border border-white/10 bg-white/5 shadow-xl overflow-x-auto max-w-full">
                {modes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 whitespace-nowrap ${activeMode === mode
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {activeMode === "Ad Generator AI" && "Create New Campaign"}
                {activeMode === "Logo Maker AI" && "Design Your Brand Logo"}
                {activeMode === "Campaign Editor" && "Edit Existing Campaigns"}
              </h1>
              <p className="text-blue-200 mb-8">
                {activeMode === "Ad Generator AI" && "Let AI create your perfect social media ad"}
                {activeMode === "Logo Maker AI" && "Generate unique logos for your brand instantly"}
                {activeMode === "Campaign Editor" && "Fine-tune and customize your generated assets"}
              </p>
            </div>

            {activeMode === "Campaign Editor" ? (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center shadow-xl">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                  <i className="fas fa-edit text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Go to Campaign Editor</h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">Access the full-featured editor to customize your ads, adjust layers, and apply filters.</p>
                <button
                  onClick={() => navigate("/editor")}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
                >
                  Launch Editor
                </button>
              </div>
            ) : activeMode === "Logo Maker AI" ? (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center shadow-xl">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400">
                  <i className="fas fa-fingerprint text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Logo Generator Coming Soon</h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">We are putting the finishing touches on our AI Logo Maker. Stay tuned for instant brand identity generation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Ad Description */}
                <div className="w-full mx-auto">
                  {/* Input Area */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden group">
                    {/* Glossy Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

                    <div className="flex justify-between mb-4 items-center">
                      <h2 className="text-xl font-bold text-white flex items-center">
                        <i className="fas fa-pen-nib mr-3 text-blue-400"></i>
                        Describe Your Ad
                      </h2>

                      <button
                        type="button"
                        onClick={triggerLogoUpload}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs hover:bg-indigo-500/20 transition-all cursor-pointer"
                      >
                        {logo ? <Check size={12} /> : <i className="fas fa-plus"></i>}
                        <span>{logo ? "Logo Added" : "Add Logo"}</span>
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all font-light pr-12"
                        placeholder="Example: Eco-friendly reusable coffee cup made from bamboo, perfect for morning commuters. Highlight sustainability and modern design."
                        required
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-colors group/btn"
                        title="Enhance Prompt"
                      >
                        <Wand2 size={16} className="group-hover/btn:animate-pulse" />
                      </button>
                    </div>

                    {/* Tags / Pills */}
                    <div className="flex flex-wrap gap-2 mt-4">

                      {/* Aspect Ratio */}
                      <div className="flex items-center bg-black/20 rounded-full p-1 pr-3 border border-white/5">
                        {aspectRatios.map(ar => (
                          <button
                            key={ar.value}
                            type="button"
                            onClick={() => setRatio(ar.value)}
                            className={`px-3 py-1 rounded-full text-xs transition-all ${ratio === ar.value ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                          >
                            {ar.label}
                          </button>
                        ))}
                      </div>

                      <div className="w-px h-6 bg-white/10 mx-1 self-center"></div>

                      {/* Style Dropdown */}
                      <Dropdown
                        options={styleOptions}
                        selectedValue={style}
                        onSelect={setStyle}
                        trigger={(selected, isOpen) => renderBadgeButton(
                          selected && selected.value !== 'none' ? selected.label : "No Style",
                          isOpen || (selected ? selected.value !== 'none' : false),
                          <Sparkles size={14} />
                        )}
                      />

                      {/* Lighting Dropdown */}
                      <Dropdown
                        options={lightingOptions}
                        selectedValue={lighting}
                        onSelect={setLighting}
                        trigger={(selected, isOpen) => renderBadgeButton(
                          selected && selected.value !== 'none' ? selected.label : "No Lighting",
                          isOpen || (selected ? selected.value !== 'none' : false),
                          <Lightbulb size={14} />
                        )}
                      />

                      {/* Color Dropdown */}
                      <Dropdown
                        options={colorOptions}
                        selectedValue={color}
                        onSelect={setColor}
                        trigger={(selected, isOpen) => renderBadgeButton(
                          selected && selected.value !== 'none' ? selected.label : "No Tone",
                          isOpen || (selected ? selected.value !== 'none' : false),
                          <Palette size={14} />
                        )}
                      />

                      {/* Composition Dropdown */}
                      <Dropdown
                        options={compositionOptions}
                        selectedValue={composition}
                        onSelect={setComposition}
                        trigger={(selected, isOpen) => renderBadgeButton(
                          selected && selected.value !== 'none' ? selected.label : "All Platforms",
                          isOpen || (selected ? selected.value !== 'none' : false),
                          <Layout size={14} />
                        )}
                      />

                    </div>

                  </div>
                </div>

                {/* Campaign Options & Brand Elements Grid */}
                <div className="grid md:grid-cols-2 gap-8">

                  {/* Campaign Options */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <i className="fas fa-sliders-h mr-3 text-purple-400"></i>
                      Campaign Details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Tone of Voice</label>
                        <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                          <option value="No tone">No specific tone</option>
                          <option value="professional">Professional</option>
                          <option value="witty">Witty & Fun</option>
                          <option value="urgent">Urgent</option>
                          <option value="inspirational">Inspirational</option>
                          <option value="casual">Casual</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Target Platform</label>
                        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                          <option value="Any platform">All Platforms</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="twitter">X (Twitter)</option>
                          <option value="tiktok">TikTok</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Brand Elements */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <i className="fas fa-award mr-3 text-yellow-400"></i>
                      Brand Identity
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Call-to-Action</label>
                        <input
                          type="text"
                          value={ctaText}
                          onChange={(e) => setCtaText(e.target.value)}
                          className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm"
                          placeholder="e.g. Shop Now"
                        />
                      </div>

                      <div className="">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Logo Opacity</span>
                          <span className="text-white">{opacity}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={opacity}
                          onChange={(e) => setOpacity(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex items-center justify-between pt-4 pb-8">
                  <button type="button" onClick={() => navigate("/dashboard")} className="px-6 py-3 rounded-xl text-gray-400 font-medium hover:text-white hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient hover:scale-105 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2">
                    <i className="fas fa-magic"></i>
                    <span>Generate Options</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {loading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[10000] flex items-center justify-center">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-12 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
            <div className="text-center relative z-10">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <i className="fas fa-magic absolute inset-0 m-auto flex items-center justify-center text-blue-400 text-xl animate-pulse"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Generating Assets</h3>
              <p className="text-gray-400 mb-8">AI is crafting your campaign variations...</p>
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-xs text-blue-400 mt-3 font-mono tracking-wider">{Math.round(progress)}% COMPLETE</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
