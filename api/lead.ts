import { z } from "zod";
import {
  budgetOptions,
  contactTimeOptions,
  deadlineOptions,
  getContactMethodLabel,
  getServiceLabel,
  legalDocumentVersion,
  type ContactMethod,
  type ServiceId,
} from "../shared/lead-form";

export const config = {
  runtime: "nodejs",
  maxDuration: 10,
};

const leadSchema = z.object({
  service: z.enum([
    "landing",
    "business-site",
    "automation-site",
    "platform",
    "design-subscription",
    "consultation",
  ]),
  description: z.string().trim().min(20).max(1500),
  links: z.string().trim().max(800).default(""),
  budget: z.string().trim().min(1).max(80),
  deadline: z.string().trim().min(1).max(80),
  name: z.string().trim().min(2).max(80),
  contactMethod: z.enum(["telegram", "phone", "email"]),
  contact: z.string().trim().min(4).max(120),
  contactTime: z.string().trim().min(1).max(80),
  customTime: z.string().trim().max(80).default(""),
  consent: z.literal(true),
  legalDocumentVersion: z.literal(legalDocumentVersion),
  website: z.string().max(200).default(""),
  openedAt: z.number().int().positive(),
  source: z.string().trim().max(200).default("Сайт"),
  pageUrl: z.string().trim().max(500).default(""),
  utmSource: z.string().trim().max(120).default(""),
  utmMedium: z.string().trim().max(120).default(""),
  utmCampaign: z.string().trim().max(120).default(""),
}).superRefine((lead, context) => {
  if (!budgetOptions[lead.service].includes(lead.budget)) {
    context.addIssue({ code: "custom", path: ["budget"], message: "Некорректный бюджет" });
  }
  if (!deadlineOptions.includes(lead.deadline as (typeof deadlineOptions)[number])) {
    context.addIssue({ code: "custom", path: ["deadline"], message: "Некорректный срок" });
  }
  if (!contactTimeOptions.includes(lead.contactTime as (typeof contactTimeOptions)[number])) {
    context.addIssue({ code: "custom", path: ["contactTime"], message: "Некорректное время" });
  }
  if (lead.contactTime === "Другое время" && lead.customTime.length < 3) {
    context.addIssue({ code: "custom", path: ["customTime"], message: "Укажите удобное время" });
  }
  if (lead.contactMethod === "email" && !/^\S+@\S+\.\S+$/.test(lead.contact)) {
    context.addIssue({ code: "custom", path: ["contact"], message: "Некорректный email" });
  }
  if (lead.contactMethod === "phone" && lead.contact.replace(/\D/g, "").length < 10) {
    context.addIssue({ code: "custom", path: ["contact"], message: "Некорректный телефон" });
  }
});

type Lead = z.infer<typeof leadSchema>;

function json(data: Record<string, unknown>, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function line(label: string, value: string) {
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value || "—")}`;
}

function formatLeadMessage(lead: Lead) {
  const preferredTime = lead.contactTime === "Другое время" ? lead.customTime : lead.contactTime;
  const utm = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ") || "—";

  return [
    "<b>Новая заявка с Kostyuk.Studio</b>",
    "",
    line("Направление", getServiceLabel(lead.service as ServiceId)),
    line("Задача", lead.description),
    line("Материалы", lead.links),
    "",
    line("Бюджет", lead.budget),
    line("Срок", lead.deadline),
    "",
    line("Имя", lead.name),
    line("Способ связи", getContactMethodLabel(lead.contactMethod as ContactMethod)),
    line("Контакт", lead.contact),
    line("Связаться", `${preferredTime} МСК`),
    "",
    line("Источник", lead.source),
    line("Страница", lead.pageUrl),
    line("UTM", utm),
    line("Согласие", `получено, редакция ${lead.legalDocumentVersion}`),
    line("Получено", new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Moscow",
    }).format(new Date())),
  ].join("\n");
}

function telegramReplyMarkup(lead: Lead) {
  if (lead.contactMethod !== "telegram") return undefined;
  const username = lead.contact.trim().replace(/^@/, "");
  if (!/^[A-Za-z0-9_]{5,32}$/.test(username)) return undefined;
  return {
    inline_keyboard: [[{ text: "Открыть контакт в Telegram", url: `https://t.me/${username}` }]],
  };
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ ok: false, message: "Запрос отклонён." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, message: "Неверный формат запроса." }, 415);
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) return json({ ok: false, message: "Слишком большой запрос." }, 413);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Не удалось прочитать данные формы." }, 400);
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) return json({ ok: false, message: "Проверьте заполнение формы." }, 400);
  const lead = parsed.data;

  if (lead.website) return json({ ok: true });
  if (Date.now() - lead.openedAt < 2500) {
    return json({ ok: false, message: "Пожалуйста, проверьте данные и повторите отправку." }, 429);
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram lead delivery is not configured");
    return json({ ok: false, message: "Форма временно недоступна. Напишите нам на почту." }, 503);
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatLeadMessage(lead),
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
        reply_markup: telegramReplyMarkup(lead),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Telegram delivery failed", response.status, details.slice(0, 300));
      return json({ ok: false, message: "Не удалось отправить заявку. Попробуйте ещё раз." }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    console.error("Telegram delivery error", error instanceof Error ? error.message : "Unknown error");
    return json({ ok: false, message: "Не удалось отправить заявку. Попробуйте ещё раз." }, 502);
  }
}

export function GET() {
  return json({ ok: false, message: "Method not allowed" }, 405);
}
