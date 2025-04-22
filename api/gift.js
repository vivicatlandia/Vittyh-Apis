const fs = require('fs');
const path = require('path');

// Caminho para o arquivo JSON onde os usuários são registrados
const receivedUsersPath = path.join(__dirname, '../data/receivedUsers.json');

// Função para ler o arquivo de registro
function readReceivedUsers() {
  try {
    const data = fs.readFileSync(receivedUsersPath);
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler o arquivo de usuários recebidos:', err);
    return { users: [] }; // Retorna um array vazio caso haja erro
  }
}

// Função para salvar o registro de usuários
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
  const userHasReceived = receivedUsersData.users.includes(userId);

  if (userHasReceived) {
    // Se o usuário já recebeu, retorna uma mensagem de erro
    return res.status(400).json({ message: 'Você já recebeu seus 20k SNcoins!' });
  }

  // Se o usuário ainda não recebeu, concede os 20k SNcoins
  // Exemplo de como você poderia adicionar os 20k SNcoins (adicione a lógica conforme sua implementação)
  // Adicione os 20k SNcoins ao usuário no banco de dados ou em outra estrutura de dados.

  // Registrar o usuário como tendo recebido
  receivedUsersData.users.push(userId);
  saveReceivedUsers(receivedUsersData);

  // Responde com sucesso
  return res.status(200).json({ message: 'Você recebeu 20k SNcoins!' });
};
