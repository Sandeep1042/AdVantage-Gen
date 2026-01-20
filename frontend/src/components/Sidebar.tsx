import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: "fa-home", label: "Dashboard" },
    { path: "/create", icon: "fa-plus-circle", label: "Create Campaign" },
    { path: "/history", icon: "fa-history", label: "History" },
    { path: "/settings", icon: "fa-cog", label: "Settings" },
    { path: "/admin", icon: "fa-shield-alt", label: "Admin Panel" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center mb-8">
          <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
            <i className="fas fa-bolt text-white"></i>
          </div>
          <span className="ml-3 text-lg font-bold gradient-text">AdVantage Gen</span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg font-medium ${
                location.pathname === item.path
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
