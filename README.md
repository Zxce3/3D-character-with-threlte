# 3D Character Animation with Threlte

A real-time 3D character animation system built with Svelte, Threlte, and Three.js.

## Features

- Real-time character animation with smooth transitions
- Day/night cycle with dynamic lighting
- Web Worker-based animation processing
- Physically-based rendering with shadows and reflections
- Interactive animation controls
- Support for various character actions:
  - Locomotion: idle, walk, run, sneak
  - Emotions: agree, headshake, sad pose

## Tech Stack

- [Svelte](https://svelte.dev) - Frontend framework
- [Threlte](https://threlte.xyz) - 3D rendering framework for Svelte
- [Three.js](https://threejs.org) - 3D graphics library
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) - Background processing
- [Tweakpane](https://cocopon.github.io/tweakpane/) - Debug UI

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Character.svelte    # Main character component
│   │   ├── Ground.svelte       # Ground plane with reflections
│   │   ├── Scene.svelte        # Main scene setup
│   │   └── World.svelte        # Environment and lighting
│   ├── workers/
│   │   └── worker.ts           # Animation computation worker
│   └── types.ts                # Types Definition
└── routes/
    └── +page.svelte           # Main page with controls
```

## Animation System

The project uses a Web Worker to handle heavy animation computations, enabling smooth transitions between different character states. Animations are loaded from a GLTF model and include:

- Basic locomotion (walk, run)
- Emotional expressions (agree, sad)
- Pose transitions

## Environment

Features a dynamic environment system that changes based on time of day:
- Dynamic sky parameters
- Adaptive lighting
- HDR environment mapping
- Physically-based shadows and reflections

## License

MIT
