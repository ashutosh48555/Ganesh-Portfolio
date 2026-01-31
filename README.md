# Ganesh VFX Studio 🎬✨

![VFX Portfolio Banner](https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop)

> **Crafting Reality from Pixels.**  
> A high-end, cinematic portfolio for a VFX Artist & Compositor, built with cutting-edge web technologies.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## 🌟 Features

-   **Cinematic Design**: Immersive dark mode aesthetic with film grain, anamorphic lens flares, and vignette effects.
-   **3D Interactive Elements**:
    -   **Physics Ballpit**: A gravity-simulated background that reacts to mouse interaction (`Three.js` + `React-Three-Fiber`).
    -   **Magnetic Typography**: Text that reacts to cursor proximity (`Framer Motion`).
    -   **3D Tilt Cards**: Project and tool cards that respond to mouse movement.
-   **Smooth Navigation**:
    -   **Lenis Scroll**: Silky smooth momentum scrolling.
    -   **Bubble Menu**: A playful, responsive navigation menu that expands on interaction.
-   **Performance Optimized**:
    -   GPU-accelerated animations.
    -   Lazy loading and efficient asset management.
-   **Responsive Layout**: Flawless experience across Mobile, Tablet, and Desktop.

## 🛠️ Tech Stack

-   **Core**: [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/) (via Lenis)
-   **3D / WebGL**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and **npm** installed.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ashutosh48555/ganesh-vfx-studio.git
    cd ganesh-vfx-studio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/        # UI Components
│   ├── ui/           # Reusable base components (Button, Card, etc.)
│   ├── icons/        # Custom SVG icons
│   ├── Hero.tsx      # Landing section with magnetic text
│   ├── Portfolio.tsx # Project gallery with modal
│   └── ...
├── lib/               # Utilities & Data
│   ├── animations.ts # Framer Motion variants
│   ├── data.ts       # Portfolio content (Projects, Bio)
│   └── utils.ts      # Helper functions
├── Pages/             # Route pages
└── index.css          # Global styles & Tailwind directives
```

## 🎨 Customizing

-   **Colors**: Update the CSS variables in `src/index.css` (e.g., `--primary`, `--background`).
-   **Content**: Edit `src/lib/data.ts` to update your bio, projects, and skills without touching the code.
-   **Assets**: Place images in the `public/` folder and reference them in `data.ts`.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find bugs, please feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by Ganesh VFX Studio
</p>
