# Especificação do Produto — Interface de Treinamentos

Este documento descreve **o que** o aplicativo deve fazer. A organização técnica, as camadas e as tecnologias estão em [`docs/arquitetura.md`](docs/arquitetura.md). Em caso de conflito sobre comportamento do produto, esta especificação prevalece; em caso de conflito sobre estrutura de código, prevalece a arquitetura.

---

## 1. Objetivo

Aplicação **mobile** para gestão de treinamentos. O usuário autenticado deve conseguir:

- entrar na conta e manter a sessão;
- ver um resumo do próprio progresso;
- listar, buscar, detalhar e finalizar treinamentos;
- listar, buscar, detalhar e emitir certificados vinculados a treinamentos concluídos.

O núcleo funcional mínimo é o conjunto das features **Usuário**, **Dashboard**, **Treinamentos** e **Certificados**.

---

## 2. Escopo

### 2.1 Dentro do escopo (MVP)

| Área | Inclui |
|------|--------|
| Autenticação | Login, cadastro de usuário, restauração de sessão, logout |
| Perfil | Visualização dos dados do usuário autenticado |
| Dashboard | Visão resumida de treinamentos e certificados |
| Treinamentos | Listar, buscar, detalhes, progresso, finalizar |
| Certificados | Listar, buscar, detalhes, emitir |

### 2.2 Fora do escopo (neste spec)

- Administração de catálogo de treinamentos (criação/edição pelo app)
- Múltiplos perfis (gestor, instrutor, admin)
- Notificações push
- Offline completo (além de tratar “sem conexão” na interface)
- Pagamento, matrícula comercial ou catálogo público sem autenticação

---

## 3. Atores

| Ator | Descrição |
|------|-----------|
| Visitante | Não autenticado. Pode usar Login e Cadastro. |
| Usuário autenticado | Pessoa com sessão válida. Acessa Dashboard, perfil, treinamentos e certificados **somente dos próprios dados**. |

Treinamentos, progresso e certificados são **pessoais** e devem estar vinculados ao usuário autenticado.

---

## 4. Plataforma e restrições de produto

- App mobile com **React Native** e **Expo**.
- Interface baseada em **React Native Paper** (Material Design), com tema visual único em todo o app.
- Comunicação com backend via HTTP (**Axios**), com sessão baseada em token persistido localmente.
- Idioma da interface: português, com mensagens compreensíveis (sem expor erros técnicos crus).

Detalhes de implementação: `docs/arquitetura.md`.

---

## 5. Requisitos funcionais

### 5.1 Usuário e autenticação

**RF-U01 — Login**  
O visitante deve autenticar-se com e-mail e senha. Em sucesso, a sessão é persistida e o app entra no fluxo autenticado (Dashboard). Em falha, o app permanece no Login e mostra mensagem clara.

**RF-U07 — Cadastro**  
O visitante deve poder criar uma conta com nome, e-mail e senha. Em sucesso, se a API devolver sessão/token, o app entra no fluxo autenticado. Caso contrário, o app volta ao Login com mensagem de sucesso. Em falha (e-mail já existente, validação, rede), permanece no Cadastro com mensagem clara. Senha e confirmação de senha devem coincidir no cliente.

**RF-U02 — Restauração de sessão**  
Ao abrir o app, o sistema deve verificar se existe sessão/token local. Sessão válida → fluxo autenticado. Sessão inexistente ou inválida → Login. Enquanto isso, deve haver estado de carregamento, **sem** mostrar o Login por um instante para quem já tem sessão válida.

**RF-U03 — Proteção de rotas**  
Visitante não acessa telas autenticadas. O fluxo autenticado não é apresentado enquanto a verificação de sessão não terminar.

**RF-U04 — Perfil**  
O usuário autenticado deve visualizar os dados do próprio perfil.

**RF-U05 — Logout**  
O usuário autenticado deve encerrar a sessão. Após o logout, o app volta ao fluxo não autenticado (Login) e não deve manter acesso às telas protegidas.

**RF-U06 — Sessão expirada**  
Se a sessão expirar durante o uso, o app deve tratar o estado de sessão expirada, impedir o uso de telas protegidas e conduzir o usuário de volta ao Login, com mensagem adequada.

---

### 5.2 Dashboard

**RF-D01 — Tela inicial autenticada**  
Após autenticação (login ou restauração de sessão), a tela inicial é o **Dashboard**.

**RF-D02 — Visão resumida**  
O Dashboard deve apresentar um resumo da situação do usuário. Indicadores esperados (quando a API fornecer os dados):

- treinamentos em andamento;
- treinamentos pendentes;
- treinamentos concluídos;
- certificados emitidos;
- progresso geral.

**RF-D03 — Navegação a partir do resumo**  
O usuário deve conseguir partir do Dashboard para perfil, treinamentos e certificados.

---

### 5.3 Treinamentos

**RF-T01 — Listar**  
O usuário autenticado deve ver a lista dos treinamentos disponíveis para ele.

**RF-T02 — Buscar**  
O usuário deve poder buscar treinamentos na lista (filtro/busca sobre o conjunto disponível).

**RF-T03 — Detalhes**  
O usuário deve abrir um treinamento e ver seus detalhes.

**RF-T04 — Progresso**  
Nos detalhes (e/ou na lista, quando fizer sentido visual), o usuário deve acompanhar o progresso do treinamento.

**RF-T05 — Finalizar**  
O usuário deve poder finalizar um treinamento quando as regras do backend permitirem. A conclusão é regra da feature de treinamentos, não da navegação.

**RF-T06 — Dados pessoais**  
A listagem, busca, detalhes, progresso e finalização referem-se apenas aos treinamentos do usuário autenticado.

---

### 5.4 Certificados

