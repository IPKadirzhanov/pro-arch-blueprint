import AnimatedSection from '@/components/AnimatedSection';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { n: '01', title: 'Консультация', desc: 'Обсуждаем задачу, анализируем исходные данные, определяем объём работ и сроки.' },
  { n: '02', title: 'Договор и ТЗ', desc: 'Заключаем договор, формируем техническое задание с чётким описанием требований.' },
  { n: '03', title: 'Эскизное проектирование', desc: 'Разрабатываем концепцию, объёмно-планировочные решения, согласуем с заказчиком.' },
  { n: '04', title: 'Стадия "Проект"', desc: 'Полный комплект проектной документации для прохождения экспертизы.' },
  { n: '05', title: 'Рабочая документация', desc: 'Детальная документация для строительства: чертежи, спецификации, ведомости.' },
  { n: '06', title: 'Согласование и экспертиза', desc: 'Сопровождаем прохождение государственной экспертизы и получение разрешений.' },
  { n: '07', title: 'Авторский надзор', desc: 'Контроль соответствия строительства проектным решениям на объекте.' },
];

export default function Process() {
  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Как мы работаем</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Процесс работы</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Прозрачный и структурированный процесс на каждом этапе.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-3xl">
          {steps.map((s, i) => (
            <AnimatedSection key={s.n} delay={i * 0.1}>
              <div className="flex gap-6 mb-8 last:mb-0">
                <div className="shrink-0 w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary font-display font-bold text-sm">
                  {s.n}
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && <div className="ml-6 w-px h-8 bg-border" />}
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="section-padding bg-blueprint-bg text-center">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Готовы начать?</h2>
            <p className="text-blueprint-light/60 mb-6">Заполните бриф и получите предварительный расчёт в течение 24 часов.</p>
            <Link to="/brief" className="inline-flex items-center gap-2 h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Заполнить бриф <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
