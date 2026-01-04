import React from 'react';

export default function ArticlePost({ post }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-3">{post.title}</h2>
        <p className="text-sm text-gray-400 uppercase tracking-wide">{post.readTime}</p>
      </div>
      <div className="prose prose-lg prose-invert max-w-none">
        <p className="text-gray-300 leading-relaxed text-lg">{post.content}</p>
      </div>
    </div>
  );
}