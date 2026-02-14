import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AnimatedSection from '@/components/AnimatedSection';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const objectTypes = ['Жилой дом', 'Многоквартирный жилой комплекс', 'Коммерческое здание', 'Промышленный объект', 'Общественное здание', 'Другое'];
const serviceTypes = ['Эскизный проект', 'Стадия «Проект»', 'Рабочая документация', 'Полный цикл', 'Экспертиза', 'Авторский надзор', 'Консалтинг'];

export default function Brief() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [objectType, setObjectType] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [area, setArea] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggleService = (s: string) => setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const submit = async () => {
    if (!name.trim() || !phone.trim()) { toast.error('Заполните имя и телефон'); return; }
    setLoading(true);
    const msg = `Тип: ${objectType}\nУслуги: ${services.join(', ')}\nПлощадь: ${area}\nЛокация: ${location}\nБюджет: ${budget}\nСроки: ${deadline}\nКомментарий: ${comment}`;
    const { error } = await supabase.from('applications').insert({ name: name.trim(), phone: phone.trim(), email: email.trim() || null, message: msg, source: 'brief' });
    setLoading(false);
    if (error) toast.error('Ошибка. Попробуйте позже.');
    else setDone(true);
  };

  if (done) return (
    <div className="pt-20 section-padding">
      <div className="container-main max-w-lg text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">Бриф отправлен!</h1>
        <p className="text-muted-foreground mb-6">Мы изучим ваш запрос и свяжемся в течение 24 часов с предварительным расчётом.</p>
        <a href="tel:+77715668737" className="text-primary font-medium hover:underline">+7 771 566 87 37</a>
      </div>
    </div>
  );

  const steps = [
    // Step 0: Contact
    <div key="0" className="space-y-4">
      <h2 className="font-display text-2xl font-bold mb-4">Контактные данные</h2>
      <input type="text" placeholder="Имя *" value={name} onChange={e => setName(e.target.value)} required className="w-full h-11 px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      <input type="tel" placeholder="Телефон *" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full h-11 px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full h-11 px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>,
    // Step 1: Object
    <div key="1" className="space-y-4">
      <h2 className="font-display text-2xl font-bold mb-4">Тип объекта</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {objectTypes.map(t => (
          <button key={t} onClick={() => setObjectType(t)} className={`p-3 rounded-md border text-sm text-left transition-colors ${objectType === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted'}`}>
            {t}
          </button>
        ))}
      </div>
    </div>,
    // Step 2: Services
    <div key="2" className="space-y-4">
      <h2 className="font-display text-2xl font-bold mb-4">Необходимые услуги</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {serviceTypes.map(s => (
          <button key={s} onClick={() => toggleService(s)} className={`p-3 rounded-md border text-sm text-left transition-colors ${services.includes(s) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-muted'}`}>
            {s}
          </button>
        ))}
      </div>
    </div>,
    // Step 3: Details
    <div key="3" className="space-y-4">
      <h2 className="font-display text-2xl font-bold mb-4">Детали проекта</h2>
      <input type="text" placeholder="Площадь объекта (м²)" value={area} onChange={e => setArea(e.target.value)} className="w-full h-11 px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      <input type="text" placeholder="Локация (город)" value={location} onChange={e => setLocation(e.target.value)} className="w-full h-11 px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      <input type="text" placeholder="Примерный бюджет" value={budget} onChange={e => setBudget(e.target.value)} className="w-full h-11 px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      <input type="text" placeholder="Желаемые сроки" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full h-11 px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      <textarea placeholder="Дополнительные комментарии" value={comment} onChange={e => setComment(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
    </div>,
  ];

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-main max-w-xl">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Бриф</p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">Заполните бриф</h1>
            <p className="text-muted-foreground mb-8">Опишите ваш проект — мы подготовим расчёт в течение 24 часов.</p>

            {/* Progress */}
            <div className="flex gap-1 mb-8">
              {[0,1,2,3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>

            {steps[step]}

            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="h-11 px-6 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Назад
                </button>
              )}
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="h-11 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1 ml-auto">
                  Далее <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={submit} disabled={loading} className="h-11 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors ml-auto disabled:opacity-50">
                  {loading ? 'Отправка...' : 'Отправить бриф'}
                </button>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
