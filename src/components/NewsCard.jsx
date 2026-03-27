import React, { useState } from 'react';
import { CheckCircle, ChevronDown, ExternalLink, Clock, Loader2, AlertCircle } from 'lucide-react';

const NewsCard = ({ articles = [], loading, error, onMarkRead, readArticles = [] }) => {
  // State to track which articles are expanded
  const [expandedArticles, setExpandedArticles] = useState(new Set());

  // Toggle article expansion
  const toggleExpanded = (articleId) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(articleId)) {
      newExpanded.delete(articleId);
    } else {
      newExpanded.add(articleId);
    }
    setExpandedArticles(newExpanded);
  };

  // Mark article as read
  const handleMarkRead = (e, articleId) => {
    e.stopPropagation();
    if (!readArticles.includes(articleId)) {
      if (onMarkRead) onMarkRead(articleId);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-blue-600 mr-3" size={24} />
          <span style={{color: 'rgb(var(--text-secondary))'}}>Loading latest news...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <AlertCircle className="text-red-500 mr-3" size={24} />
          <div className="text-center">
            <p className="text-red-600 mb-2">{error}</p>
            <p style={{color: 'rgb(var(--text-secondary))'}} className="text-sm">
              Please add your NewsAPI key to App.jsx
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p style={{color: 'rgb(var(--text-secondary))'}}>No articles found for this category.</p>
        </div>
      </div>
    );
  }

  // Render articles in a grid
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const isExpanded = expandedArticles.has(article.id);
          const isRead = readArticles.includes(article.id);
          
          return (
            <div
              key={article.id}
              style={{
                backgroundColor: 'rgb(var(--bg-primary))',
                borderColor: 'rgb(var(--border-color))',
                opacity: isRead ? 0.5 : 1,
                transform: isRead ? 'scale(0.98)' : 'scale(1)'
              }}
              className={`
                group border rounded-2xl p-6 transition-all duration-500
                ${!isRead && 'hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1'}
              `}
            >
              
              {/* Article metadata */}
              <div className="flex items-center justify-between mb-4">
                <span style={{backgroundColor: 'rgb(59 130 246 / 0.1)', color: 'rgb(59 130 246)'}} className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">
                  {article.source}
                </span>
                <div style={{color: 'rgb(var(--text-secondary))'}} className="flex items-center gap-1.5 text-[11px]">
                  <Clock size={12} />
                  {article.publishedAt}
                </div>
              </div>

              {/* Article title */}
              <div 
                onClick={() => toggleExpanded(article.id)}
                className="cursor-pointer group/title"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 style={{
                    color: isRead ? 'rgb(var(--text-secondary))' : 'rgb(var(--text-primary))',
                    textDecoration: isRead ? 'line-through' : 'none'
                  }} className={`
                    text-xl font-bold leading-tight transition-all duration-300
                    ${!isRead && 'group-hover/title:text-blue-600'}
                  `}>
                    {article.title}
                  </h3>
                  <div style={{
                    backgroundColor: isExpanded ? 'rgb(59 130 246)' : 'rgb(var(--bg-secondary))',
                    color: isExpanded ? 'white' : 'rgb(var(--text-secondary))',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} className="mt-1 p-1.5 rounded-full transition-all duration-300 flex-shrink-0">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Expandable description */}
              {isExpanded && (
                <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                  <p style={{color: 'rgb(var(--text-secondary))', borderColor: 'rgb(var(--border-color))'}} className="text-[15px] leading-[1.7] font-normal border-l-2 pl-4 tracking-[-0.01em]">
                    {article.description || 'No description available.'}
                  </p>
                  <div style={{borderColor: 'rgb(var(--border-color))'}} className="mt-4 pt-4 border-t">
                    <a 
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"
                    >
                      FULL STORY <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}

              {/* Mark as read button */}
              <div style={{borderColor: 'rgb(var(--border-color))'}} className="mt-6 flex items-center border-t pt-4">
                <button
                  onClick={(e) => handleMarkRead(e, article.id)}
                  disabled={isRead}
                  style={{
                    color: isRead ? 'rgb(34 197 94)' : 'rgb(var(--text-secondary))'
                  }}
                  className={`
                    flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all
                    ${!isRead && 'hover:text-blue-600'}
                  `}
                >
                  <CheckCircle size={18} style={{fill: isRead ? 'rgb(34 197 94 / 0.1)' : 'transparent'}} />
                  {isRead ? 'Added to Archive' : 'Mark as Read'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsCard;