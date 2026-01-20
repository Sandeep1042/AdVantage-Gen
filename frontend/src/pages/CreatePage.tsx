import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("No tone");
  const [platform, setPlatform] = useState("Any platform");
  const [ratio, setRatio] = useState("square");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logo, setLogo] = useState<File | null>(null);
  const [opacity, setOpacity] = useState(100);

  // Mode Slider State
  const [activeMode, setActiveMode] = useState("Ad Generator AI");
  const modes = ["Ad Generator AI", "Logo Maker AI", "Campaign Editor"];

  const navigate = useNavigate();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
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

  return (
    <div className="flex min-h-screen gradient-bg-blue-3 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mx-auto max-w-5xl">

            {/* Mode Slider */}
            <div className="flex justify-center mb-8">
              <div className="backdrop-blur-md p-1 rounded-xl flex space-x-1 border border-white/10 bg-white/20  shadow-xl">
                {modes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${activeMode === mode
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

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

            {activeMode === "Campaign Editor" ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center shadow-xl">
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
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center shadow-xl">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400">
                  <i className="fas fa-fingerprint text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Logo Generator Coming Soon</h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">We are putting the finishing touches on our AI Logo Maker. Stay tuned for instant brand identity generation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Ad Description */}
                <div className="w-fill mx-auto">
                  <div className="bg-white/10  backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl">
                    <div className="flex justify-between mb-4 sm:mb-6 text-xl font-bold text-white mb-4 items-center">
                      <h2 className="text-xl font-bold text-white flex items-center">
                        <i className="fas fa-pen-nib mr-3 text-blue-400"></i>
                        Describe Your Ad
                      </h2>
                      <button className="add-logo-btn bg-black/20 ">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path fill="currentColor"
                            d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14
                            a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 13.5
                            11 16.51 14.5 12 19 18H5l3.5-4.5Z"/>
                        </svg>
                        <span>Add Logo</span>
                      </button>

                    </div>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Example: Eco-friendly reusable coffee cup made from bamboo, perfect for morning commuters. Highlight sustainability and modern design."
                      required
                    />
                  </div>
                </div>

                {/* Campaign Options */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <i className="fas fa-sliders-h mr-3 text-purple-400"></i>
                    Campaign Options
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
                      <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="No tone">No tone</option>
                        <option value="professional">Professional</option>
                        <option value="witty">Witty</option>
                        <option value="urgent">Urgent</option>
                        <option value="inspirational">Inspirational</option>
                        <option value="casual">Casual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                      <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Any platform">Any platform</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="tiktok">TikTok</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                      <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="square">Square (1:1)</option>
                        <option value="vertical">Vertical (9:16)</option>
                        <option value="horizontal">Horizontal (16:9)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Brand & Logo Elements */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <i className="fas fa-award mr-3 text-yellow-400"></i>
                    Brand Elements
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Call-to-Action Text</label>
                      <input
                        type="text"
                        value={ctaText}
                        onChange={(e) => setCtaText(e.target.value)}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        placeholder="Shop Now"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Upload Brand Logo</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                            id="logo-upload"
                          />
                          <label
                            htmlFor="logo-upload"
                            className="flex items-center justify-center w-full px-4 py-3 bg-black/20 border border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-black/30 transition-colors"
                          >
                            <i className="fas fa-cloud-upload-alt text-gray-400 mr-2"></i>
                            <span className="text-gray-300 text-sm">{logo ? logo.name : "Choose a file..."}</span>
                          </label>
                        </div>
                      </div>

                      {logo && (
                        <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                            <span>Logo Opacity</span>
                            <span>{opacity}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={opacity}
                            onChange={(e) => setOpacity(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button type="button" onClick={() => navigate("/dashboard")} className="px-6 py-3 border border-white/10 rounded-xl text-gray-300 font-medium hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] flex items-center">
                    <i className="fas fa-magic mr-2"></i>
                    Generate Ad
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="spinner w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-xl font-bold text-white mb-2">Generating Your Ad</h3>
              <p className="text-gray-400 mb-6">AI is creating magic... This will take just a moment.</p>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-sm text-blue-400 mt-2 font-mono">{Math.round(progress)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
