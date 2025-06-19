import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FooterSection({ title, children, sectionKey }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <section className="flex flex-col space-y-3 text-gray-600 text-center md:text-left">
      <button
        onClick={toggleSection}
        className="flex items-center justify-between md:justify-start md:pointer-events-none text-base font-bold text-gray-800 mb-1 md:border-none md:rounded-none md:text-start border border-zinc-500 rounded px-3 py-2 md:px-0 md:py-0 text-center md:text-left w-full md:w-auto focus:outline-none focus:ring-2 focus:zinc-700 md:focus:ring-0 transition-all duration-200"
        aria-expanded={isExpanded}
        aria-controls={`${sectionKey}-content`}
      >
        <span>{title}</span>
        <span className="md:hidden">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </button>

      <div 
        id={`${sectionKey}-content`} 
        className={`md:block overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
        }`}
      >
        <div className="space-y-3 pb-2 md:pb-0">
          {children}
        </div>
      </div>
    </section>
  );
}