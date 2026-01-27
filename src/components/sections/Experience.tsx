import { motion } from 'framer-motion';
import { experiences, skills, education } from '../../constants/data';

/**
 * Experience Section
 * - Work experience timeline
 * - Skills tags
 * - Education
 */

export function Experience() {
  return (
    <section id="about" className="section bg-white/[0.01]">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-label">Background</span>
          <h2 className="section-title">
            Experience & <span>Skills</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Experience Column */}
          <div>
            <h3 className="text-sm font-medium text-white/35 uppercase tracking-widest mb-10">
              Work Experience
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="experience-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl font-display font-semibold">{exp.title}</h4>
                      <p className="text-white/50">{exp.company}</p>
                    </div>
                    <span className="text-sm text-white/30 font-mono shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills & Education Column */}
          <div className="space-y-16">
            {/* Skills */}
            <div>
              <h3 className="text-sm font-medium text-white/35 uppercase tracking-widest mb-10">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-sm font-medium text-white/35 uppercase tracking-widest mb-10">
                Education
              </h3>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="experience-card flex items-center gap-5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-medium">{edu.title}</h4>
                      <p className="text-sm text-white/40">
                        {edu.institution} — {edu.period}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
