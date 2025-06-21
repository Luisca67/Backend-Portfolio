# Comandos para Crear Registros en la Base de Datos

## Prerrequisitos

1. Asegúrate de que la aplicación esté ejecutándose: `npm run start:dev`
2. La aplicación debe estar disponible en: `http://localhost:3000`

## 🛠️ 1. Crear Tecnologías

### Frontend Technologies

```bash
# React
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React",
    "description": "Biblioteca de JavaScript para construir interfaces de usuario interactivas",
    "icon": "react-icon.svg",
    "category": "frontend",
    "is_active": true
  }'

# Vue.js
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vue.js",
    "description": "Framework progresivo de JavaScript para construir interfaces de usuario",
    "icon": "vue-icon.svg",
    "category": "frontend",
    "is_active": true
  }'

# Angular
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Angular",
    "description": "Framework de desarrollo para crear aplicaciones web dinámicas",
    "icon": "angular-icon.svg",
    "category": "frontend",
    "is_active": true
  }'

# TypeScript
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TypeScript",
    "description": "Superset de JavaScript que añade tipado estático",
    "icon": "typescript-icon.svg",
    "category": "frontend",
    "is_active": true
  }'
```

### Backend Technologies

```bash
# Node.js
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Node.js",
    "description": "Runtime de JavaScript para el lado del servidor",
    "icon": "nodejs-icon.svg",
    "category": "backend",
    "is_active": true
  }'

# NestJS
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "NestJS",
    "description": "Framework para construir aplicaciones del lado del servidor escalables",
    "icon": "nestjs-icon.svg",
    "category": "backend",
    "is_active": true
  }'

# Express.js
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Express.js",
    "description": "Framework web minimalista y flexible para Node.js",
    "icon": "express-icon.svg",
    "category": "backend",
    "is_active": true
  }'
```

### Database Technologies

```bash
# PostgreSQL
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PostgreSQL",
    "description": "Sistema de gestión de bases de datos relacional orientado a objetos",
    "icon": "postgresql-icon.svg",
    "category": "database",
    "is_active": true
  }'

# MongoDB
curl -X POST http://localhost:3000/technologies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MongoDB",
    "description": "Base de datos NoSQL orientada a documentos",
    "icon": "mongodb-icon.svg",
    "category": "database",
    "is_active": true
  }'
```

## 📁 2. Crear Proyectos

```bash
# Portfolio Personal
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Portfolio Personal",
    "description": "Portfolio personal desarrollado con React, TypeScript y NestJS. Incluye secciones para mostrar proyectos, tecnologías y información de contacto. Diseño responsive y moderno con animaciones suaves.",
    "image_url": "https://example.com/portfolio-image.jpg",
    "github_url": "https://github.com/luiscabrera/portfolio",
    "live_url": "https://luiscabrera.dev",
    "is_active": true,
    "order": 1,
    "technology_ids": [1, 4, 6, 7, 9]
  }'

# E-commerce Platform
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-commerce Platform",
    "description": "Plataforma de comercio electrónico completa con carrito de compras, sistema de pagos, panel de administración y gestión de inventario. Desarrollada con Vue.js y Node.js.",
    "image_url": "https://example.com/ecommerce-image.jpg",
    "github_url": "https://github.com/luiscabrera/ecommerce",
    "live_url": "https://ecommerce-demo.com",
    "is_active": true,
    "order": 2,
    "technology_ids": [2, 5, 8, 10]
  }'

# Task Management App
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Task Management App",
    "description": "Aplicación de gestión de tareas con funcionalidades de drag & drop, filtros avanzados, notificaciones en tiempo real y sincronización entre dispositivos.",
    "image_url": "https://example.com/task-app-image.jpg",
    "github_url": "https://github.com/luiscabrera/task-manager",
    "live_url": "https://task-manager-demo.com",
    "is_active": true,
    "order": 3,
    "technology_ids": [1, 3, 6, 9]
  }'

# Weather Dashboard
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Weather Dashboard",
    "description": "Dashboard meteorológico con visualizaciones interactivas, pronósticos detallados y integración con múltiples APIs de clima. Desarrollado con Angular y TypeScript.",
    "image_url": "https://example.com/weather-dashboard.jpg",
    "github_url": "https://github.com/luiscabrera/weather-dashboard",
    "live_url": "https://weather-dashboard.com",
    "is_active": true,
    "order": 4,
    "technology_ids": [3, 4, 5, 7]
  }'
```

## 👥 3. Crear Usuarios

