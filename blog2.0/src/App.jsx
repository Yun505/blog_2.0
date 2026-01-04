import React, { useState } from 'react';
import PostCard from './components/PostCard.jsx';
import PostModal from './components/PostModal.jsx';
import POSTS_DATA from './data/posts.json';

const CATEGORIES = ['all', 'food', 'book', 'misc'];

export default function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all' 
    ? POSTS_DATA.posts 
    : POSTS_DATA.posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-black">
      
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Yun's Corner
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-full font-medium text-base transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-white/20 backdrop-blur-md text-white border border-white/30'
                    : 'bg-white/5 backdrop-blur-md text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No posts in this category yet</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filteredPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={setSelectedPost}
              />
            ))}
          </div>
        )}
      </main>

      <PostModal 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
    </div>
  );
}