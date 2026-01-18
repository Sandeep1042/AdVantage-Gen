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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign History</h1>
            <p className="text-gray-600">Browse and manage your past ad campaigns</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <input type="text" placeholder="Search campaigns..." className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <select className="px-4 py-3 border border-gray-300 rounded-lg">
                <option>All Platforms</option>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>LinkedIn</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-lg">
                <option>All Tones</option>
                <option>Professional</option>
                <option>Witty</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
                <div className={`bg-gradient-to-br ${campaign.gradient} h-48 flex items-center justify-center text-white text-xl font-bold`}>
                  {campaign.title}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Created {campaign.days}</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{campaign.platform}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">{campaign.tone}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link to="/editor" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 text-center">
                      Edit
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                      <i className="fas fa-sync-alt"></i>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-red-600">
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
