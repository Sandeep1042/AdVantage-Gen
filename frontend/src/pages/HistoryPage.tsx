import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

interface HistoryItem {
  _id: string;
  imageUrl: string;
  prompt: string;
  platform: string;
  style: string;
  createdAt: string;
  productName?: string;
  aiModel?: string;
  opacity?: number;
  targetAudience?: string;
  ctaText?: string;
  ratio?: string;
  lighting?: string;
  color?: string;
}



export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [selectedStyle, setSelectedStyle] = useState("All Styles");

  const filteredHistory = history.filter((item) => {
    const matchesSearch = (item.prompt?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.productName?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === "All Platforms" || item.platform === selectedPlatform;
    const matchesStyle = selectedStyle === "All Styles" || item.style === selectedStyle;

    return matchesSearch && matchesPlatform && matchesStyle;
  });

  const fetchHistory = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const token = userInfo.token;

      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await axios.get("http://localhost:5000/api/images/history", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const handleDownload = async (imageUrl: string, id: string) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      if (userInfo.token) {
        await axios.post(`http://localhost:5000/api/images/download/${id}`, {}, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
      }

      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `ad-vantage-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen gradient-bg-blue-3 text-white">
      <Sidebar />





      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Campaign History</h1>
            <p className="text-gray-400">Browse and manage your past ad campaigns</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <i className="fas fa-search absolute left-4 top-3.5 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <option className="bg-[#0f172a]">All Platforms</option>
                  <option className="bg-[#0f172a]">Instagram</option>
                  <option className="bg-[#0f172a]">Facebook</option>
                  <option className="bg-[#0f172a]">LinkedIn</option>
                  <option className="bg-[#0f172a]">X (Twitter)</option>
                  <option className="bg-[#0f172a]">TikTok</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-4 text-gray-400 pointer-events-none"></i>
              </div>
              <div className="relative">
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <option className="bg-[#0f172a]">All Styles</option>
                  <option className="bg-[#0f172a]">Minimalist</option>
                  <option className="bg-[#0f172a]">Realistic</option>
                  <option className="bg-[#0f172a]">Cyberpunk</option>
                  <option className="bg-[#0f172a]">Abstract</option>
                  <option className="bg-[#0f172a]">Gouache</option>
                  <option className="bg-[#0f172a]">Pixel Art</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-4 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading your creative history...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
              <i className="fas fa-image text-4xl text-gray-600 mb-4"></i>
              <p className="text-gray-400 text-lg">No images generated yet.</p>
              <button
                onClick={() => navigate("/create")}
                className="mt-4 px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors"
              >
                Create Your First Ad
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHistory.map((item) => (
                <div key={item._id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden group hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.prompt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="p-5">
                    {item.productName && (
                      <span className="block text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                        {item.productName}
                      </span>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-md leading-tight line-clamp-1" title={item.prompt}>
                        {item.prompt}
                      </h3>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-2.5 py-1 bg-white/10 border border-white/10 text-gray-300 text-xs rounded-full flex items-center gap-1.5">
                        <i className="fas fa-layer-group text-[10px]"></i>
                        {item.platform || "General"}
                      </span>
                      <span className="px-2.5 py-1 bg-white/10 border border-white/10 text-gray-300 text-xs rounded-full">
                        {item.style}
                      </span>
                      <span className="text-xs text-gray-500 ml-auto">{formatDate(item.createdAt)}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate("/editor", {
                          state: {
                            imageUrl: item.imageUrl,
                            prompt: item.prompt,
                            platform: item.platform,
                            style: item.style,
                            productName: item.productName || "",
                            targetAudience: item.targetAudience || "",
                            ctaText: item.ctaText || "",
                            ratio: item.ratio,
                            lighting: item.lighting,
                            color: item.color,
                            tone: item.color,
                            opacity: item.opacity,
                            model: item.aiModel
                          }
                        })}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold text-center transition-all shadow-lg shadow-blue-500/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDownload(item.imageUrl, item._id)}
                        className="px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                      <button className="px-3 py-2.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl text-gray-400 hover:text-red-400 transition-colors">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
