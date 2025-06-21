# DTOs (Data Transfer Objects) - Usuario

## Descripción

Los DTOs son objetos que definen la estructura de los datos que se envían y reciben a través de la API. Proporcionan validación, transformación y documentación de los datos.

## DTOs Disponibles

### 1. CreateUserDto

**Propósito:** Validar datos para crear un nuevo usuario

**Campos:**

- `name` (string, requerido): Nombre del usuario (2-100 caracteres)
- `last_name` (string, requerido): Apellido del usuario (2-100 caracteres)
- `email` (string, requerido): Email válido y único
- `password` (string, requerido): Contraseña del usuario (6-100 caracteres)
- `bio` (string, opcional): Biografía del usuario (máximo 500 caracteres)

**Ejemplo de uso:**

```json
{
  "name": "Luis",
  "last_name": "Cabrera",
  "email": "luis@example.com",
  "password": "miContraseña123",
  "bio": "Desarrollador Full Stack"
}
```

### 2. UpdateUserDto

**Propósito:** Validar datos para actualizar un usuario existente

**Características:**

- Extiende de `CreateUserDto`
- Todos los campos son opcionales
- Permite actualizaciones parciales

**Ejemplo de uso:**

```json
{
  "name": "Luis Actualizado",
  "last_name": "Cabrera Actualizado",
  "bio": "Nueva biografía"
}
```

### 3. UserResponseDto

**Propósito:** Definir la estructura de respuesta para usuarios

**Campos:**

- `id` (number): ID único del usuario
- `name` (string): Nombre del usuario
- `last_name` (string): Apellido del usuario
- `email` (string): Email del usuario
- `bio` (string): Biografía del usuario
- `createdAt` (Date): Fecha de creación
- `updatedAt` (Date): Fecha de última actualización

**Nota:** El campo `password` está excluido de las respuestas de la API por seguridad.

## Validaciones Implementadas

### CreateUserDto

- ✅ `name`: String, mínimo 2 caracteres, máximo 100
- ✅ `last_name`: String, mínimo 2 caracteres, máximo 100
- ✅ `email`: Formato de email válido
- ✅ `password`: String, mínimo 6 caracteres, máximo 100
- ✅ `bio`: String opcional, máximo 500 caracteres

### Validación Global

- ✅ **Whitelist**: Solo permite propiedades definidas en el DTO
- ✅ **ForbidNonWhitelisted**: Rechaza propiedades no permitidas
- ✅ **Transform**: Convierte automáticamente tipos de datos

## Seguridad

### Manejo de Contraseñas

- 🔒 La contraseña no se incluye en las respuestas de la API
- 🔒 La contraseña está configurada como `select: false` en la entidad
- 🔒 Se requiere un método específico para acceder a la contraseña (autenticación)

## Códigos de Estado HTTP

- `200 OK`: Operación exitosa (GET, PUT)
- `201 Created`: Usuario creado exitosamente (POST)
- `204 No Content`: Usuario eliminado exitosamente (DELETE)
- `400 Bad Request`: Datos de entrada inválidos
- `404 Not Found`: Usuario no encontrado

## Ejemplos de Respuestas

### Usuario Creado (201)

```json
{
  "id": 1,
  "name": "Luis",
  "last_name": "Cabrera",
  "email": "luis@example.com",
  "bio": "Desarrollador Full Stack",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Error de Validación (400)

```json
{
  "statusCode": 400,
  "message": [
    "El nombre debe tener al menos 2 caracteres",
    "El apellido debe tener al menos 2 caracteres",
    "El email debe ser válido",
    "La contraseña debe tener al menos 6 caracteres"
  ],
  "error": "Bad Request"
}
```
