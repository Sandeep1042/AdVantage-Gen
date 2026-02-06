import Sidebar from "../components/Sidebar";

export default function ProfilePage() {
    return (
        <div className="gradient-bg-blue-3 min-h-screen flex">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-[3px]">
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-black/50"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">John Doe</h2>
                                <p className="text-blue-200">Product Designer @ TechCorp</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">Active</span>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">Premium Plan</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Full Name</label>
                                    <p className="text-white text-lg font-medium border-b border-white/10 pb-2">John Doe</p>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Email Address</label>
                                    <p className="text-white text-lg font-medium border-b border-white/10 pb-2">john@example.com</p>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Phone</label>
                                    <p className="text-white text-lg font-medium border-b border-white/10 pb-2">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Location</label>
                                    <p className="text-white text-lg font-medium border-b border-white/10 pb-2">New York, USA</p>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Joined</label>
                                    <p className="text-white text-lg font-medium border-b border-white/10 pb-2">January 15, 2024</p>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Total Campaigns</label>
                                    <p className="text-white text-lg font-medium border-b border-white/10 pb-2">24</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
                            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/30">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
