# AI.md — Diretrizes para Desenvolvimento com IA

## 1. Objetivo

Este arquivo define as regras e diretrizes que devem ser seguidas por qualquer IA utilizada para auxiliar no desenvolvimento deste projeto.

A IA deve utilizar este documento em conjunto com:

* `docs/arquitetura.md`
* `spect.md`
* `README.md`

Em caso de conflito entre uma sugestão da IA e a arquitetura definida em `docs/arquitetura.md`, a arquitetura do projeto deve ser priorizada.

O objetivo é garantir que o código gerado mantenha consistência com a arquitetura existente e não introduza padrões ou tecnologias desnecessárias.

---

# 2. Contexto do Projeto

O projeto é uma aplicação mobile para **gestão de treinamentos**.

O usuário autenticado poderá:

* Acessar seu perfil.
* Visualizar seu progresso.
* Consultar treinamentos.
* Buscar treinamentos.
* Visualizar detalhes dos treinamentos.
* Finalizar treinamentos.
* Consultar certificados.
* Buscar certificados.
* Visualizar detalhes dos certificados.
* Emitir certificados.

As principais features são:

```text
features/
├── usuario
├── dashboard
├── treinamentos
└── certificados
```

A arquitetura utiliza organização por domínio (**feature-based**) e separa infraestrutura técnica, funcionalidades de negócio e componentes reutilizáveis.

---

# 3. Stack Obrigatória

A IA deve trabalhar considerando as seguintes tecnologias:

* **React Native**
* **Expo**
* **React Native Paper**
* **React Navigation**
* **Axios**

Não adicionar outra biblioteca ou tecnologia sem necessidade real.

Antes de sugerir uma nova dependência, a IA deve verificar se a funcionalidade pode ser implementada utilizando as tecnologias já existentes no projeto.

---

# 4. Arquitetura

A arquitetura principal é:

```text
Screen
  ↓
Hook
  ↓
Service
  ↓
API Client
  ↓
Axios
  ↓
Backend API
```

Essa separação deve ser respeitada em todo o desenvolvimento.

As Screens não devem realizar requisições HTTP diretamente.

Os Hooks devem controlar o estado da interface.

Os Services devem encapsular as operações da API.

O API Client deve centralizar a comunicação HTTP.

---

# 5. Estrutura de Pastas

### REGRA IMPORTANTE

**Não alterar a árvore de pastas definida pelo projeto.**

A estrutura existente deve ser preservada:

```text
.
├── README.md
├── ai.md
├── app
│   ├── AGENTS.md
│   ├── App.js
│   ├── CLAUDE.md
│   ├── LICENSE
│   ├── app.json
│   ├── assets
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── app
│       ├── core
│       ├── features
│       └── shared
├── docs
│   └── arquitetura.md
├── spect.md
└── tree.txt
```

A IA não deve criar uma nova estrutura arquitetural por iniciativa própria.

Não criar pastas como:

```text
repositories/
models/
contexts/
providers/
store/
utils/
api/
```

fora dos locais já definidos pela arquitetura.

Caso uma nova pasta seja realmente necessária, a IA deve primeiro explicar a necessidade e verificar se ela pode ser acomodada dentro da estrutura existente.

---

# 6. Responsabilidades das Camadas

## 6.1 app

`app/` é responsável pela configuração global e inicialização da aplicação.

Pode conter:

* Bootstrap.
* Navegação.
* Providers.
* Contextos globais.
* Configurações globais.

Não colocar regras específicas de treinamentos ou certificados nessa camada.

---

## 6.2 core

`core/` é responsável pela infraestrutura técnica.

Responsabilidades:

* Axios.
* API Client.
* Autenticação.
* Token.
* Storage.
* Configurações técnicas.

As features não devem implementar sua própria infraestrutura HTTP ou autenticação.

A arquitetura define que autenticação, gerenciamento de token e storage sejam centralizados no `core`.

---

## 6.3 features

`features/` contém as regras e funcionalidades de negócio.

Features atuais:

```text
usuario
dashboard
treinamentos
certificados
```

Cada feature deve seguir:

```text
feature/
├── screens
├── hooks
├── services
└── components
```

A estrutura interna padronizada deve ser mantida.

---

## 6.4 shared

`shared/` contém elementos reutilizáveis.

Exemplos:

* Botões.
* Inputs.
* Cards genéricos.
* Loading.
* Mensagens.
* Componentes visuais.
* Hooks utilitários.
* Funções de formatação.

Não colocar regras específicas de uma feature em `shared`.

Exemplo:

```text
Button → shared
Loading → shared
formatDate() → shared
```

Enquanto:

```text
TreinamentoCard → features/treinamentos/components
```

A arquitetura define `shared` como espaço para elementos reutilizáveis entre diferentes features.

---

# 7. Regras para Screens

Screens são responsáveis pela apresentação da interface.

