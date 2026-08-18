# Arquitetura do Projeto — Interface Mobile

## 1. Visão Geral

O projeto consiste em uma aplicação mobile para **gestão de treinamentos**, desenvolvida utilizando **React Native com Expo**.

A aplicação permite que usuários autenticados acompanhem seus treinamentos, consultem seu progresso e acessem os certificados obtidos após a conclusão das atividades.

A arquitetura foi organizada utilizando o padrão **feature-based**, separando o código por domínio de negócio e isolando a infraestrutura técnica em uma camada `core`.

As principais tecnologias utilizadas são:

- **React Native** — desenvolvimento da interface mobile.
- **Expo** — ambiente e ferramentas para desenvolvimento, execução e build da aplicação React Native.
- **React Native Paper** — biblioteca de componentes visuais baseada em Material Design.
- **React Navigation** — gerenciamento da navegação entre telas.
- **Axios** — comunicação HTTP com a API.
- **JavaScript** — linguagem utilizada no desenvolvimento, conforme configuração do projeto.

---

# 2. Features Escolhidas

As features abaixo representam o núcleo funcional mínimo necessário para que um usuário consiga se autenticar, visualizar seu progresso e interagir com os treinamentos e certificados da plataforma.

## Usuário

Responsável pela autenticação e pela exposição dos dados do usuário atualmente autenticado.

### Funcionalidades

- Login.
- Recuperação/restauração da sessão.
- Visualização dos dados do perfil.
- Logout.

### Justificativa

O usuário é o ponto de entrada do aplicativo. Os dados de treinamentos, progresso e certificados são pessoais e devem estar vinculados ao usuário autenticado.

A autenticação também determina qual fluxo de navegação será apresentado ao usuário.

---

## Dashboard

Tela inicial apresentada após a autenticação.

Responsável por apresentar uma visão resumida da situação do usuário no sistema.

### Possíveis indicadores

- Treinamentos em andamento.
- Treinamentos pendentes.
- Treinamentos concluídos.
- Certificados emitidos.
- Progresso geral.

### Justificativa

O Dashboard funciona como a tela principal do aplicativo após o login, permitindo que o usuário tenha uma visão geral antes de acessar funcionalidades específicas.

---

## Treinamentos

Feature responsável pelo gerenciamento dos treinamentos disponíveis para o usuário.

### Funcionalidades

- Listar treinamentos.
- Buscar treinamentos.
- Visualizar detalhes.
- Acompanhar progresso.
- Finalizar treinamento.

### Justificativa

Treinamentos representam a funcionalidade central do produto. O objetivo principal do aplicativo é permitir que o usuário acompanhe e conclua suas atividades de capacitação.

---

## Certificados

Feature responsável pelo gerenciamento dos certificados associados aos treinamentos concluídos.

### Funcionalidades

- Listar certificados.
- Buscar certificados.
- Visualizar detalhes.
- Emitir certificado.

### Justificativa

O certificado é uma consequência direta da conclusão de um treinamento e representa a comprovação formal do aprendizado realizado pelo usuário.

---

# 3. Estrutura de Pastas

A estrutura de pastas será mantida conforme definida para o projeto:

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

A pasta raiz `app/` contém os arquivos de configuração e bootstrap do projeto React Native/Expo.

Dentro de `app/src/` está concentrado o código-fonte principal da aplicação.

A organização interna segue quatro responsabilidades principais:

- `app/` — configuração global, bootstrap e navegação.
- `core/` — infraestrutura técnica.
- `features/` — regras e funcionalidades específicas de cada domínio.
- `shared/` — componentes e utilitários reutilizáveis.

---

# 4. Racional da Arquitetura

A arquitetura utiliza **organização por feature (feature-based)** em conjunto com uma separação entre infraestrutura, funcionalidades de negócio e componentes reutilizáveis.

Essa abordagem evita que o projeto seja organizado apenas por tipo técnico, como:

```text
screens/
hooks/
services/
components/
```

Em vez disso, cada domínio possui seus próprios arquivos relacionados:

```text
features/
├── usuario/
├── dashboard/
├── treinamentos/
└── certificados/
```

