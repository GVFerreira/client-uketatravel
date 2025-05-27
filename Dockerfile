# Etapa 1: build
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos essenciais primeiro (cache otimizado)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: imagem final para produção
FROM node:20-alpine AS runner

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de produção da etapa anterior
COPY --from=builder /app ./

# Garante que o ambiente está em produção
ENV NODE_ENV=production

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]
