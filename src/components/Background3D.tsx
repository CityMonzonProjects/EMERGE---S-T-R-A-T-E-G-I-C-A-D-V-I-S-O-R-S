// Ruta: src/components/Background3D.tsx
// "Soft bokeh" background: slow, calm light particles in three depth layers.
import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

// Seeded PRNG: the field is always the same
function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Circular sprite with a radial gradient: reads as an out-of-focus light
function createBokehTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.45)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type LayerProps = {
  texture: THREE.Texture;
  count: number;
  size: number;
  opacity: number;
  color: string;
  seed: number;
  speed: number;
  animate: boolean;
};

function BokehLayer({ texture, count, size, opacity, color, seed, speed, animate }: LayerProps) {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const rand = seededRandom(seed);
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pts[i * 3] = (rand() - 0.5) * 20;
      pts[i * 3 + 1] = (rand() - 0.5) * 11;
      pts[i * 3 + 2] = (rand() - 0.5) * 8 - 1;
    }
    return pts;
  }, [count, seed]);

  // Extremely slow floating drift; no pointer parallax
  useFrame((state) => {
    const g = group.current;
    if (!g || !animate) return;
    const t = state.clock.elapsedTime * speed;
    g.position.y = Math.sin(t) * 0.35;
    g.position.x = Math.cos(t * 0.7) * 0.25;
    g.rotation.z = Math.sin(t * 0.5) * 0.02;
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          color={color}
          size={size}
          sizeAttenuation
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function BokehField() {
  const texture = useMemo(() => createBokehTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  const cyan = useMemo(() => cssVar("--cyan-500", "#00c2ff"), []);
  const silver = useMemo(() => cssVar("--silver-300", "#d3dae6"), []);
  const animate = useMemo(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  // Half the particles on small screens
  const k = window.innerWidth < 768 ? 0.5 : 1;

  return (
    <>
      {/* c) Large, very soft depth lights */}
      <BokehLayer texture={texture} count={Math.round(14 * k)} size={4.5} opacity={0.05} color={cyan} seed={11} speed={0.05} animate={animate} />
      {/* a) Faint cyan bokeh */}
      <BokehLayer texture={texture} count={Math.round(70 * k)} size={0.55} opacity={0.4} color={cyan} seed={7} speed={0.08} animate={animate} />
      {/* b) Smaller silver dust */}
      <BokehLayer texture={texture} count={Math.round(90 * k)} size={0.3} opacity={0.3} color={silver} seed={23} speed={0.06} animate={animate} />
    </>
  );
}

// If WebGL is unavailable, hide the background instead of crashing the site
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Background3D() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <CanvasBoundary>
        <Canvas
          camera={{ position: [0, 0, 9], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: false }}
        >
          <BokehField />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
