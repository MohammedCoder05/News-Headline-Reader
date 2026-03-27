import React from 'react';
import { Sun, Moon, Newspaper } from 'lucide-react';
const NavBar = ({ articlesRead = 0, darkMode, toggleDarkMode }) => {

  return (
    <nav style={{backgroundColor: 'rgb(var(--bg-primary))', borderColor: 'rgb(var(--border-color))'}} className="w-full border-b px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Logo, Title, and Actions */}
        <div className="flex items-center justify-between">
          
          {/* Logo & Title Group */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Newspaper size={24} />
            </div>
            <div>
              <h1 style={{color: 'rgb(var(--text-primary))'}} className="text-xl font-bold tracking-tight">
                Briefly<span className="text-blue-600">.</span>
              </h1>
            </div>
          </div>

          {/* Stats & Toggle Group */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span style={{color: 'rgb(var(--text-secondary))'}} className="text-[10px] uppercase tracking-widest font-semibold">
                Progress
              </span>
              <span style={{color: 'rgb(var(--text-secondary))'}} className="text-sm font-medium">
                {articlesRead} Articles Read
              </span>
            </div>

            <button
              onClick={toggleDarkMode}
              style={{backgroundColor: darkMode ? 'rgb(var(--bg-secondary))' : 'transparent', color: 'rgb(var(--text-secondary))'}}
              className="p-2 rounded-full transition-all"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Bottom Row: Catchy Heading */}
        <div className="mt-4">
          <p style={{color: 'rgb(var(--text-secondary))', borderColor: 'rgb(59 130 246)'}} className="text-sm font-light italic border-l-2 pl-3">
            Your daily digest of stories that actually matter.
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;