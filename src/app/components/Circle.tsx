// components/Circle.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react';

interface CircleProps {
  circleColor: string; // Color of the circle
  radius: number; // Radius of the circle
}

const Circle: React.FC<CircleProps> = ({ circleColor, radius }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 }); // Position of the blob
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (canvas && ctx) {
        // Set canvas dimensions to cover the entire viewport
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the circle at the interpolated position
        const gradient = ctx.createRadialGradient(blobPos.x, blobPos.y, 0, blobPos.x, blobPos.y, radius);
        gradient.addColorStop(0, `${circleColor}99`); // Adjust the opacity here (99 corresponds to ~60% opacity)
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blobPos.x, blobPos.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }, [circleColor, radius, blobPos]);

  useEffect(() => {
    // Interpolate the position of the blob towards the cursor position
    const dx = mousePos.x - blobPos.x;
    const dy = mousePos.y - blobPos.y;
    const easing = 0.1; // Adjust the easing factor for the speed of interpolation
    const newX = blobPos.x + dx * easing;
    const newY = blobPos.y + dy * easing;
    setBlobPos({ x: newX, y: newY });
  }, [mousePos, blobPos]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }} />;
};

export default Circle;