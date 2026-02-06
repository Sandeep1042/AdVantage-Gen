import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface AuthPageProps {
    setIsAuthenticated: (value: boolean) => void;
}

export default function AuthPage({ setIsAuthenticated }: AuthPageProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);

    // Login State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register State
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (location.pathname === "/register") {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [location.pathname]);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add actual authentication logic
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add actual registration logic
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
    };

    const handleGoogleAuth = () => {
        // TODO: Add Google OAuth logic
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 gradient-bg-blue-2 overflow-hidden relative">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Card Container */}
            <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 transition-all duration-300 transform border border-white/20">

                {/* Left Section - Branding */}
                <div className="w-full lg:w-1/2 gradient-bg-blue-3 p-12 text-white flex flex-col justify-center items-center text-center relative overflow-hidden backdrop-blur-sm">

                    {/* Abstract Shapes overlay on the image/color */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2029&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <Link to="/" className="inline-block mb-8 hover:opacity-90 transition-transform hover:scale-105">
                            <img src="/lag.png" alt="AdVantage Gen" className="h-48 drop-shadow-2xl" />
                        </Link>

                        <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                            Start your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2A5B] via-[#0F5FA6] to-[#16D2C7]">
                                AdGen Journey
                            </span>
                        </h2>

                        <p className="text-indigo-100 text-lg leading-relaxed mb-8 opacity-90 max-w-xs mx-auto">
                            Unleash your creativity with AI-powered advertisement generation. Create compelling content in seconds.
                        </p>

                        <div className="flex items-center justify-center space-x-4 text-sm font-medium text-indigo-200">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-${300 + i * 100}`}></div>
                                ))}
                            </div>
                            <span>Join 10,000+ creators</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white/20 backdrop-blur-md border-l border-white/10">
                    <div className="max-w-md mx-auto h-full flex flex-col justify-center">

                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {isLogin ? "Welcome Back" : "Create Account"}
                            </h3>

                            {/* Toggle Switch */}
                            <div className="mt-4 inline-flex bg-gray-200/50 p-1 rounded-xl w-full max-w-[240px]">
                                <button
                                    onClick={() => { setIsLogin(true); navigate("/login"); }}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${isLogin
                                        ? "bg-white text-indigo-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => { setIsLogin(false); navigate("/register"); }}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${!isLogin
                                        ? "bg-white text-indigo-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        {isLogin ? (
                            <form onSubmit={handleLoginSubmit} className="space-y-5">
                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900"
                                        placeholder="Email Address"
                                    />
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900 pr-10"
                                            placeholder="Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Forgot Password?</a>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.01]">
                                    Log In
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        required
                                        value={registerName}
                                        onChange={(e) => setRegisterName(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900"
                                        placeholder="Email Address"
                                    />
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900 pr-10"
                                            placeholder="Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.01]">
                                    Create Account
                                </button>
                            </form>
                        )}

                        <div className="mt-8 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white/50 px-2 text-gray-500 font-medium tracking-wide">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleAuth}
                            className="mt-6 w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 group"
                        >
                            <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </button>

                    </div>
                </div>

            </div>

        </div>
    );
}
