"use client"; // Required for Next.js to handle browser-only WebGL APIs

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// 1. The dedicated Model component
function Model() {
  // Path points directly into your public folder
  const { scene } = useGLTF('/models/chip-model.glb'); 
  
  // Use primitive to inject the loaded scene object into the component tree
  return <primitive object={scene} scale={20} position={[0, -2, 0]} />;
}

// 2. The main Page/Scene component wrapping the Canvas
export default function ModelRender() {
  return (
    <div style={{ width: '30vw', height: '50vh', background: 'transparent' }}>
      <Canvas  >
        {/* Lights are required so the model isn't pitch black */}
        <directionalLight position={[10, 10, 5]} intensity={1} />       
        {/* Suspense handles the asynchronous loading state of the file */}
        <Suspense fallback={"loading"}>
          <Model />
        </Suspense>

        {/* OrbitControls allows dragging to rotate and scrolling to zoom */}
        <OrbitControls enablePan={true} enableZoom={true} />
      </Canvas>
    </div>
  );
}
