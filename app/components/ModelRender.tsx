"use client"; // Required for Next.js to handle browser-only WebGL APIs

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import ModelRenderLoading from "./ModelRenderLoading";

const MODEL_PATH = "/models/chip-model.glb";
const LOADING_IMAGE = "/images/chips/C41_QS_temp.webp";


useGLTF.preload(MODEL_PATH);

// ── Model ──────────────────────────────────────────────────────────────────────
function Model({ onLoaded }: { onLoaded: () => void }) {
  const { scene } = useGLTF(MODEL_PATH);

  // Called once Suspense resolves and this component first renders
  React.useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return <primitive object={scene} scale={20} position={[0, -2, 0]} />;
}

// ── Scene ──────────────────────────────────────────────────────────────────────
export default function ModelRender() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative"
      style={{ width: "30vw", height: "50vh" }}
    >
      {/* Canvas always mounts — avoids a hard layout swap */}
      <Canvas style={{ background: "transparent" }}>
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model onLoaded={() => setLoaded(true)} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} />
      </Canvas>

      {/* Loading overlay — fades out once the model signals it's ready */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ModelRenderLoading image={LOADING_IMAGE} />
      </div>
    </div>
  );
}
