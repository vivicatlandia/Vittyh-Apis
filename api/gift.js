const fs = require('fs');
const path = require('path');

// Caminho para o arquivo JSON onde os usuários são registrados
const receivedUsersPath = path.join(__dirname, '../data/receivedUsers.json');

// Função para ler o arquivo de registro
function readReceivedUsers() {
  try {
    const data = fs.readFileSync(receivedUsersPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler o arquivo de usuários recebidos:', err);
    return { users: [] }; // Retorna um array vazio caso o arquivo esteja vazio ou com erro
  }
}

// Função para salvar o arquivo de registro
function saveReceivedUsers(data) {
  try {
    fs.writeFileSync(receivedUsersPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Erro ao salvar o arquivo de usuários recebidos:', err);
  }
}

// Função que será chamada para conceder o prêmio
module.exports = async (req, res) => {
  const userId = req.query.userId; // Pegue o ID do usuário na query da requisição

  if (!userId) {
    return res.status(400).json({ error: 'User ID é necessário!' });
  }

  // Carrega os usuários que já receberam o gift
  const receivedUsersData = readReceivedUsers();
  
  // Verifica se o usuário já recebeu
  if (receivedUsersData.users.includes(userId)) {
    return res.status(400).json({ message: 'Você já recebeu seus 20k SNcoins!' });
  }

  // Adiciona os 20k SNcoins ao usuário (simulação de lógica)
  // Aqui você pode adicionar a lógica de como adicionar SNcoins ao usuário, de acordo com sua implementação.
  console.log(`Usuário ${userId} recebeu 20k SNcoins!`);
  
  // Registra o ID do usuário como recebido
  receivedUsersData.users.push(userId);
  saveReceivedUsers(receivedUsersData);

  // Responde com sucesso
  return res.status(200).json({ message: 'Você recebeu 20k SNcoins!' });
};
