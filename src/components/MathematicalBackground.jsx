// src/components/MathematicalBackground.jsx
import React, { useEffect, useRef } from 'react';

const MathematicalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const symbols = ['π', '∑', '∫', '√', '∞', 'α', 'β', 'θ', 'λ', 'Δ', '∂', '±', '≠', '≤', '≥', '∈', '∪', '∩', 'Ω', 'φ', 'γ', 'δ', 'σ', 'μ', 'ν', 'τ', 'ζ', 'η', 'κ', 'ρ', 'χ', 'ψ', 'ω'];
    
    // Vibrant color palette for mathematical symbols
    const colors = [
      { r: 37, g: 99, b: 235 },    // Blue
      { r: 124, g: 58, b: 237 },   // Purple
      { r: 236, g: 72, b: 153 },   // Pink
      { r: 59, g: 130, b: 246 },   // Light Blue
      { r: 168, g: 85, b: 247 },   // Violet
      { r: 14, g: 165, b: 233 },   // Sky Blue
      { r: 139, g: 92, b: 246 },   // Indigo
      { r: 236, g: 112, b: 99 },   // Coral
    ];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class MathParticle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 50 + 35; // Larger symbols (35-85px)
        this.speedY = Math.random() * 0.3 + 0.15; // Slower vertical movement
        this.speedX = (Math.random() - 0.5) * 0.2; // Slower horizontal drift
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015; // Slower rotation
        this.opacity = Math.random() * 0.4 + 0.4; // Higher opacity (0.4-0.8)
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 50) {
          this.reset();
        }
        if (this.x < -50 || this.x > canvas.width + 50) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Add glow effect for better visibility
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
        
        ctx.font = `bold ${this.size}px 'Arial', sans-serif`; // Bold font
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    // Create particles - reduced count for less clutter, more visibility
    const particles = Array.from({ length: 20 }, () => new MathParticle());

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default MathematicalBackground;
