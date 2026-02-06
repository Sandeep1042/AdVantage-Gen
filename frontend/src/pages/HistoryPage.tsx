import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function HistoryPage() {
  const campaigns = [
    { title: "Eco-Friendly Coffee Cup", platform: "Instagram", tone: "Professional", gradient: "from-blue-400 to-purple-500", days: "2 days ago" },
    { title: "Gym Membership Promo", platform: "Facebook", tone: "Urgent", gradient: "from-green-400 to-blue-500", days: "5 days ago" },
    { title: "Summer Collection 2024", platform: "LinkedIn", tone: "Witty", gradient: "from-pink-400 to-red-500", days: "1 week ago" },
    { title: "Restaurant Grand Opening", platform: "Instagram", tone: "Inspirational", gradient: "from-yellow-400 to-orange-500", days: "2 weeks ago" },
    { title: "Smart Home Devices", platform: "Twitter", tone: "Professional", gradient: "from-indigo-400 to-purple-500", days: "3 weeks ago" },
    { title: "Tropical Beach Getaway", platform: "Facebook", tone: "Inspirational", gradient: "from-teal-400 to-green-500", days: "1 month ago" },
  ];

  return (
    <div className="flex min-h-screen gradient-bg-blue-3">
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
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors">
                  <option className="bg-[#0f172a]">All Platforms</option>
                  <option className="bg-[#0f172a]">Instagram</option>
                  <option className="bg-[#0f172a]">Facebook</option>
                  <option className="bg-[#0f172a]">LinkedIn</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-4 text-gray-400 pointer-events-none"></i>
              </div>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors">
                  <option className="bg-[#0f172a]">All Tones</option>
                  <option className="bg-[#0f172a]">Professional</option>
                  <option className="bg-[#0f172a]">Witty</option>
                  <option className="bg-[#0f172a]">Urgent</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-4 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden group hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className={`bg-gradient-to-br ${campaign.gradient} h-48 flex items-center justify-center text-white text-xl font-bold relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <span className="relative z-10 drop-shadow-md">{campaign.title}</span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white text-lg leading-tight">{campaign.title}</h3>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mb-6">
                    <span className="px-2.5 py-1 bg-white/10 border border-white/10 text-gray-300 text-xs rounded-full flex items-center gap-1.5">
                      <i className={`fab fa-${campaign.platform.toLowerCase()} text-[10px]`}></i>
                      {campaign.platform}
                    </span>
                    <span className="px-2.5 py-1 bg-white/10 border border-white/10 text-gray-300 text-xs rounded-full">
                      {campaign.tone}
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">{campaign.days}</span>
                  </div>

                  <div className="flex gap-3">
                    <Link to="/editor" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold text-center transition-all shadow-lg shadow-blue-500/20">
                      Edit
                    </Link>
                    <button className="px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
                      <i className="fas fa-sync-alt"></i>
                    </button>
                    <button className="px-3 py-2.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl text-gray-400 hover:text-red-400 transition-colors">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