**RF-C01 — Listar**  
O usuário autenticado deve ver a lista dos próprios certificados.

**RF-C02 — Buscar**  
O usuário deve poder buscar certificados na lista.

**RF-C03 — Detalhes**  
O usuário deve abrir um certificado e ver seus detalhes.

**RF-C04 — Emitir**  
O usuário deve poder emitir certificado associado a treinamento concluído, quando a API permitir. O certificado é a comprovação formal da conclusão do treinamento.

**RF-C05 — Dados pessoais**  
Listagem, busca, detalhes e emissão referem-se apenas aos certificados do usuário autenticado.

---

## 6. Fluxos de usuário

### 6.1 Abertura do aplicativo

```text
App inicia
  → verificação de sessão (loading)
      → sessão válida     → Dashboard
      → sessão inválida   → Login
```

### 6.2 Login

```text
Login (credenciais)
  → sucesso → persistir sessão → Dashboard
  → falha   → permanecer no Login + mensagem
```

### 6.3 Uso autenticado

```text
Dashboard
  ├── Perfil
  ├── Treinamentos → listar → buscar → detalhes → finalizar
  └── Certificados  → listar → buscar → detalhes → emitir
```

### 6.4 Logout e expiração

```text
Logout ou sessão expirada → Login (sem acesso a telas protegidas)
```

---

## 7. Navegação (requisito de produto)

Dois fluxos obrigatórios:

| Fluxo | Telas |
|-------|--------|
| Não autenticado | Login |
| Autenticado | Dashboard, Perfil, Treinamentos (listar, buscar, detalhes, finalizar), Certificados (listar, buscar, detalhes, emitir) |

A escolha do fluxo depende **somente** do estado de autenticação após o bootstrap. A navegação não deve ser o lugar onde se decide se um treinamento foi concluído ou se um certificado pode ser emitido.

---

## 8. Estados da interface (requisito transversal)

Toda tela que carrega ou envia dados deve tratar, no mínimo:

| Estado | Comportamento |
|--------|----------------|
| Inicial | Tela montada, ainda sem resultado da operação |
| Loading | Feedback visual de carregamento |
| Sucesso | Dados apresentados |
| Vazio | Lista ou conteúdo sem itens, com mensagem adequada |
| Erro | Mensagem compreensível + possibilidade de tentar de novo quando fizer sentido |
| Sem conexão | Indicação de falta de conectividade, sem jargão técnico |
| Sessão expirada | Conforme RF-U06 |

Feedback visual de loading, erro e mensagens deve ser consistente entre as features.

---

## 9. Mensagens e erros (requisito de produto)

- Erros técnicos (`Network Error`, códigos HTTP crus, nomes de exceção) **não** devem ser a mensagem principal para o usuário.
- Mensagens devem ser claras e contextualizadas (ex.: “Não foi possível carregar os treinamentos. Tente novamente.”).
- Ações do usuário (login, finalizar, emitir, buscar) devem ter feedback de sucesso ou falha.

---

## 10. Regras de negócio

1. **Autenticação primeiro.** Sem sessão válida, não há Dashboard, perfil, treinamentos nem certificados.
2. **Dados são do usuário logado.** Não há, neste spec, visão de outros usuários.
3. **Treinamento é o núcleo.** O app existe para acompanhar e concluir atividades de capacitação.
4. **Certificado depende da conclusão.** Emissão e listagem de certificados relacionam-se a treinamentos concluídos; a regra exata de elegibilidade é a do backend.
5. **Dashboard é resumo, não substitui as listas.** Indicadores levam às features detalhadas; não precisam duplicar toda a listagem.
6. **Finalizar e emitir são ações de domínio.** Devem falhar de forma visível se o backend recusar (já finalizado, ainda incompleto, certificado já emitido, etc.), com mensagem adequada.

---

## 11. Critérios de aceite (MVP)

O MVP está aceito quando:

- [ ] Usuário sem sessão só vê Login.
- [ ] Usuário com sessão válida, ao reabrir o app, chega ao Dashboard sem flash de Login.
- [ ] Login com credenciais válidas leva ao Dashboard; inválidas permanecem no Login com erro claro.
- [ ] Visitante acessa Cadastro a partir do Login; validação de senhas e erros de API são exibidos; sucesso autentica ou retorna ao Login.
- [ ] Logout volta ao Login e bloqueia telas autenticadas.
- [ ] Dashboard mostra o resumo disponível (indicadores da seção 5.2).
- [ ] Usuário lista, busca e abre detalhes de treinamentos, vê progresso e consegue finalizar quando permitido.
- [ ] Usuário lista, busca e abre detalhes de certificados e consegue emitir quando permitido.
- [ ] Listas vazias, loading, erro e sem conexão são tratados nas telas que buscam dados.
- [ ] Sessão expirada interrompe o fluxo autenticado e devolve ao Login com mensagem adequada.
- [ ] Visual consistente (Paper + tema único); mensagens em português e não técnicas.

---

## 12. Relação com a arquitetura

| Este spec exige | A arquitetura realiza |
|-----------------|------------------------|
| Login, sessão, perfil, logout | Feature `usuario` + `core` (auth, storage, API) |
| Dashboard e indicadores | Feature `dashboard` |
| Listar/buscar/detalhes/progresso/finalizar | Feature `treinamentos` |
| Listar/buscar/detalhes/emitir | Feature `certificados` |
| Dois fluxos de navegação | React Navigation na camada `app` |
| Sem flash de Login | Bootstrap antes de decidir a rota |
| Estados de UI e erros amigáveis | Hooks + screens + `shared` |
| Uma API, um token, um cliente HTTP | `core` (API Client / Axios) |

Não duplicar aqui a árvore de pastas nem o fluxo Screen → Hook → Service → API. Isso permanece em `docs/arquitetura.md`.
