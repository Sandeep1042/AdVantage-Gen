import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  const stats = [
    { label: "Total Campaigns", value: "24", change: "+12%", icon: "fa-bullhorn", color: "blue" },
    { label: "Ads Generated", value: "156", change: "+23%", icon: "fa-image", color: "green" },
    { label: "Time Saved", value: "48h", subtext: "Estimated", icon: "fa-clock", color: "purple" },
    { label: "Credits Left", value: "142", subtext: "of 200", icon: "fa-coins", color: "yellow" },
  ];

  const recentCampaigns = [
    { title: "Eco-Friendly Coffee", platform: "Instagram", tone: "Professional", gradient: "from-blue-400 to-purple-500", days: "2 days ago" },
    { title: "Gym Membership Sale", platform: "Facebook", tone: "Urgent", gradient: "from-green-400 to-blue-500", days: "5 days ago" },
    { title: "Summer Collection 2024", platform: "LinkedIn", tone: "Witty", gradient: "from-pink-400 to-red-500", days: "1 week ago" },
  ];

  return (
    <div className="gradient-bg-blue-2">
    <div className="flex min-h-screen ">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold  mb-2">Welcome back, User! 👋</h1>
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
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/20 p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-100 text-sm font-medium">{stat.label}</span>
                  <i className={`fas ${stat.icon} text-${stat.color}-500`}></i>
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.change ? 'text-green-400' : 'text-gray-400'}`}>
                  {stat.change ? <><i className="fas fa-arrow-up"></i> {stat.change} this month</> : stat.subtext}
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

            <div className="grid md:grid-cols-3 gap-6">
              {recentCampaigns.map((campaign, index) => (
                <div key={index} className="card-hover border bg-white/80 border-gray-200 rounded-xl overflow-hidden">
                  <div className={`bg-gradient-to-br ${campaign.gradient} h-48 flex items-center justify-center text-white text-xl font-bold`}>
                    {campaign.title}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Created {campaign.days}</p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{campaign.platform}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">{campaign.tone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}
