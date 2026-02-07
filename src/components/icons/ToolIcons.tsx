import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

const IconWrapper: React.FC<IconProps & { src: string; alt: string }> = ({ className, size = 24, src, alt }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`${className} object-contain`}
    style={{ blockSize: size, inlineSize: size }}
  />
);

export const BlenderIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/blender.png" alt="Blender" />
);

export const MayaIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/maya.png" alt="Maya" />
);

export const NukeIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/nuke.png" alt="Nuke" />
);

export const SilhouetteIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/silhouette.png" alt="Silhouette" />
);

export const AfterEffectsIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/ae.png" alt="After Effects" />
);

export const PremiereProIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/pr.png" alt="Premiere Pro" />
);

export const PhotoshopIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/ps.png" alt="Photoshop" />
);

export const ThreeDEqualizerIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/3dequalizer.png" alt="3D Equalizer" />
);

export const HoudiniIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/houdini.png" alt="Houdini" />
);

export const UnrealEngineIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/unreal.png" alt="Unreal Engine" />
);

export const SubstanceIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/substance.png" alt="Substance" />
);

export const UnityIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/unity.png" alt="Unity" />
);

export const ZBrushIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props} src="/icons/zbrush.png" alt="ZBrush" />
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
  'Substance': SubstanceIcon,
  'Unity': UnityIcon,
  'ZBrush': ZBrushIcon,
};
