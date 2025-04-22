const express = require('express');
const { createCanvas, loadImage } = require('@napi-rs/canvas');

const app = express();

app.get('/perfil', async (req, res) => {
  const nome = req.query.nome || 'Serena';
  const saldo = req.query.saldo || '1000';
  const canvas = createCanvas(600, 250);
  const ctx = canvas.getContext('2d');

  // Fundo rosa
  ctx.fillStyle = '#ffcce6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Texto
  ctx.fillStyle = '#333';
  ctx.font = '28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`Olá, ${nome}!`, canvas.width / 2, 120);
  ctx.fillText(`Saldo: ${saldo} SNcoins`, canvas.width / 2, 160);

  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
