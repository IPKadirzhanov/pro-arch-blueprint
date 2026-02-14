import AnimatedSection from '@/components/AnimatedSection';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Эскизный проект',
    price: 'от 500 000 ₸',
    desc: 'Концепция и визуализация вашего объекта.',
    features: ['Объёмно-планировочные решения', 'Фасадные решения', '3D-визуализация', 'Генплан', 'Согласование с заказчиком'],
  },
  {
    name: 'Стадия "Проект"',
    price: 'от 1 500 000 ₸',
    desc: 'Полная проектная документация для экспертизы.',
    features: ['Архитектурные решения', 'Конструктивные решения', 'Инженерные системы', 'Пожарная безопасность', 'Сметная документация', 'Сопровождение экспертизы'],
    popular: true,
  },
  {
    name: 'Полный цикл',
    price: 'от 3 000 000 ₸',
    desc: 'От эскиза до авторского надзора.',
    features: ['Всё из стадии "Проект"', 'Рабочая документация', 'BIM-модель', 'Авторский надзор', 'Согласование во всех инстанциях', 'Выделенный менеджер'],
  },
];

export default function Pricing() {
  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Стоимость</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Цены на проектирование</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Прозрачное ценообразование. Точный расчёт после изучения технического задания.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 0.1}>
              <div className={`p-6 rounded-xl border bg-card flex flex-col h-full ${p.popular ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                {p.popular && <span className="text-xs uppercase tracking-wider text-primary font-medium mb-3">Популярный</span>}
                <h3 className="font-display text-xl font-semibold mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <div className="text-2xl font-display font-bold text-primary mb-6">{p.price}</div>
                <ul className="space-y-2 mb-8 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/brief" className={`h-11 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-colors ${p.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-border hover:bg-muted'}`}>
                  Рассчитать стоимость <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
