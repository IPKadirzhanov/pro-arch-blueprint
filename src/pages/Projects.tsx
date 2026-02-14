import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowRight, MapPin } from 'lucide-react';

type Project = { id: string; title: string; slug: string; description: string | null; category: string | null; location: string | null; year: string | null; cover_url: string | null };

const categories = ['Все', 'Жилые', 'Коммерческие', 'Промышленные', 'Общественные'];

// Fallback projects for when DB is empty
const fallbackProjects: Project[] = [
  { id: '1', title: 'ЖК "Арман"', slug: 'zhk-arman', description: 'Жилой комплекс бизнес-класса на 240 квартир с подземным паркингом и благоустроенной территорией.', category: 'Жилые', location: 'Алматы', year: '2023', cover_url: null },
  { id: '2', title: 'БЦ "Достык Плаза"', slug: 'bc-dostyk', description: 'Бизнес-центр класса А площадью 15 000 м² с современными инженерными системами.', category: 'Коммерческие', location: 'Астана', year: '2023', cover_url: null },
  { id: '3', title: 'Завод "КазМет"', slug: 'zavod-kazmet', description: 'Проектирование производственного комплекса металлоконструкций площадью 8 000 м².', category: 'Промышленные', location: 'Караганда', year: '2022', cover_url: null },
  { id: '4', title: 'Школа №45', slug: 'school-45', description: 'Общеобразовательная школа на 1200 мест с бассейном и спортивным комплексом.', category: 'Общественные', location: 'Шымкент', year: '2024', cover_url: null },
  { id: '5', title: 'ЖК "Нурсат"', slug: 'zhk-nursat', description: 'Комплекс из 3 жилых башен с коммерческими помещениями на первых этажах.', category: 'Жилые', location: 'Алматы', year: '2024', cover_url: null },
  { id: '6', title: 'ТРЦ "Grand Mall"', slug: 'trc-grand', description: 'Торгово-развлекательный центр площадью 45 000 м² с кинотеатром и фудкортом.', category: 'Коммерческие', location: 'Актау', year: '2022', cover_url: null },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [filter, setFilter] = useState('Все');

  useEffect(() => {
    supabase.from('projects').select('*').eq('published', true).then(({ data }) => {
      if (data && data.length > 0) setProjects(data);
    });
  }, []);

  const filtered = filter === 'Все' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Портфолио</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Наши проекты</h1>
            <p className="text-muted-foreground text-lg">1500+ реализованных проектов по всему Казахстану.</p>
          </AnimatedSection>

          <div className="flex gap-2 mt-8 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 0.05}>
              <Link to={`/projects/${p.slug}`} className="group block rounded-xl border border-border bg-card overflow-hidden hover-lift">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {p.cover_url ? (
                    <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full blueprint-grid flex items-center justify-center">
                      <svg width="80" height="80" viewBox="0 0 80 80" className="text-primary/20">
                        <rect x="10" y="20" width="60" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="20" y="35" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1" />
                        <rect x="45" y="35" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1" />
                        <rect x="32" y="50" width="16" height="20" fill="none" stroke="currentColor" strokeWidth="1" />
                        <line x1="10" y1="20" x2="40" y2="5" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="70" y1="20" x2="40" y2="5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    {p.category && <span className="px-2 py-0.5 rounded-full border border-border">{p.category}</span>}
                    {p.year && <span>{p.year}</span>}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                  {p.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" /> {p.location}
                    </div>
                  )}
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
