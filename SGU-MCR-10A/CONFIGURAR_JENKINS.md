# Guía para Configurar Jenkins con tu Proyecto SGU-MCR-10A

## 📋 Requisitos Previos

- ✅ Docker y Docker Compose instalados
- ✅ Repositorio Git creado (`SGU-MCR-10A`)
- ✅ Jenkins instalado y corriendo

---

## 🚀 Paso 1: Acceder a Jenkins

### Opción A: Jenkins en Docker (Recomendado)

Si Jenkins está corriendo en Docker:

```bash
# Verificar que Jenkins está corriendo
docker ps | grep jenkins

# Si no está corriendo, puedes levantarlo con:
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts

# La contraseña inicial estará en los logs:
docker logs <container_id>
```

**Acceder a Jenkins:**
- Abre tu navegador en: **http://localhost:8080**
- Ingresa la contraseña inicial del administrador (la obtienes de los logs)

### Opción B: Jenkins Instalado Localmente

#### macOS (con Homebrew)

**1. Instalar Jenkins:**
```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Jenkins
brew install jenkins-lts
```

**2. Iniciar Jenkins:**
```bash
# Iniciar Jenkins (se ejecutará como servicio)
brew services start jenkins-lts

# O iniciar manualmente (sin servicio)
jenkins-lts
```

**3. Verificar que está corriendo:**
```bash
# Ver el estado del servicio
brew services list | grep jenkins

# O verificar el proceso
ps aux | grep jenkins
```

**4. Obtener contraseña inicial:**
```bash
# La contraseña estará en:
cat ~/.jenkins/secrets/initialAdminPassword
```

**5. Acceder a Jenkins:**
- Abre tu navegador en: **http://localhost:8080**

**6. Detener Jenkins:**
```bash
# Si está como servicio
brew services stop jenkins-lts

# Si está corriendo manualmente
# Presiona Ctrl+C en la terminal donde está corriendo
```

---

#### Linux (Ubuntu/Debian)

**1. Instalar Jenkins:**
```bash
# Actualizar paquetes
sudo apt update

# Instalar dependencias
sudo apt install openjdk-17-jdk -y

# Agregar clave GPG de Jenkins
curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Agregar repositorio de Jenkins
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Instalar Jenkins
sudo apt update
sudo apt install jenkins -y
```

**2. Iniciar Jenkins:**
```bash
# Iniciar servicio Jenkins
sudo systemctl start jenkins

# Habilitar para que inicie automáticamente al arrancar
sudo systemctl enable jenkins

# Verificar estado
sudo systemctl status jenkins
```

**3. Obtener contraseña inicial:**
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

**4. Acceder a Jenkins:**
- Abre tu navegador en: **http://localhost:8080**

**5. Detener Jenkins:**
```bash
sudo systemctl stop jenkins
```

---

#### Linux (CentOS/RHEL/Fedora)

**1. Instalar Jenkins:**
```bash
# Instalar Java
sudo yum install java-17-openjdk -y

# Agregar repositorio de Jenkins
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io-2023.key

# Instalar Jenkins
sudo yum install jenkins -y
```

**2. Iniciar Jenkins:**
```bash
# Iniciar servicio
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Verificar estado
sudo systemctl status jenkins
```

**3. Obtener contraseña inicial:**
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

#### Windows

**1. Instalar Jenkins:**

**Opción A: Con instalador (Recomendado)**
1. Descarga el instalador desde: https://www.jenkins.io/download/
2. Ejecuta el archivo `.msi` descargado
3. Sigue el asistente de instalación
4. Jenkins se instalará como servicio de Windows

**Opción B: Con Java directamente**
```powershell
# Descargar jenkins.war desde https://www.jenkins.io/download/
# Ejecutar con Java:
java -jar jenkins.war
```

**2. Iniciar Jenkins:**

**Si se instaló como servicio:**
- Jenkins iniciará automáticamente
- O desde "Servicios" de Windows → Buscar "Jenkins" → Iniciar

**Si se ejecuta con Java:**
```powershell
# Navegar a la carpeta donde está jenkins.war
cd C:\ruta\a\jenkins

# Ejecutar Jenkins
java -jar jenkins.war
```

**3. Obtener contraseña inicial:**
- La contraseña estará en: `C:\Program Files\Jenkins\secrets\initialAdminPassword`
- O en la terminal donde se ejecutó Jenkins

**4. Acceder a Jenkins:**
- Abre tu navegador en: **http://localhost:8080**

---

### Paso 1.1: Configuración Inicial de Jenkins

Si es la primera vez que abres Jenkins:

1. **Obtener contraseña inicial**:
   ```bash
   # Si está en Docker
   docker exec <jenkins_container> cat /var/jenkins_home/secrets/initialAdminPassword
   
   # Si está instalado localmente:
   # macOS:
   cat ~/.jenkins/secrets/initialAdminPassword
   
   # Linux:
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   
   # Windows:
   # Ruta: C:\Program Files\Jenkins\secrets\initialAdminPassword
   ```

