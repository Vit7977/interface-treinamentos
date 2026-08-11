# PROJETO INTERFACE MOBILE - GESTÃO DE TREINAMENTOS

### 1. FEATURES ESCOLHIDAS

#### Foram escolhidas as seguintes features:
- Usuario -> Feature de login/autenticação de usuário, visualização do usuário logado/perfil;
- Dashboard -> Feature do resumo geral do sistema;
- Treinamentos -> Feature para listar, buscar, ver detalhes, finalizar treinamentos;
- Certificados -> Feature para listar, buscar, ver detalhes, emitir certificados dos treinamentos; 

### 2. ESTRUTURA DE PASTAS

├── app
│   ├── AGENTS.md
│   ├── App.js
│   ├── CLAUDE.md
│   ├── LICENSE
│   ├── app.json
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── app
│       ├── core
│       ├── features
│       └── shared
├── spec.md
└── tree.txt    

### 3. NAVEGAÇÃO 

app -> login || usuario autenticado -> dashboard

└── dashboard
    ├── perfil 
    ├── treinamentos
    |   ├── listar
    |   ├── buscar
    |   ├── ver detalhes
    |   └── finalizar
    |
    └── certificados
        └──

### 4. COMUNICAÇÃO COM A API