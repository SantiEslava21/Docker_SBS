# Auth API

API de autenticación construida con NestJS + PostgreSQL + Docker.  
Soporta múltiples entornos: dev, staging y production.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

---

# Tabla de Contenido

- Descripción
- Tecnologías
- Estructura del Proyecto
- Manejo de Entornos
- Instalación Local
- Docker
- Base de Datos
- Migraciones
- Swagger
- Testing
- Manejo de Ramas (Git)
- Deployment
- Autora
- Licencia

---

# Descripción

Auth API es una API RESTful diseñada para manejar autenticación y gestión de usuarios.

Arquitectura basada en:

- Modularización por dominio
- Configuración dinámica por entorno
- Contenedores independientes por ambiente
- Buenas prácticas con TypeORM

---

# Tecnologías

- NestJS
- PostgreSQL 17
- Docker
- Docker Compose
- TypeORM
- JWT
- Swagger
- Jest

---

# Estructura del Proyecto

```
src/
├── config/
├── modules/
│   ├── auth/
│   ├── users/
├── main.ts
├── app.module.ts

docker-compose.dev.yml
docker-compose.stg.yml
docker-compose.prod.yml

.env
.stg.env
.prod.env
```

---

# Manejo de Entornos

El proyecto soporta tres entornos:

| Entorno    | API  | PostgreSQL |
|------------|------|------------|
| Dev        | 3000 | 5432       |
| Staging    | 3001 | 5433       |
| Production | 3002 | 5434       |

Cada entorno carga automáticamente su configuración según la variable `NODE_ENV`.

---

# Instalación Local (sin Docker)

## 1. Instalar dependencias

```bash
npm install
```

## 2. Ejecutar en desarrollo

```bash
npm run start:dev
```

## 3. Ejecutar en producción local

```bash
npm run start:prod
```

---

# Docker

Cada entorno tiene su propio archivo docker-compose.

## Levantar entorno Dev

```bash
docker compose -p auth_dev -f docker-compose.dev.yml up -d --build
```

API disponible en:
```
http://localhost:3000
```

## Levantar entorno Staging

```bash
docker compose -p auth_stg -f docker-compose.stg.yml up -d --build
```

API disponible en:
```
http://localhost:3001
```

## Levantar entorno Production

```bash
docker compose -p auth_prod -f docker-compose.prod.yml up -d --build
```

API disponible en:
```
http://localhost:3002
```

## Detener un entorno

```bash
docker compose -p auth_prod down
```

Eliminar base de datos (incluye volúmenes):

```bash
docker compose -p auth_prod down -v
```

---

# Base de Datos

PostgreSQL corre en contenedores separados por entorno.

Dentro de Docker el host siempre debe ser:

```
DB_HOST=postgres
```

Nunca usar `localhost` dentro del contenedor.

---

# Migraciones (TypeORM)

Generar migración:

```bash
npm run typeorm migration:generate -- -n MigrationName
```

Ejecutar migraciones:

```bash
npm run typeorm migration:run
```

Revertir migración:

```bash
npm run typeorm migration:revert
```

---

# Swagger

Si Swagger está habilitado en `main.ts`, la documentación estará disponible en:

```
http://localhost:3000/api
```

Cambiar el puerto según el entorno.

---

# Testing

Ejecutar pruebas unitarias:

```bash
npm run test
```

Pruebas e2e:

```bash
npm run test:e2e
```

Cobertura:

```bash
npm run test:cov
```

---

# Manejo de Ramas (Git)

Actualizar referencias remotas:

```bash
git fetch origin
```

Crear ramas locales desde origin:

```bash
git switch -c develop origin/develop
git switch -c staging origin/staging
git switch -c main origin/main
```

---

# Deployment

Para producción se recomienda:

- Variables de entorno seguras
- Deshabilitar `synchronize: true` en TypeORM
- Ejecutar migraciones antes de levantar la aplicación
- Usar modo build optimizado

Ejemplo:

```bash
docker compose -p auth_prod -f docker-compose.prod.yml up -d --build
```

---

# Autora

S. B. S.

---

# Licencia

Este proyecto está bajo licencia MIT.
