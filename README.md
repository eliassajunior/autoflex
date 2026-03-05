# Autoflex

Sistema para controle de estoque de insumos (matérias-primas) e produtos fabricados por uma indústria. A aplicação permite gerenciar os materiais utilizados na produção, os produtos fabricados e o controle de estoque, garantindo que a fabricação só ocorra quando houver matéria-prima suficiente disponível.

## 📌 Objetivo:

Uma indústria que produz diversos itens necessita controlar o estoque das matérias-primas utilizadas na fabricação de seus produtos.

Este sistema foi desenvolvido para:

- Controlar o estoque de insumos.
- Cadastrar produtos fabricados.
- Definir quais matérias-primas são necessárias para cada produto.
- Realizar a produção com baixa automática no estoque.
- Controlar o estoque de produtos finalizados.
- Informar a capacidade máxima de produção com base no estoque atual.

## 🏗️ Estrutura do Sistema:

O sistema é dividido em quatro módulos principais:

### 🧱 Material:

Responsável pelo cadastro e controle de estoque das matérias-primas.

- Criação de materiais.
- Atualização de materiais.
- Remoção de materiais.
- Incremento e decremento de estoque.

### 📦 Product:

Responsável pelo cadastro dos produtos fabricados.

- Cadastro de produto.
- Atualização de dados.
- Remoção de produto.
- Associação de materiais (receita de produção).

### 🏭 Production:

Responsável pelo processo de fabricação.

- Cadastro da receita de produção.
- Atualização da receita.
- Verificação de disponibilidade de insumos.
- Baixa automática do estoque de materiais.
- Fabricação do produto.

### 🏬 Storage:

Responsável pelo controle do estoque de produtos finalizados.

- Registro da quantidade produzida.
- Atualização automática do estoque.

## 🔄 Fluxo de Produção:

1. Cadastro dos materiais.
2. Cadastro do produto.
3. Definição da receita (materiais necessários).
4. Solicitação de produção.
5. O sistema:
   - Verifica se há estoque suficiente.
   - Consome os materiais.
   - Atualiza o estoque de produtos.

## 🛠️ Tecnologias Utilizadas:

- Node.js
- NestJS
- TypeScript
- TypeORM
- Banco de Dados Relacional (PostgreSQL)

## ⚙️ Inicialização do Projeto:

### 1. Instalar as dependências:

```bash
npm install
```

### 2. Na raiz do projeto, crie um arquivo chamado .env com o seguinte conteúdo:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_DATABASE=production_db
```

### 3. Executar a aplicação:

```bash
npm run start:dev
```

## 📡 Acesso à API (Sem Front-end):

Esta API não possui interface gráfica ainda. Para testar os endpoints utilize ferramentas como:

- Insomnia
- Postman
- Thunder Client (VSCode)

## 🧱 Material

| Método | Rota              | Descrição                                                                                     |
| ------ | ----------------- | --------------------------------------------------------------------------------------------- |
| GET    | `/material`       | Lista todos os materiais cadastrados.                                                         |
| POST   | `/material`       | Cria um novo material e adiciona 1 unidade ao estoque (formata o código como `COD-{code}BR`). |
| PATCH  | `/material/:code` | Atualiza o nome do material pelo código.                                                      |
| DELETE | `/material/:code` | Remove 1 unidade do estoque ou exclui o material se o estoque for igual a 1.                  |

## 📦 Product

| Método | Rota             | Descrição                                                |
| ------ | ---------------- | -------------------------------------------------------- |
| GET    | `/product`       | Lista todos os produtos com suas respectivas receitas.   |
| POST   | `/product`       | Cria um novo produto e registra sua receita de produção. |
| PATCH  | `/product/:code` | Atualiza nome, preço e/ou receita do produto.            |
| DELETE | `/product/:code` | Remove o produto do sistema.                             |

## 🏭 Production

| Método | Rota          | Descrição                                                                                        |
| ------ | ------------- | ------------------------------------------------------------------------------------------------ |
| GET    | `/production` | Retorna a quantidade máxima possível de produção com base no estoque atual.                      |
| POST   | `/production` | Produz uma quantidade do produto, dá baixa automática nos materiais e adiciona ao estoque final. |

## 🏬 Storage

| Método | Rota       | Descrição                                |
| ------ | ---------- | ---------------------------------------- |
| GET    | `/storage` | Lista o estoque de produtos finalizados. |
