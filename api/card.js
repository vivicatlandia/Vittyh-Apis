import { createCanvas, loadImage } from '@napi-rs/canvas';
import fetch from 'node-fetch';
import path from 'path';
import { readFile } from 'fs/promises';

export default async function handler(req, res) {
  const { username = 'Usuário', saldo = 0, reputacao = 0, casamento = 'Solteiro(a)', avatar } = req.query;

  // Carrega a imagem de fundo
  const bgBuffer = await readFile(path.resolve('./assets/background.png'));
  const bg = await loadImage(bgBuffer);

  // Carrega o avatar do usuário
  const avatarResponse = await fetch(avatar);
  const avatarBuffer = await avatarResponse.arrayBuffer();
  const avatarImage = await loadImage(Buffer.from(avatarBuffer));

  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');

  // Desenha o fundo
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Avatar (circular)
  ctx.save();
  ctx.beginPath();
  ctx.arc(100, 100, 60, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatarImage, 40, 40, 120, 120);
  ctx.restore();

  // Nome
  ctx.font = '28px Sans';
  ctx.fillStyle = '#fff';
  ctx.fillText(username, 200, 80);

  // Saldo
  ctx.font = '20px Sans';
  ctx.fillStyle = '#ccc';
  ctx.fillText(`Saldo: ${saldo} SNcoins`, 200, 120);

  // Reputação
  ctx.fillText(`Reputação: ${reputacao}`, 200, 160);

  // Status de casamento
  ctx.fillText(`Casamento: ${casamento}`, 200, 200);

  res.setHeader('Content-Type', 'image/png');
  res.send(canvas.toBuffer('image/png'));
}
