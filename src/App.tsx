import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Intro } from './components/Intro';
import { Globe3D } from './components/Globe3D';

/**
 * FF9 Portfolio v4.0 - Multilingual with all features
 */

// Translations
const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, i'm ff9.",
      available: 'Available for projects',
      description: 'Software Engineer from Italy. Specializing in web development, cybersecurity, and machine learning. Building innovative solutions.',
      viewProjects: 'View Projects',
      getInTouch: 'Get in Touch',
    },
    projects: {
      label: 'Portfolio',
      title: 'Selected Projects',
      subtitle: 'These are some of my selected projects. Most of my work is private and developed for clients. Check my GitHub for more.',
      comingSoon: 'Coming Soon',
    },
    about: {
      label: 'About',
      title: 'Background & Skills',
      text1: "I'm a Software Engineer passionate about creating digital products that make a difference. With expertise in full-stack development, I focus on building scalable, user-centered solutions.",
      text2: 'Currently studying Computer Engineering while working on various projects in web development, security research, and emerging technologies.',
      technologies: 'TECHNOLOGIES',
      experience: 'EXPERIENCE',
    },
    contact: {
      label: 'Contact',
      title: "Let's Work Together",
      subtitle: "I'm currently available for freelance projects and exciting opportunities.",
      copied: 'Copied!',
    },
    footer: {
      rights: 'All rights reserved',
      inspired: 'Design inspired by Linus Rogge and Gazi Jarin',
    },
    globe: {
      text: "just find me :)",
      loading: "Rendering globe... please wait",
    },
  },
  it: {
    nav: {
      home: 'Home',
      projects: 'Progetti',
      about: 'Chi Sono',
      contact: 'Contatti',
    },
    hero: {
      greeting: "Ciao, sono ff9.",
      available: 'Disponibile per progetti',
      description: 'Software Engineer italiano. Specializzato in sviluppo web, cybersecurity e machine learning. Creo soluzioni innovative.',
      viewProjects: 'Vedi Progetti',
      getInTouch: 'Contattami',
    },
    projects: {
      label: 'Portfolio',
      title: 'Progetti Selezionati',
      subtitle: 'Questi sono alcuni dei miei progetti selezionati. La maggior parte del mio lavoro è privato e sviluppato per clienti. Visita il mio GitHub per altro.',
      comingSoon: 'In Arrivo',
    },
    about: {
      label: 'Chi Sono',
      title: 'Background & Competenze',
      text1: 'Sono un Software Engineer appassionato di creare prodotti digitali che fanno la differenza. Con esperienza nello sviluppo full-stack, mi concentro su soluzioni scalabili e user-centered.',
      text2: 'Attualmente studio Ingegneria Informatica mentre lavoro su vari progetti in sviluppo web, security research e tecnologie emergenti.',
      technologies: 'TECNOLOGIE',
      experience: 'ESPERIENZA',
    },
    contact: {
      label: 'Contatti',
      title: 'Lavoriamo Insieme',
      subtitle: 'Sono attualmente disponibile per progetti freelance e nuove opportunità.',
      copied: 'Copiato!',
    },
    footer: {
      rights: 'Tutti i diritti riservati',
      inspired: 'Design ispirato da Linus Rogge e Gazi Jarin',
    },
    globe: {
      text: 'trovami :)',
      loading: 'Sto renderizzando il globo... attendi',
    },
  },
};

