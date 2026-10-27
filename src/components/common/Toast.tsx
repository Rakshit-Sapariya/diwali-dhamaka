import React, { useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useShop();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#F5C76A] flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#FF2D55] flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-[#FF7A18] flex-shrink-0" />,
  };

  const borders = {
    success: 'border-[#F5C76A]/40 bg-[#16161C]/95 text-white',
    error: 'border-[#FF2D55]/50 bg-[#1E1114]/95 text-white',
    info: 'border-[#FF7A18]/40 bg-[#171311]/95 text-white',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md ${borders[toast.type]}`}
      >
        {icons[toast.type]}
        <div className="flex-1 text-sm font-medium leading-snug">
          {toast.message}
        </div>
        <button
          onClick={dismissToast}
          aria-label="Close notification"
          className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
