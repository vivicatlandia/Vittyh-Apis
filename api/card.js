const { createCanvas, loadImage } = require('@napi-rs/canvas');

export default async function handler(req, res) {
  const nome = req.query.nome || "Usuário";
  const saldo = req.query.saldo || 0;
  const avatarUrl = req.query.avatar || "https://cdn.discordapp.com/emojis/1260120851790168166.png?size=2048";

  const canvas = createCanvas(600, 250);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffcce6";
  ctx.fillRect(0, 0, 600, 250);

  const avatar = await loadImage(avatarUrl);
  ctx.beginPath();
  ctx.arc(125, 125, 80, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 45, 45, 160, 160);

  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#333";
  ctx.fillText(nome, 250, 100);

  ctx.font = "22px sans-serif";
  ctx.fillText(`Saldo: ${saldo} SNcoins`, 250, 140);

  res.setHeader("Content-Type", "image/png");
  res.send(canvas.toBuffer());
}
