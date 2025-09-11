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
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex min-h-screen bg-gray-50">
          {/* Left Side - Image */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br items-center justify-center">
            <img
              src="/loginSide.svg"
              alt="Login illustration"
              className="object-contain w-3/4 h-3/4"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="flex w-full md:w-1/2 items-center justify-center px-6">
            <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Welcome to <span className="text-indigo-600">The Reading Retreat</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to continue exploring and writing blogs
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <Button type="submit" className="w-full py-3">
                    Login
                  </Button>
                </form>

                <div className="my-4 flex items-center gap-2">
                  <span className="flex-grow border-t border-gray-300"></span>
                  <span className="text-gray-400">OR</span>
                  <span className="flex-grow border-t border-gray-300"></span>
                </div>

                <Button
                  onClick={googleLogin}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 py-3 text-gray-700 font-medium hover:bg-gray-50"
                >
                  <img src="/google.png" className="w-5 h-5" alt="Google icon" />
                  Continue with Google
                </Button>

                <p className="mt-4 text-center text-gray-500">
                  Don't have an account?{" "}
                  <a href="/register" className="text-indigo-600 font-semibold hover:underline">
                    Register
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

export default LoginPage;
