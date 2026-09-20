const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("Добавьте TELEGRAM_BOT_TOKEN в .env.local и запустите: node --env-file=.env.local scripts/get-telegram-chat-id.mjs");
  process.exit(1);
}

const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=20&allowed_updates=%5B%22message%22%5D`);
const payload = await response.json();

if (!response.ok || !payload.ok) {
  console.error("Telegram API вернул ошибку:", payload.description ?? response.statusText);
  process.exit(1);
}

const chats = new Map();
for (const update of payload.result ?? []) {
  const chat = update.message?.chat;
  if (chat?.id && chat.type === "private") {
    chats.set(String(chat.id), {
      id: String(chat.id),
      name: [chat.first_name, chat.last_name].filter(Boolean).join(" ") || "Без имени",
      username: chat.username ? `@${chat.username}` : "—",
    });
  }
}

if (chats.size === 0) {
  console.error("Личный чат не найден. Откройте бота в Telegram, нажмите Start и запустите команду ещё раз.");
  process.exit(1);
}

console.log("Найдены личные чаты:");
for (const chat of chats.values()) {
  console.log(`TELEGRAM_CHAT_ID=${chat.id}  ${chat.name}  ${chat.username}`);
}
