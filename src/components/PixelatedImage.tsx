import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * PixelatedImage Component
 * - Mostra un'immagine con effetto pixelato/glitch
 * - Si rivela al passaggio del mouse con effetto fluido
 */

interface PixelatedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function PixelatedImage({ src, alt, className = '' }: PixelatedImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Immagine principale */}
      <motion.img
        src={src}
        alt={alt}
        animate={{
          filter: isHovered
            ? 'grayscale(0%) blur(0px) contrast(1)'
            : 'grayscale(100%) blur(2px) contrast(1.1)',
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full h-full object-cover"
      />

      {/* Overlay pixelato (SVG filter) */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          imageRendering: 'pixelated',
          filter: 'grayscale(100%) contrast(1.2)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Scanlines effect */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 0.15 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
          )`,
        }}
      />

      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none"
      />

      {/* Border effect */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}
