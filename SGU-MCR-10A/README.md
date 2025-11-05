# Sistema de Gestión de Usuarios - SGU

Proyecto de gestión de usuarios desarrollado con React, Spring Boot y MySQL, desplegado con Docker y Jenkins.

## 📋 Descripción

Aplicación CRUD completa para gestión de usuarios que incluye:
- **Frontend**: Aplicación React con interfaz moderna
- **Backend**: API REST con Spring Boot
- **Base de datos**: MySQL 8

## 🏗️ Estructura del Proyecto

```
SGU-MCR-10A/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── App.js         # Componente principal
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── nginx.conf
├── server/                 # Backend (Spring Boot)
│   ├── src/main/java/
│   │   └── com/sgu/
│   │       ├── model/     # Entidad Usuario
│   │       ├── repository/ # Repositorio JPA
│   │       ├── service/   # Lógica de negocio
│   │       └── controller/# Controlador REST
│   ├── Dockerfile
│   └── pom.xml
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

## 🚀 Características

- ✅ CRUD completo de usuarios
- ✅ Validación de datos en frontend y backend
- ✅ Interfaz moderna y responsive
- ✅ Manejo de modales para crear/editar
- ✅ Integración completa con Docker
- ✅ Pipeline automatizado con Jenkins

## 🔧 Tecnologías

- **Frontend**: React 18, Axios
- **Backend**: Spring Boot 3.2.0, Spring Data JPA
- **Base de datos**: MySQL 8
- **Despliegue**: Docker, Docker Compose
- **CI/CD**: Jenkins

## 📦 Servicios Docker

| Servicio      | Contenedor        | Imagen          | Puerto |
|---------------|-------------------|-----------------|--------|
| Frontend      | sgu-frontend      | client:1.0-sgu  | 80     |
| Backend       | sgu-backend       | server:1.0-sgu   | 8080   |
| Base de datos | sgu-database      | mysql:8         | 3306   |

### Red y Volumen
- **Red**: sgu-net
- **Volumen**: sgu-volume

## 🚀 Despliegue Local con Docker

### Prerrequisitos

- Docker instalado (versión 20.10 o superior)
- Docker Compose instalado (versión 1.29 o superior)
- Git (opcional, solo si clonas desde repositorio)

### Instrucciones Paso a Paso

#### 1. **Navegar al directorio del proyecto**
```bash
cd SGU-MCR-10A
```

#### 2. **Construir y levantar todos los servicios**
```bash
docker-compose up -d --build
```

Este comando:
- Construye las imágenes del backend (Spring Boot) y frontend (React + Nginx)
- Descarga la imagen de MySQL 8
- Crea los contenedores: `sgu-database`, `sgu-backend`, `sgu-frontend`
- Configura la red `sgu-net` para comunicación entre servicios
- Crea el volumen `sgu-volume` para persistencia de la base de datos

#### 3. **Verificar que los contenedores estén corriendo**
```bash
docker ps
```

Deberías ver 3 contenedores:
- `sgu-database` (MySQL)
- `sgu-backend` (Spring Boot)
- `sgu-frontend` (React + Nginx)

#### 4. **Ver logs de los servicios (opcional)**
```bash
# Ver todos los logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
```

#### 5. **Acceder a la aplicación**
- **Frontend**: http://localhost
- **API Backend**: http://localhost:8080/api/usuarios
- **Base de datos MySQL**: localhost:3306

> **Nota**: El backend puede tardar unos segundos en iniciar mientras espera que la base de datos esté lista.

#### 6. **Verificar que todo funciona**

**Frontend:**
- Abre http://localhost en tu navegador
- Deberías ver la interfaz de gestión de usuarios

**Backend API:**
```bash
# Probar el endpoint de usuarios
curl http://localhost:8080/api/usuarios
```

**Base de datos:**
```bash
# Acceder a la base de datos
docker exec -it sgu-database mysql -u root -prootpassword sgudatabase

# Dentro de MySQL, puedes verificar las tablas:
SHOW TABLES;
SELECT * FROM usuario;
exit
```

#### 7. **Parar los servicios**
```bash
# Parar servicios (mantiene volúmenes)
docker-compose down

# Parar servicios y eliminar volúmenes (elimina datos)
docker-compose down -v
```

### Solución de Problemas

#### Error de timeout al descargar imágenes de Docker Hub
Si encuentras el error: `context deadline exceeded` o `timeout exceeded`:

**Solución 1: Verificar conexión a internet**
```bash
# Verificar que tienes conexión
ping -c 3 registry-1.docker.io
```

**Solución 2: Configurar mirror de Docker (si estás en China o región con restricciones)**
```bash
# Editar o crear /etc/docker/daemon.json (Linux) o ~/.docker/daemon.json (Mac)
{
  "registry-mirrors": ["https://mirror.ccs.tencentyun.com"]
}
```

**Solución 3: Descargar la imagen manualmente primero**
```bash
# Descargar la imagen de MySQL antes de ejecutar docker-compose
docker pull mysql:8

