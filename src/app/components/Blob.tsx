// components/BlobComponent.tsx
'use client'

//will anchor to fontified and adjust later
import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

const BlobComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const drag = 0.75; // Adjust the drag coefficient

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numWaves = 5; // Number of lobes
    const radius = 150;
    const color = 'rgb(0, 255, 255)';
    const mouseDisturbance = 1; // Adjust the intensity of disturbance
    const speed = 0.005; // Adjust the speed of movement

    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let mouseX = center.x;
    let mouseY = center.y;
    let phase = 0;

    const calculatePoints = (phase: number): Point[] => {
        const points: Point[] = [];
      
        const numPointsPerLobe = 20; // Adjust the number of points per lobe
      
        for (let i = 0; i < numWaves * numPointsPerLobe; i++) {
          const lobeIndex = Math.floor(i / numPointsPerLobe);
          const angle = ((i % numPointsPerLobe) * Math.PI) / numPointsPerLobe + phase;
          const distortionFactor = 1 + Math.sin(angle * 4 + phase) * 0.2; // Adjust distortion effect if needed
          const x =
            center.x +
            Math.cos(angle) * radius * distortionFactor +
            (mouseX - center.x) * mouseDisturbance;
          const y =
            center.y +
            Math.sin(angle) * radius * distortionFactor +
            (mouseY - center.y) * mouseDisturbance;
          points.push({ x, y });
      
          // Add additional points between lobes for smoother curve
          if (i % numPointsPerLobe === numPointsPerLobe - 1 && lobeIndex < numWaves - 1) {
            const nextLobeAngle = ((i + 1) * Math.PI) / numPointsPerLobe + phase;
            const nextDistortionFactor = 1 + Math.sin(nextLobeAngle * 4 + phase) * 0.2;
            const nextX =
              center.x +
              Math.cos(nextLobeAngle) * radius * nextDistortionFactor +
              (mouseX - center.x) * mouseDisturbance;
            const nextY =
              center.y +
              Math.sin(nextLobeAngle) * radius * nextDistortionFactor +
              (mouseY - center.y) * mouseDisturbance;
            points.push({ x: (x + nextX) / 2, y: (y + nextY) / 2 });
          }
        }
      
        // Connect the last point to the first point to close the shape
        points.push(points[0]);
      
        return points;
      };
      

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.beginPath();
      const points = calculatePoints(phase);

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 2; i += 2) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        const xMid = (xc + points[i + 1].x) / 2;
        const yMid = (yc + points[i + 1].y) / 2;

        ctx.quadraticCurveTo(xc, yc, xMid, yMid);
      }

      // Draw the final two points
      ctx.quadraticCurveTo(
        points[points.length - 2].x,
        points[points.length - 2].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      );

      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Update phase for next frame
      phase += speed;

      // Apply decay to velocity
      velocity.current.x *= drag;
      velocity.current.y *= drag;

      // Apply velocity to mouse position
      mouseX += velocity.current.x;
      mouseY += velocity.current.y;

      // Update last mouse position
      lastMousePosition.current.x = mouseX;
      lastMousePosition.current.y = mouseY;
    };

    const animate = () => {
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    });

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const dx = clientX - lastMousePosition.current.x;
      const dy = clientY - lastMousePosition.current.y;
      velocity.current.x = dx;
      velocity.current.y = dy;
      mouseX = clientX;
      mouseY = clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
      });
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current!);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default BlobComponent;
