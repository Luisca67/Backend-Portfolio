# Configuración de Base de Datos PostgreSQL

## Requisitos Previos

1. **PostgreSQL instalado** en tu sistema
2. **Node.js y npm** instalados

## Pasos de Configuración

### 1. Instalar PostgreSQL

- Descarga e instala PostgreSQL desde: https://www.postgresql.org/download/
- Durante la instalación, anota la contraseña del usuario `postgres`

### 2. Crear la Base de Datos

```sql
-- Conectar a PostgreSQL
psql -U postgres

-- Crear la base de datos
CREATE DATABASE portfolio_db;

-- Verificar que se creó
\l

-- Salir
\q
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=portfolio_db

# Application Configuration
NODE_ENV=development
PORT=3000
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Ejecutar la Aplicación

```bash
npm run start:dev
```

## Estructura de la Base de Datos

La aplicación incluye una entidad de ejemplo `User` con los siguientes campos:

- `id`: Identificador único (autoincremental)
- `name`: Nombre del usuario (máximo 100 caracteres)
- `last_name`: Apellido del usuario (máximo 100 caracteres)
- `email`: Email único del usuario
- `password`: Contraseña del usuario (no se incluye en consultas por defecto)
- `bio`: Biografía opcional
- `createdAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

## Endpoints Disponibles

- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener un usuario por ID
- `POST /users` - Crear un nuevo usuario
- `PUT /users/:id` - Actualizar un usuario
- `DELETE /users/:id` - Eliminar un usuario

## Solución de Problemas

### Error SSL/TLS Required

Si encuentras el error "SSL/TLS required", puedes resolverlo de las siguientes maneras:

#### Opción 1: Configurar PostgreSQL para permitir conexiones sin SSL

Edita el archivo `postgresql.conf` (ubicado en la carpeta de datos de PostgreSQL):

```conf
# Busca y comenta o cambia esta línea:
# ssl = on
ssl = off
```

#### Opción 2: Configurar SSL en la aplicación

Si necesitas SSL, actualiza la configuración en `src/app.module.ts`:

```typescript
ssl: {
  rejectUnauthorized: false
},
extra: {
  ssl: {
    rejectUnauthorized: false
  }
}
```

#### Opción 3: Usar variables de entorno para SSL

```env
# En tu archivo .env
DB_SSL=true
```

### Error de Conexión

- Verifica que PostgreSQL esté ejecutándose
- Confirma las credenciales en el archivo `.env`
- Asegúrate de que la base de datos `portfolio_db` exista

## Seguridad

### Manejo de Contraseñas

- 🔒 Las contraseñas no se incluyen en las respuestas de la API
- 🔒 El campo password está configurado como `select: false` en la entidad
- 🔒 Se requiere un método específico para acceder a la contraseña (autenticación)

## Notas Importantes

- La opción `synchronize: true` está habilitada solo en desarrollo
- En producción, usa migraciones en lugar de `synchronize`
- Asegúrate de que PostgreSQL esté ejecutándose antes de iniciar la aplicación
- Las contraseñas se almacenan en texto plano (en producción deberías usar hash)
- SSL está deshabilitado para desarrollo local por defecto