Dessa maneira, alterações relacionadas a treinamentos ficam concentradas dentro da própria feature de treinamentos, reduzindo o acoplamento com as demais funcionalidades.

---

# 5. Responsabilidade das Camadas

## 5.1 app

A pasta `app/` contém elementos relacionados à inicialização e configuração global da aplicação.

Entre suas responsabilidades estão:

- Bootstrap da aplicação.
- Configuração da navegação.
- Providers globais.
- Inicialização de contextos.
- Definição dos fluxos de navegação.
- Configurações globais da aplicação.

O `app` não deve concentrar regras específicas de negócio das features.

---

## 5.2 core

A pasta `core/` concentra a infraestrutura técnica utilizada por diferentes partes do aplicativo.

Exemplos:

- Cliente HTTP.
- Configuração do Axios.
- Autenticação.
- Gerenciamento de token.
- Storage local.
- Configurações técnicas.

O objetivo é impedir que as features precisem conhecer detalhes de implementação da infraestrutura.

Por exemplo, uma tela de treinamentos não deve precisar saber como o Axios está configurado ou onde o token está armazenado.

---

## 5.3 features

A pasta `features/` contém as funcionalidades organizadas por domínio de negócio.

As features principais são:

```text
features/
├── usuario
├── dashboard
├── treinamentos
└── certificados
```

Cada feature possui internamente o mesmo padrão:

```text
features/treinamentos
├── screens
├── hooks
├── services
└── components
```

Essa padronização facilita a manutenção e permite que novas features sejam adicionadas seguindo a mesma estrutura.

---

## 5.4 shared

A pasta `shared/` contém elementos reutilizáveis entre diferentes features.

Exemplos:

- Componentes visuais.
- Botões personalizados.
- Inputs.
- Cards.
- Loading.
- Mensagens de erro.
- Hooks utilitários.
- Funções de formatação.
- Componentes baseados no React Native Paper.

O `shared` não deve conter regras específicas de uma feature.

Por exemplo, um componente `Button` pode estar em `shared`, enquanto um componente `TreinamentoCard` específico da funcionalidade de treinamentos deve permanecer em:

```text
features/treinamentos/components
```

---

# 6. Estrutura Interna das Features

Cada feature segue o padrão:

```text
features/<feature>
├── screens
├── hooks
├── services
└── components
```

## Screens

Responsáveis pela apresentação da interface e interação do usuário.

As Screens:

- Renderizam componentes.
- Capturam interações.
- Utilizam Hooks.
- Exibem estados de loading, erro e dados.

As Screens **não devem realizar chamadas HTTP diretamente**.

---

## Hooks

Responsáveis pela orquestração do estado necessário para a interface.

Exemplos de responsabilidades:

- Controlar `loading`.
- Controlar `error`.
- Armazenar dados recebidos.
- Executar Services.
- Atualizar o estado da tela.
- Expor ações para a Screen.

Exemplo conceitual:

```text
Screen
  ↓
useTreinamentos()
  ↓
treinamentoService
```

---

## Services

Responsáveis por encapsular as operações específicas da feature e o acesso aos endpoints da API.

Exemplos:

```text
treinamentoService.listar()
treinamentoService.buscar()
treinamentoService.obterDetalhes()
treinamentoService.finalizar()
```

Ou:

```text
certificadoService.listar()
certificadoService.buscar()
certificadoService.detalhes()
certificadoService.emitir()
```

Os Services não devem controlar estados da interface, como `loading` ou `error`.

---

## Components

Contêm componentes visuais específicos da feature.

Exemplo:

```text
features/treinamentos/components
```

pode conter componentes como:

```text
TreinamentoCard
TreinamentoProgress
TreinamentoStatus
```

Componentes que possam ser utilizados por diversas features devem ser avaliados para possível movimentação para `shared/`.

---

# 7. Navegação

A navegação será implementada utilizando **React Navigation**.

A aplicação possui dois grandes fluxos:

```text
Aplicação
│
├── Fluxo não autenticado
│   └── Login
│
└── Fluxo autenticado
    └── Dashboard
        ├── Perfil
        ├── Treinamentos
        │   ├── Listar
        │   ├── Buscar
        │   ├── Detalhes
        │   └── Finalizar
        │
        └── Certificados
            ├── Listar
            ├── Buscar
            ├── Detalhes
            └── Emitir
```

