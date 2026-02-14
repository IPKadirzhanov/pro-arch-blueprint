import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="text-8xl font-display font-bold text-primary/20 mb-4">404</div>
        <h1 className="font-display text-3xl font-bold mb-2">Страница не найдена</h1>
        <p className="text-muted-foreground mb-6">Запрашиваемая страница не существует или была перемещена.</p>
        <Link to="/" className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
