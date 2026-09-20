import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "../../../api/lead";

const validLead = {
  service: "platform",
  description: "Нужна платформа с личными кабинетами для клиентов и менеджеров.",
  links: "https://example.com/brief",
  budget: "500 000–1 000 000 ₽",
  deadline: "3–6 месяцев",
  name: "Иван <script>",
  contactMethod: "telegram",
  contact: "@example_user",
  contactTime: "15:00–18:00",
  customTime: "",
  consent: true,
  legalDocumentVersion: "2026-09-20",
  website: "",
  openedAt: Date.now() - 5_000,
  source: "Кейс Vishe.edu",
  pageUrl: "https://kostyuk.studio/cases/vishe.edu?utm_source=test",
  utmSource: "test",
  utmMedium: "qa",
  utmCampaign: "lead-form",
};

function requestFor(payload: unknown) {
  return new Request("https://kostyuk.studio/api/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://kostyuk.studio",
    },
    body: JSON.stringify(payload),
  });
}

describe("lead API", () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "123456";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("validates and sends an escaped structured Telegram message", async () => {
    const telegramFetch = vi.fn(async () => Response.json({ ok: true, result: { message_id: 1 } }));
    vi.stubGlobal("fetch", telegramFetch);

    const response = await POST(requestFor(validLead));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual({ ok: true });
    expect(telegramFetch).toHaveBeenCalledOnce();

    const [url, options] = telegramFetch.mock.calls[0];
    expect(String(url)).toContain("api.telegram.org/bottest-token/sendMessage");
    const telegramPayload = JSON.parse(String(options?.body));
    expect(telegramPayload.chat_id).toBe("123456");
    expect(telegramPayload.text).toContain("Иван &lt;script&gt;");
    expect(telegramPayload.text).toContain("15:00–18:00 МСК");
    expect(telegramPayload.text).toContain("Согласие:</b> получено, редакция 2026-09-20");
    expect(telegramPayload.reply_markup.inline_keyboard[0][0].url).toBe("https://t.me/example_user");
  });

  it("rejects submissions sent too quickly", async () => {
    const telegramFetch = vi.fn();
    vi.stubGlobal("fetch", telegramFetch);

    const response = await POST(requestFor({ ...validLead, openedAt: Date.now() }));

    expect(response.status).toBe(429);
    expect(telegramFetch).not.toHaveBeenCalled();
  });

  it("silently accepts the honeypot without contacting Telegram", async () => {
    const telegramFetch = vi.fn();
    vi.stubGlobal("fetch", telegramFetch);

    const response = await POST(requestFor({ ...validLead, website: "spam.example" }));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual({ ok: true });
    expect(telegramFetch).not.toHaveBeenCalled();
  });

  it("rejects invalid service-specific budget values", async () => {
    const response = await POST(requestFor({ ...validLead, budget: "до 100 000 ₽" }));
    expect(response.status).toBe(400);
  });

  it("rejects cross-origin submissions", async () => {
    const request = new Request("https://kostyuk.studio/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://spam.example",
      },
      body: JSON.stringify(validLead),
    });

    const response = await POST(request);
    expect(response.status).toBe(403);
  });
});
