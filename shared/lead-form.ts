export const serviceOptions = [
  {
    id: "landing",
    title: "Лендинг",
    description: "Одна страница для услуги, продукта или рекламы.",
  },
  {
    id: "business-site",
    title: "Сайт для бизнеса",
    description: "Многостраничный сайт компании.",
  },
  {
    id: "automation-site",
    title: "Сайт с автоматизацией",
    description: "Калькулятор стоимости, запись, CRM, SMS и интеграции.",
  },
  {
    id: "platform",
    title: "Веб-сервис или платформа",
    description: "Личные кабинеты, роли и бизнес-логика.",
  },
  {
    id: "design-subscription",
    title: "Графический дизайн по подписке",
    description: "Регулярные баннеры, посты, карточки и другие материалы.",
  },
  {
    id: "consultation",
    title: "Нужна консультация",
    description: "Поможем определить подходящий формат.",
  },
] as const;

export type ServiceId = (typeof serviceOptions)[number]["id"];

export const legalDocumentVersion = "2026-09-20" as const;

export const budgetOptions: Record<ServiceId, readonly string[]> = {
  landing: ["до 100 000 ₽", "100 000–180 000 ₽", "180 000–300 000 ₽", "от 300 000 ₽", "Нужна оценка"],
  "business-site": ["150 000–250 000 ₽", "250 000–400 000 ₽", "400 000–700 000 ₽", "от 700 000 ₽", "Нужна оценка"],
  "automation-site": ["250 000–400 000 ₽", "400 000–700 000 ₽", "700 000–1 200 000 ₽", "от 1 200 000 ₽", "Нужна оценка"],
  platform: ["250 000–500 000 ₽", "500 000–1 000 000 ₽", "1 000 000–3 000 000 ₽", "от 3 000 000 ₽", "Нужна оценка"],
  "design-subscription": ["Основа — 34 900 ₽ / месяц", "Поток — 59 900 ₽ / месяц", "Нужен другой объём", "Нужна оценка"],
  consultation: ["до 100 000 ₽", "100 000–250 000 ₽", "250 000–500 000 ₽", "от 500 000 ₽", "Нужна оценка"],
};

export const deadlineOptions = [
  "до 1 месяца",
  "1–2 месяца",
  "3–6 месяцев",
  "более 6 месяцев",
  "без жёсткого срока",
] as const;

export const contactMethodOptions = [
  { id: "telegram", label: "Telegram" },
  { id: "phone", label: "Телефон" },
  { id: "email", label: "Email" },
] as const;

export type ContactMethod = (typeof contactMethodOptions)[number]["id"];

export const contactTimeOptions = [
  "В любое время",
  "09:00–12:00",
  "12:00–15:00",
  "15:00–18:00",
  "18:00–21:00",
  "Другое время",
] as const;

export interface LeadFormData {
  service: ServiceId | "";
  description: string;
  links: string;
  budget: string;
  deadline: string;
  name: string;
  contactMethod: ContactMethod;
  contact: string;
  contactTime: string;
  customTime: string;
  consent: boolean;
  legalDocumentVersion: typeof legalDocumentVersion;
  website: string;
  openedAt: number;
  source: string;
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

export function getServiceLabel(service: ServiceId | "") {
  return serviceOptions.find((item) => item.id === service)?.title ?? "Не указано";
}

export function getContactMethodLabel(method: ContactMethod) {
  return contactMethodOptions.find((item) => item.id === method)?.label ?? method;
}
