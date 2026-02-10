import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardStats {
  totalCampaigns: number;
  adsGenerated: number;
  timeSaved: number;
  creditsLeft: number;
  changeText: string;
  planLimit: number;
}

interface RecentCampaign {
  _id: string;
  prompt: string;
  platform: string;
  style: string;
  createdAt: string;
  color: string;
  imageUrl: string;
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    adsGenerated: 0,
    timeSaved: 0,
    creditsLeft: 0,
    changeText: "-",
    planLimit: 50
  });
  const [recentCampaigns, setRecentCampaigns] = useState<RecentCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const token = userInfo.token;
        setUserName(userInfo.name || "User");

        if (!token) return;

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const [statsRes, recentRes] = await Promise.all([
          axios.get("http://localhost:5000/api/images/stats", config),
          axios.get("http://localhost:5000/api/images/recent", config)
        ]);

        setStats(statsRes.data);
        setRecentCampaigns(recentRes.data);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const statCards = [
    { label: "Total Downloads", value: stats.totalCampaigns.toString(), change: stats.changeText, icon: "fa-download", color: "blue", subtext: "Campaigns Exported" },
    { label: "Ads Generated", value: stats.adsGenerated.toString(), change: stats.changeText, icon: "fa-image", color: "green", subtext: "Total Creations" },
    { label: "Time Saved", value: `${stats.timeSaved}h`, subtext: "Estimated (2h/ad)", icon: "fa-clock", color: "purple" },
    { label: "Credits Left", value: stats.creditsLeft.toString(), subtext: `of ${stats.planLimit}`, icon: "fa-coins", color: "yellow" },
  ];

  return (
    <div className="gradient-bg-blue-2">
      <div className="flex min-h-screen ">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold  mb-2">Welcome back, {userName}! 👋</h1>
              <p className="text-gray-400">Ready to create amazing ads today?</p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Link to="/create" className="card-hover bg-gradient-to-br from-blue-600/60 to-blue-700/60 text-white p-6 rounded-xl text-left">
                <i className="fas fa-plus-circle text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Create New Campaign</h3>
                <p className="text-blue-100">Start generating AI-powered ads</p>
              </Link>

              <Link to="/history" className="card-hover bg-gradient-to-br from-green-600/60 to-green-700/60 text-white p-6 rounded-xl text-left">
                <i className="fas fa-history text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-2">View History</h3>
                <p className="text-green-100">Browse your past campaigns</p>
              </Link>

              <div className="card-hover bg-gradient-to-br from-purple-600/60 to-purple-700/60 text-white p-6 rounded-xl">
                <i className="fas fa-chart-line text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Analytics</h3>
                <p className="text-purple-100">Track your performance</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <div key={index} className="bg-white/20 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-100 text-sm font-medium">{stat.label}</span>
                    <i className={`fas ${stat.icon} text-${stat.color}-500`}></i>
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change && stat.change !== '-' ? 'text-green-400' : 'text-gray-400'}`}>
                    {stat.change && stat.change !== '-' ? <><i className="fas fa-arrow-up"></i> {stat.change} this month</> : stat.subtext}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Campaigns */}
            <div className="bg-white/20 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white-">Recent Campaigns</h2>
                <Link to="/history" className="text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>

              {recentCampaigns.length === 0 ? (
                <p className="text-gray-400">No campaigns yet. Create your first ad!</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {recentCampaigns.map((campaign) => (
                    <div key={campaign._id} className="card-hover border bg-white/80 border-gray-200 rounded-xl overflow-hidden">
                      <div className="h-48 overflow-hidden bg-gray-100 relative group">
                        <img
                          src={campaign.imageUrl}
                          alt={campaign.prompt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1 truncate" title={campaign.prompt}>{campaign.prompt}</h3>
                        <p className="text-sm text-gray-600 mb-2">Created {formatDate(campaign.createdAt)}</p>
                        <div className="flex space-x-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded truncate max-w-[100px]">{campaign.platform}</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded truncate max-w-[100px]">{campaign.style}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