A aplicação não deve permitir que usuários não autenticados acessem telas protegidas.

Da mesma forma, o fluxo autenticado não deve ser apresentado enquanto a aplicação ainda estiver verificando a sessão.

---

# 8. Bootstrap e Restauração da Sessão

Ao iniciar o aplicativo, o processo de bootstrap deve verificar se existe uma sessão/token armazenado localmente.

O fluxo será:

```text
App inicia
   ↓
Bootstrap
   ↓
Recupera sessão/token
   ↓
Verifica autenticação
   │
   ├── Sessão válida
   │      ↓
   │   Navegação autenticada
   │      ↓
   │   Dashboard
   │
   └── Sessão inexistente/inválida
          ↓
      Navegação não autenticada
          ↓
        Login
```

Durante a verificação inicial, a aplicação deve apresentar um estado de carregamento para evitar que o usuário veja momentaneamente o Login antes da restauração da sessão.

O bootstrap é responsável apenas por determinar o estado inicial da aplicação. As regras específicas das features continuam dentro de suas respectivas camadas.

---

# 9. Autenticação e Storage

A autenticação será centralizada no `core`.

A responsabilidade será dividida conceitualmente entre:

```text
core/
├── auth
├── storage
└── api
```

O `auth` será responsável pelas operações relacionadas à autenticação.

O `storage` será responsável pela persistência local da sessão/token.

O `api` será responsável pela comunicação HTTP.

As telas não devem acessar diretamente o armazenamento do token.

Por exemplo, uma Screen não deve executar diretamente operações de storage para descobrir se o usuário está autenticado.

Essa responsabilidade deve ser fornecida por uma camada apropriada do `core`.

---

# 10. Comunicação com a API

A comunicação entre o aplicativo e o backend seguirá o fluxo:

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

## Screen

Responsável pela interface e interação do usuário.

Não realiza requisições HTTP diretamente.

---

## Hook

Gerencia o estado necessário para a interface e chama o Service correspondente.

Exemplo:

```text
useTreinamentos()
```

pode controlar:

```text
loading
error
treinamentos
buscar()
recarregar()
```

---

## Service

Define as operações específicas do domínio.

Exemplo:

```text
treinamentoService.listar()
```

O Service conhece o endpoint e os dados necessários para realizar a operação, mas não conhece detalhes da interface.

---

## API Client

O API Client será implementado utilizando **Axios**.

Ele será responsável por centralizar configurações como:

- Base URL.
- Headers.
- Timeout.
- Autenticação.
- Interceptors.
- Tratamento técnico das respostas HTTP.
- Tratamento de erros relacionados à comunicação.

A configuração do Axios deve ficar no `core`, evitando a criação de diferentes clientes HTTP dentro das features.

---

# 11. Axios

O Axios será utilizado como cliente HTTP principal da aplicação.

A arquitetura deve utilizar uma instância centralizada do Axios, em vez de criar configurações diferentes em cada Service.

Conceitualmente:

```text
Feature Service
      ↓
API Client
      ↓
Axios Instance
      ↓
Backend
```

O Axios Client poderá centralizar configurações como:

```text
baseURL
timeout
headers
interceptors
```

A inclusão do token de autenticação deve ser tratada de forma centralizada, evitando que cada Service precise adicionar manualmente o token em suas requisições.

---

# 12. React Native Paper

O **React Native Paper** será utilizado como biblioteca principal de componentes visuais.

Componentes reutilizáveis e elementos de interface comuns devem preferencialmente utilizar os componentes fornecidos pela biblioteca.

Exemplos:

- Button.
- TextInput.
- Card.
- Surface.
- Snackbar.
- Dialog.
- ActivityIndicator.
- List.
- Chip.

O `PaperProvider` deve ser configurado no nível global da aplicação, dentro da estrutura responsável pelos providers.

A customização visual global, como tema e cores, deve permanecer centralizada para evitar que cada Screen implemente seu próprio padrão visual.

