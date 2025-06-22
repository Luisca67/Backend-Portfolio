# Script para insertar tecnologías con sus iconos SVG
# Asegúrate de que el servidor esté corriendo antes de ejecutar este script

# Cargar variables de entorno desde .env si existe
if (Test-Path ".env") {
    Get-Content .env | ForEach-Object {
        if ($_ -match "^\s*([^#][^=]*)=(.*)$") {
            [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2])
        }
    }
}
$apiBaseUrl = $env:DB_HOST

# Usar API_BASE_URL para la URL base de la API REST
if (-not $apiBaseUrl -or $apiBaseUrl -eq "") {
    $apiBaseUrl = "http://localhost:3000"
}

# (Opcional) Variables de conexión a la base de datos, por si se usan en otro lado

$dbPort = $env:DB_PORT
$dbUser = $env:DB_USERNAME
$dbPassword = $env:DB_PASSWORD
$dbName = $env:DB_DATABASE

# Función para leer archivo SVG
function Read-SvgFile {
    param([string]$filePath)
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        return $content.Trim()
    }
    catch {
        Write-Host "Error leyendo archivo $filePath : $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Función para insertar tecnología
function Insert-Technology {
    param(
        [string]$name,
        [string]$description,
        [string]$iconPath,
        [string]$category,
        [bool]$isActive = $true
    )
    
    $body = @{
        name        = $name
        description = $description
        icon        = $iconPath
        category    = $category
        is_active   = $isActive
    } | ConvertTo-Json -Depth 10

    try {
        $response = Invoke-RestMethod -Uri "$apiBaseUrl/technologies" -Method POST -Body $body -ContentType "application/json"
        Write-Host "✅ Tecnología '$name' insertada correctamente (ID: $($response.id))" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "❌ Error insertando tecnología '$name': $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "Respuesta del servidor: $responseBody" -ForegroundColor Yellow
        }
        return $null
    }
}

# Mapeo de tecnologías con sus archivos SVG y categorías
$technologies = @(
    @{ name = "HTML5"; description = "Lenguaje de marcado estándar para crear páginas web"; category = "Frontend" },
    @{ name = "CSS3"; description = "Lenguaje de estilos para diseñar páginas web"; category = "Frontend" },
    @{ name = "JavaScript"; description = "Lenguaje de programación interpretado para desarrollo web"; category = "Frontend" },
    @{ name = "Node.js"; description = "Entorno de ejecución de JavaScript en el servidor"; category = "Backend" },
    @{ name = "Python"; description = "Lenguaje de programación de alto nivel y propósito general"; category = "Backend" },
    @{ name = "Laravel"; description = "Framework PHP para desarrollo web elegante y expresivo"; category = "Backend" },
    @{ name = "PostgreSQL"; description = "Sistema de gestión de bases de datos relacionales" category = "Database" },
    @{ name = "MariaDB"; description = "Sistema de gestión de bases de datos relacionales"; category = "Database" },
    @{ name = "Git"; description = "Sistema de control de versiones distribuido"; category = "Tools" },
    @{ name = "GitHub"; description = "Plataforma de desarrollo colaborativo basada en Git"; category = "Tools" },
    @{ name = "VS Code"; description = "Editor de código fuente desarrollado por Microsoft"; category = "Tools" },
    @{ name = "Postman"; description = "Plataforma para desarrollo y testing de APIs"; category = "Tools" }
)

Write-Host "🚀 Iniciando inserción de tecnologías..." -ForegroundColor Cyan
Write-Host "API Base URL: $apiBaseUrl" -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$errorCount = 0

foreach ($tech in $technologies) {
    $iconPath = $tech.icon
    if (Test-Path $iconPath) {
        $result = Insert-Technology -name $tech.name -description $tech.description -iconPath $iconPath -category $tech.category
        if ($result) {
            $successCount++
        }
        else {
            $errorCount++
        }
    }
    else {
        Write-Host "❌ Archivo SVG no encontrado: $iconPath" -ForegroundColor Red
        $errorCount++
    }
    # Pequeña pausa para no sobrecargar el servidor
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "📊 Resumen de la inserción:" -ForegroundColor Cyan
Write-Host "✅ Tecnologías insertadas correctamente: $successCount" -ForegroundColor Green
Write-Host "❌ Errores: $errorCount" -ForegroundColor Red
Write-Host "📁 Total de tecnologías procesadas: $($technologies.Count)" -ForegroundColor Yellow

if ($errorCount -eq 0) {
    Write-Host ""
    Write-Host "🎉 ¡Todas las tecnologías se insertaron correctamente!" -ForegroundColor Green
    Write-Host "Puedes verificar en: $apiBaseUrl/technologies" -ForegroundColor Cyan
}
else {
    Write-Host ""
    Write-Host "⚠️  Algunas tecnologías no se pudieron insertar. Revisa los errores arriba." -ForegroundColor Yellow
} 