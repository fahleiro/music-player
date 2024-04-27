// Importar as dependências
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Inicializar o aplicativo Express
const app = express();
const port = 3000;

// Configurar o body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a tela de login
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Rota para autenticar o usuário
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  // Carregar os usuários do arquivo JSON
  const usuarios = JSON.parse(fs.readFileSync('usuarios.json', 'utf8'));
  // Verificar se o usuário e a senha correspondem
  const usuarioValido = usuarios.find(u => u.usuario === usuario && u.senha === senha);
  if (usuarioValido) {
    res.redirect('/index');
  } else {
    res.send('Usuário ou senha inválidos');
  }
});

// Rota para a página index
app.get('/index', (req, res) => {
  // Aqui você pode adicionar a lógica para listar o conteúdo do diretório /services/mp3-down/down
  // Por enquanto, apenas enviamos uma mensagem
  res.send('Página index');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
