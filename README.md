## Result-list-de-e-commerce

> Projeto de e-commerce com listagem de produtos, filtros e navegação infinita.

### 🔗 Repositórios

* **Backend**: [https://github.com/KauanAg-devs/result-list-de-e-commerce-backend](https://github.com/KauanAg-devs/result-list-de-e-commerce-backend)
* **Frontend**: [https://github.com/KauanAg-devs/Result-List-de-e-commerce.git](https://github.com/KauanAg-devs/Result-List-de-e-commerce.git)

---

## 📦 Tecnologias

* **Frontend**: Next.js, React, Tailwind CSS
* **Backend**: NestJS, Prisma

---

## 🚀 Pré-requisitos

1. **Node.js** ≥ 18.x
2. **npm** ≥ 9.x (ou **yarn**)
3. **Banco de dados** configurado (conforme instruções do backend)

---

## 🔧 Configuração

### 1. Clonar repositórios

```bash
# Backend
git clone https://github.com/KauanAg-devs/result-list-de-e-commerce-backend.git
# Frontend
git clone https://github.com/KauanAg-devs/Result-List-de-e-commerce.git
```

### 2. Configurar e rodar o Backend

```bash
cd result-list-de-e-commerce-backend
npm install
# configurar variáveis de ambiente (.env)
npm run dev
```

### 3. Instalar dependências do Frontend

```bash
cd frontend
npm install   # ou yarn install
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do `frontend` e adicione:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

(ajuste a porta caso necessário)

### 5. Executar o Frontend

```bash
npm run dev   # ou yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📁 Estrutura de pastas

```
frontend/
├── public/             # ativos estáticos
├── src/
│   ├── app/            # rotas e layout Next.js
│   ├── components/     # componentes reutilizáveis
│   ├── contexts/       # React contexts
│   ├── hooks/          # custom hooks
│   ├── styles/         # estilos globais
│   └── types/          # definições de tipos TypeScript
├── .env.local          # variáveis de ambiente
├── next.config.js      # configuração Next.js
└── package.json
```

---

## 🧪 Scripts úteis

```bash
npm run dev       # desenvolvedor (hot reload)
npm run build     # build para produção
npm run start     # inicia em modo de produção
npm run lint      # verifica linting
```

---

## 🤝 Contribuição

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/nome-da-feature`)
3. Commit suas mudanças (`git commit -m 'feat: descrição'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