2. **Instalar plugins sugeridos** (o plugins personalizados)
3. **Crear usuario administrador**
4. **Configurar URL de Jenkins** (puedes dejarlo por defecto)

---

## 🔧 Paso 2: Instalar Plugins Necesarios

### Plugins Requeridos:

1. **Git Plugin** (viene por defecto)
2. **Docker Pipeline Plugin**
3. **Docker Plugin**

### Para instalar plugins:

1. Ve a **Manage Jenkins** → **Plugins**
2. En la pestaña **Available**, busca:
   - `Docker Pipeline`
   - `Docker`
3. Selecciona los plugins y haz clic en **Install without restart**
4. Espera a que se instalen

---

## 📦 Paso 3: Configurar Docker en Jenkins

### Opción A: Jenkins en Docker con Docker Socket

Si Jenkins está en Docker y necesitas acceso a Docker:

```bash
# Detener Jenkins actual
docker stop <jenkins_container>

# Ejecutar Jenkins con acceso al socket de Docker
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

### Opción B: Jenkins Local

Si Jenkins está instalado localmente, asegúrate de que el usuario `jenkins` tenga permisos para Docker:

```bash
# Agregar usuario jenkins al grupo docker
sudo usermod -aG docker jenkins

# Reiniciar Jenkins
sudo systemctl restart jenkins
```

### Verificar Docker en Jenkins:

1. Ve a **Manage Jenkins** → **System Information**
2. Busca información sobre Docker
3. O ve a **Manage Jenkins** → **Nodes** → **Configure**
4. Verifica que Docker esté disponible

---

## 🆕 Paso 4: Crear un Nuevo Pipeline Job

### 4.1 Crear el Job

1. En la página principal de Jenkins, haz clic en **New Item**
2. Ingresa el nombre: `SGU-MCR-10A` (o el nombre que prefieras)
3. Selecciona **Pipeline**
4. Haz clic en **OK**

### 4.2 Configurar el Pipeline

En la configuración del pipeline:

#### Pestaña "General"

- ✅ Marca **GitHub project** (si usas GitHub)
- ✅ Marca **Build Triggers** → **GitHub hook trigger for GITScm polling** (opcional, para builds automáticos)

#### Pestaña "Pipeline"

1. **Definition**: Selecciona **Pipeline script from SCM**
2. **SCM**: Selecciona **Git**
3. **Repository URL**: Ingresa la URL de tu repositorio Git
   - Ejemplo GitHub: `https://github.com/tu-usuario/SGU-MCR-10A.git`
   - Ejemplo GitLab: `https://gitlab.com/tu-usuario/SGU-MCR-10A.git`
   - Ejemplo Bitbucket: `https://bitbucket.org/tu-usuario/SGU-MCR-10A.git`
4. **Credentials**: 
   - Si es repositorio público: Deja vacío
   - Si es privado: Agrega credenciales (Username/Password o SSH)
5. **Branches to build**: `*/main` o `*/master` (según tu rama principal)
6. **Script Path**: `Jenkinsfile` (debe coincidir con el nombre de tu archivo)
7. Haz clic en **Save**

---

## 🔐 Paso 5: Configurar Credenciales (Solo si el Repo es Privado)

Si tu repositorio es privado:

1. Ve a **Manage Jenkins** → **Credentials**
2. Click en **System** → **Global credentials (unrestricted)**
3. Click en **Add Credentials**
4. Selecciona:
   - **Kind**: Username with password
   - **Username**: Tu usuario de Git
   - **Password**: Tu contraseña o token de acceso
   - **ID**: `git-credentials` (o el nombre que prefieras)
   - **Description**: Credenciales Git
5. Click en **OK**
6. En la configuración del pipeline, selecciona estas credenciales

---

## ▶️ Paso 6: Ejecutar el Pipeline

### 6.1 Primera Ejecución

1. Ve a tu pipeline job (`SGU-MCR-10A`)
2. Haz clic en **Build Now**
3. Verás que aparece un nuevo build en el historial
4. Haz clic en el número del build para ver el progreso
5. Haz clic en **Console Output** para ver los logs en tiempo real

### 6.2 Verificar el Progreso

En la consola verás:
- ✅ Checkout del código
- ✅ Limpieza de contenedores anteriores
- ✅ Construcción de imágenes
- ✅ Levantamiento de servicios
- ✅ Health checks
- ✅ Validación de API

### 6.3 Si el Pipeline Falla

**Revisar logs:**
1. Ve al build que falló
2. Click en **Console Output**
3. Revisa los errores (generalmente aparecen en rojo)

**Errores comunes:**

1. **Error de conexión a Git**:
   - Verifica la URL del repositorio
   - Verifica las credenciales si es privado

2. **Error de Docker**:
   - Verifica que Docker esté corriendo: `docker ps`
   - Verifica permisos de Docker para Jenkins

