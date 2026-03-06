# 🎬 CineWeb — Backend API REST

> **Plataforma de gestión de películas y series en modo Administrador**
>
> Proyecto académico de la Institución Universitaria Digital de Antioquia — Ingeniería Web II

---

## 👨‍💻 Autores

William García Leonel Grupo: PREICA2601B010006
Juan Felipe Saldarriaga Grupo: PREICA2601B010005
Sebastian Mesa Meneses: PREICA2601B010006


Proyecto desarrollado como parte de la asignatura **Ingeniería Web II** de la **Institución Universitaria Digital de Antioquia (IU Digital)**.

---

## 📋 Descripción

CineWeb es una API REST desarrollada con arquitectura monolítica que permite gestionar un catálogo de películas y series. La aplicación está orientada al **modo Administrador**, donde se pueden agregar, editar, consultar y eliminar producciones multimedia junto con sus entidades relacionadas: géneros, directores, productoras y tipos.

El objetivo final es ofrecer una plataforma tipo streaming donde docentes, estudiantes, colaboradores y público en general puedan ver contenido multimedia de forma gratuita.

---

## 🚀 Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Node.js** | 18+ | Entorno de ejecución JavaScript |
| **Express.js** | 5.x | Framework web para la API REST |
| **MongoDB** | Atlas | Base de datos NoSQL en la nube |
| **Mongoose** | 9.x | ODM para modelado de datos MongoDB |
| **dotenv** | 17.x | Variables de entorno |
| **cors** | 2.x | Middleware para Cross-Origin Requests |
| **nodemon** | 3.x | Recarga automática en desarrollo |

---

## 📁 Estructura del Proyecto

```
backend/
├── controllers/
│   ├── generoController.js       # CRUD de géneros
│   ├── directorController.js     # CRUD de directores
│   ├── productoraController.js   # CRUD de productoras
│   ├── tipoController.js        # CRUD de tipos
│   └── mediaController.js       # CRUD de medias (películas/series)
├── models/
│   ├── Genero.js                 # Modelo Mongoose - Género
│   ├── Director.js               # Modelo Mongoose - Director
│   ├── Productora.js             # Modelo Mongoose - Productora
│   ├── Tipo.js                   # Modelo Mongoose - Tipo
│   └── Media.js                  # Modelo Mongoose - Media
├── routes/
│   ├── genero.js                 # Rutas /api/genero
│   ├── directorRoutes.js         # Rutas /api/director
│   ├── productoraRoutes.js       # Rutas /api/productora
│   ├── tipoRoutes.js             # Rutas /api/tipo
│   └── mediaRoutes.js            # Rutas /api/media
├── db/
│   └── db-connection-mongo.js    # Conexión a MongoDB Atlas
├── .env                          # Variables de entorno (no se sube al repo)
├── .env.template                 # Plantilla de variables de entorno
├── .gitignore
├── index.js                      # Punto de entrada de la aplicación
├── package.json
└── README.md
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (o una instancia local de MongoDB)
- [Git](https://git-scm.com/)

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Cineweb/backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz de `backend/` basándose en `.env.template`:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://USUARIO:password@cluster0.mongodb.net/cineweb?retryWrites=true&w=majority
   ```
   > ⚠️ Reemplazar `USUARIO` y `password` con las credenciales reales de MongoDB Atlas.

4. **Iniciar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Iniciar en modo producción**
   ```bash
   npm start
   ```

El servidor se ejecutará en `http://localhost:4000`

---

## 📦 Módulos del Sistema

### 1. 🎭 Módulo Género (`/api/genero`)

Gestiona los géneros de películas (Acción, Aventura, Ciencia Ficción, Drama, Terror, etc.).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String | Nombre del género (único, obligatorio) |
| `estado` | String | `Activo` o `Inactivo` (default: `Activo`) |
| `descripcion` | String | Descripción del género |
| `fechaCreacion` | Date | Fecha de creación (automática) |
| `fechaActualizacion` | Date | Fecha de última actualización (automática) |

---

### 2. 🎬 Módulo Director (`/api/director`)

