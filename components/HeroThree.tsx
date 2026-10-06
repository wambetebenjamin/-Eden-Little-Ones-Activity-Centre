"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Three.js hero background: small floating geometric shapes (cubes, spheres,
// cylinders only — no diamonds/stars/gems), slow varied rotation, low
// opacity, hidden on mobile, paused when scrolled out of view, DPR capped
// at 1.5. Palette colors come from the design tokens (primary/secondary/dark).
const PALETTE = [0xff4880, 0x4d65f9, 0x393d72, 0xffecf2];

export default function HeroThree() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.6, 16, 16),
      new THREE.CylinderGeometry(0.5, 0.5, 1, 20),
    ];

    const meshes: { mesh: THREE.Mesh; speedX: number; speedY: number }[] = [];
    const COUNT = 14;
    for (let i = 0; i < COUNT; i++) {
      const geometry = geometries[i % geometries.length];
      const color = PALETTE[i % PALETTE.length];
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const scale = 0.4 + Math.random() * 0.9;
      mesh.scale.setScalar(scale);
      mesh.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 8 - 2
      );
      scene.add(mesh);
      meshes.push({
        mesh,
        speedX: (Math.random() - 0.5) * 0.004,
        speedY: (Math.random() - 0.5) * 0.004,
      });
    }

    let running = true;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    function animate() {
      frame = requestAnimationFrame(animate);
      if (!running) return;
      meshes.forEach(({ mesh, speedX, speedY }) => {
        mesh.rotation.x += speedX;
        mesh.rotation.y += speedY;
      });
      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      geometries.forEach((g) => g.dispose());
      meshes.forEach(({ mesh }) => (mesh.material as THREE.Material).dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 hidden md:block"
      aria-hidden="true"
    />
  );
}