// Projects data
const projectsData = {
  en: [
    {
      id: 1,
      title: "RistoranteSmart",
      description: "Platform for restaurant digitalization with 3D floor mapping and spatial optimization for table management.",
      tech: ["React", "Node.js", "Three.js", "PostgreSQL"],
      images: ["/images/projects/ristorantesmart1.jpeg", "/images/projects/ristorantesmart2.jpeg"],
      link: "https://www.ristorantesmart.it",
      comingSoon: false,
    },
    {
      id: 2,
      title: "NotlonWatch",
      description: "Apple Watch app for voice notes with Notion sync and automatic transcription.",
      tech: ["Swift", "WatchOS", "Notion API"],
      images: ["/images/projects/notlonwatch.jpeg"],
      link: "https://github.com/francescofusca/NotlonWatch",
      comingSoon: false,
    },
    {
      id: 3,
      title: "FlipperZeroPhone",
      description: "In this project, my goal was to recreate the 'Flipper Zero,' a commonly used tool in penetration testing, utilizing Android devices powered by Kali Linux.",
      tech: ["Android", "Kotlin", "Python", "Kali Linux"],
      images: ["/images/projects/flipper.jpeg"],
      link: "https://github.com/francescofusca/FlipperZeroPhone",
      comingSoon: false,
    },
    {
      id: 4,
      title: "PL Judge",
      description: "Mobile app for Android and iOS focused on powerlifting.",
      tech: ["Kotlin"],
      images: ["/images/projects/pljudge.png"],
      link: null,
      comingSoon: true,
    },
  ],
  it: [
    {
      id: 1,
      title: "RistoranteSmart",
      description: "Piattaforma per la digitalizzazione dei ristoranti con mappatura 3D e ottimizzazione spaziale dei tavoli.",
      tech: ["React", "Node.js", "Three.js", "PostgreSQL"],
      images: ["/images/projects/ristorantesmart1.jpeg", "/images/projects/ristorantesmart2.jpeg"],
      link: "https://www.ristorantesmart.it",
      comingSoon: false,
    },
    {
      id: 2,
      title: "NotlonWatch",
      description: "App per Apple Watch per note vocali con sincronizzazione Notion e trascrizione automatica.",
      tech: ["Swift", "WatchOS", "Notion API"],
      images: ["/images/projects/notlonwatch.jpeg"],
      link: "https://github.com/francescofusca/NotlonWatch",
      comingSoon: false,
    },
    {
      id: 3,
      title: "FlipperZeroPhone",
      description: "In questo progetto, il mio obiettivo era ricreare il 'Flipper Zero', uno strumento comunemente usato nel penetration testing, utilizzando dispositivi Android con Kali Linux.",
      tech: ["Android", "Kotlin", "Python", "Kali Linux"],
      images: ["/images/projects/flipper.jpeg"],
      link: "https://github.com/francescofusca/FlipperZeroPhone",
      comingSoon: false,
    },
    {
      id: 4,
      title: "PL Judge",
      description: "App mobile per Android e iOS dedicata al powerlifting.",
      tech: ["Kotlin"],
      images: ["/images/projects/pljudge.png"],
      link: null,
      comingSoon: true,
    },
  ],
};

const skills = [
  "TypeScript", "JavaScript", "React", "Node.js", "Python", "Swift",
  "Kotlin", "Java", "PostgreSQL", "Docker", "AWS", "Linux",
  "Android Studio", "Android SDK", "Prolog", "VHDL", "Cybersecurity"
];

const experiencesData = {
  en: [
    {
      title: "Founder",
      company: "RistoranteSmart",
      period: "2026 — Present",
      description: "Building web infrastructures with spatial optimization for restaurants."
    },
    {
      title: "Developer Intern",
      company: "Scintille s.r.l",
      period: "2023",
      description: "Developed e-commerce solutions and AI-powered advertising systems."
    }
  ],
  it: [
    {
      title: "Founder",
      company: "RistoranteSmart",
      period: "2026 — Presente",
      description: "Sviluppo infrastrutture web con ottimizzazione spaziale per ristoranti."
    },
    {
      title: "Developer Intern",
      company: "Scintille s.r.l",
      period: "2023",
      description: "Sviluppo soluzioni e-commerce e sistemi pubblicitari basati su AI."
    }
  ],
};

const socials = [
  { name: "GitHub", url: "https://github.com/francescofusca" },
  { name: "LinkedIn", url: "https://linkedin.com/in/ff9" },
];

