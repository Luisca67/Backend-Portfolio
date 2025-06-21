# Script de PowerShell para poblar la base de datos
# Ejecutar: .\seed_database.ps1

Write-Host "🌱 Iniciando seed de la base de datos..." -ForegroundColor Green

# Función para hacer peticiones HTTP
function Invoke-CreateRequest {
    param(
        [string]$Endpoint,
        [string]$Data
    )
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000$Endpoint" -Method POST -Body $Data -ContentType "application/json"
        Write-Host "✅ Creado exitosamente" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# 1. Crear Tecnologías
Write-Host "`n📦 Creando tecnologías..." -ForegroundColor Yellow

$technologies = @(
    @{
        name = "React"
        description = "Biblioteca de JavaScript para construir interfaces de usuario interactivas"
        icon = "react-icon.svg"
        category = "frontend"
        is_active = $true
    },
    @{
        name = "Vue.js"
        description = "Framework progresivo de JavaScript para construir interfaces de usuario"
        icon = "vue-icon.svg"
        category = "frontend"
        is_active = $true
    },
    @{
        name = "Angular"
        description = "Framework de desarrollo para crear aplicaciones web dinámicas"
        icon = "angular-icon.svg"
        category = "frontend"
        is_active = $true
    },
    @{
        name = "TypeScript"
        description = "Superset de JavaScript que añade tipado estático"
        icon = "typescript-icon.svg"
        category = "frontend"
        is_active = $true
    },
    @{
        name = "Node.js"
        description = "Runtime de JavaScript para el lado del servidor"
        icon = "nodejs-icon.svg"
        category = "backend"
        is_active = $true
    },
    @{
        name = "NestJS"
        description = "Framework para construir aplicaciones del lado del servidor escalables"
        icon = "nestjs-icon.svg"
        category = "backend"
        is_active = $true
    },
    @{
        name = "Express.js"
        description = "Framework web minimalista y flexible para Node.js"
        icon = "express-icon.svg"
        category = "backend"
        is_active = $true
    },
    @{
        name = "PostgreSQL"
        description = "Sistema de gestión de bases de datos relacional orientado a objetos"
        icon = "postgresql-icon.svg"
        category = "database"
        is_active = $true
    },
    @{
        name = "MongoDB"
        description = "Base de datos NoSQL orientada a documentos"
        icon = "mongodb-icon.svg"
        category = "database"
        is_active = $true
    }
)

$techIds = @()
foreach ($tech in $technologies) {
    $data = $tech | ConvertTo-Json
    $response = Invoke-CreateRequest -Endpoint "/technologies" -Data $data
    if ($response) {
        $techIds += $response.id
    }
}

# 2. Crear Proyectos
Write-Host "`n📁 Creando proyectos..." -ForegroundColor Yellow

$projects = @(
    @{
        title = "Portfolio Personal"
        description = "Portfolio personal desarrollado con React, TypeScript y NestJS. Incluye secciones para mostrar proyectos, tecnologías y información de contacto. Diseño responsive y moderno con animaciones suaves."
        image_url = "https://example.com/portfolio-image.jpg"
        github_url = "https://github.com/luiscabrera/portfolio"
        live_url = "https://luiscabrera.dev"
        is_active = $true
        order = 1
        technology_ids = @($techIds[0], $techIds[3], $techIds[4], $techIds[5], $techIds[7])
    },
    @{
        title = "E-commerce Platform"
        description = "Plataforma de comercio electrónico completa con carrito de compras, sistema de pagos, panel de administración y gestión de inventario. Desarrollada con Vue.js y Node.js."
        image_url = "https://example.com/ecommerce-image.jpg"
        github_url = "https://github.com/luiscabrera/ecommerce"
        live_url = "https://ecommerce-demo.com"
        is_active = $true
        order = 2
        technology_ids = @($techIds[1], $techIds[4], $techIds[6], $techIds[8])
    },
    @{
        title = "Task Management App"
        description = "Aplicación de gestión de tareas con funcionalidades de drag & drop, filtros avanzados, notificaciones en tiempo real y sincronización entre dispositivos."
        image_url = "https://example.com/task-app-image.jpg"
        github_url = "https://github.com/luiscabrera/task-manager"
        live_url = "https://task-manager-demo.com"
        is_active = $true
        order = 3
        technology_ids = @($techIds[0], $techIds[2], $techIds[4], $techIds[7])
    },
    @{
        title = "Weather Dashboard"
        description = "Dashboard meteorológico con visualizaciones interactivas, pronósticos detallados y integración con múltiples APIs de clima. Desarrollado con Angular y TypeScript."
        image_url = "https://example.com/weather-dashboard.jpg"
        github_url = "https://github.com/luiscabrera/weather-dashboard"
        live_url = "https://weather-dashboard.com"
        is_active = $true
        order = 4
        technology_ids = @($techIds[2], $techIds[3], $techIds[4], $techIds[5])
    }
)

$projectIds = @()
foreach ($project in $projects) {
    $data = $project | ConvertTo-Json
    $response = Invoke-CreateRequest -Endpoint "/projects" -Data $data
    if ($response) {
        $projectIds += $response.id
    }
}

# 3. Crear Usuarios
Write-Host "`n👥 Creando usuarios..." -ForegroundColor Yellow

$users = @(
    @{
        name = "Luis"
        last_name = "Cabrera"
        email = "luis@example.com"
        password = "password123"
        bio = "Desarrollador Full Stack apasionado por crear soluciones innovadoras y experiencias de usuario excepcionales. Especializado en React, Node.js y bases de datos relacionales."
    },
    @{
        name = "Admin"
        last_name = "User"
        email = "admin@example.com"
        password = "admin123"
        bio = "Administrador del sistema con experiencia en gestión de proyectos y desarrollo de software."
    }
)

foreach ($user in $users) {
    $data = $user | ConvertTo-Json
    Invoke-CreateRequest -Endpoint "/users" -Data $data
}

# 4. Crear Comentarios
Write-Host "`n💬 Creando comentarios..." -ForegroundColor Yellow

$comments = @(
    @{
        content = "Excelente portfolio! El diseño es muy profesional y la navegación es intuitiva. Me gusta especialmente la sección de proyectos con las tecnologías utilizadas."
        author_name = "María González"
        author_email = "maria@example.com"
        rating = 5
        project_id = $projectIds[0]
    },
    @{
        content = "Plataforma muy completa y funcional. El sistema de pagos está bien implementado y la interfaz de usuario es muy amigable. ¡Gran trabajo!"
        author_name = "Carlos Rodríguez"
        author_email = "carlos@example.com"
        rating = 4
        project_id = $projectIds[1]
    },
    @{
        content = "Aplicación muy útil para organizar tareas. El drag & drop funciona perfectamente y las notificaciones son muy útiles. Recomendado!"
        author_name = "Ana Martínez"
        author_email = "ana@example.com"
        rating = 5
        project_id = $projectIds[2]
    },
    @{
        content = "Dashboard meteorológico muy informativo. Las visualizaciones son claras y la información es precisa. Perfecto para planificar actividades al aire libre."
        author_name = "Pedro López"
        author_email = "pedro@example.com"
        rating = 4
        project_id = $projectIds[3]
    }
)

$commentIds = @()
foreach ($comment in $comments) {
    $data = $comment | ConvertTo-Json
    $response = Invoke-CreateRequest -Endpoint "/comments" -Data $data
    if ($response) {
        $commentIds += $response.id
    }
}

# 5. Aprobar Comentarios
Write-Host "`n✅ Aprobando comentarios..." -ForegroundColor Yellow

foreach ($commentId in $commentIds) {
    try {
        Invoke-RestMethod -Uri "http://localhost:3000/comments/$commentId/approve" -Method PATCH
        Write-Host "✅ Comentario $commentId aprobado" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Error aprobando comentario $commentId : $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Seed completado exitosamente!" -ForegroundColor Green
Write-Host "`n📊 Resumen:" -ForegroundColor Cyan
Write-Host "   - Tecnologías creadas: $($techIds.Count)" -ForegroundColor White
Write-Host "   - Proyectos creados: $($projectIds.Count)" -ForegroundColor White
Write-Host "   - Usuarios creados: $($users.Count)" -ForegroundColor White
Write-Host "   - Comentarios creados: $($commentIds.Count)" -ForegroundColor White

Write-Host "`n🔍 Puedes verificar los datos con:" -ForegroundColor Cyan
Write-Host "   curl http://localhost:3000/technologies" -ForegroundColor Gray
Write-Host "   curl http://localhost:3000/projects" -ForegroundColor Gray
Write-Host "   curl http://localhost:3000/comments" -ForegroundColor Gray 