Uma Screen deve:

* Renderizar componentes.
* Capturar interações.
* Utilizar Hooks.
* Apresentar loading.
* Apresentar erros.
* Apresentar dados.
* Acionar ações disponibilizadas pelos Hooks.

Uma Screen **não deve**:

* Fazer chamadas Axios diretamente.
* Acessar o token diretamente.
* Manipular o storage diretamente.
* Implementar regras complexas de negócio.
* Criar instâncias próprias do Axios.

Exemplo correto:

```text
TreinamentosScreen
        ↓
useTreinamentos()
        ↓
treinamentoService
```

---

# 8. Regras para Hooks

Hooks são responsáveis pela orquestração do estado da interface.

Um Hook pode controlar:

```text
loading
error
data
actions
```

Exemplo:

```text
useTreinamentos()
```

pode fornecer:

```text
treinamentos
loading
error
buscar()
recarregar()
finalizar()
```

O Hook pode chamar um Service.

Exemplo:

```text
Hook
  ↓
treinamentoService.listar()
```

O Hook não deve conhecer detalhes de implementação do Axios.

---

# 9. Regras para Services

Services representam as operações da feature.

Exemplo:

```text
treinamentoService.listar()
treinamentoService.buscar()
treinamentoService.obterDetalhes()
treinamentoService.finalizar()
```

Para certificados:

```text
certificadoService.listar()
certificadoService.buscar()
certificadoService.detalhes()
certificadoService.emitir()
```

Services:

* Conhecem os endpoints.
* Montam parâmetros.
* Montam payloads.
* Chamam o API Client.
* Retornam os dados necessários.

Services não devem:

* Controlar `loading`.
* Controlar estado da Screen.
* Renderizar componentes.
* Acessar diretamente componentes React.

---

# 10. Axios

O Axios deve ser utilizado através de uma instância centralizada.

Não criar:

```text
axios.create()
```

individualmente dentro de cada Service.

O fluxo deve ser:

```text
Feature Service
      ↓
API Client
      ↓
Axios Instance
      ↓
Backend
```

O API Client deve centralizar:

* `baseURL`
* `timeout`
* headers
* autenticação
* interceptors
* tratamento técnico de respostas
* tratamento técnico de erros

A arquitetura determina explicitamente o uso de uma instância centralizada do Axios.

---

# 11. Autenticação

A autenticação deve ficar centralizada no `core`.

O token não deve ser manipulado diretamente pelas Screens.

Fluxo esperado:

```text
Login
  ↓
Autenticação
  ↓
Token
  ↓
Storage
  ↓
Sessão autenticada
```

O token deve ser recuperado durante o processo de Bootstrap.

---

# 12. Bootstrap

Bootstrap representa o processo de inicialização do aplicativo.

O Bootstrap deve:

1. Iniciar a aplicação.
2. Recuperar a sessão/token.
3. Verificar o estado da autenticação.
4. Definir o fluxo inicial de navegação.
5. Evitar que o Login apareça momentaneamente para usuários que já possuem uma sessão válida.

Fluxo:

```text
App inicia
   ↓
Bootstrap
   ↓
Recupera sessão
   ↓
Verifica autenticação
   │
   ├── Sessão válida
   │      ↓
   │   Dashboard
   │
   └── Sem sessão
          ↓
        Login
```

Enquanto a sessão estiver sendo recuperada, apresentar um estado de carregamento.

A arquitetura define que a restauração da sessão ocorra antes da decisão entre Login e Dashboard.

---

# 13. React Navigation

O React Navigation será responsável pela navegação.

Existem dois fluxos principais:

```text
Não autenticado
└── Login

Autenticado
├── Dashboard
├── Perfil
├── Treinamentos
└── Certificados
```

A navegação deve respeitar o estado de autenticação.

Usuários não autenticados não devem acessar telas protegidas.

A configuração da navegação pertence à camada `app`.

As features não devem controlar a configuração global dos navegadores.

---

# 14. React Native Paper

O React Native Paper deve ser utilizado como biblioteca principal de componentes visuais.

Preferir seus componentes quando houver uma solução adequada.

Exemplos:

```text
Button
TextInput
Card
Surface
Snackbar
Dialog
ActivityIndicator
List
Chip
```

O `PaperProvider` deve ser configurado globalmente.

O tema visual deve ser centralizado.

Evitar criar componentes visuais duplicados quando o React Native Paper já fornecer uma solução adequada.

---

# 15. Estados da Interface

As Screens devem considerar os estados:

```text
Inicial
Loading
Sucesso
Dados
Erro
Vazio
Sem conexão
Sessão expirada
```

Exemplo:

```text
loading = true
    ↓
mostrar Loading
    ↓
requisição finalizada
    ↓
┌──────────────┐
│              │
Sucesso       Erro
│              │
↓              ↓
Dados       Mensagem
```

