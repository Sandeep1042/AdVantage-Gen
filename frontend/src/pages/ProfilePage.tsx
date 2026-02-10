import Sidebar from "../components/Sidebar";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "China", "India", "Brazil", "Mexico", "South Africa", "Other"
];

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        bio: "",
        profilePicture: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get("http://localhost:5000/api/users/profile", config);
            setUser(data);
            setFormData({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                location: data.location || "",
                bio: data.bio || "",
                profilePicture: data.profilePicture || "",
                password: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Error fetching profile", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "phone") {
            validatePhone(value);
        }
        if (name === "password" || name === "confirmPassword") {
            const pass = name === "password" ? value : formData.password;
            const confirm = name === "confirmPassword" ? value : formData.confirmPassword;
            if (pass && confirm && pass !== confirm) {
                setErrors(prev => ({ ...prev, password: "Passwords do not match" }));
            } else {
                setErrors(prev => ({ ...prev, password: undefined }));
            }
        }
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format or simple international
        if (phone && !phoneRegex.test(phone)) {
            setErrors(prev => ({ ...prev, phone: "Invalid phone number format" }));
        } else {
            setErrors(prev => ({ ...prev, phone: undefined }));
        }
    };

    const handleImageClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("File size too large (max 2MB)");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profilePicture: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (errors.phone || errors.password) {
            alert("Please fix validation errors before saving.");
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // Only send password if it's set
            const updateData: any = { ...formData };
            if (!updateData.password) {
                delete updateData.password;
                delete updateData.confirmPassword;
            }

            const { data } = await axios.put("http://localhost:5000/api/users/profile", updateData, config);

            // Update local storage token if needed, or just user info
            const updatedUserInfo = { ...userInfo, ...data };
            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

            setUser(data);
            setIsEditing(false);
            setFormData(prev => ({ ...prev, password: "", confirmPassword: "" })); // Clear passwords
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile");
        }
    };

    if (!user) return <div className="text-white text-center mt-20">Loading...</div>;

    return (
        <div className="gradient-bg-blue-3 min-h-screen flex">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center space-x-6 mb-8">
                            <div
                                className={`w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-[3px] relative ${isEditing ? "cursor-pointer group" : ""}`}
                                onClick={handleImageClick}
                            >
                                <img
                                    src={isEditing ? formData.profilePicture || user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" : user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-black/50"
                                />
                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <i className="fas fa-camera text-white"></i>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                                <p className="text-blue-200">{user.bio || "Creative User"}</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">Active</span>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">{user.plan || "Free Plan"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="text-white text-lg font-medium border-b border-white/10 pb-2">{user.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Email Address</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="text-white text-lg font-medium border-b border-white/10 pb-2">{user.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Phone</label>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full bg-black/20 border ${errors.phone ? "border-red-500" : "border-white/10"} rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
                                                placeholder="+1234567890"
                                            />
                                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                                        </>
                                    ) : (
                                        <p className="text-white text-lg font-medium border-b border-white/10 pb-2">{user.phone || " - "}</p>
                                    )}
                                </div>
                                {isEditing && (
                                    <>
                                        <div>
                                            <label className="text-gray-400 text-sm block mb-1">New Password (optional)</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className={`w-full bg-black/20 border ${errors.password ? "border-red-500" : "border-white/10"} rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
                                                placeholder="********"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block mb-1">Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className={`w-full bg-black/20 border ${errors.password ? "border-red-500" : "border-white/10"} rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500`}
                                                placeholder="********"
                                            />
                                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Location</label>
                                    {isEditing ? (
                                        <select
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 appearance-none"
                                        >
                                            <option value="" className="bg-gray-800 text-gray-400">Select Country</option>
                                            {COUNTRIES.map(country => (
                                                <option key={country} value={country} className="bg-gray-800 text-white">{country}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-white text-lg font-medium border-b border-white/10 pb-2">{user.location || " - "}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Joined</label>
                                    <p className="text-white text-lg font-medium border-b border-white/10 pb-2">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block mb-1">Bio</label>
                                    {isEditing ? (
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="text-white text-lg font-medium border-b border-white/10 pb-2">{user.bio || " - "}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
                            {isEditing ? (
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-green-500/30"
                                >
                                    Save Profile
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/30"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
