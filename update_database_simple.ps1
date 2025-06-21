# Script simple para actualizar la base de datos
Write-Host "🔧 Actualizando base de datos..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Instrucciones:" -ForegroundColor Yellow
Write-Host "1. Abre pgAdmin o tu cliente de base de datos" -ForegroundColor White
Write-Host "2. Conéctate a tu base de datos PostgreSQL" -ForegroundColor White
Write-Host "3. Ejecuta este SQL:" -ForegroundColor White
Write-Host ""
Write-Host "ALTER TABLE technologies ALTER COLUMN icon TYPE TEXT;" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 Después de ejecutar el SQL:" -ForegroundColor Yellow
Write-Host "1. Reinicia el servidor: npm run start:dev" -ForegroundColor White
Write-Host "2. Ejecuta el script de tecnologías: .\insert_technologies.ps1" -ForegroundColor White 