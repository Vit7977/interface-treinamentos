# PROJETO INTERFACE MOBILE - GESTÃO DE TREINAMENTOS

## Features Escolhidas

As features abaixo foram selecionadas por representarem o núcleo funcional mínimo necessário para que um usuário consiga se autenticar, visualizar seu progresso e interagir com os treinamentos e certificados da plataforma.

### Usuário
Responsável pela autenticação (login) e pela exposição dos dados do usuário logado (perfil).
**Por quê:** é o ponto de entrada obrigatório do app — sem autenticação nenhuma outra feature pode ser acessada com segurança, já que os dados de treinamentos e certificados são pessoais e vinculados ao usuário.

### Dashboard
Tela de resumo geral do sistema, agregando indicadores (ex: treinamentos em andamento, pendentes, certificados emitidos).
**Por quê:** funciona como a "home" do app após o login, dando ao usuário uma visão consolidada antes de navegar para as áreas mais específicas (Treinamentos e Certificados).

### Treinamentos
Permite listar, buscar, visualizar detalhes e finalizar treinamentos.
**Por quê:** é a funcionalidade central do produto — o motivo de existir do aplicativo é acompanhar e concluir treinamentos.

### Certificados
Permite listar, buscar, visualizar detalhes e emitir certificados dos treinamentos concluídos.
**Por quê:** é a consequência direta da conclusão de um treinamento e representa o valor tangível entregue ao usuário (comprovação formal do aprendizado).

---

## Estrutura de Pastas

```
├── app
│   ├── App.js
│   ├── app.json
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── app          # Configuração global do app (navegação, providers, tema)
│       ├── core          # Camada de infraestrutura (API client, auth, storage, config)
│       ├── features       # Módulos de negócio, organizados por domínio
│       │   ├── usuario
│       │   ├── dashboard
│       │   ├── treinamentos
│       │   └── certificados
│       └── shared         # Componentes, hooks e utilitários reutilizáveis entre features
├── spec.md
└── tree.txt
```

**Racional da arquitetura:**
- `app/` concentra o que é transversal a todo o aplicativo: configuração de navegação (rotas/stacks), providers globais (tema, contexto de autenticação) e bootstrap da aplicação.
- `core/` isola detalhes de infraestrutura (cliente HTTP, interceptors, gerenciamento de token, storage local) para que as features não conheçam detalhes de implementação técnica.
- `features/` segue o padrão de organização por domínio (*feature-based*), onde cada pasta (`usuario`, `dashboard`, `treinamentos`, `certificados`) contém suas próprias screens, hooks, services e componentes específicos.
- `shared/` guarda tudo o que é genérico e reaproveitável (botões, inputs, hooks utilitários, formatação de datas, etc.), evitando duplicação de código entre features.

Cada pasta dentro de `features/` segue, internamente, o mesmo padrão:

```
features/treinamentos
├── screens        # Telas (Listar, Buscar, Detalhes, Finalizar)
├── hooks          # Hooks que orquestram o estado da tela e chamam os services
├── services       # Funções que encapsulam as chamadas à API
└── components      # Componentes visuais específicos da feature
```

---

## Navegação

Fluxo inicial do aplicativo:

```
App
 └── (usuário não autenticado) → Login
 └── (usuário autenticado) → Dashboard
                                 ├── Perfil
                                 ├── Treinamentos
                                 │    ├── Listar
                                 │    ├── Buscar
                                 │    ├── Ver Detalhes
                                 │    └── Finalizar
                                 └── Certificados
                                      ├── Listar
                                      ├── Buscar
                                      ├── Ver Detalhes
                                      └── Emitir
```

