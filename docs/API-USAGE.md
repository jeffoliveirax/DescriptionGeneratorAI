# API de Produtos com IA Gemini - Guia de Uso

## Estrutura Implementada

```
src/
├── gemini/
│   └── gemini.service.ts          # Serviço de integração com Google Gemini
├── products/
│   ├── dto/
│   │   └── create-product.dto.ts  # DTO de validação de entrada
│   ├── interfaces/
│   │   └── product.interface.ts   # Interface do produto
│   ├── products.controller.ts     # Controlador REST
│   ├── products.service.ts        # Lógica de negócio
│   └── products.module.ts         # Módulo de produtos
└── app.module.ts                  # Módulo principal (atualizado)
```

## Como Testar

### 1. Configure a Chave da API Gemini

Edite o arquivo `.env` e adicione sua chave da API do Google Gemini:

```env
GEMINI_API_KEY=sua_chave_real_aqui
PORT=3000
```

### 2. Instale as Dependências (se ainda não instalou)

```bash
npm install
```

### 3. Inicie o Servidor

```bash
npm run start:dev
```

O servidor estará rodando em `http://localhost:3000`

### 4. Teste o Endpoint

#### Usando cURL:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Notebook Gamer Pro\",\"description\":\"Notebook com processador Intel i7, 16GB RAM, SSD 512GB, placa de vídeo RTX 3060\",\"price\":5999.99}"
```

#### Usando PowerShell:

```powershell
$body = @{
    name = "Notebook Gamer Pro"
    description = "Notebook com processador Intel i7, 16GB RAM, SSD 512GB, placa de vídeo RTX 3060"
    price = 5999.99
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/products" -Body $body -ContentType "application/json"
```

#### Usando o arquivo de teste (PowerShell):

```powershell
$body = Get-Content test-product.json -Raw
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/products" -Body $body -ContentType "application/json"
```

### 5. Resposta Esperada

```json
{
  "name": "Notebook Gamer Pro",
  "description": "Notebook com processador Intel i7, 16GB RAM, SSD 512GB, placa de vídeo RTX 3060",
  "price": 5999.99,
  "enhancedDescription": "Experimente o máximo em desempenho para jogos com o Notebook Gamer Pro! Equipado com processador Intel i7 de última geração, 16GB de RAM e SSD de 512GB, este notebook garante velocidade e capacidade de armazenamento excepcionais. A placa de vídeo RTX 3060 oferece gráficos de alta qualidade para uma experiência de jogo imersiva. Ideal para gamers e profissionais que exigem o melhor!"
}
```

## Validações Implementadas

O endpoint valida automaticamente:
- ✅ `name`: deve ser uma string não vazia
- ✅ `description`: deve ser uma string não vazia
- ✅ `price`: deve ser um número maior ou igual a 0

## Tratamento de Erros

### Erro 400 - Bad Request
Quando os dados enviados não passam na validação:

```json
{
  "statusCode": 400,
  "message": ["price must not be less than 0"],
  "error": "Bad Request"
}
```

### Erro 503 - Service Unavailable
Quando a API do Gemini falha:

```json
{
  "statusCode": 503,
  "message": "Falha ao aprimorar descrição do produto. Por favor, tente novamente."
}
```

### Erro 500 - Internal Server Error
Para outros erros não tratados:

```json
{
  "statusCode": 500,
  "message": "Erro interno do servidor"
}
```

## Logs

A aplicação registra logs detalhados para facilitar o debug:

```
[ProductsController] Recebida solicitação para criar produto: Notebook Gamer Pro
[ProductsService] Criando produto: Notebook Gamer Pro
[GeminiService] Descrição aprimorada gerada para o produto: Notebook Gamer Pro
[ProductsService] Produto criado com sucesso: Notebook Gamer Pro
```

## Recursos Implementados

- ✅ Validação de dados com class-validator
- ✅ Transformação automática de tipos (price para number)
- ✅ Integração com Google Gemini AI
- ✅ Logging estruturado com NestJS Logger
- ✅ Tratamento de erros robusto
- ✅ Arquitetura modular
- ✅ Configuração de ambiente com .env
- ✅ Código em inglês com comentários em português

## Próximos Passos (Opcional)

1. **Adicionar persistência de dados**: Integrar com banco de dados (MongoDB, PostgreSQL, etc.)
2. **Implementar CRUD completo**: GET, PUT, DELETE endpoints
3. **Adicionar testes unitários e e2e**
4. **Implementar cache**: Para reduzir chamadas à API do Gemini
5. **Adicionar documentação Swagger**: Para facilitar o uso da API
6. **Implementar rate limiting**: Para proteger contra abuso

