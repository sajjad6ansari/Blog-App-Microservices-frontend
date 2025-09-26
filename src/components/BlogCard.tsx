import Link from "next/link";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Calendar, Heart, Eye, ArrowRight, Bookmark } from "lucide-react";
import moment from "moment";

interface BlogCardProps {
  image: string;
  title: string;
  desc: string;
  id: string;
  time: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  desc,
  id,
  time,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/blog/${id}`}>
      <Card 
        className="group overflow-hidden rounded-2xl border-none bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Overlay */}
        <div className="relative w-full h-[220px] overflow-hidden">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 animate-spin opacity-60"></div>
            </div>
          )}
          <img 
            src={image || "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=400&h=220&fit=crop&crop=center"} 
            alt={title} 
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=400&h=220&fit=crop&crop=center";
              setImageLoaded(true);
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Floating Action Icons */}
          <div className={`absolute top-4 right-4 flex space-x-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
              <Bookmark className="w-4 h-4 text-purple-600" />
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Date and Reading Time */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-purple-500" />
              <span>{moment(time).format("MMM DD, YYYY")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-purple-500" />
              <span>5 min read</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 line-clamp-3 leading-relaxed">
            {desc.slice(0, 120)}...
          </p>

          {/* Read More Button */}
          <div className={`flex items-center justify-between pt-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'
          }`}>
            <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300">
              <span className="mr-2">Read More</span>
              <ArrowRight size={16} className={`transition-transform duration-300 ${
                isHovered ? 'translate-x-1' : ''
              }`} />
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Heart size={14} />
                <span>24</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>156</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Card>
    </Link>
  );
};

export default BlogCard;
