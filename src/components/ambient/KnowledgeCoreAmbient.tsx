"use client";

import { useEffect, useRef } from "react";
import styles from "./knowledge-core-ambient.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

const CORE_COLOR = { r: 45, g: 120, b: 140 };
const NODE_COLOR = { r: 1, g: 43, b: 85 };

function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    radius: Math.random() * 1.2 + 0.6,
  }));
}

export function KnowledgeCoreAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reducedMotionRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let particles: Particle[] = [];
    let corePulse = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 768 ? 36 : 64;
      particles = createParticles(count, width, height);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);

      const coreX = width * 0.62;
      const coreY = height * 0.38;
      corePulse += 0.012;
      const pulse = 0.5 + Math.sin(corePulse) * 0.12;
      const coreRadius = Math.min(width, height) * 0.14 * pulse;

      const gradient = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, coreRadius);
      gradient.addColorStop(0, `rgba(${CORE_COLOR.r}, ${CORE_COLOR.g}, ${CORE_COLOR.b}, 0.22)`);
      gradient.addColorStop(0.45, `rgba(${CORE_COLOR.r}, ${CORE_COLOR.g}, ${CORE_COLOR.b}, 0.08)`);
      gradient.addColorStop(1, "rgba(45, 120, 140, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(coreX, coreY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      const linkDistance = width < 768 ? 100 : 130;

      for (const p of particles) {
        const dx = coreX - p.x;
        const dy = coreY - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        p.vx += (dx / dist) * 0.002;
        p.vy += (dy / dist) * 0.002;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDistance) {
            const alpha = (1 - d / linkDistance) * 0.14;
            ctx.strokeStyle = `rgba(${NODE_COLOR.r}, ${NODE_COLOR.g}, ${NODE_COLOR.b}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${NODE_COLOR.r}, ${NODE_COLOR.g}, ${NODE_COLOR.b}, 0.35)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(${CORE_COLOR.r}, ${CORE_COLOR.g}, ${CORE_COLOR.b}, 0.55)`;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 4 * pulse, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.coreGlow} />
      <div className={styles.grid} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
