import { Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/services', label: 'Услуги' },
  { to: '/projects', label: 'Проекты' },
  { to: '/catalogs', label: 'Каталоги' },
  { to: '/course-gip', label: 'Курс ГИП' },
  { to: '/news', label: 'Новости' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' },
];

export default function Header({ onOpenChat }: { onOpenChat: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container-main flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-primary rounded-sm flex items-center justify-center">
            <span className="text-primary font-bold text-sm">PH</span>
          </div>
          <span className="font-display text-lg font-semibold text-foreground">ProHolding</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.to ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+77715668737" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            +7 771 566 87 37
          </a>
          <Link to="/brief" className="hidden md:inline-flex h-9 px-4 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Получить консультацию
          </Link>
          <button onClick={onOpenChat} className="h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Открыть чат">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden h-9 w-9 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Меню"
          >
            <div className="w-4 flex flex-col gap-1">
              <span className={`block h-0.5 bg-foreground transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-foreground transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-foreground transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border overflow-hidden glass-panel"
          >
            <nav className="container-main py-4 flex flex-col gap-2">
              {navLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 text-sm font-medium transition-colors ${location.pathname === l.to ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/brief" onClick={() => setMobileOpen(false)} className="mt-2 h-10 flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium">
                Получить консультацию
              </Link>
              <a href="tel:+77715668737" className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" /> +7 771 566 87 37
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