Gestiona los directores principales de las producciones.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombres` | String | Nombre completo del director (obligatorio) |
| `estado` | String | `Activo` o `Inactivo` (default: `Activo`) |
| `fechaCreacion` | Date | Fecha de creación (automática) |
| `fechaActualizacion` | Date | Fecha de última actualización (automática) |

---

### 3. 🏢 Módulo Productora (`/api/productora`)

Gestiona las productoras (Disney, Warner, Paramount, MGM, etc.).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String | Nombre de la productora (único, obligatorio) |
| `estado` | String | `Activo` o `Inactivo` (default: `Activo`) |
| `slogan` | String | Slogan de la productora |
| `descripcion` | String | Descripción de la productora |
| `fechaCreacion` | Date | Fecha de creación (automática) |
| `fechaActualizacion` | Date | Fecha de última actualización (automática) |

---

### 4. 📂 Módulo Tipo (`/api/tipo`)

Gestiona los tipos de multimedia (Película, Serie, etc.).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String | Nombre del tipo (único, obligatorio) |
| `descripcion` | String | Descripción del tipo |
| `fechaCreacion` | Date | Fecha de creación (automática) |
| `fechaActualizacion` | Date | Fecha de última actualización (automática) |

---

### 5. 🎥 Módulo Media (`/api/media`) — *Módulo Principal*

Gestiona las producciones (películas y series). Este módulo referencia a los demás módulos.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `serial` | String | Identificador único de la producción |
| `titulo` | String | Título de la producción (obligatorio) |
| `sinopsis` | String | Sinopsis de la producción |
| `url` | String | URL de reproducción (única, obligatoria) |
| `imagen` | String | URL de la imagen de portada |
| `anioEstreno` | Number | Año de estreno (obligatorio) |
| `genero` | ObjectId → Genero | Género principal (solo activos) |
| `director` | ObjectId → Director | Director principal (solo activos) |
| `productora` | ObjectId → Productora | Productora principal (solo activas) |
| `tipo` | ObjectId → Tipo | Tipo de media |
| `fechaCreacion` | Date | Fecha de creación (automática) |
| `fechaActualizacion` | Date | Fecha de última actualización (automática) |

> **Regla de negocio:** Al crear o actualizar una media, el sistema valida que el género, director y productora seleccionados se encuentren en estado **Activo**.

---

## 🌐 Endpoints de la API

Todos los módulos exponen los mismos 5 endpoints REST:

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/{modulo}` | Obtener todos los registros |
| `GET` | `/api/{modulo}/:id` | Obtener un registro por ID |
| `POST` | `/api/{modulo}` | Crear un nuevo registro |
| `PUT` | `/api/{modulo}/:id` | Actualizar un registro |
| `DELETE` | `/api/{modulo}/:id` | Eliminar un registro |

Donde `{modulo}` puede ser: `genero`, `director`, `productora`, `tipo`, `media`

---

## 🧪 Ejemplos de Uso (Postman / cURL)

### Crear un Género

```bash
curl -X POST http://localhost:4000/api/genero \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Acción",
    "descripcion": "Películas de acción y aventura"
  }'
```

### Crear un Director

```bash
curl -X POST http://localhost:4000/api/director \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Christopher Nolan"
  }'
```

### Crear una Productora

```bash
curl -X POST http://localhost:4000/api/productora \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Warner Bros.",
    "slogan": "If you can dream it, we can film it",
    "descripcion": "Productora de cine y televisión americana"
  }'
```

### Crear un Tipo

```bash
curl -X POST http://localhost:4000/api/tipo \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Película",
    "descripcion": "Producción cinematográfica"
  }'
```

### Crear una Media

```bash
curl -X POST http://localhost:4000/api/media \
  -H "Content-Type: application/json" \
  -d '{
    "serial": "MOV-001",
    "titulo": "Interstellar",
    "sinopsis": "Un grupo de exploradores viaja a través de un agujero de gusano en el espacio.",
    "url": "https://cineweb.example.com/interstellar",
    "imagen": "https://cineweb.example.com/img/interstellar.jpg",
    "anioEstreno": 2014,
    "genero": "<ID_DEL_GENERO>",
    "director": "<ID_DEL_DIRECTOR>",
    "productora": "<ID_DE_LA_PRODUCTORA>",
    "tipo": "<ID_DEL_TIPO>"
  }'
```

> 📌 Reemplazar `<ID_DEL_GENERO>`, `<ID_DEL_DIRECTOR>`, `<ID_DE_LA_PRODUCTORA>` y `<ID_DEL_TIPO>` con los ObjectId reales obtenidos al crear cada entidad.

### Obtener todas las Medias (con datos poblados)

```bash
curl http://localhost:4000/api/media
```

---

## 📐 Diagrama de Relaciones

```
┌──────────────┐     ┌──────────────┐
│   Género     │     │   Director   │
│  (1 → N)     │     │  (1 → N)     │
└──────┬───────┘     └──────┬───────┘
       │                    │
       ▼                    ▼
┌──────────────────────────────────┐
│            MEDIA                 │
│  (Películas y Series)            │
│                                  │
│  - serial (único)                │
│  - titulo                        │
│  - url (único)                   │
│  - genero → Género (activo)      │
│  - director → Director (activo)  │
│  - productora → Productora       │
│  - tipo → Tipo                   │
└──────────────────────────────────┘
       ▲                    ▲
       │                    │
┌──────┴───────┐     ┌──────┴───────┐
│  Productora  │     │    Tipo      │
│  (1 → N)     │     │  (1 → N)    │
└──────────────┘     └──────────────┘
```

---

## 📝 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `npm run dev` | Inicia el servidor con nodemon (desarrollo) |
| `start` | `npm start` | Inicia el servidor con node (producción) |


---

## 📄 Licencia

ISC