O Hook deve controlar o estado.

A Screen deve apresentá-lo.

---

# 16. Tratamento de Erros

O tratamento deve ocorrer em camadas.

```text
Axios
  ↓
API Client
  ↓
Service
  ↓
Hook
  ↓
Screen
```

O API Client trata aspectos técnicos.

O Hook transforma o resultado em estado para a interface.

A Screen apresenta uma mensagem adequada ao usuário.

Não apresentar diretamente mensagens técnicas como:

```text
Network Error
AxiosError
Request failed with status code 500
```

quando uma mensagem amigável puder ser apresentada.

Exemplo:

```text
Não foi possível carregar os treinamentos.
Tente novamente.
```

---

# 17. Regras de UI

A interface deve seguir um padrão visual consistente.

Prioridades:

1. Utilizar React Native Paper.
2. Reutilizar componentes de `shared`.
3. Evitar estilos duplicados.
4. Manter espaçamentos consistentes.
5. Manter hierarquia visual clara.
6. Garantir feedback para ações do usuário.
7. Considerar estados de loading e erro.
8. Manter componentes simples e reutilizáveis.

Não criar uma solução visual completamente diferente para cada feature.

---

# 18. Regras de Código

A IA deve:

* Priorizar código simples.
* Evitar abstrações desnecessárias.
* Evitar overengineering.
* Reutilizar código existente.
* Respeitar os padrões já existentes no projeto.
* Manter nomes claros.
* Separar responsabilidades.
* Evitar duplicação.
* Fazer alterações pequenas e controladas.

A IA não deve introduzir padrões complexos apenas porque são considerados "boas práticas" em projetos maiores.

O projeto deve permanecer compatível com seu tamanho e objetivo.

---

# 19. Regra de Não Duplicação

Antes de criar:

* componente;
* Hook;
* Service;
* função;
* cliente HTTP;
* contexto;
* utilitário;

a IA deve verificar se algo equivalente já existe.

Se existir, reutilizar ou adaptar o existente.

Não criar duas implementações para a mesma responsabilidade.

---

# 20. Regra de Dependências

Antes de instalar uma nova dependência, verificar se:

1. React Native já resolve o problema.
2. Expo já fornece uma solução.
3. React Native Paper já possui o componente necessário.
4. React Navigation já possui o recurso necessário.
5. Axios já resolve a necessidade.

Somente adicionar uma dependência quando houver uma necessidade real.

A IA deve informar:

```text
Dependência:
Motivo:
Alternativa existente:
Por que não utilizar a alternativa:
```

antes de propor uma nova biblioteca.

---

# 21. Regra de Alteração da Arquitetura

A IA não deve modificar a arquitetura por iniciativa própria.

Antes de:

* criar uma nova camada;
* criar uma nova pasta estrutural;
* substituir uma biblioteca;
* mudar o fluxo de navegação;
* mudar a estratégia de autenticação;
* criar um novo padrão arquitetural;

deve explicar:

1. O problema atual.
2. A alteração proposta.
3. O impacto no projeto.
4. Por que a arquitetura atual não é suficiente.

Alterações arquiteturais devem ser tratadas como decisões explícitas.

---

# 22. Regra de Implementação

Ao implementar uma funcionalidade, seguir preferencialmente esta ordem:

```text
1. Entender a feature
       ↓
2. Verificar arquitetura
       ↓
3. Verificar código existente
       ↓
4. Criar/alterar Service
       ↓
5. Criar/alterar Hook
       ↓
6. Criar/alterar Components
       ↓
7. Criar/alterar Screen
       ↓
8. Integrar navegação
       ↓
9. Testar estados
```

Não colocar toda a lógica dentro da Screen.

---

# 23. Exemplo de Implementação

Para implementar a listagem de treinamentos:

```text
features/treinamentos
├── screens
│   └── TreinamentosScreen
│
├── hooks
│   └── useTreinamentos
│
├── services
│   └── treinamentoService
│
└── components
    └── TreinamentoCard
```

Fluxo:

```text
TreinamentosScreen
       ↓
useTreinamentos
       ↓
treinamentoService.listar()
       ↓
apiClient
       ↓
Axios
       ↓
Backend
```

A Screen recebe os dados através do Hook e não precisa conhecer detalhes da API.

---

# 24. Checklist para a IA

Antes de finalizar qualquer implementação, verificar:

* [ ] A implementação respeita `docs/arquitetura.md`.
* [ ] A estrutura de pastas existente foi preservada.
* [ ] A feature correta foi utilizada.
* [ ] A Screen não faz chamada HTTP diretamente.
* [ ] O estado da interface está no Hook.
* [ ] A operação da API está no Service.
* [ ] O Axios está sendo utilizado pelo API Client.
* [ ] Não foi criada uma nova instância desnecessária do Axios.
* [ ] O token não está sendo manipulado diretamente pela Screen.
* [ ] Componentes reutilizáveis foram considerados para `shared`.
* [ ] React Native Paper foi utilizado quando apropriado.
* [ ] React Navigation foi utilizado de acordo com a arquitetura.
* [ ] Loading foi tratado.
* [ ] Erros foram tratados.
* [ ] Estado vazio foi considerado quando necessário.
* [ ] Não foram adicionadas dependências desnecessárias.
* [ ] Não foi criada uma nova camada sem justificativa.
* [ ] Não houve duplicação de código.

