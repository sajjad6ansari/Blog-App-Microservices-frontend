// "use client";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import axios from "axios";
// import { useAppData, user_service } from "@/context/AppContext";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { useGoogleLogin } from "@react-oauth/google";
// import { redirect } from "next/navigation";
// import Loading from "@/components/loading";

// const LoginPage = () => {
//   const { isAuth, setIsAuth, loading, setLoading, setUser } = useAppData();

//   if (isAuth) return redirect("/blogs");

//   const responseGoogle = async (authResult: any) => {
//     setLoading(true);
//     try {
//       const result = await axios.post(`${user_service}/api/v1/login`, {
//         code: authResult["code"],
//       });

//       Cookies.set("token", result.data.token, {
//         expires: 5,
//         secure: true,
//         path: "/",
//       });
//       toast.success(result.data.message);
//       setIsAuth(true);
//       setLoading(false);
//       setUser(result.data.user);
//     } catch (error) {
//       console.log("error", error);
//       toast.error("Problem while login you");
//       setLoading(false);
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: responseGoogle,
//     onError: responseGoogle,
//     flow: "auth-code",
//   });
//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="w-[350px] m-auto mt-[200px]">
//           <Card className="w-[350px]">
//             <CardHeader>
//               <CardTitle>Login to The Reading Retreat</CardTitle>
//               <CardDescription>Your go to blog app</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button onClick={googleLogin}>
//                 Login with google{" "}
//                 <img
//                   src={"/google.png"}
//                   className="w-6 h-6"
//                   alt="google icon"
//                 />
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// };

// export default LoginPage;
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useAppData, user_service } from "@/context/AppContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";

const LoginPage = () => {
  const { isAuth, setIsAuth, loading, setLoading, setUser } = useAppData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuth) return redirect("/blogs");

  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      const result = await axios.post(`${user_service}/api/v1/login`, {
        code: authResult["code"],
      });

      Cookies.set("token", result.data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      toast.success(result.data.message);
      setIsAuth(true);
      setLoading(false);
      setUser(result.data.user);
    } catch (error) {
      console.log("error", error);
      toast.error("Problem while login you");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(`${user_service}/api/v1/auth/login`, {
        email,
        password,
      });

      Cookies.set("token", result.data.token, { expires: 5, secure: true, path: "/" });
      toast.success(result.data.message);
      setIsAuth(true);
      setUser(result.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 relative overflow-hidden">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-40 left-1/2 w-60 h-60 bg-gradient-to-br from-yellow-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
          </div>

          <div className="flex min-h-screen relative z-10">
            {/* Left Side - Image */}
            <div className="hidden md:flex w-1/2 items-center justify-center p-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                <img
                  src="/loginSide.svg"
                  alt="Login illustration"
                  className="relative z-10 object-contain w-full h-full max-w-lg drop-shadow-2xl animate-float"
                />
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
              <Card className="w-full max-w-md glass-card border-white/20 shadow-glow animate-float" style={{animationDelay: '1s'}}>
                <CardHeader className="space-y-4 text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-2xl">🔑</span>
                  </div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Sign in to continue your blogging journey
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full py-3 font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative overflow-hidden group"
                    >
                      <span className="relative z-10">Sign In</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    onClick={googleLogin}
                    className="w-full py-3 text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:bg-white hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-semibold"
                  >
                    <img src="/google.png" alt="Google" className="w-5 h-5" />
                    Continue with Google
                  </Button>

                  <p className="text-center text-gray-600">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-purple-600 font-bold hover:text-pink-600 transition-colors duration-300 hover:underline">
                      Sign up here
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

export default LoginPage;
