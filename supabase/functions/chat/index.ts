import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ты — виртуальный консультант компании ProHolding. Компания занимается архитектурным проектированием уже 12 лет, реализовано более 1500 проектов по Казахстану.

Твоя роль — помочь посетителю сайта:
1. Рассказать об услугах (архитектурное проектирование, конструктивные решения, инженерные системы, экспертиза, BIM, авторский надзор, согласование).
2. Объяснить процесс работы и сроки.
3. Рассказать о ценах (эскизный проект от 500 000 ₸, стадия "Проект" от 1 500 000 ₸, полный цикл от 3 000 000 ₸).
4. Рассказать о курсе ГИП "Caspiy Project" — авторский курс для главных инженеров проектов, 10 модулей.
5. Собрать заявку (имя, телефон, запрос).
6. Предложить связаться по WhatsApp: +77715668737.

Правила:
- Отвечай на русском языке.
- Будь вежлив, профессионален, но не навязчив.
- Не выдумывай факты. Опирайся только на предоставленную информацию.
- Если не знаешь ответ — предложи связаться с менеджером по телефону +7 771 566 87 37.
- Давай краткие и полезные ответы.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Слишком много запросов. Попробуйте позже." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Превышен лимит. Обратитесь к администратору." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "Ошибка AI" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