Componentes específicos de uma feature podem utilizar componentes do React Native Paper, mas devem permanecer dentro da própria feature quando não forem reutilizáveis.

---

# 13. Responsabilidade do React Navigation

O React Navigation será responsável pelo gerenciamento das rotas e pela transição entre telas.

A navegação deve ser separada conceitualmente em:

```text
Navigation
├── Não autenticado
│   └── Login
│
└── Autenticado
    ├── Dashboard
    ├── Perfil
    ├── Treinamentos
    └── Certificados
```

A decisão sobre qual fluxo deve ser apresentado depende do estado de autenticação recuperado durante o bootstrap.

A navegação não deve ser utilizada como mecanismo para armazenar regras de negócio.

Por exemplo, a conclusão de um treinamento deve ser responsabilidade da feature de treinamentos, e não da configuração do navigator.

---

# 14. Fluxo Completo de uma Operação

Um exemplo de carregamento da lista de treinamentos:

```text
Usuário acessa Treinamentos
        ↓
TreinamentosScreen
        ↓
useTreinamentos()
        ↓
treinamentoService.listar()
        ↓
apiClient
        ↓
Axios
        ↓
Backend API
        ↓
Resposta HTTP
        ↓
Service
        ↓
Hook atualiza estado
        ↓
Screen renderiza os dados
```

Essa divisão permite que cada parte tenha uma responsabilidade específica.

---

# 15. Estados da Interface

As telas devem considerar, no mínimo, os seguintes estados:

```text
Inicial
  ↓
Loading
  ↓
Sucesso
  ↓
Dados apresentados
```

Também devem existir estados para:

```text
Erro
Dados vazios
Sem conexão
Sessão expirada
```

Os Hooks são responsáveis por orquestrar esses estados, enquanto as Screens são responsáveis por apresentá-los visualmente.

Componentes reutilizáveis para loading, mensagens e feedback visual podem ser colocados em `shared/`.

---

# 16. Tratamento de Erros

O tratamento de erros deve ser dividido entre infraestrutura e interface.

O `API Client` deve tratar aspectos técnicos das respostas HTTP, enquanto os Hooks devem transformar os resultados em estados adequados para a interface.

Exemplo:

```text
Axios
  ↓
Erro HTTP
  ↓
API Client
  ↓
Service
  ↓
Hook
  ↓
Estado de erro
  ↓
Screen
  ↓
Mensagem para usuário
```

Erros técnicos não devem ser exibidos diretamente ao usuário quando não forem compreensíveis.

A interface deve apresentar mensagens claras e adequadas ao contexto.

---

# 17. Decisões Arquiteturais

## 17.1 Organização por Feature

O projeto utiliza organização por domínio de negócio em vez de organização global por tipo de arquivo.

Essa abordagem facilita:

- Localização do código.
- Manutenção.
- Testes.
- Evolução independente das features.
- Redução do acoplamento entre domínios.

---

## 17.2 Separação entre Core e Shared

O `core` concentra infraestrutura técnica.

O `shared` concentra elementos reutilizáveis da aplicação.

A diferença principal é:

```text
core   → infraestrutura
shared → reutilização
```

Exemplo:

```text
Axios Client → core
Storage → core
Auth → core

Button reutilizável → shared
Loading reutilizável → shared
Formatadores → shared
```

---

## 17.3 Services Isolando a API

Nenhuma Screen deve realizar chamadas HTTP diretamente.

Os Hooks também não devem conhecer detalhes do Axios.

A comunicação deve ocorrer através dos Services:

```text
Screen → Hook → Service → API Client
```

Essa decisão facilita testes, manutenção e futura substituição da fonte de dados.

---

## 17.4 Hooks como Orquestradores da Interface

Os Hooks concentram o estado necessário para a interface.

Exemplos:

```text
loading
error
data
actions
```

Isso evita que as Screens acumulem regras de estado e chamadas de serviços.

---

## 17.5 Autenticação Centralizada

A autenticação fica concentrada no `core`.

O token não deve ser manipulado individualmente pelas Screens.

A restauração da sessão ocorre durante o bootstrap, antes da definição do fluxo de navegação.

