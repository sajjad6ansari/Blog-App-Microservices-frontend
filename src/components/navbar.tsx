"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CircleUserRoundIcon, LogIn, Menu, X, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppData } from "@/context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { loading, isAuth } = useAppData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed w-full top-0 z-50 transition-all duration-500 ease-in-out",
      scrolled 
        ? "glass-effect shadow-glow backdrop-blur-xl" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link 
          href={"/blogs"} 
          className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <BookOpen className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
            The Reading Retreat
          </span>
        </Link>

        <div className="md:hidden">
          <Button 
            variant={"ghost"} 
            onClick={() => setIsOpen(!isOpen)}
            className="relative overflow-hidden group transition-all duration-300 hover:scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            {isOpen ? 
              <X className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" /> 
              : <Menu className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
            }
          </Button>
        </div>
        
        <ul className="hidden md:flex justify-center items-center space-x-8">
          <li>
            <Link 
              href={"/blogs"} 
              className="relative group px-4 py-2 font-medium text-gray-700 hover:text-purple-600 transition-all duration-300"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link 
                href={"/blog/saved"} 
                className="relative group px-4 py-2 font-medium text-gray-700 hover:text-purple-600 transition-all duration-300"
              >
                <span className="relative z-10">Saved Blogs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </li>
          )}
          {loading ? (
            <li>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
            </li>
          ) : (
            <li>
              {isAuth ? (
                <Link 
                  href={"/profile"} 
                  className="group p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-glow-hover"
                >
                  <CircleUserRoundIcon className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                </Link>
              ) : (
                <Link href={"/login"}>
                  <Button className="gradient-bg text-white font-semibold px-6 py-2 rounded-full shadow-glow-hover transition-all duration-300 hover:scale-105">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </li>
          )}
        </ul>
      </div>
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-effect backdrop-blur-xl border-t border-white/20">
          <ul className="flex flex-col justify-center items-center space-y-4 p-6">
            <li className="w-full">
              <Link 
                href={"/blogs"} 
                className="flex items-center justify-center w-full p-3 text-gray-700 hover:text-purple-600 transition-all duration-300 rounded-lg hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            {isAuth && (
              <li className="w-full">
                <Link 
                  href={"/blog/saved"} 
                  className="flex items-center justify-center w-full p-3 text-gray-700 hover:text-purple-600 transition-all duration-300 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Saved Blogs
                </Link>
              </li>
            )}
            {loading ? (
              <li>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
              </li>
            ) : (
              <li className="w-full">
                {isAuth ? (
                  <Link 
                    href={"/profile"} 
                    className="flex items-center justify-center w-full p-3 text-gray-700 hover:text-purple-600 transition-all duration-300 rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <CircleUserRoundIcon className="w-5 h-5 mr-2" />
                    Profile
                  </Link>
                ) : (
                  <Link 
                    href={"/login"} 
                    className="flex items-center justify-center w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="gradient-bg text-white font-semibold px-6 py-2 rounded-full shadow-glow-hover transition-all duration-300 hover:scale-105">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