---

# 25. Prioridade das Regras

Quando houver dúvida durante o desenvolvimento, seguir esta prioridade:

```text
1. Requisitos do projeto
        ↓
2. spect.md
        ↓
3. docs/arquitetura.md
        ↓
4. ai.md
        ↓
5. Padrões existentes no código
        ↓
6. Boas práticas gerais
```

A IA deve evitar substituir uma decisão específica do projeto por uma preferência genérica de arquitetura.

---

# 26. Comportamento Esperado da IA

A IA deve atuar como uma assistente de desenvolvimento dentro da arquitetura existente.

Ao receber uma solicitação:

1. Entender o objetivo.
2. Identificar qual feature é afetada.
3. Identificar quais camadas precisam ser alteradas.
4. Verificar o código existente.
5. Reutilizar implementações existentes.
6. Fazer a menor alteração necessária.
7. Respeitar a arquitetura.
8. Explicar alterações arquiteturais quando forem necessárias.
9. Não criar complexidade sem necessidade.

A IA deve priorizar:

**simplicidade + consistência + separação de responsabilidades + reutilização.**

---

# 27. Regra Final

O código deve seguir o princípio:

```text
Interface
    ↓
Estado
    ↓
Feature
    ↓
Infraestrutura
    ↓
API
```

Cada camada deve conhecer apenas aquilo que precisa para cumprir sua responsabilidade.

O objetivo não é criar a arquitetura mais complexa possível.

O objetivo é criar uma aplicação organizada, fácil de entender, manter e evoluir, utilizando **React Native + Expo + React Native Paper + React Navigation + Axios**, respeitando a estrutura definida para o projeto.

# 28. Rotas da API

A aplicação utiliza a API de desenvolvimento:

```text
Base URL:
http://localhost:3000
```

A comunicação com a API deve seguir obrigatoriamente o fluxo:

```text
Screen
   ↓
Hook
   ↓
Service
   ↓
API Client
   ↓
Axios
   ↓
http://localhost:3000
```

As Screens nunca devem chamar as rotas diretamente.

Os Services são responsáveis por conhecer os endpoints e montar parâmetros e payloads.

---

## 28.1 Autenticação

### Login

```http
POST /api/login
```

Não requer autenticação Bearer.

Responsabilidade:

```text
Autenticar usuário
Retornar token
Retornar refreshToken
Retornar dados básicos do usuário
```

Payload:

```json
{
  "email": "carlo.souza@empresa.com",
  "senha": "senhaSegura123"
}
```

Resposta:

```json
{
  "token": "token-fake",
  "refreshToken": "refresh-token-fake",
  "usuario": {
    "id": 1,
    "email": "carlo.souza@empresa.com",
    "funcionarioId": 1,
    "ativo": true,
    "criadoEm": "2026-01-10T08:00:00.000Z"
  }
}
```

O token deve ser armazenado pelo mecanismo de autenticação definido em `core`.

---

### Usuário autenticado

```http
GET /api/me
```

Responsabilidade:

```text
Retornar os dados do usuário logado,
seu funcionário e seus perfis.
```

Resposta esperada:

```json
{
  "usuario": {},
  "funcionario": {},
  "perfis": []
}
```

Essa rota deve ser utilizada quando a aplicação precisar recuperar ou atualizar os dados da sessão autenticada.

---

## 28.2 Sistema

### Informações da API

```http
GET /
```

Retorna metadados da API e as rotas disponíveis.

### Health Check

```http
GET /health
```

Verifica se o servidor está funcionando.

Resposta:

```json
{
  "status": "UP"
}
```

Essas rotas pertencem à categoria `Sistema`.

---

# 28.3 Dashboard

### Resumo do sistema

```http
GET /api/dashboard
```

Retorna os principais contadores:

```json
{
  "quantidadeFuncionarios": 1,
  "quantidadeUsuarios": 1,
  "quantidadeTreinamentos": 1,
  "quantidadeInstrutores": 1,
  "quantidadeCertificados": 1
}
```

Service sugerido:

```text
dashboardService.obterResumo()
```

Hook:

```text
useDashboard()
```

---

# 28.4 Funcionários

Base:

```text
/api/funcionarios
```

### Listar

```http
GET /api/funcionarios
```

Parâmetros opcionais:

```text
_page
_limit
_sort
_order
```

### Criar

```http
POST /api/funcionarios
```