Essa decisão evita verificações de autenticação espalhadas pela aplicação.

---

## 17.6 Navegação Separada das Features

O React Navigation pertence à camada de configuração da aplicação.

As features informam as ações necessárias, mas não devem possuir responsabilidade sobre a configuração global dos navegadores.

Isso permite modificar a estrutura de navegação sem alterar as regras internas de cada domínio.

---

## 17.7 Interface Padronizada

O React Native Paper será utilizado para manter consistência visual entre as telas.

A configuração de tema deve ser centralizada.

Componentes altamente reutilizáveis devem ser colocados em `shared`, enquanto componentes específicos devem permanecer em suas respectivas features.

---

## 17.8 Cliente HTTP Centralizado

O Axios será utilizado através de um cliente centralizado.

As features não devem criar suas próprias instâncias de Axios.

Isso permite centralizar:

- URL da API.
- Headers.
- Token.
- Timeout.
- Interceptors.
- Tratamento técnico de respostas.

---

## 17.9 Estrutura Interna Padronizada

Todas as features devem seguir o mesmo padrão:

```text
screens
hooks
services
components
```

Isso reduz a curva de aprendizado e facilita a criação de novas funcionalidades.

---

# 18. Fluxo Arquitetural Resumido

A arquitetura geral pode ser representada da seguinte forma:

```text
                    ┌─────────────────────┐
                    │       Screen        │
                    │  React Native       │
                    │  React Native Paper │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │        Hook         │
                    │ Estado da interface │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Service       │
                    │ Regra da Feature    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     API Client      │
                    │       Axios         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Backend API      │
                    └─────────────────────┘
```

Infraestrutura transversal:

```text
┌─────────────────────────────────────────────┐
│                    core                     │
│                                             │
│  Auth  ─── Storage  ─── API Client/Axios    │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│                    app                      │
│                                             │
│ Bootstrap ─ Navigation ─ Providers ─ Config │
│                                             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│                   shared                    │
│                                             │
│ Components ─ Hooks utilitários ─ Helpers    │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 19. Princípios para o Desenvolvimento

Durante o desenvolvimento, as seguintes regras devem ser mantidas:

1. Screens não realizam chamadas HTTP diretamente.
2. Hooks controlam o estado necessário para a interface.
3. Services encapsulam operações da API.
4. Axios fica centralizado no `core`.
5. Tokens e sessão ficam centralizados no `core`.
6. React Navigation fica concentrado na configuração de navegação da aplicação.
7. React Native Paper é utilizado como base dos componentes visuais.
8. Componentes reutilizáveis devem ficar em `shared`.
9. Componentes específicos devem permanecer dentro da feature correspondente.
10. Regras específicas de negócio devem permanecer dentro das respectivas features.
11. Infraestrutura técnica não deve ser implementada diretamente nas Screens.
12. O bootstrap deve recuperar a sessão antes de decidir entre Login e Dashboard.
13. Estados de loading, erro, sucesso e vazio devem ser tratados pela interface.
14. Novas features devem seguir a mesma estrutura interna existente.
15. Alterações na infraestrutura devem exigir o mínimo possível de mudanças nas features.

---

# 20. Resultado Esperado da Arquitetura

A arquitetura proposta busca manter o aplicativo simples, organizado e preparado para evolução.

O fluxo principal esperado é:

```text
Expo
  ↓
App Bootstrap
  ↓
Verificação da Sessão
  │
  ├── Não autenticado → Login
  │
  └── Autenticado → Dashboard
                         │
                         ├── Perfil
                         │
                         ├── Treinamentos
                         │      ↓
                         │   Hooks
                         │      ↓
                         │   Services
                         │      ↓
                         │   Axios
                         │      ↓
                         │   API
                         │
                         └── Certificados
                                ↓
                             Hooks
                                ↓
                             Services
                                ↓
                             Axios
                                ↓
                              API
```

Essa estrutura mantém uma separação clara entre **interface, estado, domínio, infraestrutura e navegação**, permitindo que o projeto seja desenvolvido com React Native/Expo sem criar uma arquitetura excessivamente complexa para o tamanho inicial da aplicação.