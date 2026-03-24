# CineWeb — Plataforma de Gestión de Películas y Series

> **Panel de Administración para gestión de contenido multimedia**
>
> Proyecto académico — Institución Universitaria Digital de Antioquia — Ingeniería Web II

---

## Autores

- William García Leonel — Grupo: PREICA2601B010006
- Juan Felipe Saldarriaga — Grupo: PREICA2601B010005
- Sebastian Mesa Meneses — Grupo: PREICA2601B010006

---

## Descripción

CineWeb es una aplicación web fullstack que permite gestionar un catálogo de películas y series en modo Administrador. Consta de una **API REST** (backend) y un **panel administrativo** (frontend) que consume dicha API.

El objetivo es ofrecer a docentes, estudiantes, colaboradores y público en general una plataforma tipo streaming donde puedan ver contenido multimedia de forma gratuita.

---

## Tecnologías

### Backend

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Node.js** | 18+ | Entorno de ejecución JavaScript |
| **Express.js** | 5.x | Framework web para la API REST |
| **MongoDB** | Atlas | Base de datos NoSQL en la nube |
| **Mongoose** | 9.x | ODM para modelado de datos MongoDB |
| **dotenv** | 17.x | Variables de entorno |
| **cors** | 2.x | Middleware para Cross-Origin Requests |
| **nodemon** | 3.x | Recarga automática en desarrollo |

### Frontend

| Tecnología | Descripción |
|------------|-------------|
| **React** | Biblioteca para construir interfaces de usuario |
| **Vite** | Herramienta de bundling y servidor de desarrollo |
| **React Router DOM** | Navegación SPA (Single Page Application) |
| **Axios** | Cliente HTTP para consumir la API REST |
| **Bootstrap** | Framework CSS para diseño responsivo |
| **SweetAlert2** | Alertas y confirmaciones elegantes |

---

## Estructura del Proyecto

```
Cineweb/
├── backend/
│   ├── controllers/
│   │   ├── generoController.js
│   │   ├── directorController.js
│   │   ├── productoraController.js
│   │   ├── tipoController.js
│   │   └── mediaController.js
│   ├── models/
│   │   ├── Genero.js
│   │   ├── Director.js
│   │   ├── Productora.js
│   │   ├── Tipo.js
│   │   └── Media.js
│   ├── routes/
│   │   ├── genero.js
│   │   ├── directorRoutes.js
│   │   ├── productoraRoutes.js
│   │   ├── tipoRoutes.js
│   │   └── mediaRoutes.js
│   ├── db/
│   │   └── db-connection-mongo.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── GeneroPage.jsx
│   │   │   ├── GeneroForm.jsx
│   │   │   ├── DirectorPage.jsx
│   │   │   ├── DirectorForm.jsx
│   │   │   ├── ProductoraPage.jsx
│   │   │   ├── ProductoraForm.jsx
│   │   │   ├── TipoPage.jsx
│   │   │   ├── TipoForm.jsx
│   │   │   ├── MediaPage.jsx
│   │   │   └── MediaForm.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── generoService.js
│   │   │   ├── directorService.js
│   │   │   ├── productoraService.js
│   │   │   ├── tipoService.js
│   │   │   └── mediaService.js
│   │   ├── helpers/
│   │   │   └── alerts.js
│   │   ├── routes/
│   │   │   └── AppRouter.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Instalación y Configuración

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) (o instancia local de MongoDB)
- [Git](https://git-scm.com/)

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Cineweb
```

### 2. Configurar y ejecutar el Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` en `backend/` con:

```env
PORT=4000
MONGO_URI=mongodb+srv://USUARIO:password@cluster0.mongodb.net/cineweb?retryWrites=true&w=majority
```

> Reemplazar `USUARIO` y `password` con las credenciales reales de MongoDB Atlas.

Iniciar:

```bash
npm run dev
```

El backend se ejecutará en `http://localhost:4000`

### 3. Configurar y ejecutar el Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecutará en `http://localhost:5000`

> **Nota:** El puerto del frontend se configura en `frontend/vite.config.js` en la propiedad `server.port`.

---

## Arquitectura

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────┐
│                  │  HTTP   │                  │ Mongoose │              │
│  Frontend React  │ ──────► │  Backend Express │ ───────► │  MongoDB     │
│  (Puerto 5000)   │  Axios  │  (Puerto 4000)   │          │  Atlas       │
│                  │ ◄────── │                  │ ◄─────── │              │
└──────────────────┘  JSON   └──────────────────┘  BSON    └──────────────┘
```

El frontend se comunica con el backend a través de **Axios**, apuntando a `http://localhost:4000/api`. Esta URL base se configura en `frontend/src/services/api.js`.

---

## Módulos del Sistema

### 1. Módulo Género (`/api/genero`)

Gestiona los géneros de películas (Acción, Aventura, Ciencia Ficción, Drama, etc.).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String | Nombre del género (único, obligatorio) |
| `estado` | String | `Activo` o `Inactivo` (default: `Activo`) |
| `descripcion` | String | Descripción del género |
| `fechaCreacion` | Date | Automática |
| `fechaActualizacion` | Date | Automática |

---

### 2. Módulo Director (`/api/director`)