Exemplo:

```json
{
  "nome": "Maria Oliveira",
  "matricula": "F002",
  "cargo": "Técnico de Segurança",
  "setor": "Operações"
}
```

### Buscar por ID

```http
GET /api/funcionarios/{id}
```

### Substituir

```http
PUT /api/funcionarios/{id}
```

### Atualizar parcialmente

```http
PATCH /api/funcionarios/{id}
```

### Excluir

```http
DELETE /api/funcionarios/{id}
```

Service:

```text
funcionarioService.listar()
funcionarioService.obterPorId(id)
funcionarioService.criar(dados)
funcionarioService.atualizar(id, dados)
funcionarioService.atualizarParcial(id, dados)
funcionarioService.excluir(id)
```

---

# 28.5 Instrutores

Base:

```text
/api/instrutores
```

### Listar

```http
GET /api/instrutores
```

Parâmetros:

```text
_page
_limit
_sort
_order
```

### Criar

```http
POST /api/instrutores
```

### Buscar por ID

```http
GET /api/instrutores/{id}
```

### Substituir

```http
PUT /api/instrutores/{id}
```

### Atualizar parcialmente

```http
PATCH /api/instrutores/{id}
```

### Excluir

```http
DELETE /api/instrutores/{id}
```

Service:

```text
instrutorService.listar()
instrutorService.obterPorId(id)
instrutorService.criar(dados)
instrutorService.atualizar(id, dados)
instrutorService.atualizarParcial(id, dados)
instrutorService.excluir(id)
```

---

# 28.6 Usuários

Base:

```text
/api/usuarios
```

### Listar

```http
GET /api/usuarios
```

Parâmetros:

```text
_page
_limit
_sort
_order
```

### Criar

```http
POST /api/usuarios
```

### Buscar por ID

```http
GET /api/usuarios/{id}
```

### Substituir

```http
PUT /api/usuarios/{id}
```

### Atualizar parcialmente

```http
PATCH /api/usuarios/{id}
```

### Excluir

```http
DELETE /api/usuarios/{id}
```

Service:

```text
usuarioService.listar()
usuarioService.obterPorId(id)
usuarioService.criar(dados)
usuarioService.atualizar(id, dados)
usuarioService.atualizarParcial(id, dados)
usuarioService.excluir(id)
```

---

# 28.7 Perfis

Base:

```text
/api/perfis
```

### Listar

```http
GET /api/perfis
```

### Criar

```http
POST /api/perfis
```

### Buscar por ID

```http
GET /api/perfis/{id}
```

### Substituir

```http
PUT /api/perfis/{id}
```

### Atualizar parcialmente

```http
PATCH /api/perfis/{id}
```

### Excluir

```http
DELETE /api/perfis/{id}
```

Service:

```text
perfilService.listar()
perfilService.obterPorId(id)
perfilService.criar(dados)
perfilService.atualizar(id, dados)
perfilService.atualizarParcial(id, dados)
perfilService.excluir(id)
```

---

# 28.8 Permissões

Base:

```text
/api/permissoes
```

### Listar

```http
GET /api/permissoes
```

### Criar

```http
POST /api/permissoes
```

### Buscar por ID

```http
GET /api/permissoes/{id}
```

### Substituir

```http
PUT /api/permissoes/{id}
```

### Atualizar parcialmente

```http
PATCH /api/permissoes/{id}
```

### Excluir

```http
DELETE /api/permissoes/{id}
```

Service:

```text
permissaoService.listar()
permissaoService.obterPorId(id)
permissaoService.criar(dados)
permissaoService.atualizar(id, dados)
permissaoService.atualizarParcial(id, dados)
permissaoService.excluir(id)
```

---

# 28.9 Perfil Permissões

Base:

```text
/api/perfilPermissoes
```

Representa o vínculo entre um perfil e uma permissão.

### Listar

```http
GET /api/perfilPermissoes
```

### Criar vínculo

```http
POST /api/perfilPermissoes
```

Exemplo:

```json
{
  "perfilId": 1,
  "permissaoId": 3
}
```

### Buscar por ID

```http
GET /api/perfilPermissoes/{id}
```

### Substituir

```http
PUT /api/perfilPermissoes/{id}
```

### Atualizar parcialmente

```http
PATCH /api/perfilPermissoes/{id}
```

### Excluir

```http
DELETE /api/perfilPermissoes/{id}
```

---

# 28.10 Usuário Perfis

Base:

```text
/api/usuarioPerfis
```

Representa o vínculo entre usuário e perfil.

### Listar

```http
GET /api/usuarioPerfis
```

### Criar vínculo

```http
POST /api/usuarioPerfis
```

Exemplo:

```json
{
  "usuarioId": 2,
  "perfilId": 1
}
```

### Buscar por ID

```http
GET /api/usuarioPerfis/{id}
```

### Substituir

