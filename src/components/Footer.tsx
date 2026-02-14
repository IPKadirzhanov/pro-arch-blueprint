import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blueprint-bg text-blueprint-light">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border-2 border-blueprint rounded-sm flex items-center justify-center">
                <span className="text-blueprint font-bold text-sm">PH</span>
              </div>
              <span className="font-display text-lg font-semibold">ProHolding</span>
            </div>
            <p className="text-sm text-blueprint-light/60 leading-relaxed">
              Архитектурное проектирование с 12-летним опытом. 1500+ успешных проектов по всему Казахстану.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Навигация</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/services', l: 'Услуги' },
                { to: '/projects', l: 'Проекты' },
                { to: '/catalogs', l: 'Каталоги' },
                { to: '/course-gip', l: 'Курс ГИП' },
                { to: '/about', l: 'О компании' },
                { to: '/pricing', l: 'Цены' },
              ].map(n => (
                <Link key={n.to} to={n.to} className="text-sm text-blueprint-light/60 hover:text-blueprint transition-colors">{n.l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Контакты</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+77715668737" className="flex items-center gap-2 text-sm text-blueprint-light/60 hover:text-blueprint transition-colors">
                <Phone className="w-4 h-4" /> +7 771 566 87 37
              </a>
              <a href="mailto:info@proholding.kz" className="flex items-center gap-2 text-sm text-blueprint-light/60 hover:text-blueprint transition-colors">
                <Mail className="w-4 h-4" /> info@proholding.kz
              </a>
              <div className="flex items-start gap-2 text-sm text-blueprint-light/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> г. Алматы, Казахстан
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Начать проект</h4>
            <p className="text-sm text-blueprint-light/60 mb-4">Заполните бриф и получите предварительный расчёт.</p>
            <Link to="/brief" className="inline-flex h-10 px-5 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Заполнить бриф
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blueprint-light/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blueprint-light/40">© {new Date().getFullYear()} ProHolding. Все права защищены.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-blueprint-light/40 hover:text-blueprint-light/60 transition-colors">Политика конфиденциальности</Link>
            <span className="text-xs text-blueprint-light/20">IPkadirzhanov</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
