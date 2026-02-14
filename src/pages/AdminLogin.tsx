import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error('Неверный логин или пароль');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blueprint-bg blueprint-grid-dark">
      <div className="w-full max-w-sm p-8 rounded-xl glass-panel-dark">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 border-2 border-blueprint rounded-sm flex items-center justify-center">
            <span className="text-blueprint font-bold text-sm">PH</span>
          </div>
          <span className="font-display text-lg font-semibold text-primary-foreground">Админ-панель</span>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full h-11 px-4 rounded-md border border-blueprint/30 bg-blueprint-bg text-primary-foreground text-sm placeholder:text-blueprint-light/40 focus:outline-none focus:ring-2 focus:ring-blueprint" />
          <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required className="w-full h-11 px-4 rounded-md border border-blueprint/30 bg-blueprint-bg text-primary-foreground text-sm placeholder:text-blueprint-light/40 focus:outline-none focus:ring-2 focus:ring-blueprint" />
          <button type="submit" disabled={loading} className="w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
