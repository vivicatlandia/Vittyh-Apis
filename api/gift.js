const fs = require('fs');
const path = require('path');

// Caminho para o arquivo onde os usuários que receberam serão armazenados
const receivedUsersPath = path.join(__dirname, '../data/receivedUsers.json');

// Função para ler os dados do arquivo recebido
function readReceivedUsers() {
  try {
    if (!fs.existsSync(receivedUsersPath)) {
      // Se o arquivo não existir, cria um novo com um array vazio
      fs.writeFileSync(receivedUsersPath, JSON.stringify({ users: [] }, null, 2));
      return { users: [] };
    }

    const data = fs.readFileSync(receivedUsersPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler o arquivo:', err);
    return { users: [] };  // Retorna um array vazio em caso de erro
  }
}

// Função para salvar os dados atualizados no arquivo
function saveReceivedUsers(data) {
  try {
    fs.writeFileSync(receivedUsersPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Erro ao salvar o arquivo:', err);
  }
}

module.exports = async (req, res) => {
  const userId = req.query.userId; // Obtém o ID do usuário da query string

  if (!userId) {
    return res.status(400).json({ error: 'User ID é necessário!' });
  }

  const receivedUsersData = readReceivedUsers(); // Carrega os dados dos usuários que já receberam

  // Verifica se o usuário já recebeu os SNcoins
  if (receivedUsersData.users.includes(userId)) {
    return res.status(400).json({ message: 'Você já recebeu seus 20k SNcoins!' });
  }

  // Simula o processo de conceder os SNcoins
  console.log(`Usuário ${userId} recebeu 20k SNcoins!`);

  // Adiciona o ID do usuário ao array de usuários que receberam
  receivedUsersData.users.push(userId);
  saveReceivedUsers(receivedUsersData); // Salva a atualização no arquivo JSON

  return res.status(200).json({ message: 'Você recebeu 20k SNcoins!' });
};