```bash
# Usuario Principal
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luis",
    "last_name": "Cabrera",
    "email": "luis@example.com",
    "password": "password123",
    "bio": "Desarrollador Full Stack apasionado por crear soluciones innovadoras y experiencias de usuario excepcionales. Especializado en React, Node.js y bases de datos relacionales."
  }'

# Usuario Administrador
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "last_name": "User",
    "email": "admin@example.com",
    "password": "admin123",
    "bio": "Administrador del sistema con experiencia en gestión de proyectos y desarrollo de software."
  }'
```

## 💬 4. Crear Comentarios

```bash
# Comentario para Portfolio
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Excelente portfolio! El diseño es muy profesional y la navegación es intuitiva. Me gusta especialmente la sección de proyectos con las tecnologías utilizadas.",
    "author_name": "María González",
    "author_email": "maria@example.com",
    "rating": 5,
    "project_id": 1
  }'

# Comentario para E-commerce
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Plataforma muy completa y funcional. El sistema de pagos está bien implementado y la interfaz de usuario es muy amigable. ¡Gran trabajo!",
    "author_name": "Carlos Rodríguez",
    "author_email": "carlos@example.com",
    "rating": 4,
    "project_id": 2
  }'

# Comentario para Task Manager
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Aplicación muy útil para organizar tareas. El drag & drop funciona perfectamente y las notificaciones son muy útiles. Recomendado!",
    "author_name": "Ana Martínez",
    "author_email": "ana@example.com",
    "rating": 5,
    "project_id": 3
  }'

# Comentario para Weather Dashboard
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Dashboard meteorológico muy informativo. Las visualizaciones son claras y la información es precisa. Perfecto para planificar actividades al aire libre.",
    "author_name": "Pedro López",
    "author_email": "pedro@example.com",
    "rating": 4,
    "project_id": 4
  }'
```

## 🔍 5. Comandos de Consulta

### Ver todas las tecnologías

```bash
curl http://localhost:3000/technologies
```

### Ver tecnologías por categoría

```bash
curl http://localhost:3000/technologies?category=frontend
curl http://localhost:3000/technologies?category=backend
curl http://localhost:3000/technologies?category=database
```

### Ver todos los proyectos

```bash
curl http://localhost:3000/projects
```

### Ver proyectos activos

```bash
curl http://localhost:3000/projects/active
```

### Ver todos los comentarios

```bash
curl http://localhost:3000/comments
```

### Ver comentarios de un proyecto específico

```bash
curl http://localhost:3000/comments/project/1
```

### Ver comentarios pendientes de aprobación

```bash
curl http://localhost:3000/comments/pending
```

## ✅ 6. Aprobar Comentarios

```bash
# Aprobar comentario con ID 1
curl -X PATCH http://localhost:3000/comments/1/approve

# Aprobar comentario con ID 2
curl -X PATCH http://localhost:3000/comments/2/approve

# Aprobar comentario con ID 3
curl -X PATCH http://localhost:3000/comments/3/approve

# Aprobar comentario con ID 4
curl -X PATCH http://localhost:3000/comments/4/approve
```

## 📝 Notas Importantes

1. **Orden de ejecución**: Ejecuta primero las tecnologías, luego proyectos, usuarios y finalmente comentarios
2. **IDs de tecnologías**: Los `technology_ids` en los proyectos deben corresponder a los IDs reales de las tecnologías creadas
3. **IDs de proyectos**: Los `project_id` en los comentarios deben corresponder a los IDs reales de los proyectos creados
4. **Aprobación**: Los comentarios se crean como pendientes por defecto, usa el comando PATCH para aprobarlos
5. **Validación**: Todos los datos pasan por validación automática, asegúrate de que cumplan con los requisitos

## 🚀 Script de Ejecución Automática

Puedes crear un archivo `.sh` (Linux/Mac) o `.bat` (Windows) con todos estos comandos para ejecutarlos automáticamente:

```bash
#!/bin/bash
# seed_database.sh

echo "🌱 Iniciando seed de la base de datos..."

# Crear tecnologías
echo "📦 Creando tecnologías..."
# [Aquí van todos los comandos de tecnologías]

# Crear proyectos
echo "📁 Creando proyectos..."
# [Aquí van todos los comandos de proyectos]

# Crear usuarios
echo "👥 Creando usuarios..."
# [Aquí van todos los comandos de usuarios]

# Crear comentarios
echo "💬 Creando comentarios..."
# [Aquí van todos los comandos de comentarios]

# Aprobar comentarios
echo "✅ Aprobando comentarios..."
# [Aquí van todos los comandos de aprobación]

echo "🎉 Seed completado exitosamente!"
```
