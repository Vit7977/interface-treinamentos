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