Gestiona los directores principales de las producciones.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombres` | String | Nombre completo del director (obligatorio) |
| `estado` | String | `Activo` o `Inactivo` (default: `Activo`) |
| `fechaCreacion` | Date | Automática |
| `fechaActualizacion` | Date | Automática |

---

### 3. Módulo Productora (`/api/productora`)

Gestiona las productoras (Disney, Warner, Paramount, etc.).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String | Nombre de la productora (único, obligatorio) |
| `estado` | String | `Activo` o `Inactivo` (default: `Activo`) |
| `slogan` | String | Slogan de la productora |
| `descripcion` | String | Descripción de la productora |
| `fechaCreacion` | Date | Automática |
| `fechaActualizacion` | Date | Automática |

---

### 4. Módulo Tipo (`/api/tipo`)

Gestiona los tipos de multimedia (Película, Serie, etc.). Este módulo no tiene campo `estado`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | String | Nombre del tipo (obligatorio) |
| `descripcion` | String | Descripción del tipo |
| `fechaCreacion` | Date | Automática |
| `fechaActualizacion` | Date | Automática |

---

### 5. Módulo Media (`/api/media`) — Módulo Principal

Gestiona las producciones (películas y series). Referencia a los demás módulos.

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
| `fechaCreacion` | Date | Automática |
| `fechaActualizacion` | Date | Automática |

> **Regla de negocio:** Al crear o actualizar una media, el sistema valida que el género, director y productora se encuentren en estado **Activo**.

---

## Endpoints de la API

Todos los módulos exponen 5 endpoints REST:

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/{modulo}` | Obtener todos los registros |
| `GET` | `/api/{modulo}/:id` | Obtener un registro por ID |
| `POST` | `/api/{modulo}` | Crear un nuevo registro |
| `PUT` | `/api/{modulo}/:id` | Actualizar un registro |
| `DELETE` | `/api/{modulo}/:id` | Eliminar un registro |

Donde `{modulo}` puede ser: `genero`, `director`, `productora`, `tipo`, `media`

---

## Rutas del Frontend

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | HomePage | Dashboard principal |
| `/generos` | GeneroPage | Listado de géneros |
| `/generos/nuevo` | GeneroForm | Crear género |
| `/generos/editar/:id` | GeneroForm | Editar género |
| `/directores` | DirectorPage | Listado de directores |
| `/directores/nuevo` | DirectorForm | Crear director |
| `/directores/editar/:id` | DirectorForm | Editar director |
| `/productoras` | ProductoraPage | Listado de productoras |
| `/productoras/nuevo` | ProductoraForm | Crear productora |
| `/productoras/editar/:id` | ProductoraForm | Editar productora |
| `/tipos` | TipoPage | Listado de tipos |
| `/tipos/nuevo` | TipoForm | Crear tipo |
| `/tipos/editar/:id` | TipoForm | Editar tipo |
| `/media` | MediaPage | Listado de medias |
| `/media/nuevo` | MediaForm | Crear media |
| `/media/editar/:id` | MediaForm | Editar media |

---

## Frontend — Capa de Servicios

Cada módulo tiene un archivo de servicio dedicado en `frontend/src/services/` que centraliza las llamadas HTTP:

| Servicio | Endpoint | Funciones |
|----------|----------|-----------|
| `generoService.js` | `/api/genero` | `getAll`, `getById`, `create`, `update`, `remove` |
| `directorService.js` | `/api/director` | `getAll`, `getById`, `create`, `update`, `remove` |
| `productoraService.js` | `/api/productora` | `getAll`, `getById`, `create`, `update`, `remove` |
| `tipoService.js` | `/api/tipo` | `getAll`, `getById`, `create`, `update`, `remove` |
| `mediaService.js` | `/api/media` | `getAll`, `getById`, `create`, `update`, `remove` |

La URL base (`http://localhost:4000/api`) se configura en `services/api.js`.

---

## Frontend — Diseño Visual

El frontend utiliza un diseño profesional con las siguientes características:

- **Fuente:** Inter (Google Fonts)
- **Paleta:** Azul oscuro slate (#2c3e50) como primario, azul (#3498db) como acento
- **Tablas:** Headers oscuros, hover suave, badges de estado con colores semánticos
- **Formularios:** Cards blancas centradas, inputs con focus azul, botones consistentes
- **Alertas:** SweetAlert2 para confirmaciones de eliminación y mensajes de éxito/error
- **Responsive:** Bootstrap con tablas responsive y layout adaptable

---

## Diagrama de Relaciones

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

## Scripts Disponibles

### Backend (`cd backend`)

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `npm run dev` | Servidor con nodemon (desarrollo) |
| `start` | `npm start` | Servidor con node (producción) |

### Frontend (`cd frontend`)

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `npm run dev` | Servidor Vite en puerto 5000 (desarrollo) |
| `build` | `npm run build` | Genera la carpeta `dist/` para producción |
| `preview` | `npm run preview` | Previsualiza el build de producción |

---

## Configuración de Puertos

| Servicio | Puerto | Dónde se configura |
|----------|--------|--------------------|
| **Backend** | 4000 | `backend/.env` → variable `PORT` |
| **Frontend** | 5000 | `frontend/vite.config.js` → `server.port` |

---

## Licencia

ISC
