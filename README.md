# Projeto Mercado Online - SuperRP

> Trabalho acadêmico para a disciplina **Fundamentos de Sistemas Web**

Este repositório contém um mini‑e‑commerce fictício 100 % em **HTML + CSS + JavaScript** (sem back‑end). Todos os dados são persistidos localmente no **LocalStorage / SessionStorage**, permitindo testes completos de navegação, cadastro, login, compra (cartão ou pix) e painel admin.

---

## 💻 **Observações para a entrega da Fase 2**

Poderia ter entregue no prazo, pois já havia atendido a todos os requisitos. No entanto, adiei a entrega porque não estava satisfeito com o resultado. Queria polir o trabalho, deixá-lo mais dinâmico e fluido, além de adicionar alguns elementos extras.

O código foi desenvolvido integralmente por mim. Não sei se isso pode anular minha nota, mas, de forma honesta, utilizei inteligência artificial junto com as aulas para aprender mais, gerar imagens (infelizmente, a versão gratuita deixou-as com baixa resolução), corrigir erros que encontrei ao longo do processo e tentar deixar o trabalho o mais organizado e fluido possível.

---

## 📂 Estrutura de Páginas

| # | Arquivo | Função |
|---|---------|--------|
| 1 | **`index.html`** | Página inicial com _hero carousel_ e produtos em destaque. |
| 2 | **`produtos.html`** | Catálogo completo – filtros e cards animados (AOS). |
| 3 | **`carrinho.html`** | Itens adicionados, escolha de tele-entrega/retirada no local, cálculo total. |
| 4 | **`cadastro.html`** | Cadastro de usuário com validação + máscaras (CPF, Telefone). |
| 5 | **`login.html`** | Autenticação (usuário ou admin). |
| 6 | **`servicos.html`** | Agendamento de serviços com calendário _flatpickr_. |
| 7 | **`contato.html`** | Informações de contato – Endereço do estabelecimento. |
| 8 | **`admin.html`** | Gerenciamento de Usuários(apenas visual, nada funcional) – **acesso restrito**. |
| 9 | **`pedidos.html`** | Lista de pedidos do usuário logado. |
| 10 | **`resumo-compra.html`** | Resumo e status do pedido. |

> Header e footer são compartilhados; o footer exibe o ano atual e link para este GitHub Pages.

---

## 🛠️ Tecnologias & Bibliotecas

- **Bootstrap 5** (layout, grid, componentes)
- **JavaScript**
- **LocalStorage / SessionStorage** (persistência de dados)
- **Flatpickr** (seleção de data/hora)
- **AOS** (animações on‑scroll)
- **Icones Bootstrap Icons**

### Acessibilidade implementada

- Modo **Alto Contraste** (toggle permanente)
- Navegação por teclado com foco visível
- ARIA labels em botões/ícones
- Controle de tamanho de fonte (A+ / A–)

---

## ▶️ Como Acessar

> Acesse a versão publicada em **GitHub Pages**: <https://iCampoS11.github.io/>

---

## 👤 Conta de Usuário / Cadastro

1. Acesse **Cadastro** e preencha os campos (pode usar dados fictícios, CEP precisa começar com 14).
2. Clique em **Cadastrar**. Os dados serão salvos no _LocalStorage_.
3. Depois faça **Login** com o e‑mail e senha criados.

---

## 🔐 Acesso **Admin**

| Email               | Senha      |
|---------------------|------------|
| `admin@superrp.com` | `0123`     |

Após logar como admin:
- Clique no nome "administrador" e acesse a pagina do admin(apenas visual)

---

## 🛒 Fluxo de Compra – Passo a Passo

1. **Adicionar itens** na página de produtos (botão **Adicionar ao carrinho**).
2. Abrir **Carrinho** → escolher:
   - **Tele-Entrega** ou **Retirada no Local**
   - **Pagamento**: `Cartão de Crédito/Débito` ou `Pix`
3. **Cartão de Crédito/Débito**: digite **qualquer** conjunto de números válidos (16 dígitos), nome, data e cvv.  
   **Pix**: o QR‑Code é fictício.
4. Clique em **Finalizar Compra(Precisa estar logado, caso não esteja será redirecionado pro login)** → você será redirecionado a **resumo‑compra.html**.
5. Aguarde **~30 s – 1 min**. Um cronômetro interno simula processamento e muda o status para **Concluído** automaticamente.

> Nenhum dado real é transmitido – todo o processo é 100 % simulado no navegador.

---

Feito por **Matheus Eduardo Campos Ferreira** para a disciplina *Fundamentos de Sistemas Web - PUCRS*.