**Descrição do fluxo:**
1. Ao abrir o app, verifica-se o estado de autenticação (token válido em storage).
2. Se **não autenticado**, o usuário é direcionado para a tela de **Login**.
3. Após autenticação bem-sucedida, o usuário é redirecionado para o **Dashboard**, que passa a ser a tela raiz da navegação autenticada.
4. A partir do Dashboard, o usuário acessa três áreas principais: **Perfil**, **Treinamentos** e **Certificados**.
5. Dentro de **Treinamentos**, o usuário pode listar todos os treinamentos, buscar por um específico, ver seus detalhes, e finalizá-lo.
6. Dentro de **Certificados**, o usuário pode listar, buscar, ver detalhes e emitir o certificado correspondente a um treinamento concluído.

---

## Comunicação com a API

A comunicação segue um fluxo unidirecional e em camadas, garantindo separação de responsabilidades entre interface, lógica de estado e acesso a dados:

```
Screen
  ↓
Hook
  ↓
Service
  ↓
API
```

**Descrição de cada camada:**

- **Screen (Tela):** componente responsável apenas pela renderização visual e captura de interações do usuário (cliques, formulários). Não contém lógica de negócio nem chama a API diretamente — apenas consome dados e funções expostas pelo Hook.

- **Hook:** camada de orquestração de estado da feature (ex: `useTreinamentos`, `useCertificados`). É responsável por gerenciar estados de loading, erro e dados, chamar o Service correspondente e expor uma interface simples para a Screen consumir.

- **Service:** camada que encapsula as chamadas HTTP específicas do domínio (ex: `treinamentoService.listar()`, `certificadoService.emitir()`), definindo endpoints, payloads e tratamento de resposta/erro da API. Não conhece nada de estado da UI.

- **API:** cliente HTTP centralizado em `core/`, responsável por configurações comuns como base URL, headers de autenticação (token), interceptors de erro e refresh de sessão.

**Vantagens desse fluxo:**
- Cada camada tem uma única responsabilidade, facilitando testes isolados.
- Trocar a fonte de dados (ex: mock → API real) exige alterar apenas o Service, sem tocar em Screen ou Hook.
- Erros e estados de loading ficam centralizados no Hook, evitando duplicação de lógica em múltiplas telas.

---

## Decisões Arquiteturais

1. **Organização por feature (feature-based) em vez de por tipo de arquivo.**
   Agrupar código por domínio de negócio (`treinamentos`, `certificados`, etc.) em vez de por tipo técnico (todas as screens juntas, todos os hooks juntos) facilita a localização de código relacionado, reduz o acoplamento entre domínios e permite que cada feature evolua de forma independente.

2. **Separação entre `core` e `shared`.**
   `core` concentra infraestrutura técnica (cliente HTTP, autenticação, storage), enquanto `shared` concentra elementos de UI e utilitários reutilizáveis. Essa separação evita que uma mudança de infraestrutura impacte componentes visuais, e vice-versa.

3. **Camada de Service isolando o acesso à API.**
   Nenhuma Screen ou Hook faz chamadas HTTP diretamente. Isso centraliza o conhecimento sobre os endpoints em um único lugar por feature, facilita mockar dados em testes e simplifica a manutenção caso a API mude de contrato.

4. **Hooks como única fonte de estado por feature.**
   Ao invés de gerenciar estado diretamente nas Screens, os Hooks concentram loading, erro e dados. Isso torna as Screens praticamente "burras" (apenas apresentação), o que melhora a testabilidade e permite reaproveitar a mesma lógica de estado em diferentes telas, se necessário.

5. **Autenticação centralizada em `core`, com verificação no bootstrap do app.**
   O gerenciamento de token e sessão fica em `core/auth`, e a decisão de rota inicial (Login vs Dashboard) é tomada uma única vez no ponto de entrada do app (`app/`), evitando checagens de autenticação espalhadas por múltiplas telas.

6. **Estrutura interna padronizada dentro de cada feature.**
   Todas as features seguem o mesmo padrão interno (`screens`, `hooks`, `services`, `components`), o que reduz a curva de aprendizado ao navegar entre diferentes partes do projeto e facilita a criação de novas features seguindo o mesmo molde.