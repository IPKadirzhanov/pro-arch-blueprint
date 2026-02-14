import AnimatedSection from '@/components/AnimatedSection';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqItems = [
  { q: 'Какие виды объектов вы проектируете?', a: 'Мы проектируем жилые комплексы, коммерческие здания, промышленные объекты, общественные здания, школы, больницы, ТРЦ и другие объекты любой сложности.' },
  { q: 'Сколько стоит проектирование?', a: 'Стоимость зависит от типа объекта, площади, этажности и состава разделов. Эскизный проект — от 500 000 ₸, стадия «Проект» — от 1 500 000 ₸, полный цикл — от 3 000 000 ₸. Точный расчёт после изучения ТЗ.' },
  { q: 'Каковы сроки проектирования?', a: 'Эскизный проект: 2-4 недели. Стадия «Проект»: 2-4 месяца. Рабочая документация: 1-3 месяца. Сроки зависят от сложности объекта.' },
  { q: 'Работаете ли вы по договору?', a: 'Да, мы работаем только по договору с прозрачной сметой, фиксированными сроками и поэтапной оплатой.' },
  { q: 'Помогаете ли вы с прохождением экспертизы?', a: 'Да, мы полностью сопровождаем прохождение государственной экспертизы: подготовка документов, подача, работа с замечаниями, получение положительного заключения.' },
  { q: 'Используете ли вы BIM-технологии?', a: 'Да, мы полностью перешли на BIM-проектирование уровня LOD 300-400. Это позволяет выявлять коллизии на этапе проектирования и сокращать сроки строительства.' },
  { q: 'Что такое курс ГИП Caspiy Project?', a: 'Это авторский курс для главных инженеров проектов, разработанный экспертами ProHolding. 10 модулей практического обучения по системному управлению проектированием.' },
  { q: 'Какие гарантии вы предоставляете?', a: '12 лет на рынке, 1500+ успешных проектов, работа по договору, гарантия прохождения экспертизы. Предоставляем гарантийные обязательства по проектной документации.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors">
        <span className="font-medium text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}

export default function Faq() {
  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">FAQ</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Частые вопросы</h1>
          </AnimatedSection>
        </div>
      </section>
      <section className="section-padding pt-8">
        <div className="container-main max-w-3xl space-y-3">
          {faqItems.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <FaqItem {...f} />
            </AnimatedSection>
          ))}
        </div>
        <div className="container-main max-w-3xl mt-12 text-center">
          <p className="text-muted-foreground mb-4">Не нашли ответ на свой вопрос?</p>
          <Link to="/contacts" className="inline-flex h-10 px-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Задать вопрос
          </Link>
        </div>
      </section>
    </div>
  );
}
