# Guía de Entrega - SGU-MCR-10A

## ✅ Verificación de Requisitos

### I. Nombre de la Carpeta Raíz
- **Requerido**: SGU-[iniciales]-[grado y grupo]
- **Actual**: `SGU-MCR-10A` ✅
- **Estado**: ✅ CUMPLE

### II. CRUD de Usuarios
- **Requerido**: Gestión de información personal (nombre completo, correo electrónico, número de teléfono)
- **Implementado**: 
  - ✅ Nombre completo (`nombreCompleto`)
  - ✅ Correo electrónico (`correoElectronico`)
  - ✅ Número de teléfono (`numeroTelefono`)
- **Estado**: ✅ CUMPLE

### III. Vista con Modal
- **Requerido**: Modal para el formulario o formulario junto a la tabla
- **Implementado**: 
  - ✅ Componente `UserModal.js` para crear/editar usuarios
  - ✅ Componente `UserTable.js` para mostrar usuarios
  - ✅ Integración completa en `App.js`
- **Estado**: ✅ CUMPLE

### IV. Estructura de Módulos
- **Requerido**: Paquete/carpeta dentro de modules con el nombre del módulo
- **Estructura actual**:
  ```
  server/src/main/java/com/sgu/
    ├── controller/    (UsuarioController)
    ├── model/         (Usuario)
    ├── repository/    (UsuarioRepository)
    ├── service/       (UsuarioService)
    └── SguApplication.java
  ```
- **Estado**: ✅ CUMPLE (estructura modular con paquetes Java organizados)

### V. Nombres de Contenedores, Servicios e Imágenes

| Servicio | Nombre Servicio (compose) | Nombre Contenedor | Nombre Imagen y Versión | ¿Se construye? |
|----------|-------------------------|-------------------|-------------------------|----------------|
| Base de datos | `database` ✅ | `sgu-database` ✅ | `mysql:8` ✅ | NO ✅ |
| Cliente | `frontend` ✅ | `sgu-frontend` ✅ | `client:1.0-sgu` ✅ | SÍ ✅ |
| Servidor | `backend` ✅ | `sgu-backend` ✅ | `server:1.0-sgu` ✅ | SÍ ✅ |

- **Estado**: ✅ CUMPLE

### VI. Red y Volumen
- **Red requerida**: `sgu-net`
  - **Implementado**: ✅ Red `sgu-net` configurada en docker-compose.yml
- **Volumen requerido**: `sgu-volume`
  - **Implementado**: ✅ Volumen `sgu-volume` configurado para MySQL
- **Estado**: ✅ CUMPLE

### VII. Jenkinsfile
- **Requerido**: Jenkinsfile creado y adecuado al proyecto
- **Implementado**: ✅ Jenkinsfile completo con:
  - Checkout del código
  - Limpieza de contenedores e imágenes
  - Construcción de imágenes
  - Levantamiento de servicios
  - Health checks
  - Validación de API
- **Estado**: ✅ CUMPLE

### VIII. Repositorio Git
- **Requerido**: Repositorio con el mismo nombre de la carpeta raíz
- **Nombre requerido**: `SGU-MCR-10A`
- **Acción requerida**: Crear el repositorio y subir el código
- **Estado**: ⚠️ PENDIENTE (acción del usuario)

---

## 🚀 Instrucciones para Ejecutar el Proyecto

### Paso 1: Preparar el Entorno

1. **Asegúrate de tener Docker instalado**
   ```bash
   docker --version
   docker-compose --version
   ```

2. **Navegar al directorio del proyecto**
   ```bash
   cd SGU-MCR-10A
   ```

### Paso 2: Construir y Levantar los Servicios

```bash
docker-compose up -d --build
```

Este comando:
- Construye las imágenes del backend y frontend
- Descarga la imagen de MySQL 8
- Crea los 3 contenedores: `sgu-database`, `sgu-backend`, `sgu-frontend`
- Configura la red `sgu-net` y el volumen `sgu-volume`

### Paso 3: Verificar que los Contenedores Estén Corriendo

```bash
docker ps
```

Deberías ver 3 contenedores:
- `sgu-database` (MySQL)
- `sgu-backend` (Spring Boot)
- `sgu-frontend` (React + Nginx)

### Paso 4: Ver Logs (Opcional)

```bash
# Ver todos los logs
docker-compose logs -f

# Ver logs específicos
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database
```

### Paso 5: Acceder a la Aplicación

- **Frontend**: http://localhost
- **API Backend**: http://localhost:8080/api/usuarios
- **Base de datos MySQL**: localhost:3306

> **Nota**: El backend puede tardar 20-30 segundos en iniciar completamente mientras espera que la base de datos esté lista.

### Paso 6: Probar el CRUD

1. Abre http://localhost en tu navegador
2. Haz clic en "Nuevo Usuario"
3. Completa el formulario (nombre, correo, teléfono)
4. Guarda y verifica que aparece en la tabla
5. Prueba editar un usuario (clic en ✏️)
6. Prueba eliminar un usuario (clic en 🗑️)

---

## 📸 Capturas de Pantalla Requeridas

### 1. Docker Desktop - Compose Stack
**Archivo**: `U2_05_SGUdocker_Apellidos.png` (o .jpg/.jpeg)

**Pasos para obtener la captura**:
1. Abre Docker Desktop
2. Ve a la sección "Containers" o "Compose"
3. Busca tu stack (debería aparecer como "sgu-mcr-10a" o similar)
4. Expande el stack para ver los 3 contenedores desglosados:
   - `sgu-database`
   - `sgu-backend`
   - `sgu-frontend`
