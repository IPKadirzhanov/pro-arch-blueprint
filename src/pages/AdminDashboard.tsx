import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FileText, Inbox, FolderOpen, Newspaper, Building2, Settings, LogOut, MessageCircle } from 'lucide-react';

type App = { id: string; name: string; phone: string; email: string | null; message: string | null; source: string | null; status: string; admin_comment: string | null; created_at: string };

function ApplicationsTab() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    supabase.from('applications').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setApps((data as any) || []);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('applications').update({ status }).eq('id', id);
    load();
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-6">Заявки</h2>
      {loading ? <p className="text-muted-foreground">Загрузка...</p> : (
        <div className="space-y-3">
          {apps.length === 0 && <p className="text-muted-foreground">Нет заявок</p>}
          {apps.map(a => (
            <div key={a.id} className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{a.name} — <a href={`tel:${a.phone}`} className="text-primary">{a.phone}</a></div>
                  {a.email && <div className="text-sm text-muted-foreground">{a.email}</div>}
                  {a.message && <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{a.message}</p>}
                  <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{new Date(a.created_at).toLocaleString('ru-RU')}</span>
                    {a.source && <span className="px-2 py-0.5 rounded-full border border-border">{a.source}</span>}
                  </div>
                </div>
                <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)} className="h-8 px-2 rounded border border-border bg-background text-xs">
                  <option value="new">Новая</option>
                  <option value="in_progress">В работе</option>
                  <option value="done">Завершена</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatLeadsTab() {
  const [leads, setLeads] = useState<any[]>([]);
  useEffect(() => {
    supabase.from('chat_leads').select('*').order('created_at', { ascending: false }).then(({ data }) => setLeads(data || []));
  }, []);
  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-6">Заявки из чата</h2>
      {leads.length === 0 ? <p className="text-muted-foreground">Нет заявок из чата</p> : (
        <div className="space-y-3">
          {leads.map(l => (
            <div key={l.id} className="p-4 rounded-lg border border-border bg-card">
              <div className="font-medium">{l.name || 'Без имени'} — {l.phone || 'Нет телефона'}</div>
              {l.request && <p className="text-sm text-muted-foreground mt-1">{l.request}</p>}
              <div className="text-xs text-muted-foreground mt-2">{new Date(l.created_at).toLocaleString('ru-RU')}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SimpleContentTab({ table, label }: { table: string; label: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    (supabase.from(table as any).select('*').order('created_at', { ascending: false }) as any).then(({ data }: any) => {
      setItems(data || []);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, [table]);

  const togglePublish = async (id: string, published: boolean) => {
    await (supabase.from(table as any).update({ published: !published } as any).eq('id', id) as any);
    load();
    toast.success(published ? 'Снято с публикации' : 'Опубликовано');
  };

  const deleteItem = async (id: string) => {
    await (supabase.from(table as any).delete().eq('id', id) as any);
    load();
    toast.success('Удалено');
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-6">{label}</h2>
      {loading ? <p className="text-muted-foreground">Загрузка...</p> : (
        <div className="space-y-3">
          {items.length === 0 && <p className="text-muted-foreground">Нет записей. Добавьте через базу данных.</p>}
          {items.map(item => (
            <div key={item.id} className="p-4 rounded-lg border border-border bg-card flex items-center justify-between gap-4">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.slug} · {item.published ? '✅ Опубликовано' : '⏸ Черновик'}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => togglePublish(item.id, item.published)} className="text-xs px-3 py-1.5 rounded border border-border hover:bg-muted transition-colors">
                  {item.published ? 'Снять' : 'Опубликовать'}
                </button>
                <button onClick={() => deleteItem(item.id)} className="text-xs px-3 py-1.5 rounded border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const navItems = [
  { to: '/admin', icon: Inbox, label: 'Заявки' },
  { to: '/admin/chat-leads', icon: MessageCircle, label: 'Чат-заявки' },
  { to: '/admin/projects', icon: Building2, label: 'Проекты' },
  { to: '/admin/catalogs', icon: FolderOpen, label: 'Каталоги' },
  { to: '/admin/news', icon: Newspaper, label: 'Новости' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      setChecking(false);
      if (!session?.user) navigate('/admin/login');
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setChecking(false);
      if (!session?.user) navigate('/admin/login');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (checking) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Загрузка...</p></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-card border-r border-border p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 border-2 border-primary rounded-sm flex items-center justify-center">
            <span className="text-primary font-bold text-xs">PH</span>
          </div>
          <span className="font-display text-sm font-semibold">Админ-панель</span>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map(n => (
            <Link key={n.to} to={n.to} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${location.pathname === n.to ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
              <n.icon className="w-4 h-4" /> {n.label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors mt-4">
          <LogOut className="w-4 h-4" /> Выйти
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route index element={<ApplicationsTab />} />
          <Route path="chat-leads" element={<ChatLeadsTab />} />
          <Route path="projects" element={<SimpleContentTab table="projects" label="Проекты" />} />
          <Route path="catalogs" element={<SimpleContentTab table="catalogs" label="Каталоги" />} />
          <Route path="news" element={<SimpleContentTab table="news" label="Новости" />} />
        </Routes>
      </main>
    </div>
  );
}
