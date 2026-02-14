import { Link } from 'react-router-dom';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowRight, Building2, FileCheck, Shield, Clock, Users, Award, PenTool, Eye, Ruler } from 'lucide-react';

const services = [
  { icon: Building2, slug: 'architecture', title: 'Архитектурное проектирование', desc: 'Полный цикл архитектурного проектирования: от концепции до рабочей документации. Жилые комплексы, коммерческие и промышленные объекты.', features: ['Эскизный проект', 'Стадия П', 'Рабочая документация', 'Визуализация'] },
  { icon: Ruler, slug: 'structural', title: 'Конструктивные решения', desc: 'Расчёт и проектирование несущих конструкций с учётом сейсмичности региона, нагрузок и требований безопасности.', features: ['Расчёт конструкций', 'Сейсмостойкость', 'Фундаменты', 'Металлоконструкции'] },
  { icon: PenTool, slug: 'engineering', title: 'Инженерные системы', desc: 'Проектирование инженерных сетей: отопление, вентиляция, водоснабжение, электроснабжение, слаботочные системы.', features: ['ОВиК', 'ВК', 'ЭО', 'Слаботочные'] },
  { icon: FileCheck, slug: 'expertise', title: 'Экспертиза проектов', desc: 'Комплексная экспертиза проектной документации на соответствие нормам и стандартам Республики Казахстан.', features: ['Нормоконтроль', 'Проверка расчётов', 'Заключение', 'Рекомендации'] },
  { icon: Eye, slug: 'supervision', title: 'Авторский надзор', desc: 'Контроль соответствия строительных работ проектной документации на всех этапах возведения объекта.', features: ['Выезды на объект', 'Проверка соответствия', 'Акты авторского надзора', 'Решение вопросов'] },
  { icon: Shield, slug: 'bim', title: 'BIM-проектирование', desc: 'Создание информационных моделей зданий для оптимизации проектирования, строительства и эксплуатации.', features: ['3D-модели', 'Коллизии', 'LOD 300-500', 'Координация'] },
  { icon: Users, slug: 'consulting', title: 'Консалтинг', desc: 'Консультации по вопросам проектирования, согласования и получения разрешительной документации.', features: ['Анализ', 'Рекомендации', 'Сопровождение', 'Согласование'] },
  { icon: Award, slug: 'certification', title: 'Согласование и сертификация', desc: 'Полный цикл согласования проектной документации в государственных органах и получение всех необходимых разрешений.', features: ['Госэкспертиза', 'Разрешения', 'ТУ', 'Сертификаты'] },
  { icon: Clock, slug: 'deadline', title: 'Срочное проектирование', desc: 'Ускоренное выполнение проектных работ с сохранением качества для проектов с жёсткими сроками.', features: ['Ускоренные сроки', 'Параллельная работа', 'Ежедневный контроль', 'Гарантия сроков'] },
];

export default function Services() {
  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Услуги</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Наши услуги</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Полный спектр услуг проектирования для объектов любой сложности.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main space-y-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.slug} delay={i * 0.05}>
              <div className="p-6 lg:p-8 rounded-xl border border-border bg-card hover-lift">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <s.icon className="w-10 h-10 text-primary shrink-0" />
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-semibold mb-2">{s.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.features.map(f => (
                        <span key={f} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">{f}</span>
                      ))}
                    </div>
                  </div>
                  <Link to="/brief" className="shrink-0 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
                    Заказать <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
