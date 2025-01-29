# Comandos Relevantes

## Instalação de Ferramentas
- `sudo npm install -g yarn` - Instala o Yarn globalmente (necessário apenas uma vez)

## Inicialização do Projeto
- `yarn install` - Instala todas as dependências do projeto
- `docker compose up -d` - Inicia o container do PostgreSQL em background
- `yarn prisma migrate dev` - Executa as migrações do banco de dados
- `yarn start:dev` - Inicia o projeto em modo de desenvolvimento com hot-reload 

# Instalação Global NPM
sudo npm install -g <package> # Instalar pacotes npm globalmente com privilégios de administrador
npm config set prefix '~/.npm-global' # Configurar diretório personalizado para pacotes globais
export PATH=~/.npm-global/bin:$PATH # Adicionar diretório npm global ao PATH 