# Luego ejecutar docker-compose
docker-compose up -d --build
```

**Solución 4: Aumentar el timeout de Docker**
```bash
# En Mac/Windows, aumentar el timeout en Docker Desktop
# Settings → Docker Engine → agregar:
{
  "max-concurrent-downloads": 3,
  "max-concurrent-uploads": 5
}
```

#### El backend no se conecta a la base de datos
- Verifica que el contenedor de la base de datos esté corriendo: `docker ps`
- Revisa los logs del backend: `docker-compose logs backend`
- Espera unos segundos, el backend espera a que la base de datos esté lista

#### El frontend no se conecta al backend
- Verifica que ambos contenedores estén corriendo: `docker ps`
- Revisa los logs: `docker-compose logs frontend`
- Verifica que nginx esté configurado correctamente

#### Reiniciar un servicio específico
```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart database
```

#### Reconstruir un servicio después de cambios
```bash
# Reconstruir solo el backend
docker-compose up -d --build backend

# Reconstruir solo el frontend
docker-compose up -d --build frontend
```

## 📋 Endpoints API

Base URL: `http://localhost:8080/api/usuarios`

| Método | Endpoint         | Descripción              |
|--------|------------------|--------------------------|
| GET    | /api/usuarios    | Obtener todos los usuarios |
| GET    | /api/usuarios/:id| Obtener usuario por ID   |
| POST   | /api/usuarios    | Crear nuevo usuario       |
| PUT    | /api/usuarios/:id| Actualizar usuario        |
| DELETE | /api/usuarios/:id| Eliminar usuario          |

## 💾 Modelo de Datos

### Usuario
- `id`: Long (auto-generado)
- `nombreCompleto`: String (obligatorio)
- `correoElectronico`: String (obligatorio, único)
- `numeroTelefono`: String (obligatorio)

## 🔄 Pipeline Jenkins

El pipeline incluye las siguientes etapas:

1. **Checkout**: Obtener código del repositorio
2. **Limpiar Contenedores**: Eliminar contenedores anteriores
3. **Limpiar Imágenes**: Eliminar imágenes anteriores
4. **Construir Imágenes**: Build de Dockerfiles
5. **Levantar Servicios**: Iniciar con docker-compose
6. **Verificar Servicios**: Health checks
7. **Validar API**: Pruebas de endpoints

Para ejecutar el pipeline en Jenkins, configura un job con:
- Tipo: Pipeline
- Definition: Pipeline script from SCM
- SCM: Git (URL del repositorio)
- Script Path: Jenkinsfile

## 🎨 Uso de la Aplicación

1. **Crear Usuario**: Click en "Nuevo Usuario", completar formulario y guardar
2. **Editar Usuario**: Click en icono de editar (✏️) en la fila del usuario
3. **Eliminar Usuario**: Click en icono de eliminar (🗑️) en la fila del usuario
4. **Validación**: El formulario valida correo electrónico y número de teléfono

## 🛠️ Comandos Útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker logs sgu-backend
docker logs sgu-frontend
docker logs sgu-database

# Reiniciar un servicio
docker restart sgu-backend

# Acceder a la base de datos
docker exec -it sgu-database mysql -u root -prootpassword sgu_db

# Limpiar todo (volúmenes incluidos)
docker-compose down -v
```

## 📝 Notas de Configuración Docker

### Credenciales de la Base de Datos
- **Usuario**: `root`
- **Password**: `rootpassword`
- **Database**: `sgudatabase`
- **Puerto**: `3306`

### Volúmenes y Redes
- **Volumen**: `sgu-volume` - Persiste los datos de MySQL
- **Red**: `sgu-net` - Red interna para comunicación entre servicios

### Configuración de Servicios

**Backend (Spring Boot)**
- Puerto: `8080`
- Se conecta a la base de datos usando el nombre del servicio: `database:3306`
- Usa variables de entorno para configuración flexible

**Frontend (React + Nginx)**
- Puerto: `80`
- Nginx hace proxy de `/api` al backend en `backend:8080`
- Usa URL relativa para funcionar tanto en desarrollo como en producción

**Base de Datos (MySQL 8)**
- Puerto: `3306`
- Health check configurado para esperar a que esté lista antes de iniciar el backend

## 👥 Autor

SGU-MCR-10A - Sistema de Gestión de Usuarios

## 📄 Licencia

Este proyecto es de uso educativo.

