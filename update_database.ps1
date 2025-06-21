# Script para actualizar la base de datos
# Cambia la columna icon de VARCHAR(255) a TEXT

# Cargar variables de entorno
$envPath = ".env"
if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $name = $matches[1]
            $value = $matches[2]
            [Environment]::SetEnvironmentVariable($name, $value, 'Process')
        }
    }
}

# Obtener variables de entorno
$dbHost = $env:DB_HOST ?? "localhost"
$dbPort = $env:DB_PORT ?? "5432"
$dbName = $env:DB_NAME ?? "portfolio_db"
$dbUser = $env:DB_USER ?? "postgres"
$dbPassword = $env:DB_PASSWORD ?? ""

Write-Host "🔧 Actualizando base de datos..." -ForegroundColor Cyan
Write-Host "Host: $dbHost" -ForegroundColor Yellow
Write-Host "Puerto: $dbPort" -ForegroundColor Yellow
Write-Host "Base de datos: $dbName" -ForegroundColor Yellow
Write-Host "Usuario: $dbUser" -ForegroundColor Yellow
Write-Host ""

# SQL para actualizar la columna
$sql = @"
ALTER TABLE technologies 
ALTER COLUMN icon TYPE TEXT;
"@

# Guardar SQL en archivo temporal
$tempFile = "temp_update.sql"
$sql | Out-File -FilePath $tempFile -Encoding UTF8

try {
    # Ejecutar comando psql si está disponible
    $psqlCommand = "psql -h $dbHost -p $dbPort -U $dbUser -d $dbName -f $tempFile"
    
    if ($dbPassword) {
        $env:PGPASSWORD = $dbPassword
    }
    
    Write-Host "Ejecutando: $psqlCommand" -ForegroundColor Green
    
    # Ejecutar el comando
    Invoke-Expression $psqlCommand
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Base de datos actualizada correctamente" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al actualizar la base de datos" -ForegroundColor Red
        Write-Host "Código de salida: $LASTEXITCODE" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ Error ejecutando psql: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 Instrucciones manuales:" -ForegroundColor Yellow
    Write-Host "1. Abre pgAdmin o tu cliente de base de datos" -ForegroundColor White
    Write-Host "2. Conéctate a la base de datos: $dbName" -ForegroundColor White
    Write-Host "3. Ejecuta este SQL:" -ForegroundColor White
    Write-Host ""
    Write-Host $sql -ForegroundColor Cyan
}
finally {
    # Limpiar archivo temporal
    if (Test-Path $tempFile) {
        Remove-Item $tempFile
    }
    
    # Limpiar variable de entorno
    if ($env:PGPASSWORD) {
        Remove-Item Env:PGPASSWORD
    }
}

Write-Host ""
Write-Host "🎯 Después de actualizar la base de datos:" -ForegroundColor Cyan
Write-Host "1. Reinicia el servidor: npm run start:dev" -ForegroundColor White
Write-Host "2. Ejecuta el script de tecnologías: .\insert_technologies.ps1" -ForegroundColor White 