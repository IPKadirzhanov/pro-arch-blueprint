import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AnimatedSection from '@/components/AnimatedSection';
import LeadForm from '@/components/LeadForm';
import { ArrowLeft, MapPin, Calendar, Ruler } from 'lucide-react';

const fallback: Record<string, any> = {
  'zhk-arman': { title: 'ЖК "Арман"', category: 'Жилые', location: 'Алматы', year: '2023', area: '32 000 м²', description: 'Жилой комплекс бизнес-класса на 240 квартир с подземным паркингом, детской площадкой и благоустроенной территорией. Проект выполнен с учётом сейсмической зоны 9 баллов. Применены современные конструктивные решения с монолитным каркасом.\n\nОсобенности проекта:\n• Подземный паркинг на 180 машиномест\n• Энергоэффективные инженерные системы\n• Панорамное остекление\n• Благоустройство по концепции «двор без машин»' },
  'bc-dostyk': { title: 'БЦ "Достык Плаза"', category: 'Коммерческие', location: 'Астана', year: '2023', area: '15 000 м²', description: 'Бизнес-центр класса А с современными инженерными системами, энергоэффективными решениями и высокой степенью автоматизации.\n\nОсобенности:\n• BIM-проектирование LOD 400\n• Вентилируемый фасад\n• Система «умное здание»\n• LEED-сертификация' },
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any>(slug ? fallback[slug] || null : null);

  useEffect(() => {
    if (!slug) return;
    supabase.from('projects').select('*').eq('slug', slug).eq('published', true).maybeSingle().then(({ data }) => {
      if (data) setProject(data);
    });
  }, [slug]);

  if (!project) return (
    <div className="pt-20 section-padding container-main text-center">
      <h1 className="font-display text-3xl font-bold mb-4">Проект не найден</h1>
      <Link to="/projects" className="text-primary hover:underline">← Вернуться к проектам</Link>
    </div>
  );

  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Все проекты
          </Link>
          <AnimatedSection>
            <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {project.category && <span className="px-3 py-1 rounded-full border border-border">{project.category}</span>}
              {project.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</span>}
              {project.year && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.year}</span>}
              {project.area && <span className="flex items-center gap-1"><Ruler className="w-3 h-3" />{project.area}</span>}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-main grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="prose prose-sm max-w-none text-foreground">
                {project.description?.split('\n').map((p: string, i: number) => <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>)}
              </div>
            </AnimatedSection>
          </div>
          <div>
            <AnimatedSection delay={0.2}>
              <div className="p-6 rounded-xl border border-border bg-card sticky top-24">
                <h3 className="font-display text-lg font-semibold mb-4">Обсудить похожий проект</h3>
                <LeadForm source={`project-${slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
