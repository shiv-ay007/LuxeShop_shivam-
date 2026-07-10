import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const team = [
  { name: 'Sophia Laurent', role: 'Founder & CEO', bio: 'Luxury retail veteran with 15 years of experience curating premium products.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', bg: 'from-pink-400 to-primary-500' },
  { name: 'Marcus Chen', role: 'Head of Product', bio: 'Former lead buyer at Saks Fifth Avenue. Passionate about quality and design.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', bg: 'from-blue-400 to-cyan-500' },
  { name: 'Aisha Patel', role: 'Creative Director', bio: 'Award-winning art director bringing visual brilliance to every touchpoint.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80', bg: 'from-amber-400 to-orange-500' },
  { name: 'James Rivera', role: 'Head of Technology', bio: 'Full-stack engineer obsessed with building seamless shopping experiences.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', bg: 'from-green-400 to-teal-500' },
];

const values = [
  { icon: '💎', title: 'Premium Quality', desc: 'Every product is hand-selected by our expert buyers to meet the highest standards.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We partner with brands committed to ethical sourcing and eco-friendly practices.' },
  { icon: '🤝', title: 'Customer First', desc: 'Your satisfaction is our obsession. We go above and beyond for every order.' },
  { icon: '🔒', title: 'Trust & Security', desc: 'Bank-grade encryption and complete privacy protection on every transaction.' },
];

const milestones = [
  { year: '2018', title: 'LuxeShop Founded', desc: 'Started in a small New York studio with a vision to democratize luxury.' },
  { year: '2020', title: '100K Customers', desc: 'Crossed 100,000 happy customers milestone during challenging times.' },
  { year: '2022', title: 'Global Expansion', desc: 'Expanded to 50+ countries with same-day delivery in major cities.' },
  { year: '2024', title: '#1 Luxury Platform', desc: 'Recognized as the world\'s most trusted luxury e-commerce platform.' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const About = () => (
  <div className="min-h-screen pt-24">
    {/* Hero */}
    <section className="relative py-24 bg-gradient-to-br from-gray-950 via-primary-950 to-gray-950 overflow-hidden">
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="container-custom max-w-4xl text-center relative z-10">
        <motion.p {...fadeUp()} className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-4">Our Story</motion.p>
        <motion.h1 {...fadeUp(0.1)} className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
          Redefining the Premium<br />
          <span className="gradient-text">Shopping Experience</span>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-gray-400 text-xl leading-relaxed">
          LuxeShop was born from a belief that everyone deserves access to the finest products — beautifully curated, carefully crafted, and delivered with care.
        </motion.p>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="container-custom max-w-6xl py-20">
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { title: 'Our Mission', icon: '🎯', text: 'To make premium, responsibly sourced products accessible to everyone, while delivering an unmatched shopping experience that feels personal, seamless, and joyful.' },
          { title: 'Our Vision', icon: '🌟', text: 'To become the world\'s most trusted luxury marketplace — where quality, sustainability, and innovation converge to set a new standard for modern commerce.' },
        ].map((item, i) => (
          <motion.div key={item.title} {...fadeUp(i * 0.15)} className="card p-8">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Stats */}
    <section className="bg-gradient-to-r from-primary-600 to-accent-500 py-16">
      <div className="container-custom max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[['10K+', 'Happy Customers'], ['500+', 'Premium Products'], ['50+', 'Countries Served'], ['99%', 'Satisfaction Rate']].map(([n, l]) => (
            <motion.div key={l} {...fadeUp()}>
              <p className="font-display text-4xl font-bold">{n}</p>
              <p className="text-primary-100 mt-1">{l}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="container-custom max-w-6xl py-20">
      <motion.div {...fadeUp()} className="text-center mb-12">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2">What Drives Us</p>
        <h2 className="section-heading">Our Core Values</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div key={v.title} {...fadeUp(i * 0.1)} className="card card-hover p-6 text-center">
            <div className="text-4xl mb-4">{v.icon}</div>
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="bg-gray-50 dark:bg-dark-900 py-20">
      <div className="container-custom max-w-4xl">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2">Our Journey</p>
          <h2 className="section-heading">Milestones</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div key={m.year} {...fadeUp(i * 0.1)}
                className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="card p-5 inline-block max-w-sm">
                    <p className="font-display text-2xl font-bold gradient-text">{m.year}</p>
                    <p className="font-bold text-gray-900 dark:text-white mt-1">{m.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{m.desc}</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30 shrink-0 hidden md:block" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="container-custom max-w-6xl py-20">
      <motion.div {...fadeUp()} className="text-center mb-12">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2">The People</p>
        <h2 className="section-heading">Meet Our Team</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <motion.div key={member.name} {...fadeUp(i * 0.1)} className="card card-hover overflow-hidden group">
            <div className={`relative h-48 bg-gradient-to-br ${member.bg} overflow-hidden`}>
              <img src={member.avatar} alt={member.name}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-primary-500 text-sm font-medium mb-2">{member.role}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-gradient-to-br from-primary-950 to-gray-950 py-20">
      <div className="container-custom max-w-2xl text-center">
        <motion.div {...fadeUp()}>
          <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to Experience LuxeShop?</h2>
          <p className="text-gray-400 mb-8">Join over 10,000 satisfied customers worldwide.</p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            Start Shopping <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  </div>
);

export default About;
