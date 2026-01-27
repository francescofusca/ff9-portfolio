import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation Component
 * - Header fisso con blur on scroll
 * - Menu mobile responsive
 * - Animazioni fluide
 */

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Rileva scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blocca scroll quando menu aperto
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5' : ''
        }`}
      >
        <div className="container">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="text-xl font-display font-semibold italic tracking-tight hover:opacity-70 transition-opacity"
            >
              FF9
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="btn btn-ghost">
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn btn-primary ml-4">
                Get in Touch
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              <div className="w-6 h-5 relative">
                <motion.span
                  className="absolute left-0 w-full h-[2px] bg-white rounded-full"
                  animate={mobileMenuOpen
                    ? { top: '50%', rotate: 45, translateY: '-50%' }
                    : { top: 0, rotate: 0, translateY: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white rounded-full"
                  animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute left-0 w-full h-[2px] bg-white rounded-full"
                  animate={mobileMenuOpen
                    ? { bottom: '50%', rotate: -45, translateY: '50%' }
                    : { bottom: 0, rotate: 0, translateY: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] md:hidden"
          >
            <nav className="h-full flex flex-col items-center justify-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-display font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.3 }}
                className="btn btn-primary mt-4"
              >
                Get in Touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
