import heroVideo from '@/assets/hero-video.mp4';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, Clock, FileCheck, Shield, Users } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import LeadForm from '@/components/LeadForm';

const stats = [
  { value: '12+', label: 'лет на рынке' },
  { value: '1500+', label: 'успешных проектов' },
  { value: '100%', label: 'по договору' },
  { value: '50+', label: 'специалистов' },
];

const services = [
  { icon: Building2, title: 'Архитектурное проектирование', desc: 'Разработка архитектурных решений жилых, коммерческих и промышленных объектов.' },
  { icon: FileCheck, title: 'Конструктивные решения', desc: 'Расчёт и проектирование конструкций с учётом сейсмики и нагрузок.' },
  { icon: Shield, title: 'Экспертиза проектов', desc: 'Комплексная экспертиза проектной документации.' },
  { icon: Clock, title: 'Авторский надзор', desc: 'Контроль соответствия строительства проектной документации.' },
  { icon: Users, title: 'BIM-проектирование', desc: 'Создание информационных моделей зданий для оптимизации процессов.' },
  { icon: Award, title: 'Согласование', desc: 'Полное сопровождение согласования в государственных органах.' },
];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
        />
        <div className="absolute inset-0 bg-blueprint-bg/80" />
        <div className="absolute inset-0 blueprint-grid-dark" />

        <div className="relative z-10 container-main text-center">
          <AnimatedSection>
            <p className="text-blueprint-light text-sm uppercase tracking-[0.3em] mb-4">Архитектурное проектирование</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Проектируем<br />
              <span className="text-blueprint">будущее</span>
            </h1>
            <p className="text-blueprint-light/70 text-lg max-w-xl mx-auto mb-8">
              12 лет опыта и 1500+ реализованных проектов. Полный цикл проектирования от концепции до авторского надзора.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/brief" className="h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                Начать проект <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+77715668737" className="h-12 px-8 rounded-md border border-blueprint-light/30 text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary-foreground/10 transition-colors">
                +7 771 566 87 37
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container-main grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-3xl lg:text-4xl font-display font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Наши услуги</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-12">Полный цикл проектирования</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="p-6 rounded-lg border border-border bg-card hover-lift cursor-pointer group">
                  <s.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Все услуги <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-blueprint-bg">
        <div className="container-main grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <p className="text-blueprint-light text-sm uppercase tracking-[0.2em] mb-2">Начните проект</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">Получите бесплатную консультацию</h2>
            <p className="text-blueprint-light/60 leading-relaxed mb-6">
              Оставьте заявку и наш специалист свяжется с вами в течение часа. Работаем по договору, прозрачная смета, контроль качества на каждом этапе.
            </p>
            <div className="flex gap-4 text-sm text-blueprint-light/50">
              <span>✓ Бесплатная консультация</span>
              <span>✓ Расчёт за 24 часа</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="p-6 rounded-xl glass-panel-dark">
              <LeadForm source="homepage" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Course promo */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <div className="p-8 lg:p-12 rounded-xl border border-border bg-card">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">Caspiy Project</span>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold mt-4 mb-4">Авторский курс ГИП для проектной организации</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Системное управление проектированием: качество документации, соблюдение сроков, эффективное взаимодействие в команде.
                  </p>
                  <Link to="/course-gip" className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                    Подробнее о курсе <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Управление проектами', 'Контроль качества', 'Документация', 'Стандарты'].map(t => (
                    <div key={t} className="p-4 rounded-lg border border-border bg-muted/50 text-center">
                      <span className="text-sm font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
