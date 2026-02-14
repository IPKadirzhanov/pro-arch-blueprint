import { Phone, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/services', label: 'Архитектурные решения' },
  { to: '/projects', label: 'Реализованные проекты' },
  { to: '/catalogs', label: 'Каталоги и материалы' },
  { to: '/course-gip', label: 'Авторский курс ГИП' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' },
];

export default function Header({ onOpenChat }: { onOpenChat: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.header
      ref={headerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ margin: '14px 24px 0', pointerEvents: 'auto' }}
    >
      {/* Main glass panel */}
      <div
        className="relative overflow-hidden transition-all"
        style={{
          borderRadius: 16,
          backdropFilter: scrolled ? 'blur(32px) saturate(170%)' : 'blur(18px) saturate(160%)',
          WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(170%)' : 'blur(18px) saturate(160%)',
          background: scrolled
            ? 'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.08), 0 10px 40px rgba(0,0,0,0.25)`,
          opacity: scrolled ? 1 : 0.92,
          transitionDuration: '500ms',
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          padding: scrolled ? '0 24px' : '0 28px',
        }}
      >
        {/* Light reflection */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 300px 120px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.18), transparent)`,
          }}
        />

        <div
          className="relative flex items-center justify-between transition-all"
          style={{
            height: scrolled ? 56 : 68,
            transitionDuration: '500ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex flex-col group transition-all duration-200 hover:brightness-110">
            <span className="font-display text-lg font-semibold text-white tracking-wide leading-tight">
              ProHolding
            </span>
            <span className="text-[10px] tracking-[0.12em] uppercase text-white/50 leading-tight">
              Architectural Project Organization
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map(l => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3 py-1.5 text-[13px] font-medium transition-all duration-200 rounded-lg ${
                    active
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.label}
                  {!active && (
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-white/80 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-0 hover:scale-x-100 pointer-events-none" style={{ display: 'block' }} />
                  )}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px bg-white/80 origin-left scale-x-0 transition-transform duration-300 ease-out"
                    style={{ transform: active ? undefined : undefined }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scaleX(1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scaleX(0)')}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+77715668737"
              className="hidden md:flex items-center gap-1.5 text-[13px] font-medium text-white/70 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
            >
              <Phone className="w-3.5 h-3.5" />
              +7 771 566 87 37
            </a>

            {/* CTA */}
            <Link
              to="/brief"
              className="hidden lg:inline-flex items-center justify-center h-9 px-5 text-[13px] font-medium text-white rounded-xl transition-all duration-250 hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.10))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              }}
            >
              Получить консультацию
            </Link>

            {/* AI button */}
            <button
              onClick={onOpenChat}
              className="flex items-center justify-center rounded-full transition-all duration-200 hover:scale-[1.08] text-white/80 hover:text-white"
              style={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
              }}
              aria-label="Открыть чат"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              aria-label="Меню"
            >
              <div className="w-4 flex flex-col gap-[5px]">
                <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 xl:hidden flex flex-col items-center justify-center"
            style={{
              backdropFilter: 'blur(40px) saturate(150%)',
              WebkitBackdropFilter: 'blur(40px) saturate(150%)',
              background: 'linear-gradient(135deg, rgba(10,18,36,0.92), rgba(10,18,36,0.85))',
              top: 0,
            }}
          >
            <nav className="flex flex-col items-center gap-3">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xl font-medium transition-colors duration-200 ${
                      location.pathname === l.to ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
                className="mt-6 flex flex-col items-center gap-4"
              >
                <Link
                  to="/brief"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-white rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                  }}
                >
                  Получить консультацию
                </Link>
                <a href="tel:+77715668737" className="flex items-center gap-2 text-white/60 text-base">
                  <Phone className="w-4 h-4" /> +7 771 566 87 37
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
