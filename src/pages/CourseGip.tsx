import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import LeadForm from '@/components/LeadForm';
import { Link } from 'react-router-dom';
import { Users, Target, BookOpen, Award, CheckCircle, ArrowRight, GraduationCap } from 'lucide-react';

const modules = [
  { n: 1, title: 'Роль ГИП в проектной организации', desc: 'Функции, ответственность, правовые аспекты. Место ГИП в структуре компании.' },
  { n: 2, title: 'Управление проектом', desc: 'Планирование, ресурсы, сроки, бюджет. Инструменты управления проектами.' },
  { n: 3, title: 'Техническое задание и исходные данные', desc: 'Формирование ТЗ, сбор и анализ исходных данных, работа с заказчиком.' },
  { n: 4, title: 'Координация разделов проекта', desc: 'Взаимодействие между специалистами, контроль смежных разделов, коллизии.' },
  { n: 5, title: 'Нормативная база', desc: 'Актуальные нормы РК и СНГ, изменения, порядок применения.' },
  { n: 6, title: 'Контроль качества документации', desc: 'Нормоконтроль, чек-листы, типичные ошибки, предотвращение замечаний.' },
  { n: 7, title: 'Экспертиза и согласование', desc: 'Подготовка к экспертизе, работа с замечаниями, стратегия согласования.' },
  { n: 8, title: 'Авторский надзор', desc: 'Организация авторского надзора, документирование, решение вопросов на площадке.' },
  { n: 9, title: 'Управление командой', desc: 'Мотивация, делегирование, обратная связь, развитие специалистов.' },
  { n: 10, title: 'Цифровые инструменты ГИП', desc: 'BIM-координация, автоматизация, облачные решения, отчётность.' },
];

const results = [
  'Системно управлять проектами от старта до сдачи',
  'Формировать ТЗ и контролировать исходные данные',
  'Координировать работу специалистов всех разделов',
  'Обеспечивать качество проектной документации',
  'Успешно проходить экспертизу с первого раза',
  'Применять BIM-технологии в управлении проектом',
];

export default function CourseGip() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-20">
      <section className="section-padding bg-blueprint-bg blueprint-grid-dark">
        <div className="container-main">
          <AnimatedSection>
            <span className="text-xs uppercase tracking-[0.2em] text-blueprint font-medium bg-blueprint/10 px-3 py-1 rounded-full">Caspiy Project</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mt-4 mb-4">
              Авторский курс ГИП<br />для проектной организации
            </h1>
            <p className="text-blueprint-light/70 text-lg max-w-2xl mb-8">
              Системное управление проектированием: от формирования ТЗ до успешной сдачи проекта. Курс разработан экспертами ProHolding с опытом 12 лет и 1500+ проектов.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#signup" className="h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                Записаться на курс <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Для кого */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold mb-8">Для кого этот курс</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Главные инженеры проектов', desc: 'Действующие ГИП, желающие систематизировать опыт.' },
              { icon: Target, title: 'Руководители проектных отделов', desc: 'Менеджеры, управляющие проектными командами.' },
              { icon: BookOpen, title: 'Проектировщики', desc: 'Специалисты, планирующие карьерный рост до ГИП.' },
              { icon: GraduationCap, title: 'Менеджеры проектного офиса', desc: 'Координаторы проектов и PMO-специалисты.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-border bg-card hover-lift">
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Программа */}
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold mb-8">Программа курса</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((m, i) => (
              <AnimatedSection key={m.n} delay={i * 0.05}>
                <div className="p-5 rounded-lg border border-border bg-card hover-lift">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-display font-bold text-primary/30">{String(m.n).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-semibold mb-1">{m.title}</h3>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Результаты */}
      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold mb-8">Что вы будете уметь</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {results.map((r, i) => (
              <AnimatedSection key={r} delay={i * 0.05}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{r}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Доверие */}
      <section className="section-padding bg-blueprint-bg">
        <div className="container-main grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: '12+', l: 'лет на рынке' },
            { n: '1500+', l: 'реализованных проектов' },
            { n: '50+', l: 'экспертов в команде' },
          ].map((s, i) => (
            <AnimatedSection key={s.l} delay={i * 0.1}>
              <div className="text-center p-8 rounded-xl glass-panel-dark">
                <div className="text-4xl font-display font-bold text-blueprint">{s.n}</div>
                <div className="text-sm text-blueprint-light/60 mt-1">{s.l}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Запись */}
      <section id="signup" className="section-padding">
        <div className="container-main max-w-lg">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold mb-2 text-center">Записаться на курс</h2>
            <p className="text-muted-foreground text-center mb-8">Оставьте заявку и мы свяжемся с вами для обсуждения деталей.</p>
            {submitted ? (
              <div className="text-center p-8 rounded-xl border border-border bg-card">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">Заявка отправлена!</h3>
                <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-border bg-card">
                <LeadForm source="course-gip" onSuccess={() => setSubmitted(true)} />
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
