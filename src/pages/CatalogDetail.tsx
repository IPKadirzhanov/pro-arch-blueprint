import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AnimatedSection from '@/components/AnimatedSection';
import LeadForm from '@/components/LeadForm';
import { ArrowLeft, Download } from 'lucide-react';

const fallback: Record<string, any> = {
  'tipovye-planirovki': { title: 'Альбом типовых планировок жилых домов', category: 'Планировки', description: 'Полный сборник типовых планировочных решений для жилых домов. Включает планировки от 1-комнатных до 5-комнатных квартир с различными площадями.\n\nСодержание:\n• 1-комнатные квартиры (35-50 м²)\n• 2-комнатные квартиры (55-75 м²)\n• 3-комнатные квартиры (80-110 м²)\n• 4-5 комнатные квартиры (от 120 м²)\n• Типовые секции и блок-секции\n\nМатериал подготовлен на основе опыта проектирования 1500+ объектов.' },
  'fasadnye-resheniya': { title: 'Каталог фасадных решений', category: 'Фасады', description: 'Обзор современных фасадных систем и материалов для зданий различного назначения.' },
  'bim-guide': { title: 'Гайд по BIM-проектированию', category: 'BIM', description: 'Практическое руководство по внедрению BIM-технологий в работу проектной организации.' },
  'normy-rk': { title: 'Нормы проектирования РК', category: 'Нормативы', description: 'Актуальный сводный справочник действующих норм и стандартов проектирования Республики Казахстан.' },
};

export default function CatalogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [catalog, setCatalog] = useState<any>(slug ? fallback[slug] || null : null);

  useEffect(() => {
    if (!slug) return;
    supabase.from('catalogs').select('*').eq('slug', slug).eq('published', true).maybeSingle().then(({ data }) => {
      if (data) setCatalog(data);
    });
  }, [slug]);

  if (!catalog) return (
    <div className="pt-20 section-padding container-main text-center">
      <h1 className="font-display text-3xl font-bold mb-4">Каталог не найден</h1>
      <Link to="/catalogs" className="text-primary hover:underline">← К каталогам</Link>
    </div>
  );

  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <Link to="/catalogs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Все каталоги
          </Link>
          <AnimatedSection>
            {catalog.category && <span className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">{catalog.category}</span>}
            <h1 className="font-display text-3xl lg:text-4xl font-bold mt-3 mb-4">{catalog.title}</h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-main grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimatedSection>
              {catalog.description?.split('\n').map((p: string, i: number) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
              ))}
              {catalog.file_url && (
                <a href={catalog.file_url} download className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                  <Download className="w-4 h-4" /> Скачать каталог
                </a>
              )}
            </AnimatedSection>
          </div>
          <div>
            <AnimatedSection delay={0.2}>
              <div className="p-6 rounded-xl border border-border bg-card sticky top-24">
                <h3 className="font-display text-lg font-semibold mb-4">Получить консультацию</h3>
                <LeadForm source={`catalog-${slug}`} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
