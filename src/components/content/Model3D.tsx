"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

interface Model3DProps {
  src?: string;
  title?: string;
  autoRotate?: boolean;
}

function DefaultModel({ autoRotate = true }: { autoRotate?: boolean }) {
  const meshRef = useRef<any>(null);
  
  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      {/* 中心立方体 */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#6366f1" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* 环绕球体 */}
      <mesh position={[3, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ec4899" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* 圆环 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 4, 64]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.8} roughness={0.1} side={2} />
      </mesh>
      
      {/* 底部平面 */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1e293b" metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  );
}

function GLTFModel({ src, autoRotate = true }: { src: string; autoRotate?: boolean }) {
  const meshRef = useRef<any>(null);
  const { scene } = useGLTF(src);

  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive ref={meshRef} object={scene} dispose={null} />
  );
}

export function Model3D({ src, title, autoRotate = true }: Model3DProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <figure className="my-8 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
      {title && (
        <figcaption className="px-4 py-3 text-sm text-[var(--text-primary)] border-b border-[var(--border)]">
          {title}
        </figcaption>
      )}
      <div className="relative w-full h-[400px]" onError={handleError}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
          
          {src && !hasError ? (
            <GLTFModel src={src} autoRotate={autoRotate} />
          ) : (
            <DefaultModel autoRotate={autoRotate} />
          )}
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={15}
          />
        </Canvas>
        
        {/* 操作提示 */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/70 text-xs">
          拖拽旋转 • 滚轮缩放
        </div>
        
        {/* 错误提示 */}
        {src && hasError && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-red-500/80 backdrop-blur-sm text-white text-xs">
            模型加载失败，显示默认模型
          </div>
        )}
      </div>
    </figure>
  );
}
