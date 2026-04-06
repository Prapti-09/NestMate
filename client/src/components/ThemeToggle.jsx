import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle-btn"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="icon-moon" />
      ) : (
        <Sun size={20} className="icon-sun" />
      )}
      <style>{`
        .theme-toggle-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-main);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-sm);
        }
        .theme-toggle-btn:hover {
          transform: scale(1.1);
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: var(--shadow-md);
        }
        .icon-moon { color: #475569; }
        .icon-sun { color: #facc15; }
        [data-theme='dark'] .icon-moon { color: #94a3b8; }
      `}</style>
    </button>
  );
};

export default ThemeToggle;