// Typewriter component - cursor stops blinking when complete
function Typewriter({ text, delay = 100, startDelay = 0 }: { text: string; delay?: number; startDelay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);

  // Wait for startDelay before beginning to type
  useEffect(() => {
    if (startDelay > 0) {
      const timer = setTimeout(() => setHasStarted(true), startDelay);
      return () => clearTimeout(timer);
    }
  }, [startDelay]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && text.length > 0) {
      const timeout = setTimeout(() => setIsComplete(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay, hasStarted]);

  return (
    <span>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          style={{ marginLeft: '2px' }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

// Project card with image carousel
function ProjectCard({ project, comingSoonText }: { project: typeof projectsData.en[0]; comingSoonText: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = project.images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, project.images.length]);

  const isIconImage = project.images[0]?.includes('pljudge');

  const content = (
    <div className={`project-card ${isIconImage ? 'project-card-icon' : ''}`}>
      <div className="project-image">
        {project.images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={project.title}
            style={{
              position: idx === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              opacity: idx === currentImageIndex ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}
        {hasMultipleImages && (
          <div className="image-dots">
            {project.images.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
              />
            ))}
          </div>
        )}
        {project.comingSoon && (
          <div className="coming-soon-badge">{comingSoonText}</div>
        )}
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tech.map((t) => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );

  if (project.link && !project.comingSoon) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }
  return content;
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'en' | 'it'>('en');
  const [activeSection, setActiveSection] = useState('');

  const t = translations[lang];
  const projects = projectsData[lang];
  const experiences = experiencesData[lang];

  // Auto-dismiss intro after 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'projects', 'about', 'contact'];
      let found = false;

      // Check if at bottom of page (for contact)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            found = true;
            break;
          }
        }
      }

      // Default to home if at top
      if (!found && window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const copyEmail = () => {
    navigator.clipboard.writeText('francescofusca9@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: t.nav.home, href: '#home', id: 'home' },
    { label: t.nav.projects, href: '#projects', id: 'projects' },
    { label: t.nav.about, href: '#about', id: 'about' },
    { label: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Intro Screen */}
      <AnimatePresence>
        {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Header - visible immediately, hidden only by intro overlay */}
      <header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        style={{
          opacity: showIntro ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className="wrapper">
          <div className="header-inner">
            <a href="#" className="logo">ff9</a>

            <nav className="nav">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              ))}

              {/* Language switcher */}
              <button
                onClick={() => setLang(lang === 'en' ? 'it' : 'en')}
                className="lang-switch"
              >
                {lang === 'en' ? '🇮🇹 IT' : '🇬🇧 EN'}
              </button>
            </nav>

            <button
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="mobile-menu-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => { setLang(lang === 'en' ? 'it' : 'en'); setMobileMenuOpen(false); }}
          className="mobile-menu-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {lang === 'en' ? '🇮🇹 Italiano' : '🇬🇧 English'}
        </button>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="wrapper">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="hero-text"
            >
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                {t.hero.available}
              </div>

              <h1 className="hero-title">
                <Typewriter text={t.hero.greeting} delay={80} startDelay={2300} />
              </h1>

              <p className="hero-desc">{t.hero.description}</p>

              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">
                  {t.hero.viewProjects}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
                <a href="#contact" className="btn btn-outline">{t.hero.getInTouch}</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-image"
            >
              <div className="hero-image-wrapper">
                <img src="/images/projects/fotomia.JPG" alt="Francesco Fusca" />
              </div>
              <span className="hero-image-text">stay focused!</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <span className="section-label">{t.projects.label}</span>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-subtitle">{t.projects.subtitle}</p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectCard project={project} comingSoonText={t.projects.comingSoon} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <span className="section-label">{t.about.label}</span>
            <h2 className="section-title">{t.about.title}</h2>
          </motion.div>

          <div className="about-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="about-text">{t.about.text1}</p>
              <p className="about-text">{t.about.text2}</p>

              <h3 className="about-subtitle">{t.about.technologies}</h3>
              <div className="skills-grid">
                {skills.map((skill) => (
                  <span key={skill} className="skill-item">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="about-subtitle">{t.about.experience}</h3>
              <div className="experience-list">
                {experiences.map((exp) => (
                  <div key={exp.title + exp.company} className="experience-card">
                    <div className="experience-header">
                      <div>
                        <h4 className="experience-title">{exp.title}</h4>
                        <p className="experience-company">{exp.company}</p>
                      </div>
                      <span className="experience-period">{exp.period}</span>
                    </div>
                    <p className="experience-desc">{exp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-content"
          >
            <span className="section-label" style={{ justifyContent: 'center' }}>{t.contact.label}</span>
            <h2 className="contact-title">{t.contact.title}</h2>
            <p className="contact-desc">{t.contact.subtitle}</p>

            <button onClick={copyEmail} className="contact-email-btn">
              {copied ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                  {t.contact.copied}
                </>
              ) : (
                <>
                  francescofusca9@gmail.com
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                </>
              )}
            </button>

            <div className="contact-socials">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Globe Section */}
      <section className="globe-section">
        <div className="wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="globe-content"
          >
            <Globe3D size={320} loadingText={t.globe.loading} />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="globe-text"
            >
              <span className="globe-marker-dot blue"></span>
              <span className="globe-subtitle">{t.globe.text}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrapper">
          <div className="footer-inner">
            <span className="footer-logo">ff9</span>
            <span className="footer-text">© {new Date().getFullYear()} {t.footer.rights}</span>
          </div>
          <p className="footer-credits">{t.footer.inspired}</p>
        </div>
      </footer>
    </>
  );
}
