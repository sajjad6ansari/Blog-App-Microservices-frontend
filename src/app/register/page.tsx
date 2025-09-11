"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAppData, user_service } from "@/context/AppContext";
// --- Mocked App Context & Service URL ---
// In a real Next.js app, this would be in a separate context file.
// For this component to be self-contained and avoid import errors, we define it here.
// const user_service = `${user_service}/api/v1/auth/register`; // Replace with your actual API URL

// --- Self-Contained UI Components ---
// To resolve import errors, simple versions of the UI components are included here.

const Loading = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-600"></div>
    </div>
);

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// --- Main Registration Page Component ---

const RegisterPage = () => {
    // Local state to replace the context for this self-contained example
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    // State for required form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Effect to handle redirection after successful authentication
    useEffect(() => {
        if (isAuth) {
            // Replaces the `redirect` function from next/navigation for client-side redirection
            window.location.href = "/blogs";
        }
    }, [isAuth]);

    const handleRegister = async (e:any) => {
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
            setIsAuth(true); // This will trigger the useEffect for redirection

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
                <div className="flex min-h-screen bg-gray-50">
                    {/* Left Side - Image */}
                    <div className="hidden md:flex w-1/2  to-purple-50 items-center justify-center p-12">
                        <img
                            src="/register.jpg"
                            alt="Registration illustration"
                            className="object-contain w-full h-full max-w-md rounded-lg"
                        />
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
                        <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
                            <CardHeader className="space-y-2 text-center">
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Join <span className="text-indigo-600">The Reading Retreat</span>
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Create your account to start your blogging journey
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 sr-only">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 sr-only">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 sr-only">Password</label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full py-3 font-semibold text-lg text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                                        Create Account
                                    </Button>
                                </form>

                                <p className="mt-6 text-center text-sm text-gray-500">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-indigo-600 font-semibold hover:underline">
                                        Login
                                    </a>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterPage;

