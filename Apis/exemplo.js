// api/exemplo.js
export default function handler(req, res) {
  // Verifica o método da requisição
  const { method, query } = req;

  if (method === 'GET') {
    // Lógica simples para receber um parâmetro na URL
    const nome = query.nome || 'desconhecido';
    res.status(200).json({ resposta: `Olá, ${nome}!` });
  } else {
    res.status(405).send('Método não permitido');
  }
}