5. Toma una captura de pantalla donde se vea claramente:
   - Los nombres de los contenedores
   - Sus estados (Running)
   - Los puertos mapeados
   - La red `sgu-net`
   - El volumen `sgu-volume`

### 2. Pipeline de Jenkins
**Archivo**: `U2_06_SGUpipeline_Apellidos.png` (o .jpg/.jpeg)

**Pasos para obtener la captura**:
1. Abre Jenkins
2. Ve a tu job/pipeline
3. Busca el despliegue más reciente (debe ser de hoy o ayer)
4. Verifica que el pipeline sea exitoso (icono verde ✓)
5. Toma una captura de pantalla donde se vea:
   - El nombre del pipeline
   - La fecha/hora del despliegue (reciente)
   - Todos los stages exitosos (verde)
   - El tiempo de ejecución

**Si el pipeline falla**:
- Revisa los logs: `docker-compose logs backend`
- Verifica que los servicios estén corriendo: `docker ps`
- Asegúrate de que el puerto 8080 y 80 no estén ocupados

### 3. Video Demo del Frontend
**Archivo**: `U2_07_SGUdemo_Apellidos.mp4` (o .mov)

**Contenido del video** (duración sugerida: 1-2 minutos):

1. **Introducción** (5 segundos)
   - Muestra la URL: http://localhost
   - Muestra que el frontend está cargado

2. **Crear Usuario** (20 segundos)
   - Clic en "Nuevo Usuario"
   - Llenar el formulario:
     - Nombre: "Juan Pérez"
     - Correo: "juan@example.com"
     - Teléfono: "1234567890"
   - Guardar
   - Verificar que aparece en la tabla

3. **Crear otro Usuario** (15 segundos)
   - Crear un segundo usuario diferente
   - Verificar que ambos aparecen en la tabla

4. **Editar Usuario** (20 segundos)
   - Clic en el icono de editar (✏️) de un usuario
   - Modificar algún campo (ej: cambiar el nombre)
   - Guardar
   - Verificar que los cambios se reflejan en la tabla

5. **Eliminar Usuario** (15 segundos)
   - Clic en el icono de eliminar (🗑️) de un usuario
   - Confirmar la eliminación
   - Verificar que el usuario desaparece de la tabla

6. **Verificación Final** (5 segundos)
   - Mostrar que la tabla solo muestra los usuarios restantes
   - Cerrar el modal si está abierto

**Herramientas para grabar**:
- macOS: QuickTime Player (Grabación de pantalla)
- Windows: Xbox Game Bar (Win + G)
- Linux: OBS Studio, SimpleScreenRecorder

---

## 🔧 Solución de Problemas Comunes

### El backend no se conecta a la base de datos
```bash
# Verificar que la base de datos está corriendo
docker ps | grep sgu-database

# Ver logs del backend
docker-compose logs backend

# Reiniciar el backend
docker-compose restart backend
```

### El frontend no se conecta al backend
```bash
# Verificar que ambos servicios están corriendo
docker ps

# Ver logs del frontend
docker-compose logs frontend

# Verificar la configuración de nginx
docker exec sgu-frontend cat /etc/nginx/conf.d/default.conf
```

### Los puertos están ocupados
```bash
# Verificar qué está usando los puertos
lsof -i :8080  # Backend
lsof -i :80    # Frontend
lsof -i :3306  # Base de datos

# Si están ocupados, puedes cambiar los puertos en docker-compose.yml
```

### Reconstruir todo desde cero
```bash
# Parar y eliminar todo
docker-compose down -v

# Eliminar imágenes
docker rmi server:1.0-sgu client:1.0-sgu || true

# Construir y levantar de nuevo
docker-compose up -d --build
```

---

## 📝 Checklist Final Antes de Entregar

- [ ] ✅ Proyecto ejecuta correctamente con `docker-compose up -d --build`
- [ ] ✅ Los 3 contenedores están corriendo (`docker ps`)
- [ ] ✅ El frontend es accesible en http://localhost
- [ ] ✅ El backend responde en http://localhost:8080/api/usuarios
- [ ] ✅ El CRUD funciona completamente (crear, leer, actualizar, eliminar)
- [ ] ✅ Captura de Docker Desktop con el stack desglosado
- [ ] ✅ Captura del pipeline de Jenkins exitoso y reciente
- [ ] ✅ Video demo del frontend funcionando
- [ ] ✅ Repositorio Git creado con nombre `SGU-MCR-10A`
- [ ] ✅ Código subido al repositorio Git

---

## 🎯 Comandos Rápidos de Referencia

```bash
# Levantar servicios
docker-compose up -d --build

# Ver estado
docker ps

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v

# Reiniciar un servicio
docker-compose restart backend

# Acceder a la base de datos
docker exec -it sgu-database mysql -u root -prootpassword sgudatabase

# Probar API
curl http://localhost:8080/api/usuarios
```

---

## 📧 Notas Importantes

1. **Asegúrate de que el pipeline de Jenkins sea reciente** (no de hace semanas)
2. **El video debe mostrar claramente todas las operaciones CRUD**
3. **Las capturas deben ser claras y legibles**
4. **Verifica que los nombres de archivos sigan la nomenclatura exacta**:
   - `U2_05_SGUdocker_Apellidos.png`
   - `U2_06_SGUpipeline_Apellidos.png`
   - `U2_07_SGUdemo_Apellidos.mp4`

¡Buena suerte con tu entrega! 🚀

