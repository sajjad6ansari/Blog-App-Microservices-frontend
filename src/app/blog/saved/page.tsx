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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Saved Blogs</h1>
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBlogs.map((e) => { // 'i' is no longer needed
            return (
              <BlogCard
                // 2. Use the stable blog ID as the key
                key={e.id}
                image={e.image}
                title={e.title}
                desc={e.description}
                id={e.id}
                time={e.created_at}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <FiBookmark className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            Your Reading List is Empty
          </h2>
          <p className="text-gray-500 mt-2 max-w-sm">
            Looks like you haven't bookmarked any blogs yet. Start exploring to
            create your personal collection.
          </p>
          <Link
            href="/"
            className="mt-6 px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300"
          >
            Explore Blogs
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedBlogs;