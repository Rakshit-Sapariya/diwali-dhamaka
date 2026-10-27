import React from 'react';

interface DiyaIconProps {
  className?: string;
  size?: number;
}

/**
 * Custom handcrafted Diya vector motif embodying the warm golden glow of the Festival of Lights.
 * Designed with dual-tone saffron and festive gold accents.
 */
export const DiyaIcon: React.FC<DiyaIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Diya Flame */}
    <path
      d="M12 2C13 3.5 14 5.2 14 6.8C14 8.2 13.1 9.3 12 9.3C10.9 9.3 10 8.2 10 6.8C10 5.2 11 3.5 12 2Z"
      fill="url(#diyaFlameGrad)"
    />
    <circle cx="12" cy="7" r="1.5" fill="#FFF275" />
    {/* Diya Clay Bowl */}
    <path
      d="M4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 11.2 19.5 10.5 18.5 10.5H5.5C4.5 10.5 4 11.2 4 12Z"
      fill="url(#diyaBowlGrad)"
      stroke="#F5C76A"
      strokeWidth="1.2"
    />
    {/* Traditional Rim Pattern */}
    <path
      d="M6 12.5C7.5 13.5 16.5 13.5 18 12.5"
      stroke="#FFB547"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Base Stand */}
    <path
      d="M9 20H15L16 22H8L9 20Z"
      fill="#C99735"
    />
    <defs>
      <linearGradient id="diyaFlameGrad" x1="12" y1="2" x2="12" y2="9.3" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE29A" />
        <stop offset="0.5" stopColor="#FF7A18" />
        <stop offset="1" stopColor="#FF2D55" />
      </linearGradient>
      <linearGradient id="diyaBowlGrad" x1="4" y1="10.5" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5C76A" />
        <stop offset="0.6" stopColor="#C99735" />
        <stop offset="1" stopColor="#7E5616" />
      </linearGradient>
    </defs>
  </svg>
);

export const SparkleIcon: React.FC<DiyaIconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);