```http
PUT /api/usuarioPerfis/{id}
```

### Atualizar parcialmente

```http
PATCH /api/usuarioPerfis/{id}
```

### Excluir

```http
DELETE /api/usuarioPerfis/{id}
```

---

# 28.11 Treinamentos

Base:

```text
/api/treinamentos
```

### Listar treinamentos

```http
GET /api/treinamentos
```

Parâmetros:

```text
_page
_limit
_sort
_order
status
```

Valores possíveis para `status`:

```text
pendente
em_andamento
concluido
cancelado
```

Exemplo:

```http
GET /api/treinamentos?status=pendente
```

### Criar treinamento

```http
POST /api/treinamentos
```

Exemplo:

```json
{
  "titulo": "NR-10 - Segurança em Instalações Elétricas",
  "descricao": "Treinamento conforme NR-10",
  "cargaHoraria": 16,
  "status": "pendente",
  "dataInicio": "2026-09-01T08:00:00.000Z",
  "dataFim": "2026-09-02T17:00:00.000Z"
}
```

### Buscar por ID

```http
GET /api/treinamentos/{id}
```

### Substituir

```http
PUT /api/treinamentos/{id}
```

### Atualizar parcialmente

```http
PATCH /api/treinamentos/{id}
```

### Excluir

```http
DELETE /api/treinamentos/{id}
```

### Buscar treinamento completo

```http
GET /api/treinamentos/{id}/completo
```

Retorna:

```text
treinamento
instrutores
responsaveis
participantes
evidencias
```

Service:

```text
treinamentoService.listar()
treinamentoService.obterPorId(id)
treinamentoService.obterCompleto(id)
treinamentoService.criar(dados)
treinamentoService.atualizar(id, dados)
treinamentoService.atualizarParcial(id, dados)
treinamentoService.excluir(id)
```

A rota `/completo` deve ser utilizada quando a Screen precisar dos dados relacionados ao treinamento em uma única operação.

---

# 28.12 Treinamento Responsáveis

Base:

```text
/api/treinamentoResponsaveis
```

Representa o vínculo entre treinamento e usuário responsável.

### Listar

```http
GET /api/treinamentoResponsaveis
```

### Criar vínculo

```http
POST /api/treinamentoResponsaveis
```

Exemplo:

```json
{
  "treinamentoId": 1,
  "usuarioId": 2
}
```

### Buscar por ID

```http
GET /api/treinamentoResponsaveis/{id}
```

### Substituir

```http
PUT /api/treinamentoResponsaveis/{id}
```

### Atualizar parcialmente

```http
PATCH /api/treinamentoResponsaveis/{id}
```

### Excluir

```http
DELETE /api/treinamentoResponsaveis/{id}
```

---

# 28.13 Treinamento Instrutores

Base:

```text
/api/treinamentoInstrutores
```

Representa o vínculo entre treinamento e instrutor.

### Listar

```http
GET /api/treinamentoInstrutores
```

### Vincular instrutor

```http
POST /api/treinamentoInstrutores
```

Exemplo:

```json
{
  "treinamentoId": 1,
  "instrutorId": 2
}
```

### Buscar por ID

```http
GET /api/treinamentoInstrutores/{id}
```

### Substituir

```http
PUT /api/treinamentoInstrutores/{id}
```

### Atualizar parcialmente

```http
PATCH /api/treinamentoInstrutores/{id}
```

### Excluir

```http
DELETE /api/treinamentoInstrutores/{id}
```

---

# 28.14 Treinamento Participantes

Base:

```text
/api/treinamentoParticipantes
```

Representa a inscrição de um funcionário em um treinamento.

### Listar participantes

```http
GET /api/treinamentoParticipantes
```

Parâmetros:

```text
_page
_limit
_sort
_order
treinamentoId
funcionarioId
```

Exemplos:

```http
GET /api/treinamentoParticipantes?treinamentoId=1
```

```http
GET /api/treinamentoParticipantes?funcionarioId=1
```

### Inscrever participante

```http
POST /api/treinamentoParticipantes
```

Exemplo:

```json
{
  "treinamentoId": 1,
  "funcionarioId": 2,
  "status": "pendente",
  "inscritoEm": "2026-08-04T10:00:00.000Z"
}
```

### Buscar por ID

```http
GET /api/treinamentoParticipantes/{id}
```

### Substituir

```http
PUT /api/treinamentoParticipantes/{id}
```

### Atualizar parcialmente

```http
PATCH /api/treinamentoParticipantes/{id}
```

### Excluir

```http
DELETE /api/treinamentoParticipantes/{id}
```

A listagem permite filtrar tanto por treinamento quanto por funcionário.

---

# 28.15 Assinaturas

Base:

```text
/api/assinaturas
```

Representa assinaturas relacionadas à lista de presença.

### Listar

```http
GET /api/assinaturas
```

