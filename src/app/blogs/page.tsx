"use client";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAppData } from "@/context/AppContext";
import { Filter, Search, TrendingUp, Sparkles, BookOpen, Users } from "lucide-react";
import React, { useState } from "react";

const Blogs = () => {
  const { toggleSidebar } = useSidebar();
  const { loading, blogLoading, blogs } = useAppData();
  const [searchTerm, setSearchTerm] = useState("");

  console.log(blogs);
  
  return (
    <div className="min-h-screen pt-20">
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 space-y-8">
          {/* Hero Section */}
          <div className="relative text-center py-16 mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-yellow-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                <h1 className="text-5xl md:text-6xl font-bold gradient-text leading-tight pb-2">
                  Discover Amazing Stories
                </h1>
                <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Explore our curated collection of inspiring articles, insights, and stories from writers around the world.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center items-center gap-8 mt-8">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-700">{blogs?.length || 0} Articles</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-700">100+ Writers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-700">10k+ Readers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold gradient-text">Latest Blogs</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 w-64"
                />
              </div>

              {/* Filter Button */}
              <Button
                onClick={toggleSidebar}
                className="gradient-bg text-white px-6 py-2 rounded-full shadow-glow-hover transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Filter size={18} />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          {/* Blog Grid */}
          {blogLoading ? (
            <Loading />
          ) : (
            <div className="space-y-8">
              {blogs?.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">No Blogs Yet</h3>
                  <p className="text-gray-500">Be the first to share your story with the world!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {blogs &&
                    blogs
                      .filter(blog => 
                        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((blog, i) => (
                        <div key={blog.id || i} className="floating" style={{ animationDelay: `${i * 0.1}s` }}>
                          <BlogCard
                            image={blog.image}
                            title={blog.title}
                            desc={blog.description}
                            id={blog.id}
                            time={blog.created_at}
                          />
                        </div>
                      ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
