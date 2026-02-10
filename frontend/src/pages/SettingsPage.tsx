import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SettingsPage() {

    const [user, setUser] = useState<any>(null);
    const [currentPlan, setCurrentPlan] = useState<any>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    useEffect(() => {
        if (user?.plan) {
            // Map legacy "Free" plan to "Starter"
            const planName = user.plan === "Free" || user.plan === "Free Plan" ? "Starter" : user.plan;
            fetchPlanDetails(planName);
        }
    }, [user]);

    const fetchPlanDetails = async (planName: string) => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/plans");
            const plan = data.find((p: any) => p.name === planName);
            if (plan) {
                setCurrentPlan(plan);
            }
        } catch (error) {
            console.error("Error fetching plan details", error);
        }
    };

    if (!user) return null; // Or a loading spinner

    return (
        <div className="gradient-bg-blue-3 min-h-screen flex">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

                    <div className="grid gap-8">
                        {/* Edit Profile & Plan */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Edit Profile */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <i className="fas fa-user-edit mr-3 text-blue-400"></i>
                                        Edit Profile
                                    </h2>
                                    <div className="flex items-center space-x-4 mb-6">
                                        <img
                                            src={user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                                        />
                                        <div>
                                            <p className="text-white font-bold text-lg">{user.name}</p>
                                            <p className="text-gray-400 text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mb-6">
                                        Update your personal information, profile picture, and bio.
                                    </p>
                                </div>
                                <Link to="/profile" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all text-center block">
                                    Go to Profile
                                </Link>
                            </div>

                            {/* Plan & Billing */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                    <i className="fas fa-crown mr-3 text-yellow-400"></i>
                                    Plan & Billing
                                </h2>
                                <div className="mb-4">
                                    <p className="text-gray-400 text-sm">Current Plan</p>
                                    <div className="flex items-baseline space-x-2">
                                        <p className="text-2xl font-bold text-white">{currentPlan?.name || user.plan || "Starter"}</p>
                                        <p className="text-lg text-blue-300">{currentPlan?.price}</p>
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-6 text-gray-300 text-sm">
                                    {currentPlan ? (
                                        currentPlan.features.slice(0, 3).map((feature: string, index: number) => (
                                            <li key={index} className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> {feature}</li>
                                        ))
                                    ) : (
                                        <>
                                            <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Unlimited Campaigns</li>
                                            <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Advanced Analytics</li>
                                            <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Priority Support</li>
                                        </>
                                    )}
                                </ul>
                                <div className="flex space-x-3">
                                    <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors">
                                        Change Plan
                                    </button>
                                    <button className="flex-1 py-2 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <i className="fas fa-bell mr-3 text-purple-400"></i>
                                Notifications
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Email Notifications</p>
                                        <p className="text-gray-400 text-sm">Receive updates about your campaigns</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Marketing Emails</p>
                                        <p className="text-gray-400 text-sm">Receive offers and newsletters</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>



                        <div className="flex justify-end pt-4">
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02]">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
