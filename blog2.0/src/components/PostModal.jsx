import React from 'react';
import { X } from 'lucide-react';
import ImagePost from '../layouts/ImagePost.jsx';
import QuotePost from '../layouts/QuotePost.jsx';
import ArticlePost from '../layouts/ArticlePost.jsx';

const TEMPLATES = {
  image: ImagePost,
  quote: QuotePost,
  article: ArticlePost
};

export default function PostModal({ post, onClose }) {
  if (!post) return null;
  
  const TemplateComponent = TEMPLATES[post.template];
  
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white/10 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="sticky top-6 float-right mr-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 z-10"
        >
          <X size={24} className="text-white" />
        </button>
        <div className="p-8 md:p-12 clear-both">
          <TemplateComponent post={post} />
        </div>
      </div>
    </div>
  );
}