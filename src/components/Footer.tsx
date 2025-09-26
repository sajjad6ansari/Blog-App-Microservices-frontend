"use client";
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Heart, Code, Server, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-20 bg-gradient-to-br from-purple-900 via-pink-900 to-yellow-900 text-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-10 left-1/2 w-32 h-32 bg-gradient-to-br from-yellow-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-glow">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                The Reading Retreat
              </h3>
            </div>
            <p className="text-purple-200 leading-relaxed max-w-sm mx-auto md:mx-0">
              A modern microservices-based blogging platform where stories come to life and communities connect through words.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-pink-200 to-yellow-200 bg-clip-text text-transparent">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link href="/blogs" className="block text-purple-200 hover:text-white transition-colors duration-300 hover:underline">
                📖 Explore Blogs
              </Link>
              <Link href="/blog/new" className="block text-purple-200 hover:text-white transition-colors duration-300 hover:underline">
                ✍️ Write Blog
              </Link>
              <Link href="/blog/saved" className="block text-purple-200 hover:text-white transition-colors duration-300 hover:underline">
                🔖 Saved Blogs
              </Link>
              <Link href="/profile" className="block text-purple-200 hover:text-white transition-colors duration-300 hover:underline">
                👤 Profile
              </Link>
            </div>
          </div>

          {/* Tech Stack & Repositories */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-200 to-purple-200 bg-clip-text text-transparent">
              Open Source
            </h4>
            <div className="space-y-2">
              <a 
                href="https://github.com/sajjad6ansari/Blog-App-Microservices-frontend" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-2 text-purple-200 hover:text-white transition-all duration-300 hover:scale-105 group"
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>Frontend Repo</span>
              </a>
              
              {/* Backend Microservices */}
              <div className="text-xs text-purple-300 mb-2 font-medium">Backend Services:</div>
              <a 
                href="https://github.com/sajjad6ansari/BlogApp-UserService/tree/main" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-2 text-purple-200 hover:text-white transition-all duration-300 hover:scale-105 group text-sm"
              >
                <Server className="w-3 h-3 group-hover:bounce transition-transform duration-300" />
                <span>👤 User Service</span>
              </a>
              <a 
                href="https://github.com/sajjad6ansari/BlogApp-BlogService/tree/main" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-2 text-purple-200 hover:text-white transition-all duration-300 hover:scale-105 group text-sm"
              >
                <Server className="w-3 h-3 group-hover:bounce transition-transform duration-300" />
                <span>📝 Blog Service</span>
              </a>
              <a 
                href="https://github.com/sajjad6ansari/BlogApp-AuthorService/tree/main" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-2 text-purple-200 hover:text-white transition-all duration-300 hover:scale-105 group text-sm"
              >
                <Server className="w-3 h-3 group-hover:bounce transition-transform duration-300" />
                <span>✍️ Author Service</span>
              </a>
              
              <div className="text-xs text-purple-300 mt-3">
                <span className="inline-flex items-center gap-1">
                  <Code className="w-3 h-3" />
                  Next.js • Node.js • Microservices
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-700/50 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Creator Credit */}
          <div className="flex items-center gap-2 text-purple-200">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>by</span>
            <a 
              href="https://linkedin.com/in/sajjad6ansari" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent hover:from-purple-100 hover:to-pink-100 transition-all duration-300 hover:scale-105"
            >
              Sajjad Ansari
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/sajjad6ansari" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-purple-800/50 hover:bg-purple-700/50 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-glow"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/sajjad6ansari" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-blue-800/50 hover:bg-blue-700/50 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-glow"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-purple-300">
            © {new Date().getFullYear()} The Reading Retreat. All rights reserved.
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
      </div>
    </footer>
  );
};

export default Footer;