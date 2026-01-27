import { motion } from 'framer-motion';
import { personalInfo } from '../../constants/data';
import { PixelatedImage } from '../PixelatedImage';

/**
 * Hero Section
 * - Introduzione con foto profilo pixelata
 * - CTA buttons
 * - Layout responsive
 */

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center py-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 3 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.1 }}
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 text-sm text-white/60">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Available for projects
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.2 }}
              className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1]"
            >
              Crafting digital
              <br />
              <span className="text-gradient">experiences</span> that
              <br />
              <span className="text-muted">stand out</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.4 }}
              className="mt-8 text-lg md:text-xl text-white/50 leading-relaxed max-w-lg"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a href="#projects" className="btn btn-primary">
                View Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image with Pixelated Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 3.3 }}
            className="flex justify-center lg:justify-end"
          >
            <PixelatedImage
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px]"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.8 }}
          className="pt-12 pb-8 border-t border-white/5"
        >
          <div className="grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '10+', label: 'Projects' },
              { value: '100%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 + i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold">{stat.value}</p>
                <p className="mt-2 text-xs text-white/35">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