3. **Error de puertos ocupados**:
   ```bash
   # Verificar puertos
   lsof -i :8080
   lsof -i :80
   
   # Si están ocupados, detener contenedores anteriores
   docker-compose down
   ```

4. **Error de build**:
   - Revisa los logs del stage que falló
   - Verifica que todos los archivos estén en el repo

---

## ✅ Paso 7: Verificar que Todo Funciona

### 7.1 Verificar Contenedores

```bash
# En tu terminal local, verifica que los contenedores estén corriendo
docker ps

# Deberías ver:
# - sgu-database
# - sgu-backend
# - sgu-frontend
```

### 7.2 Probar la Aplicación

1. **Frontend**: http://localhost
2. **Backend API**: http://localhost:8080/api/usuarios
3. **Probar CRUD**: Crear, editar, eliminar usuarios

### 7.3 Verificar el Pipeline Exitoso

1. En Jenkins, ve a tu pipeline
2. Verifica que el último build tenga un ícono verde ✓
3. Haz clic en el build para ver detalles
4. Verifica que todos los stages estén en verde

---

## 📸 Paso 8: Obtener la Captura del Pipeline

Para la captura `U2_06_SGUpipeline_Apellidos.png`:

1. **Abre Jenkins** en tu navegador
2. **Ve a tu pipeline** (`SGU-MCR-10A`)
3. **Asegúrate de tener un build reciente y exitoso**:
   - Si no tienes uno, ejecuta **Build Now**
   - Espera a que termine exitosamente
4. **Toma la captura** mostrando:
   - Nombre del pipeline
   - Historial de builds con el más reciente en verde ✓
   - Fecha y hora del build más reciente
   - Todos los stages exitosos

**Ejemplo de vista a capturar:**
```
Pipeline: SGU-MCR-10A

Historial de Builds:
#3  ✓  Today 10:30 AM  (2 min 15 sec)
#2  ✓  Yesterday 3:45 PM
#1  ✓  Yesterday 2:20 PM

Build #3 - Stages:
✓ Checkout
✓ Limpiar Contenedores Anteriores
✓ Limpiar Imágenes Anteriores
✓ Construir Imágenes
✓ Levantar Servicios
✓ Verificar Servicios
✓ Health Check
✓ Validar API
```

---

## 🔄 Paso 9: Configurar Build Automático (Opcional)

Si quieres que el pipeline se ejecute automáticamente cuando hagas push:

### Para GitHub:

1. En la configuración del pipeline, marca **GitHub hook trigger for GITScm polling**
2. En GitHub, ve a tu repositorio → **Settings** → **Webhooks**
3. Click en **Add webhook**
4. Payload URL: `http://tu-servidor-jenkins:8080/github-webhook/`
5. Content type: `application/json`
6. Click en **Add webhook**

### Para GitLab:

1. Similar a GitHub, pero usa la URL de GitLab webhook

---

## 🛠️ Comandos Útiles para Troubleshooting

```bash
# Ver logs de Jenkins (si está en Docker)
docker logs <jenkins_container> -f

# Reiniciar Jenkins
# Docker:
docker restart <jenkins_container>

# Local:
sudo systemctl restart jenkins

# Verificar que Docker está disponible en Jenkins
docker exec <jenkins_container> docker ps

# Limpiar builds antiguos en Jenkins
# Ve a Manage Jenkins → Manage Old Data → Delete old builds
```

---

## 📝 Checklist Final

- [ ] Jenkins está corriendo y accesible en http://localhost:8080
- [ ] Plugins necesarios instalados (Git, Docker Pipeline)
- [ ] Docker está disponible para Jenkins
- [ ] Pipeline creado y configurado
- [ ] Repositorio Git conectado correctamente
- [ ] Pipeline ejecutado exitosamente al menos una vez
- [ ] Contenedores están corriendo después del pipeline
- [ ] Frontend y backend funcionan correctamente
- [ ] Captura del pipeline exitoso obtenida

---

## 💡 Tips Importantes

1. **Siempre ejecuta el pipeline antes de tomar la captura** para que sea reciente
2. **Verifica que el build sea exitoso** (ícono verde)
3. **Si algo falla, revisa los logs** en Console Output
4. **Asegúrate de que no haya contenedores anteriores** corriendo antes de ejecutar el pipeline

---

## 🆘 Si Necesitas Ayuda

### Error: "docker: command not found"
- Jenkins no tiene acceso a Docker
- Verifica la configuración de Docker en Jenkins

### Error: "Cannot connect to Docker daemon"
- Docker no está corriendo
- Verifica con `docker ps`

### Error: "Port already in use"
- Los puertos 80 o 8080 están ocupados
- Detén contenedores anteriores: `docker-compose down`

### Error: "Git repository not found"
- Verifica la URL del repositorio
- Verifica las credenciales si es privado

¡Buena suerte con tu configuración! 🚀

