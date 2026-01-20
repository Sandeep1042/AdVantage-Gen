import Sidebar from "../components/Sidebar";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen gradient-bg-blue-3">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">System monitoring and user management</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Users", value: "12,487", change: "+15%", icon: "fa-users", color: "blue" },
              { label: "Active Campaigns", value: "8,542", change: "+8%", icon: "fa-chart-line", color: "green" },
              { label: "API Calls Today", value: "45.2K", subtext: "89% success rate", icon: "fa-server", color: "purple" },
              { label: "Revenue (MRR)", value: "$78K", change: "+23%", icon: "fa-dollar-sign", color: "yellow" },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
                  <i className={`fas ${stat.icon} text-${stat.color}-500`}></i>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.change ? 'text-green-600' : 'text-gray-500'}`}>
                  {stat.change ? <><i className="fas fa-arrow-up"></i> {stat.change} this month</> : stat.subtext}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Management</h2>
              <input type="text" placeholder="Search users..." className="px-4 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Plan</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "John Doe", email: "john@example.com", plan: "Pro", status: "Active", joined: "Jan 15, 2024", gradient: "from-blue-400 to-purple-500" },
                    { name: "Sarah Smith", email: "sarah@example.com", plan: "Enterprise", status: "Active", joined: "Dec 3, 2023", gradient: "from-green-400 to-teal-500" },
                    { name: "Mike Johnson", email: "mike@example.com", plan: "Starter", status: "Trial", joined: "Feb 20, 2024", gradient: "from-pink-400 to-red-500" },
                  ].map((user, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 bg-gradient-to-br ${user.gradient} rounded-full mr-3`}></div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 ${user.plan === "Pro" ? "bg-blue-100 text-blue-700" : user.plan === "Enterprise" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"} text-xs rounded-full font-medium`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} text-xs rounded-full font-medium`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.joined}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">API Health</h3>
              <div className="space-y-4">
                {[
                  { name: "Hugging Face API", status: "99.8%" },
                  { name: "Gemini API", status: "98.5%" },
                  { name: "Database", status: "100%" },
                ].map((api, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{api.name}</span>
                      <span className="text-sm font-semibold text-green-600">{api.status}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: api.status }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { text: "New user registered", sub: "user@example.com • 2 minutes ago", color: "blue" },
                  { text: "Campaign created", sub: "ID: #12847 • 15 minutes ago", color: "green" },
                  { text: "Upgrade to Pro plan", sub: "user@example.com • 1 hour ago", color: "purple" },
                  { text: "API limit reached", sub: "Warning • 2 hours ago", color: "yellow" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full mt-2 mr-3`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
