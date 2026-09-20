import { describe, expect, it } from "vitest";
import { POST } from "../../../api/lead";

const integrationDescribe = process.env.RUN_TELEGRAM_INTEGRATION === "1" ? describe : describe.skip;

integrationDescribe("Telegram lead delivery", () => {
  it("delivers one clearly marked integration test to the configured private chat", async () => {
    expect(process.env.TELEGRAM_BOT_TOKEN).toBeTruthy();
    expect(process.env.TELEGRAM_CHAT_ID).toBeTruthy();

    const request = new Request("https://kostyuk.studio/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://kostyuk.studio",
      },
      body: JSON.stringify({
        service: "consultation",
        description: "[ТЕСТ ПОДКЛЮЧЕНИЯ] Служебная проверка формы Kostyuk.Studio. Действий не требуется.",
        links: "",
        budget: "Нужна оценка",
        deadline: "без жёсткого срока",
        name: "Тест интеграции",
        contactMethod: "telegram",
        contact: "@integration_test",
        contactTime: "В любое время",
        customTime: "",
        consent: true,
        legalDocumentVersion: "2026-09-20",
        website: "",
        openedAt: Date.now() - 5_000,
        source: "Автоматический тест подключения",
        pageUrl: "https://kostyuk.studio/",
        utmSource: "qa",
        utmMedium: "integration-test",
        utmCampaign: "telegram-setup",
      }),
    });

    const response = await POST(request);
    const result = await response.json() as { ok?: boolean; message?: string };

    expect(response.status, result.message).toBe(200);
    expect(result.ok, result.message).toBe(true);
  }, 15_000);
});
