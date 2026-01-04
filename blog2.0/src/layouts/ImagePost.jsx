import React from 'react';

export default function ImagePost({ post }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center bg-white/5 rounded-xl overflow-hidden p-4 max-h-[70vh]">
        <img 
          src={post.image} 
          alt={post.title} 
          className="max-w-full max-h-[65vh] w-auto h-auto object-contain rounded-lg" 
        />
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">{post.title}</h2>
        <p className="text-gray-300 text-lg">{post.description}</p>
      </div>
    </div>
  );
}