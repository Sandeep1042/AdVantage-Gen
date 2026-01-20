import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [platform, setPlatform] = useState("instagram");
  const [ratio, setRatio] = useState("square");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

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
            navigate("/editor");
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Campaign</h1>
            <p className="text-gray-600 mb-8">Let AI create your perfect social media ad</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Describe Your Ad</h2>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Example: Eco-friendly reusable coffee cup made from bamboo, perfect for morning commuters. Highlight sustainability and modern design."
                  required
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Campaign Options</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                    <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                      <option value="professional">Professional</option>
                      <option value="witty">Witty</option>
                      <option value="urgent">Urgent</option>
                      <option value="inspirational">Inspirational</option>
                      <option value="casual">Casual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">Twitter</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
                    <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                      <option value="square">Square (1:1)</option>
                      <option value="vertical">Vertical (9:16)</option>
                      <option value="horizontal">Horizontal (16:9)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Brand Elements</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Call-to-Action Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Shop Now"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button type="button" onClick={() => navigate("/dashboard")} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-white px-8 py-3 rounded-lg font-semibold flex items-center">
                  <i className="fas fa-magic mr-2"></i>
                  Generate Ad
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="spinner w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Generating Your Ad</h3>
              <p className="text-gray-600 mb-6">AI is creating magic... This will take just a moment.</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
