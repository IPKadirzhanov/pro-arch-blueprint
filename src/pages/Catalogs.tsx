import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AnimatedSection from '@/components/AnimatedSection';
import { Download, ArrowRight } from 'lucide-react';

type Catalog = { id: string; title: string; slug: string; description: string | null; category: string | null; cover_url: string | null; file_url: string | null };

const fallbackCatalogs: Catalog[] = [
  { id: '1', title: 'Альбом типовых планировок жилых домов', slug: 'tipovye-planirovki', description: 'Сборник типовых планировочных решений для жилых домов от 1 до 5 комнат.', category: 'Планировки', cover_url: null, file_url: null },
  { id: '2', title: 'Каталог фасадных решений', slug: 'fasadnye-resheniya', description: 'Современные фасадные системы и материалы для зданий различного назначения.', category: 'Фасады', cover_url: null, file_url: null },
  { id: '3', title: 'Гайд по BIM-проектированию', slug: 'bim-guide', description: 'Практическое руководство по внедрению BIM в проектную организацию.', category: 'BIM', cover_url: null, file_url: null },
  { id: '4', title: 'Нормы проектирования РК', slug: 'normy-rk', description: 'Сводный справочник действующих норм и стандартов проектирования.', category: 'Нормативы', cover_url: null, file_url: null },
];

const cats = ['Все', 'Планировки', 'Фасады', 'BIM', 'Нормативы'];

export default function Catalogs() {
  const [catalogs, setCatalogs] = useState<Catalog[]>(fallbackCatalogs);
  const [filter, setFilter] = useState('Все');

  useEffect(() => {
    supabase.from('catalogs').select('*').eq('published', true).then(({ data }) => {
      if (data && data.length > 0) setCatalogs(data);
    });
  }, []);

  const filtered = filter === 'Все' ? catalogs : catalogs.filter(c => c.category === filter);

  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Материалы</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Каталоги</h1>
            <p className="text-muted-foreground text-lg">Полезные материалы, типовые решения и справочники для проектирования.</p>
          </AnimatedSection>
          <div className="flex gap-2 mt-8 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <AnimatedSection key={c.id} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-card overflow-hidden hover-lift">
                <div className="aspect-[3/2] bg-muted blueprint-grid flex items-center justify-center">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="text-primary/20">
                    <rect x="10" y="5" width="40" height="50" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="18" y1="15" x2="42" y2="15" stroke="currentColor" strokeWidth="1" />
                    <line x1="18" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="1" />
                    <line x1="18" y1="29" x2="35" y2="29" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <div className="p-5">
                  {c.category && <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">{c.category}</span>}
                  <h3 className="font-display text-lg font-semibold mt-2 mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.description}</p>
                  <div className="flex gap-2">
                    <Link to={`/catalogs/${c.slug}`} className="flex-1 h-9 rounded-md border border-border text-sm font-medium flex items-center justify-center gap-1 hover:bg-muted transition-colors">
                      Открыть <ArrowRight className="w-3 h-3" />
                    </Link>
                    {c.file_url && (
                      <a href={c.file_url} download className="h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors">
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
