import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

let loggedIn = false;

export default async function handler(req, res) {
  const { botToken, channelId, botId } = req.query;

  if (!botToken || !channelId || !botId) {
    return res.status(400).json({ error: "Faltam parâmetros: botToken, channelId, botId." });
  }

  try {
    if (!loggedIn) {
      await client.login(botToken);
      loggedIn = true;
    }

    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.messages) {
      return res.status(404).json({ error: "Canal inválido ou sem mensagens acessíveis." });
    }

    let lastId;
    while (true) {
      const options = { limit: 100 };
      if (lastId) options.before = lastId;

      const messages = await channel.messages.fetch(options);
      if (messages.size === 0) break;

      const sorted = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
      for (const message of sorted.values()) {
        if (message.author.id === botId) {
          return res.status(200).json({ firstMessageId: message.id });
        }
      }

      lastId = sorted.first().id;
    }

    res.status(404).json({ error: "Nenhuma mensagem do bot encontrada." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
