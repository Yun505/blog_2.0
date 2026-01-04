import React from 'react';

export default function QuotePost({ post }) {
  return (
    <div className="space-y-8 text-center py-16 px-8">
      <blockquote className="text-3xl md:text-4xl font-serif italic text-white leading-relaxed">
        "{post.quote}"
      </blockquote>
      <p className="text-xl text-gray-300 font-medium">— {post.author}</p>
    </div>
  );
}