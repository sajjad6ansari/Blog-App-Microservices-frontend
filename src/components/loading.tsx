import React from "react";
import { BookOpen, Sparkles, Heart } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-spin"></div>
            
            {/* Inner Ring */}
            <div className="absolute inset-2 border-4 border-pink-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-purple-600 animate-pulse" />
            </div>
          </div>
          
          {/* Floating Sparkles */}
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-pink-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute top-0 left-0 w-5 h-5 text-red-400 animate-bounce" style={{ animationDelay: '0.8s' }} />
        </div>

        {/* Loading Text with Gradient */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold gradient-text">
            Loading Amazing Stories
          </h2>
          <p className="text-gray-600 text-lg">
            Preparing your reading experience...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full animate-pulse shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
