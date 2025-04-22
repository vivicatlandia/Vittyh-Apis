module.exports = async (req, res) => {
  const userId = req.query.userId;

  // Se não receber o userId, retornar erro
  if (!userId) {
    return res.status(400).json({ error: 'Parâmetro userId é obrigatório.' });
  }

  // Aqui você pode verificar se o usuário já recebeu o gift
  // Em produção, use um banco de dados, aqui estamos apenas armazenando em memória
  if (userId === '12345') {  // Substitua '12345' pelo ID do usuário para testar
    return res.status(200).json({ message: 'Você já recebeu o gift!', SNcoins: 0 });
  }

  // Lógica para dar os 20k de SNcoins
  return res.status(200).json({ message: 'Gift recebido com sucesso!', SNcoins: 20000 });
};
