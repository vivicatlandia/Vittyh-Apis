import fs from 'fs';
import path from 'path';

const dataFile = path.resolve('./data/giftedUsers.json');

export default async function handler(req, res) {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ code: 400, message: 'Parâmetro "userId" é obrigatório.' });
  }

  // Cria o arquivo se ele não existir
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }

  // Lê os IDs salvos
  const giftedUsers = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

  if (giftedUsers.includes(userId)) {
    return res.status(200).json({
      code: 409,
      message: `Usuário ${userId} já recebeu o gift.`,
      sncoins: 0
    });
  }

  // Adiciona o usuário e salva
  giftedUsers.push(userId);
  fs.writeFileSync(dataFile, JSON.stringify(giftedUsers, null, 2));

  return res.status(200).json({
    code: 200,
    message: `Gift de 20000 SNcoins concedido para ${userId}.`,
    sncoins: 20000
  });
}
