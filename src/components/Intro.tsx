import { motion } from 'framer-motion';

/**
 * Intro Screen - ff9 in minuscolo su sfondo nero
 * Scompare dopo 1.5 secondi o al click
 * Include overlay scuro durante la transizione
 */

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  return (
    <motion.div
      onClick={onComplete}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={(definition) => {
        // Solo quando l'exit animation completa
        if (definition === 'exit') {
          onComplete();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 700,
          fontStyle: 'italic',
          color: 'white',
          letterSpacing: '0.02em',
          userSelect: 'none',
          textTransform: 'lowercase',
          padding: '0 20px',
        }}
      >
        ff9
      </motion.span>
    </motion.div>
  );
}
