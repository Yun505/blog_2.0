import React from 'react';

export default function PostCard({ post, onClick }) {
  return (
    <div 
      onClick={() => onClick(post)}
      className="group cursor-pointer break-inside-avoid mb-4 bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 text-white">
          {post.title}
        </h3>
      </div>
    </div>
  );
}