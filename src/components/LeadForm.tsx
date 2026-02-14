import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function LeadForm({ source = 'website', onSuccess }: { source?: string; onSuccess?: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Заполните имя и телефон');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('applications').insert({ name: name.trim(), phone: phone.trim(), message: message.trim() || null, source });
    setLoading(false);
    if (error) {
      toast.error('Ошибка при отправке. Попробуйте позже.');
    } else {
      toast.success('Заявка отправлена! Мы свяжемся с вами.');
      setName(''); setPhone(''); setMessage('');
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Ваше имя *"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="h-11 px-4 rounded-md border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        type="tel"
        placeholder="Телефон *"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        className="h-11 px-4 rounded-md border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <textarea
        placeholder="Комментарий"
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows={3}
        className="px-4 py-3 rounded-md border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
}
