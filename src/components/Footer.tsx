import { motion } from 'framer-motion';

/**
 * Footer Component
 * - Design minimalista
 * - Logo e copyright
 */

export function Footer() {
  return (
    <footer className="py-10 border-t border-white/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-display font-semibold italic">FF9</span>
            <span className="text-white/10">|</span>
            <span className="text-sm text-white/30">
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-white/30">
            Crafted with precision
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
