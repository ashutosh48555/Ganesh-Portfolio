// Portfolio data and content for Ganesh's VFX Portfolio

export interface Project {
  id: string;
  title: string;
  category: "lighting" | "matchmove" | "cg-integration" | "personal";
  categoryLabel: string;
  thumbnail: string;
  heroImage: string;
  description: string;
  challenge: string;
  solution: string;
  tools: string[];
  beforeImage?: string;
  afterImage?: string;
  videoUrl?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "sci-fi-environment",
    title: "Sci-Fi Environment",
    category: "lighting",
    categoryLabel: "Lighting",
    thumbnail: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=1920&q=80",
    description: "A futuristic cityscape with dynamic lighting that captures the essence of a dystopian future while maintaining photorealistic quality.",
    challenge: "Creating believable lighting for a complex sci-fi environment with multiple light sources and atmospheric effects.",
    solution: "Implemented a multi-pass lighting approach with careful attention to light falloff, color temperature variations, and volumetric fog to achieve cinematic depth.",
    tools: ["Blender", "Nuke", "After Effects"],
    beforeImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=800&q=80",
    year: "2024",
  },
  {
    id: "product-cg-integration",
    title: "Product CG Integration",
    category: "cg-integration",
    categoryLabel: "CG Integration",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    description: "Seamless integration of CG products into live-action footage for a premium brand commercial.",
    challenge: "Matching the lighting, reflections, and subtle surface details of CG objects to perfectly blend with real-world footage.",
    solution: "Used HDRI-based lighting with manual adjustments, detailed texture work, and multi-layer compositing for perfect integration.",
    tools: ["Maya", "Nuke", "Photoshop", "3D Equalizer"],
    beforeImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    year: "2024",
  },
  {
    id: "film-matchmove",
    title: "Cinematic Matchmove",
    category: "matchmove",
    categoryLabel: "Matchmove",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80",
    description: "Complex matchmoving work for a feature film, ensuring perfect alignment of CG elements with live-action footage.",
    challenge: "Tracking rapid camera movements and integrating CG elements seamlessly into a chaotic scene.",
    solution: "Utilized advanced object tracking and 3D camera solving to create a rock-solid foundation for VFX integration.",
    tools: ["3D Equalizer", "Maya", "Nuke"],
    year: "2023",
  },
  {
    id: "automotive-lighting",
    title: "Automotive Lighting Study",
    category: "lighting",
    categoryLabel: "Lighting",
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
    description: "Hyper-realistic automotive lighting showcasing the interplay of studio lighting on metallic surfaces.",
    challenge: "Capturing the precise reflections and light behavior on automotive paint and chrome details.",
    solution: "Custom HDRI creation combined with strategic area lights to achieve showroom-quality rendering.",
    tools: ["Blender", "Houdini", "Nuke"],
    beforeImage: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    year: "2024",
  },
  {
    id: "fantasy-creature",
    title: "Fantasy Creature Design",
    category: "personal",
    categoryLabel: "Personal",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80",
    description: "Personal project exploring creature design, texturing, and atmospheric lighting for a fantasy setting.",
    challenge: "Creating believable skin subsurface scattering and intricate texture details for a mythical creature.",
    solution: "Detailed sculpting workflow with hand-painted textures and multi-layered shader setup for organic realism.",
    tools: ["Blender", "Photoshop", "After Effects"],
    year: "2023",
  },
  {
    id: "architectural-viz",
    title: "Architectural Visualization",
    category: "lighting",
    categoryLabel: "Lighting",
    thumbnail: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80",
    description: "Photorealistic architectural visualization with emphasis on natural lighting and material accuracy.",
    challenge: "Achieving accurate daylight simulation with proper light bounce and material response.",
    solution: "Physical sky simulation with careful exposure balancing and post-processing for cinematic grade.",
    tools: ["Blender", "Unreal Engine", "Photoshop"],
    year: "2024",
  },
];

export const coreSkills = [
  {
    title: "Lighting",
    description: "Creating mood and atmosphere through precise light placement and color temperature control.",
    icon: "Lightbulb",
  },
  {
    title: "Matchmove",
    description: "Ensuring seamless integration of CG elements by perfectly tracking camera usage and object movement.",
    icon: "Move",
  },
  {
    title: "CG Integration",
    description: "Matching CG elements to live-action footage with attention to lighting and perspective.",
    icon: "Blend",
  },
];

export const vfxSkills = [
  { name: "Matchmove", icon: "Move" },
  { name: "Cg Integration", icon: "Blend" },
  { name: "Composting", icon: "Layers" },
  { name: "FX", icon: "Sparkles" },
  { name: "Roto", icon: "Scissors" },
  { name: "Lighting", icon: "Lightbulb" },
  { name: "Modeling", icon: "Box" },
];

export const gameSkills = [
  { name: "Level Design", icon: "Map" },
  { name: "Environment Design", icon: "Mountain" },
  { name: "Basic Games Design", icon: "Gamepad2" },
  { name: "Texturing", icon: "Palette" },
  { name: "Animation", icon: "Play" },
  { name: "Motion Graphics", icon: "Clapperboard" },
  { name: "Video Editing", icon: "Film" },
];

export const tools = [
  { name: "PhotoShop 2025", category: "2D", icon: "Image" },
  { name: "Premiere Pro 2025", category: "Editing", icon: "Film" },
  { name: "After Effects 2025", category: "Motion", icon: "Sparkles" },
  { name: "Maya 2025", category: "3D", icon: "Shapes" },
  { name: "Blender", category: "3D", icon: "Box" },
  { name: "Substance 2025", category: "Texturing", icon: "Palette" },
  { name: "Silhouette 2025", category: "Compositing", icon: "Scissors" },
  { name: "Nuke", category: "Compositing", icon: "Layers" },
  { name: "3d Equalizer", category: "Tracking", icon: "Target" },
  { name: "Houdini FX", category: "FX", icon: "Flame" },
  { name: "Unreal Engine", category: "Real-Time", icon: "Gamepad2" },
];

export const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com/in/ganesh", icon: "Linkedin" },
  { name: "Vimeo", url: "https://vimeo.com/ganesh", icon: "Video" },
  { name: "ArtStation", url: "https://artstation.com/ganesh", icon: "Palette" },
  { name: "Instagram", url: "https://instagram.com/ganesh", icon: "Instagram" },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export const bio = {
  name: "Ganesh",
  headline: "Creating clean, cinematic VFX visuals",
  tagline: "Lighting • Matchmove • CG Integration",
  description: `Hi, I'm Ganesh. I'm a passionate VFX Artist who enjoys creating clean, cinematic visuals. I specialize in lighting, matchmove, and CG integration, with a strong focus on realism and mood.

I love working on shots that require attention to detail, accurate lighting, and believable visual effects. I'm constantly learning and improving my skills while exploring new techniques and workflows in VFX and real-time environments.`,
  email: "ganesh@example.com",
  location: "Available Worldwide",
};
