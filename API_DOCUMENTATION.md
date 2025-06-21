# Documentación de la API - Portfolio Backend

## Descripción General

Esta API proporciona endpoints para gestionar un portfolio personal, incluyendo usuarios, tecnologías, proyectos y comentarios.

## Base URL

```
http://localhost:3000
```

## Autenticación

Actualmente no requiere autenticación (se implementará en futuras versiones).

## Endpoints Disponibles

## 👥 Usuarios

### GET /users

Obtiene todos los usuarios.

```json
Response: [
  {
    "id": 1,
    "name": "Luis",
    "last_name": "Cabrera",
    "email": "luis@example.com",
    "bio": "Desarrollador Full Stack",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### GET /users/:id

Obtiene un usuario específico por ID.

### POST /users

Crea un nuevo usuario.

```json
Request Body:
{
  "name": "Luis",
  "last_name": "Cabrera",
  "email": "luis@example.com",
  "password": "miContraseña123",
  "bio": "Desarrollador Full Stack"
}
```

### PUT /users/:id

Actualiza un usuario existente.

### DELETE /users/:id

Elimina un usuario.

## 🛠️ Tecnologías

### GET /technologies

Obtiene todas las tecnologías.

```json
Response: [
  {
    "id": 1,
    "name": "React",
    "description": "Biblioteca de JavaScript para interfaces de usuario",
    "icon": "react-icon.svg",
    "is_active": true,
    "category": "frontend",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### GET /technologies?category=frontend

Filtra tecnologías por categoría.

### GET /technologies/:id

Obtiene una tecnología específica por ID.

### POST /technologies

Crea una nueva tecnología.

```json
Request Body:
{
  "name": "React",
  "description": "Biblioteca de JavaScript para interfaces de usuario",
  "icon": "react-icon.svg",
  "category": "frontend",
  "is_active": true
}
```

### PUT /technologies/:id

Actualiza una tecnología existente.

### DELETE /technologies/:id

Elimina una tecnología.

## 📁 Proyectos

### GET /projects

Obtiene todos los proyectos con sus tecnologías.

```json
Response: [
  {
    "id": 1,
    "title": "Portfolio Personal",
    "description": "Portfolio desarrollado con React y NestJS",
    "image_url": "https://example.com/image.jpg",
    "github_url": "https://github.com/user/portfolio",
    "live_url": "https://portfolio.com",
    "is_active": true,
    "order": 1,
    "technologies": [
      {
        "id": 1,
        "name": "React",
        "category": "frontend"
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### GET /projects/active

Obtiene solo proyectos activos.

### GET /projects/:id

Obtiene un proyecto específico con sus tecnologías y comentarios.

### POST /projects

Crea un nuevo proyecto.

```json
Request Body:
{
  "title": "Portfolio Personal",
  "description": "Portfolio desarrollado con React y NestJS",
  "image_url": "https://example.com/image.jpg",
  "github_url": "https://github.com/user/portfolio",
  "live_url": "https://portfolio.com",
  "technology_ids": [1, 2, 3]
}
```

### PUT /projects/:id

Actualiza un proyecto existente.

### DELETE /projects/:id

Elimina un proyecto.

## 💬 Comentarios

### GET /comments

Obtiene todos los comentarios.

### GET /comments/pending

Obtiene comentarios pendientes de aprobación.

### GET /comments/project/:projectId

Obtiene comentarios aprobados de un proyecto específico.

### GET /comments/:id

Obtiene un comentario específico.

### POST /comments

Crea un nuevo comentario.

```json
Request Body:
{
  "content": "Excelente proyecto, muy bien estructurado!",
  "author_name": "Juan Pérez",
  "author_email": "juan@example.com",
  "rating": 5,
  "project_id": 1
}
```

### PUT /comments/:id

Actualiza un comentario existente.

### PATCH /comments/:id/approve

Aprueba un comentario pendiente.

### DELETE /comments/:id

Elimina un comentario.

## Códigos de Estado HTTP

- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `204 No Content`: Recurso eliminado exitosamente
- `400 Bad Request`: Datos de entrada inválidos
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error interno del servidor

## Validaciones

### Tecnologías

- `name`: String, 2-100 caracteres, único
- `description`: String opcional, máximo 1000 caracteres
- `icon`: URL opcional, máximo 255 caracteres
- `category`: frontend, backend, database, devops, mobile, other
- `is_active`: Boolean

### Proyectos

- `title`: String, 5-200 caracteres
- `description`: String, 10-2000 caracteres
- `image_url`: URL opcional
- `github_url`: URL opcional
- `live_url`: URL opcional
- `technology_ids`: Array de IDs de tecnologías

### Comentarios

- `content`: String, 10-1000 caracteres
- `author_name`: String, 2-100 caracteres
- `author_email`: Email opcional
- `rating`: Número entre 1-5
- `project_id`: ID del proyecto (requerido)

## Relaciones

- **Proyectos ↔ Tecnologías**: Muchos a muchos
- **Proyectos ↔ Comentarios**: Uno a muchos
- **Usuarios**: Independiente (para futura autenticación)

## Ejemplos de Uso

### Crear un proyecto con tecnologías

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Portfolio",
    "description": "Portfolio personal desarrollado con tecnologías modernas",
    "github_url": "https://github.com/user/portfolio",
    "technology_ids": [1, 2, 3]
  }'
```

### Obtener proyectos activos

```bash
curl http://localhost:3000/projects/active
```

### Aprobar un comentario

```bash
curl -X PATCH http://localhost:3000/comments/1/approve
```
