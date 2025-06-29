## Result-list-de-e-commerce-frontend

![Next.js](https://img.shields.io/badge/Next.js-13+-000?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat&logo=tailwindcss)
![License](https://img.shields.io/github/license/KauanAg-devs/Result-List-de-e-commerce-frontend)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

> Projeto de e-commerce com listagem de produtos, filtros e navegação infinita.

### 🔗 Repositórios

* **Backend**: [https://github.com/KauanAg-devs/result-list-de-e-commerce-backend](https://github.com/KauanAg-devs/result-list-de-e-commerce-backend)
* **Frontend**: [https://github.com/KauanAg-devs/Result-List-de-e-commerce](https://github.com/KauanAg-devs/Result-List-de-e-commerce)

---

## 📦 Tecnologias

* **Frontend**: Next.js · React · Tailwind CSS
* **Backend**: NestJS · Prisma

---

## 🚀 Pré-requisitos

1. **Node.js** ≥ 18.x
2. **npm** ≥ 9.x ou **yarn** ≥ 1.x
3. **Banco de dados** (PostgreSQL, MySQL etc.) configurado conforme instruções do backend

---

## 🔧 Configuração

1. **Clonar repositórios**

   ```bash
   # Backend
   git clone https://github.com/KauanAg-devs/result-list-de-e-commerce-backend.git
   # Frontend
   git clone https://github.com/KauanAg-devs/Result-List-de-e-commerce.git
   ```

2. **Backend**

   ```bash
   cd result-list-de-e-commerce-backend
   npm install
   # Criar e configurar .env conforme README do backend
   npm run dev
   ```

3. **Frontend**

   ```bash
   cd frontend
   npm install   # ou yarn install
   ```

4. **Variáveis de Ambiente**

   Crie um arquivo `.env.local` na raiz do `frontend` com:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3333
   ```

5. **Executar Frontend**

   ```bash
   npm run dev   # ou yarn dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📁 Estrutura de Pastas (Frontend)

```
public/                  # Arquivos estáticos
src/
├─ app/                  # Rotas e layouts Next.js
│  ├─ (auth)/            # Login/Signup
│  ├─ (main)/            # Páginas principais e subpáginas
│  ├─ (user)/            # Perfil do usuário
│  ├─ api/               # Endpoints API Next.js
│  ├─ contexts/          # Contextos React
│  └─ hooks/             # Hooks personalizados
├─ components/           # Componentes reutilizáveis
├─ store/                # Estado global (Zustand ou Context)
├─ types/                # Tipos TypeScript
└─ utils/                # Utilitários e helpers
```

---

## 🧪 Scripts Úteis

```bash
npm run dev      
npm run build    
npm run start     
npm run lint     
```

---

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nome-da-feature`
3. Faça commits: `git commit -m 'feat: descrição da feature'`
4. Envie para o repositório remoto: `git push origin feature/nome-da-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
