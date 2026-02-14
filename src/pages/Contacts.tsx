import AnimatedSection from '@/components/AnimatedSection';
import LeadForm from '@/components/LeadForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contacts() {
  return (
    <div className="pt-20">
      <section className="section-padding blueprint-grid">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Контакты</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Свяжитесь с нами</h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-main grid lg:grid-cols-2 gap-12">
          <div>
            <AnimatedSection>
              <div className="space-y-6">
                {[
                  { icon: Phone, label: 'Телефон', value: '+7 771 566 87 37', href: 'tel:+77715668737' },
                  { icon: Mail, label: 'Email', value: 'info@proholding.kz', href: 'mailto:info@proholding.kz' },
                  { icon: MapPin, label: 'Адрес', value: 'г. Алматы, Казахстан', href: undefined },
                  { icon: Clock, label: 'Режим работы', value: 'Пн-Пт: 9:00 - 18:00', href: undefined },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="font-medium hover:text-primary transition-colors">{c.value}</a>
                      ) : (
                        <div className="font-medium">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl border border-border bg-card">
                <h3 className="font-display text-lg font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-4">Напишите нам в мессенджер для быстрой связи.</p>
                <a
                  href="https://wa.me/77715668737?text=Здравствуйте!%20Хочу%20узнать%20подробнее%20об%20услугах%20ProHolding."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex h-10 px-5 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Написать в WhatsApp
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-display text-xl font-semibold mb-6">Форма связи</h3>
              <LeadForm source="contacts" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
