import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AnimatedSection from '@/components/AnimatedSection';
import { Calendar, ArrowRight } from 'lucide-react';

type NewsItem = { id: string; title: string; slug: string; excerpt: string | null; tags: string[] | null; cover_url: string | null; created_at: string; author: string | null };

const fallbackNews: NewsItem[] = [
  { id: '1', title: 'ProHolding внедряет BIM-технологии нового поколения', slug: 'bim-technologies', excerpt: 'Компания ProHolding завершила переход на BIM-проектирование уровня LOD 400 для всех новых проектов.', tags: ['BIM', 'Технологии'], cover_url: null, created_at: '2024-12-15', author: 'ProHolding' },
  { id: '2', title: 'Завершён проект жилого комплекса в Астане', slug: 'zhk-astana-complete', excerpt: 'Успешно завершено проектирование и согласование жилого комплекса на 500 квартир в столице.', tags: ['Проекты', 'Жилые'], cover_url: null, created_at: '2024-11-20', author: 'ProHolding' },
  { id: '3', title: 'Обновлены нормы сейсмического проектирования', slug: 'seismic-norms-update', excerpt: 'Обзор ключевых изменений в нормах сейсмического проектирования Республики Казахстан на 2025 год.', tags: ['Нормативы'], cover_url: null, created_at: '2024-10-05', author: 'ProHolding' },
  { id: '4', title: 'Запуск авторского курса ГИП', slug: 'course-gip-launch', excerpt: 'ProHolding совместно с Caspiy Project запускает авторский курс для главных инженеров проектов.', tags: ['Обучение', 'ГИП'], cover_url: null, created_at: '2024-09-10', author: 'ProHolding' },
];

export default function News() {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase.from('news').select('*').eq('published', true).order('created_at', { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setNews(data as any);
    });
  }, []);

  const filtered = search ? news.filter(n => n.title.toLowerCase().includes(search.toLowerCase())) : news;

  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Новости</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Новости компании</h1>
          </AnimatedSection>
          <input
            type="text" placeholder="Поиск по новостям..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="mt-6 h-11 w-full max-w-md px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((n, i) => (
            <AnimatedSection key={n.id} delay={i * 0.05}>
              <Link to={`/news/${n.slug}`} className="group block rounded-xl border border-border bg-card overflow-hidden hover-lift">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(n.created_at).toLocaleDateString('ru-RU')}
                    {n.tags?.map(t => <span key={t} className="px-2 py-0.5 rounded-full border border-border">{t}</span>)}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{n.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Читать <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
