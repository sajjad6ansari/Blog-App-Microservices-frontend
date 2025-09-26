// "use client";
// import BlogCard from "@/components/BlogCard";
// import Loading from "@/components/loading";
// import { useAppData } from "@/context/AppContext";
// import React from "react";

// const SavedBlogs = () => {
//   const { blogs, savedBlogs } = useAppData();

//   if (!blogs || !savedBlogs) {
//     return <Loading />;
//   }

//   const filteredBlogs = blogs.filter((blog) =>
//     savedBlogs.some((saved) => saved.blogid === blog.id.toString())
//   );

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-3xl font-bold mt-2">Saved Blogs</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//         {filteredBlogs.length > 0 ? (
//           filteredBlogs.map((e, i) => {
//             return (
//               <BlogCard
//                 key={i}
//                 image={e.image}
//                 title={e.title}
//                 desc={e.description}
//                 id={e.id}
//                 time={e.created_at}
//               />
//             );
//           })
//         ) : (
//           <p>No saved blogs yet!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SavedBlogs;
"use client";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/loading";
import { useAppData } from "@/context/AppContext";
import React from "react";
import Link from "next/link";
import { FiBookmark } from "react-icons/fi";


const SavedBlogs = () => {
  const { blogs, savedBlogs } = useAppData();

  if (!blogs || !savedBlogs) {
    return <Loading />;
  }

  const filteredBlogs = blogs.filter((blog) =>
    savedBlogs.some((saved) => saved.blogid === blog.id.toString())
  );

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-gradient-to-br from-yellow-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-glow mb-4">
            <FiBookmark className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Saved Blogs
          </h1>
          <p className="text-gray-600 text-lg">Your personal reading collection</p>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBlogs.map((e) => {
              return (
                <div key={e.id} className="animate-float" style={{animationDelay: `${Math.random() * 2}s`}}>
                  <BlogCard
                    image={e.image}
                    title={e.title}
                    desc={e.description}
                    id={e.id}
                    time={e.created_at}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-glow animate-float">
                <FiBookmark className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-transparent bg-clip-text" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'}} />
                <FiBookmark className="w-16 h-16 text-purple-500 absolute" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Start Your Reading Journey
            </h2>
            <p className="text-gray-600 text-lg max-w-md mb-8 leading-relaxed">
              ✨ Discover amazing stories and bookmark your favorites to create a personalized reading collection that inspires you.
            </p>
            
            <div className="space-y-4">
              <Link
                href="/blogs"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">🚀 Explore Blogs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Curated Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span>Personal Library</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Easy Access</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedBlogs;