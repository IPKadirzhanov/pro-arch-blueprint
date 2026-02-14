import AnimatedSection from '@/components/AnimatedSection';

export default function Privacy() {
  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <AnimatedSection>
            <h1 className="font-display text-3xl lg:text-4xl font-bold mb-8">Политика конфиденциальности</h1>
            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">1. Общие положения</h2>
                <p>Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта ProHolding. Оператор сайта: ТОО «ProHolding». Техническая реализация: IPkadirzhanov.</p>
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">2. Сбор данных</h2>
                <p>Мы собираем только данные, которые вы предоставляете добровольно: имя, телефон, email, информацию о проекте через формы на сайте и чат-ассистент.</p>
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">3. Использование данных</h2>
                <p>Персональные данные используются исключительно для связи с вами по вашему запросу, подготовки коммерческих предложений и улучшения качества услуг.</p>
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">4. Защита данных</h2>
                <p>Мы применяем организационные и технические меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">5. Контакты</h2>
                <p>По вопросам обработки персональных данных обращайтесь: <a href="tel:+77715668737" className="text-primary hover:underline">+7 771 566 87 37</a>.</p>
              </div>
              <p className="text-xs text-muted-foreground/50 mt-8">Техническая реализация: IPkadirzhanov</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
