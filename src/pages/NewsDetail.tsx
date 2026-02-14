import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, Calendar, Share2, User } from 'lucide-react';
import { toast } from 'sonner';

const fallback: Record<string, any> = {
  'bim-technologies': { title: 'ProHolding внедряет BIM-технологии нового поколения', content: 'Компания ProHolding завершила масштабный переход на BIM-проектирование уровня LOD 400 для всех новых проектов.\n\nЭто позволяет:\n• Сократить сроки проектирования на 20-30%\n• Минимизировать коллизии на этапе строительства\n• Повысить точность сметных расчётов\n• Обеспечить эффективное взаимодействие между разделами\n\nПереход потребовал обучения всех 50+ специалистов компании и модернизации IT-инфраструктуры. Инвестиции в BIM окупились уже в первый год за счёт снижения ошибок и ускорения процессов.\n\nProHolding продолжает инвестировать в технологии, чтобы обеспечивать клиентам высочайшее качество проектной документации.', created_at: '2024-12-15', author: 'ProHolding', tags: ['BIM', 'Технологии'] },
  'zhk-astana-complete': { title: 'Завершён проект жилого комплекса в Астане', content: 'Успешно завершено проектирование и согласование жилого комплекса на 500 квартир в столице.\n\nХарактеристики проекта:\n• Площадь: 65 000 м²\n• 3 жилые секции по 25 этажей\n• Подземный паркинг на 400 мест\n• Коммерческие помещения на 1 этаже\n\nПроект прошёл государственную экспертизу с первого раза. Строительство планируется завершить в 2026 году.', created_at: '2024-11-20', author: 'ProHolding', tags: ['Проекты'] },
  'seismic-norms-update': { title: 'Обновлены нормы сейсмического проектирования', content: 'Обзор изменений в нормах сейсмического проектирования РК на 2025 год.\n\nКлючевые изменения:\n• Уточнены карты сейсмического микрорайонирования\n• Изменены коэффициенты для расчёта сейсмических нагрузок\n• Добавлены требования к демпфирующим системам\n• Обновлены требования к конструктивным решениям\n\nProHolding уже обновил стандарты проектирования в соответствии с новыми нормами.', created_at: '2024-10-05', author: 'ProHolding', tags: ['Нормативы'] },
  'course-gip-launch': { title: 'Запуск авторского курса ГИП', content: 'ProHolding совместно с Caspiy Project запускает авторский курс для главных инженеров проектов.\n\nКурс разработан на основе 12-летнего опыта управления проектными организациями и включает:\n• 10 модулей практического обучения\n• Разбор реальных кейсов из 1500+ проектов\n• Шаблоны документов и чек-листы\n• Персональные консультации экспертов\n\nПодробности на странице курса.', created_at: '2024-09-10', author: 'ProHolding', tags: ['Обучение', 'ГИП'] },
};

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(slug ? fallback[slug] || null : null);

  useEffect(() => {
    if (!slug) return;
    supabase.from('news').select('*').eq('slug', slug).eq('published', true).maybeSingle().then(({ data }) => {
      if (data) setArticle(data);
    });
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Ссылка скопирована');
    }
  };

  if (!article) return (
    <div className="pt-20 section-padding container-main text-center">
      <h1 className="font-display text-3xl font-bold mb-4">Статья не найдена</h1>
      <Link to="/news" className="text-primary hover:underline">← К новостям</Link>
    </div>
  );

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <Link to="/news" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Все новости
          </Link>
          <AnimatedSection>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.created_at).toLocaleDateString('ru-RU')}</span>
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
              <button onClick={handleShare} className="flex items-center gap-1 hover:text-primary transition-colors">
                <Share2 className="w-3 h-3" /> Поделиться
              </button>
            </div>
            {article.tags?.length > 0 && (
              <div className="flex gap-2 mb-4">
                {article.tags.map((t: string) => <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">{t}</span>)}
              </div>
            )}
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-8">{article.title}</h1>
            <div className="space-y-4">
              {article.content?.split('\n').map((p: string, i: number) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-12 p-6 rounded-xl border border-border bg-card text-center">
            <h3 className="font-display text-xl font-semibold mb-2">Хотите обсудить проект?</h3>
            <p className="text-sm text-muted-foreground mb-4">Свяжитесь с нами для бесплатной консультации</p>
            <Link to="/brief" className="inline-flex h-10 px-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Обсудить проект
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