### Registrar assinatura

```http
POST /api/assinaturas
```

Exemplo:

```json
{
  "treinamentoParticipantesId": 2,
  "tipo": "lista_de_presenca",
  "assinadoEm": "2026-08-04T09:00:00.000Z",
  "hash": "abc123"
}
```

### Buscar por ID

```http
GET /api/assinaturas/{id}
```

### Substituir

```http
PUT /api/assinaturas/{id}
```

### Atualizar parcialmente

```http
PATCH /api/assinaturas/{id}
```

### Excluir

```http
DELETE /api/assinaturas/{id}
```

---

# 28.16 Evidências

Base:

```text
/api/evidencias
```

### Listar evidências

```http
GET /api/evidencias
```

Parâmetros:

```text
_page
_limit
_sort
_order
treinamentoId
```

Exemplo:

```http
GET /api/evidencias?treinamentoId=1
```

### Registrar evidência

```http
POST /api/evidencias
```

Exemplo:

```json
{
  "treinamentoId": 1,
  "tipo": "video",
  "descricao": "Vídeo da avaliação prática",
  "arquivo": "avaliacao_pratica_nr35.mp4",
  "registradoEm": "2026-03-10T15:00:00.000Z"
}
```

### Buscar por ID

```http
GET /api/evidencias/{id}
```

### Substituir

```http
PUT /api/evidencias/{id}
```

### Atualizar parcialmente

```http
PATCH /api/evidencias/{id}
```

### Excluir

```http
DELETE /api/evidencias/{id}
```

A rota de listagem aceita filtro por `treinamentoId`.

---

# 28.17 Certificados

Base:

```text
/api/certificados
```

### Listar certificados

```http
GET /api/certificados
```

Parâmetros:

```text
_page
_limit
_sort
_order
status
```

Valores possíveis:

```text
valido
expirado
cancelado
```

Exemplo:

```http
GET /api/certificados?status=valido
```

### Emitir certificado

```http
POST /api/certificados
```

Exemplo:

```json
{
  "treinamentoParticipantesId": 2,
  "numero": "CERT-2026-0002",
  "dataEmissao": "2026-08-04T08:00:00.000Z",
  "dataValidade": "2027-08-04T08:00:00.000Z",
  "status": "valido"
}
```

### Buscar por ID

```http
GET /api/certificados/{id}
```

### Substituir

```http
PUT /api/certificados/{id}
```

### Atualizar parcialmente

```http
PATCH /api/certificados/{id}
```

### Excluir

```http
DELETE /api/certificados/{id}
```

### Buscar certificado completo

```http
GET /api/certificados/{id}/completo
```

Retorna:

```text
certificado
participante
funcionario
treinamento
```

A rota completa existe para evitar que a aplicação precise realizar várias requisições para montar os dados detalhados de um certificado.

Service:

```text
certificadoService.listar()
certificadoService.obterPorId(id)
certificadoService.obterCompleto(id)
certificadoService.emitir(dados)
certificadoService.atualizar(id, dados)
certificadoService.atualizarParcial(id, dados)
certificadoService.excluir(id)
```

---

# 28.18 Auditorias

Base:

```text
/api/auditorias
```

### Listar auditorias

```http
GET /api/auditorias
```

Parâmetros:

```text
_page
_limit
_sort
_order
entidade
usuarioId
```

Exemplo:

```http
GET /api/auditorias?entidade=certificados
```

```http
GET /api/auditorias?usuarioId=1
```

### Registrar auditoria

```http
POST /api/auditorias
```

Exemplo:

```json
{
  "entidade": "treinamentos",
  "entidadeId": 1,
  "acao": "atualizacao",
  "usuarioId": 1,
  "detalhe": "Status atualizado para concluido",
  "realizadoEm": "2026-08-04T10:00:00.000Z"
}
```

### Buscar por ID

```http
GET /api/auditorias/{id}
```

### Substituir

```http
PUT /api/auditorias/{id}
```

### Atualizar parcialmente

```http
PATCH /api/auditorias/{id}
```

### Excluir

```http
DELETE /api/auditorias/{id}
```

A listagem permite filtrar por entidade e usuário.

---

# 28.19 Parâmetros padrão de listagem

As rotas que suportam paginação utilizam:

```text
_page
_limit
_sort
_order
```

### `_page`

Número da página.

```text
_default: 1
```

### `_limit`

Quantidade de itens por página.

```text
_default: 10
```

### `_sort`

Campo utilizado para ordenação.

### `_order`

Direção da ordenação.

A IA deve utilizar esses parâmetros somente nas rotas que os disponibilizam.

Não adicionar parâmetros de paginação por conta própria em endpoints que não os definem.

---

# 28.20 Regras de utilização das rotas

A IA deve seguir estas regras ao trabalhar com a API:

1. Nunca chamar Axios diretamente de uma Screen.

