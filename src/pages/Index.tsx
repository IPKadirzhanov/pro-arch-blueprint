import heroVideo from '@/assets/hero-video.mp4';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, FileCheck, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LeadForm from '@/components/LeadForm';
import { ReactNode } from 'react';

/* ── animation wrapper ── */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── glass card style helper ── */
const glass = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.25))',
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 8px 32px rgba(15,23,42,0.08)',
  borderRadius: 16,
} as const;

const glassDark = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
  backdropFilter: 'blur(28px) saturate(160%)',
  WebkitBackdropFilter: 'blur(28px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.15)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
  borderRadius: 18,
} as const;

/* ── showcase projects ── */
const showcaseProjects = [
  {
    title: 'Жилой комплекс «Каспий Резиденс»',
    location: 'Астана, Казахстан',
    area: '48 000 м²',
    year: '2024',
    slug: 'kaspiy-residence',
  },
  {
    title: 'Бизнес-центр «Horizon Tower»',
    location: 'Алматы, Казахстан',
    area: '32 000 м²',
    year: '2023',
    slug: 'horizon-tower',
  },
  {
    title: 'Торговый комплекс «ArtMall»',
    location: 'Шымкент, Казахстан',
    area: '56 000 м²',
    year: '2023',
    slug: 'artmall',
  },
];

const services = [
  { icon: Building2, title: 'Архитектурное проектирование', desc: 'Полный цикл разработки архитектурных решений для жилых, коммерческих и промышленных объектов.' },
  { icon: FileCheck, title: 'Конструктивные решения', desc: 'Расчёт и проектирование конструкций с учётом сейсмики, нагрузок и современных стандартов.' },
  { icon: Shield, title: 'Проектирование зданий', desc: 'Комплексное проектирование зданий различного назначения с применением BIM-технологий.' },
  { icon: Clock, title: 'Авторский надзор', desc: 'Контроль соответствия строительства проектной документации на всех этапах реализации.' },
];

export default function Index() {
  return (
    <div className="bg-white">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={heroVideo} />
        <div className="absolute inset-0 bg-[#0a1224]/75" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight">
              ProHolding
            </h1>
            <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.3em] mt-4 mb-8">
              Architectural Project Organization
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              1500+ реализованных проектов. 12 лет на рынке архитектурного проектирования.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/brief"
                className="inline-flex items-center gap-2 h-13 px-8 text-sm font-medium text-white rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                style={glassDark}
              >
                Рассчитать проект <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 h-13 px-8 text-sm font-medium text-white/70 hover:text-white rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Посмотреть проекты
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <section className="py-[140px] sm:py-[180px]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Реализованные проекты</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-20 lg:mb-28">
              Архитектура,<br />которая вдохновляет
            </h2>
          </Reveal>

          <div className="flex flex-col gap-[120px] lg:gap-[160px]">
            {showcaseProjects.map((p, i) => (
              <Reveal key={p.slug} delay={0.1}>
                <Link to={`/projects/${p.slug}`} className="group block">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                    {/* Image placeholder — large architectural block */}
                    <div className="w-full lg:w-[68%] aspect-[16/10] rounded-2xl overflow-hidden bg-muted relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <Building2 className="w-20 h-20 text-primary/20" />
                      </div>
                      <div className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    </div>

                    {/* Info panel */}
                    <div
                      className="w-full lg:w-[32%] p-8 lg:p-10 transition-all duration-500 group-hover:translate-y-[-4px]"
                      style={glass}
                    >
                      <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-6">{p.title}</h3>
                      <div className="space-y-3 text-sm text-muted-foreground mb-8">
                        <div className="flex justify-between">
                          <span>Локация</span>
                          <span className="text-foreground font-medium">{p.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Площадь</span>
                          <span className="text-foreground font-medium">{p.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Год</span>
                          <span className="text-foreground font-medium">{p.year}</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        Смотреть проект <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-24 text-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 h-12 px-8 text-sm font-medium rounded-2xl transition-all duration-300 hover:scale-[1.03] text-foreground"
                style={glass}
              >
                Все проекты <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section className="py-[140px] sm:py-[180px] bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="p-10 sm:p-16" style={glass}>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">О компании</p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8 leading-snug">
                Архитектурная проектная организация с 12‑летним опытом
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                ProHolding — более 1500 реализованных проектов. Мы создаём архитектурные решения, которые сочетают эстетику, инженерную точность и функциональность.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300">
                Подробнее о нас <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-[140px] sm:py-[180px]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Направления</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-16 lg:mb-24">
              Архитектурные решения
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div
                  className="p-8 lg:p-10 transition-all duration-500 hover:translate-y-[-4px] cursor-pointer group"
                  style={glass}
                >
                  <s.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <Link to="/services" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300">
                Все услуги <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ COURSE — CASPIY PROJECT ═══════════ */}
      <section className="relative py-[140px] sm:py-[180px] overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1224]" />
        <div className="absolute inset-0 blueprint-grid-dark" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <div className="p-10 sm:p-16" style={glassDark}>
              <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-white/40 bg-white/10 px-4 py-1.5 rounded-full mb-6">
                Caspiy Project
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-snug">
                Авторский курс ГИП
              </h2>
              <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Системное обучение управлению архитектурными проектами. Для руководителей, ГИП и менеджеров проектного офиса.
              </p>
              <Link
                to="/course-gip"
                className="inline-flex items-center gap-2 h-12 px-8 text-sm font-medium text-white rounded-2xl transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                }}
              >
                Подробнее о курсе <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-[140px] sm:py-[180px] bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Начать проект</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-snug">
                Обсудить архитектурный проект
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Оставьте заявку и наш специалист свяжется с вами в течение часа. Работаем по договору, прозрачная смета, контроль качества на каждом этапе.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="p-8 lg:p-10" style={glass}>
                <LeadForm source="homepage" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
