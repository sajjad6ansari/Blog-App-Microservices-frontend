"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAppData, user_service } from "@/context/AppContext";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
    const { isAuth, setIsAuth, loading, setLoading, setUser } = useAppData();

    // State for required form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (isAuth) return redirect("/blogs");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            const result = await axios.post(`${user_service}/api/v1/auth/register`, {
                name,
                email,
                password,
            });

            Cookies.set("token", result.data.token, { expires: 5, secure: true, path: "/" });
            toast.success(result.data.message);
            setUser(result.data.user);
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            console.log("Registration Error:", error);
            let errorMessage = "Registration failed. Please try again.";

            // Check if the error is an Axios error
            if (axios.isAxiosError(error) && error.response) {
                // Now TypeScript knows error.response exists and has a 'data' property
                errorMessage = error.response.data.message || errorMessage;
            } else if (error instanceof Error) {
                // Handle generic errors
                errorMessage = error.message;
            }

            toast.error(errorMessage);
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-gradient-to-bl from-yellow-100 via-pink-50 to-purple-100 relative overflow-hidden">
                    {/* Floating Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                        <div className="absolute top-40 right-1/3 w-60 h-60 bg-gradient-to-br from-purple-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
                    </div>

                    <div className="flex min-h-screen relative z-10">
                        {/* Left Side - Enhanced Illustration */}
                        <div className="hidden md:flex w-1/2 items-center justify-center p-12">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                                <div className="relative z-10 bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-glow animate-float">
                                    <div className="text-center space-y-6">
                                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center shadow-glow">
                                            <span className="text-5xl">✨</span>
                                        </div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            Join Our Community
                                        </h2>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            Discover amazing stories, share your thoughts, and connect with fellow writers in our vibrant blogging community.
                                        </p>
                                        <div className="flex justify-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                <span>Write & Share</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                <span>Connect & Grow</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <span>Inspire Others</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Registration Form */}
                        <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
                            <Card className="w-full max-w-md glass-card border-white/20 shadow-glow animate-float" style={{animationDelay: '1s'}}>
                                <CardHeader className="space-y-4 text-center">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center shadow-glow">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
                                        Get Started
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 text-lg">
                                        Create your account to start your blogging journey
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <form onSubmit={handleRegister} className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full border-2 border-yellow-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full border-2 border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Create a strong password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                                                required
                                            />
                                        </div>
                                        <Button 
                                            type="submit" 
                                            className="w-full py-3 font-bold text-lg text-white bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 rounded-xl hover:from-yellow-700 hover:via-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">Create Account</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                        </Button>
                                    </form>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-4 bg-white text-gray-500 font-medium">Join thousands of writers</span>
                                        </div>
                                    </div>

                                    <p className="text-center text-gray-600">
                                        Already have an account?{" "}
                                        <a href="/login" className="text-purple-600 font-bold hover:text-pink-600 transition-colors duration-300 hover:underline">
                                            Sign in here
                                        </a>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterPage;

