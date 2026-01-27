import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const BlenderIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <ellipse cx="41.6" cy="41.4" rx="18.2" ry="12.3" fill="#EA7600"/>
    <ellipse cx="41.6" cy="41.4" rx="14.3" ry="9.6" fill="#265787"/>
    <ellipse cx="41.6" cy="41.4" rx="7.1" ry="4.8" fill="#EA7600"/>
    <path d="M25.5 30.1L6.5 22.8 25.8 32.2c-.2-.7-.3-1.4-.3-2.1z" fill="#EA7600"/>
    <path d="M25.5 30.1c-.2-.7-.3-1.4-.3-2.1L6.5 22.8l19.3 9.4-.3-2.1z" fill="#EA7600"/>
    <path d="M4 32.5l16.9-4.8c.8-2.3 2.2-4.4 4-6.1L4 32.5z" fill="#EA7600"/>
    <path d="M24.9 21.6L7.9 10l18.5 18.3c.4-2.5 1.5-4.8 3.1-6.7h-4.6z" fill="#EA7600"/>
  </svg>
);

export const MayaIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="mayaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00B4A0"/>
        <stop offset="100%" stopColor="#005F56"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#mayaGrad)"/>
    <text x="32" y="42" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white" fontFamily="Arial">M</text>
  </svg>
);

export const NukeIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="nukeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB800"/>
        <stop offset="100%" stopColor="#FF6B00"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#nukeGrad)"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="white" strokeWidth="3"/>
    <circle cx="32" cy="32" r="5" fill="white"/>
    <line x1="32" y1="14" x2="32" y2="20" stroke="white" strokeWidth="2"/>
    <line x1="32" y1="44" x2="32" y2="50" stroke="white" strokeWidth="2"/>
    <line x1="14" y1="32" x2="20" y2="32" stroke="white" strokeWidth="2"/>
    <line x1="44" y1="32" x2="50" y2="32" stroke="white" strokeWidth="2"/>
  </svg>
);

export const SilhouetteIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="silGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1"/>
        <stop offset="100%" stopColor="#4338CA"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#silGrad)"/>
    <path d="M20 48 Q32 16 44 48" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="32" cy="24" r="6" fill="white"/>
  </svg>
);

export const AfterEffectsIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="aeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9999FF"/>
        <stop offset="100%" stopColor="#00005B"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#aeGrad)"/>
    <text x="32" y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="Arial">Ae</text>
  </svg>
);

export const PremiereProIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="prGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EA77FF"/>
        <stop offset="100%" stopColor="#9999FF"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#prGrad)"/>
    <text x="32" y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="Arial">Pr</text>
  </svg>
);

export const PhotoshopIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="psGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#31A8FF"/>
        <stop offset="100%" stopColor="#001E36"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#psGrad)"/>
    <text x="32" y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="Arial">Ps</text>
  </svg>
);

export const ThreeDEqualizerIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="3deGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D4AA"/>
        <stop offset="100%" stopColor="#006B55"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#3deGrad)"/>
    <text x="32" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial">3DE</text>
    <circle cx="22" cy="22" r="3" fill="white"/>
    <circle cx="42" cy="22" r="3" fill="white"/>
    <circle cx="32" cy="46" r="3" fill="white"/>
    <line x1="22" y1="22" x2="42" y2="22" stroke="white" strokeWidth="1.5"/>
    <line x1="22" y1="22" x2="32" y2="46" stroke="white" strokeWidth="1.5"/>
    <line x1="42" y1="22" x2="32" y2="46" stroke="white" strokeWidth="1.5"/>
  </svg>
);

export const HoudiniIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="houGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B35"/>
        <stop offset="100%" stopColor="#8B2500"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#houGrad)"/>
    <path d="M20 44 V20 H32 V32 H24 M32 20 V44 M44 20 V44" 
          fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const UnrealEngineIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="ueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#313131"/>
        <stop offset="100%" stopColor="#0D0D0D"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="48" height="48" rx="8" fill="url(#ueGrad)"/>
    <circle cx="32" cy="32" r="16" fill="none" stroke="white" strokeWidth="2"/>
    <path d="M24 38 V26 L32 32 V38" fill="white"/>
    <path d="M34 26 L34 38 L40 32 L40 26" fill="white"/>
  </svg>
);

export const toolIconMap: { [key: string]: React.FC<IconProps> } = {
  'Blender': BlenderIcon,
  'Maya': MayaIcon,
  'Nuke': NukeIcon,
  'Silhouette': SilhouetteIcon,
  'After Effects': AfterEffectsIcon,
  'Premiere Pro': PremiereProIcon,
  'Photoshop': PhotoshopIcon,
  '3D Equalizer': ThreeDEqualizerIcon,
  'Houdini': HoudiniIcon,
  'Unreal Engine': UnrealEngineIcon,
};