2. Toda chamada HTTP deve passar pelo API Client centralizado.

3. Cada feature deve possuir Services responsáveis por seus endpoints.

4. Hooks devem chamar Services e controlar:

   * loading;
   * error;
   * data;
   * ações da interface.

5. Screens devem consumir os Hooks.

6. O token deve ser tratado pelo `core`.

7. Não armazenar ou manipular tokens diretamente dentro de Screens ou Components.

8. Não criar uma nova instância de Axios para uma feature.

9. Não criar endpoints que não estejam definidos neste contrato sem verificar primeiro a API.

10. Não alterar o nome de um endpoint por preferência da IA.

11. Não criar uma rota alternativa para resolver um problema que possa ser resolvido utilizando uma rota existente.

12. Quando uma rota `/completo` existir, utilizá-la quando a necessidade for obter o recurso com seus relacionamentos.

13. Quando uma rota possuir filtros específicos, utilizar os filtros existentes em vez de buscar todos os registros e filtrar desnecessariamente no aplicativo.

14. Os Services devem conhecer os nomes e formatos dos endpoints.

15. A Screen não deve conhecer detalhes de URL, query parameters ou Axios.

---

# 28.21 Mapeamento entre Features e API

```text
features/
│
├── usuario
│   ├── /api/login
│   ├── /api/me
│   ├── /api/usuarios
│   ├── /api/funcionarios
│   ├── /api/perfis
│   ├── /api/permissoes
│   ├── /api/perfilPermissoes
│   └── /api/usuarioPerfis
│
├── dashboard
│   └── /api/dashboard
│
├── treinamentos
│   ├── /api/treinamentos
│   ├── /api/treinamentos/{id}
│   ├── /api/treinamentos/{id}/completo
│   ├── /api/treinamentoResponsaveis
│   ├── /api/treinamentoInstrutores
│   ├── /api/treinamentoParticipantes
│   ├── /api/assinaturas
│   └── /api/evidencias
│
└── certificados
    ├── /api/certificados
    ├── /api/certificados/{id}
    └── /api/certificados/{id}/completo
```

As rotas de auditoria são infraestrutura funcional transversal e podem ser utilizadas pelos Services quando houver necessidade de registrar operações:

```text
/api/auditorias
```

---

# 28.22 Resumo dos endpoints

| Recurso                 | GET lista                       | POST                            | GET por ID | PUT     | PATCH   | DELETE  |
| ----------------------- | ------------------------------- | ------------------------------- | ---------- | ------- | ------- | ------- |
| Funcionários            | `/api/funcionarios`             | `/api/funcionarios`             | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Instrutores             | `/api/instrutores`              | `/api/instrutores`              | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Usuários                | `/api/usuarios`                 | `/api/usuarios`                 | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Perfis                  | `/api/perfis`                   | `/api/perfis`                   | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Permissões              | `/api/permissoes`               | `/api/permissoes`               | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Perfil Permissões       | `/api/perfilPermissoes`         | `/api/perfilPermissoes`         | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Usuário Perfis          | `/api/usuarioPerfis`            | `/api/usuarioPerfis`            | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Treinamentos            | `/api/treinamentos`             | `/api/treinamentos`             | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Resp. Treinamento       | `/api/treinamentoResponsaveis`  | `/api/treinamentoResponsaveis`  | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Instrutores Treinamento | `/api/treinamentoInstrutores`   | `/api/treinamentoInstrutores`   | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Participantes           | `/api/treinamentoParticipantes` | `/api/treinamentoParticipantes` | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Assinaturas             | `/api/assinaturas`              | `/api/assinaturas`              | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Evidências              | `/api/evidencias`               | `/api/evidencias`               | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Certificados            | `/api/certificados`             | `/api/certificados`             | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |
| Auditorias              | `/api/auditorias`               | `/api/auditorias`               | `/{id}`    | `/{id}` | `/{id}` | `/{id}` |

Rotas especiais:

```text
POST /api/login

GET /api/me

GET /api/dashboard

GET /
GET /health

GET /api/treinamentos/{id}/completo

GET /api/certificados/{id}/completo
```

---

# 28.23 Regra de prioridade entre API e implementação

A definição das rotas da API deve ser considerada parte do contrato do projeto.

Ao implementar uma funcionalidade, a IA deve:

```text
1. Verificar a rota existente
        ↓
2. Verificar o método HTTP
        ↓
3. Verificar parâmetros
        ↓
4. Verificar payload
        ↓
5. Criar/ajustar Service
        ↓
6. Criar/ajustar Hook
        ↓
7. Criar/ajustar Screen
```

A IA não deve inventar endpoints, alterar nomes de propriedades ou criar estruturas de payload diferentes das definidas pela API sem uma justificativa explícita.

Caso a API não possua uma operação necessária, a IA deve informar a ausência antes de propor alteração arquitetural ou criação de uma nova rota.
