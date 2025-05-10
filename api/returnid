// api/getFirstBotMessage.js

import { Client, GatewayIntentBits } from 'discord.js';

// Inicia o cliente do Discord com as permissões necessárias
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Função para pegar a primeira mensagem do bot no canal
async function getFirstBotMessage(channelId, botId) {
  const channel = await client.channels.fetch(channelId);

  if (!channel || channel.type !== 'GUILD_TEXT') {
    throw new Error('Canal inválido');
  }

  const messages = await channel.messages.fetch({ limit: 100 });
  const firstMessage = messages
    .filter(message => message.author.id === botId)
    .first();

  return firstMessage ? firstMessage.id : null;
}

client.once('ready', () => {
  console.log('Bot está pronto');
});

// A função da API que será exposta
export default async function handler(req, res) {
  try {
    // Obtém os parâmetros da requisição
    const { channelId, botId } = req.query;

    if (!channelId || !botId) {
      return res.status(400).json({ error: 'channelId e botId são necessários' });
    }

    // Pega a primeira mensagem do bot no canal
    const messageId = await getFirstBotMessage(channelId, botId);

    if (messageId) {
      return res.status(200).json({ messageId });
    } else {
      return res.status(404).json({ error: 'Nenhuma mensagem encontrada' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

client.login(process.env.BOT_TOKEN);
