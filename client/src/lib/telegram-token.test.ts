import { describe, expect, it } from "vitest";

describe("Telegram bot credentials", () => {
  it("authenticate with Telegram Bot API", async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    expect(token, "TELEGRAM_BOT_TOKEN must be available to the test").toBeTruthy();

    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const payload = await response.json() as {
      ok: boolean;
      description?: string;
      result?: { id: number; is_bot: boolean; username?: string };
    };

    expect(response.ok, payload.description).toBe(true);
    expect(payload.ok, payload.description).toBe(true);
    expect(payload.result?.is_bot).toBe(true);
  }, 15_000);
});
