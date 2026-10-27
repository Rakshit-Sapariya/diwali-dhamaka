import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumbs" className="py-3 text-xs sm:text-sm text-zinc-400">
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li className="flex items-center">
          <a
            href="#/"
            className="flex items-center gap-1 hover:text-[#F5C76A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C76A] rounded px-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
              {isLast || !item.href ? (
                <span className="text-zinc-200 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-[#F5C76A] transition-colors truncate max-w-[150px] sm:max-w-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C76A] rounded px-1"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
