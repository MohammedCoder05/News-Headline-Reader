import React from 'react';

const Categories = ({ onCategoryChange, selectedCategory = 'general' }) => {
  const topics = [
    'general', 'business', 'entertainment', 
    'health', 'science', 'sports', 'technology'
  ];

  return (
    <div style={{backgroundColor: 'rgb(var(--bg-primary))', borderColor: 'rgb(var(--border-color))'}} className="w-full border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
          {topics.map((topic) => {
            const isActive = selectedCategory === topic;
            return (
              <button
                key={topic}
                onClick={() => onCategoryChange && onCategoryChange(topic)}
                style={{
                  backgroundColor: isActive ? 'rgb(59 130 246 / 0.1)' : 'transparent',
                  color: isActive ? 'rgb(59 130 246)' : 'rgb(var(--text-secondary))'
                }}
                className={`
                  relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                  hover:bg-opacity-10 hover:bg-blue-500
                `}
              >
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -top-1 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                )}
                
                {/* Capitalize first letter */}
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;