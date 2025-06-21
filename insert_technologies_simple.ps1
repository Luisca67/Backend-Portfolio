# Script simple para insertar tecnologías con URLs de iconos
# Asegúrate de que el servidor esté corriendo antes de ejecutar este script

$baseUrl = "http://localhost:3000"

# Función para insertar tecnología
function Insert-Technology {
    param(
        [string]$name,
        [string]$description,
        [string]$icon,
        [string]$category,
        [bool]$isActive = $true
    )
    
    $body = @{
        name        = $name
        description = $description
        icon        = $icon
        category    = $category
        is_active   = $isActive
    } | ConvertTo-Json -Depth 10

    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/technologies" -Method POST -Body $body -ContentType "application/json"
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

# Mapeo de tecnologías con URLs de iconos
$technologies = @(
    @{
        name        = "HTML5"
        description = "Lenguaje de marcado estándar para crear páginas web"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
        category    = "Frontend"
    },
    @{
        name        = "CSS3"
        description = "Lenguaje de estilos para diseñar páginas web"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
        category    = "Frontend"
    },
    @{
        name        = "JavaScript"
        description = "Lenguaje de programación interpretado para desarrollo web"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
        category    = "Frontend"
    },
    @{
        name        = "Node.js"
        description = "Entorno de ejecución de JavaScript en el servidor"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
        category    = "Backend"
    },
    @{
        name        = "Python"
        description = "Lenguaje de programación de alto nivel y propósito general"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
        category    = "Backend"
    },
    @{
        name        = "Laravel"
        description = "Framework PHP para desarrollo web elegante y expresivo"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg"
        category    = "Backend"
    },
    @{
        name        = "PostgreSQL"
        description = "Sistema de gestión de bases de datos relacionales"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
        category    = "Database"
    },
    @{
        name        = "MariaDB"
        description = "Sistema de gestión de bases de datos relacionales"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
        category    = "Database"
    },
    @{
        name        = "Git"
        description = "Sistema de control de versiones distribuido"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
        category    = "Tools"
    },
    @{
        name        = "GitHub"
        description = "Plataforma de desarrollo colaborativo basada en Git"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
        category    = "Tools"
    },
    @{
        name        = "VS Code"
        description = "Editor de código fuente desarrollado por Microsoft"
        icon        = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
        category    = "Tools"
    },
    @{
        name        = "Postman"
        description = "Plataforma para desarrollo y testing de APIs"
        icon        = "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
        category    = "Tools"
    }
)

Write-Host "🚀 Iniciando inserción de tecnologías..." -ForegroundColor Cyan
Write-Host "Base URL: $baseUrl" -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$errorCount = 0

foreach ($tech in $technologies) {
    $result = Insert-Technology -name $tech.name -description $tech.description -icon $tech.icon -category $tech.category
    
    if ($result) {
        $successCount++
    }
    else {
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
    Write-Host "Puedes verificar en: $baseUrl/technologies" -ForegroundColor Cyan
}
else {
    Write-Host ""
    Write-Host "⚠️  Algunas tecnologías no se pudieron insertar. Revisa los errores arriba." -ForegroundColor Yellow
} 