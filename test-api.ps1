# Script para testar a API de Produtos

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  API de Produtos com Gemini - Teste" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# URL da API
$apiUrl = "http://localhost:3000/api/products"

# Verifica se o servidor está rodando
try {
    $testConnection = Invoke-WebRequest -Uri "http://localhost:3000" -Method Get -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Servidor está rodando!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ Erro: Servidor não está rodando em http://localhost:3000" -ForegroundColor Red
    Write-Host "Execute 'npm run start:dev' primeiro" -ForegroundColor Yellow
    exit 1
}

# Dados do produto de teste
$productData = @{
    name = "Notebook Gamer Pro"
    description = "Notebook com processador Intel i7, 16GB RAM, SSD 512GB, placa de vídeo RTX 3060"
    price = 5999.99
} | ConvertTo-Json

Write-Host "Enviando requisição para criar produto..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Dados enviados:" -ForegroundColor Cyan
Write-Host $productData
Write-Host ""

try {
    # Faz a requisição POST
    $response = Invoke-RestMethod -Method Post -Uri $apiUrl -Body $productData -ContentType "application/json"
    
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Resposta da API (Sucesso!)" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Nome do Produto:" -ForegroundColor Cyan
    Write-Host $response.name
    Write-Host ""
    
    Write-Host "Descrição Original:" -ForegroundColor Cyan
    Write-Host $response.description
    Write-Host ""
    
    Write-Host "Preço:" -ForegroundColor Cyan
    Write-Host "R$ $($response.price)"
    Write-Host ""
    
    Write-Host "Descrição Aprimorada pela IA:" -ForegroundColor Cyan -NoNewline
    Write-Host " (Gemini)" -ForegroundColor Magenta
    Write-Host $response.enhancedDescription -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ Teste concluído com sucesso!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    
} catch {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  Erro na Requisição" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Código de Status: $statusCode" -ForegroundColor Yellow
        
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "Resposta de Erro:" -ForegroundColor Yellow
        Write-Host $errorBody
    } else {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Verifique se:" -ForegroundColor Yellow
    Write-Host "1. A chave GEMINI_API_KEY está configurada no arquivo .env" -ForegroundColor Yellow
    Write-Host "2. O servidor está rodando sem erros" -ForegroundColor Yellow
    Write-Host "3. Você tem créditos disponíveis na API do Gemini" -ForegroundColor Yellow
}

