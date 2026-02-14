import AnimatedSection from '@/components/AnimatedSection';
import { Award, Target, Users, Clock, Shield, CheckCircle } from 'lucide-react';

const values = [
  { icon: Target, title: 'Точность', desc: 'Каждый проект выполняется с инженерной точностью и вниманием к деталям.' },
  { icon: Users, title: 'Команда', desc: '50+ квалифицированных специалистов с опытом работы от 5 лет.' },
  { icon: Shield, title: 'Надёжность', desc: 'Работаем по договору с прозрачной сметой и гарантией результата.' },
  { icon: Clock, title: 'Сроки', desc: 'Чёткое соблюдение дедлайнов на каждом этапе проектирования.' },
  { icon: Award, title: 'Качество', desc: 'Многоуровневый контроль качества проектной документации.' },
  { icon: CheckCircle, title: 'Согласование', desc: 'Полное сопровождение согласования во всех инстанциях.' },
];

export default function About() {
  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">О компании</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6">ProHolding</h1>
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              ProHolding — ведущая проектная организация Казахстана с 12-летним опытом работы. За годы деятельности мы реализовали более 1500 проектов различной сложности: от частных жилых домов до крупных промышленных объектов.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold mb-8">Наши ценности</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="p-6 rounded-lg border border-border bg-card hover-lift">
                  <v.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display text-lg font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-blueprint-bg">
        <div className="container-main grid lg:grid-cols-3 gap-8">
          {[
            { n: '12+', l: 'Лет опыта', d: 'На рынке проектирования с 2012 года.' },
            { n: '1500+', l: 'Проектов', d: 'Успешно реализованных проектов по всему Казахстану.' },
            { n: '50+', l: 'Специалистов', d: 'Архитекторы, конструкторы, инженеры.' },
          ].map((s, i) => (
            <AnimatedSection key={s.l} delay={i * 0.15}>
              <div className="text-center p-8 rounded-xl glass-panel-dark">
                <div className="text-4xl font-display font-bold text-blueprint mb-2">{s.n}</div>
                <div className="text-primary-foreground font-medium mb-2">{s.l}</div>
                <p className="text-sm text-blueprint-light/60">{s.d}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
