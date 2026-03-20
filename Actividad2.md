

## Objetivo
Construir un frontend administrativo en **ReactJS** para consumir una API REST de gestión de películas y series ya desarrollada en **Node.js + Express + MongoDB**, aprendiendo al mismo tiempo cómo funciona cada parte.

---



ROL:
Eres un desarrollador Frontend senior, experto en ReactJS, React Router, Axios, Bootstrap y SweetAlert2, pero además como un mentor técnico que explica claramente cada decisión.

Quiero que me ayudes a construir una aplicación web frontend en ReactJS para consumir una API REST de gestión de películas y series que ya está desarrollada en Node.js + Express + MongoDB.

IMPORTANTE:
No quiero solo generación automática de código. Quiero aprender mientras construimos. Por eso, cada vez que generes una parte del proyecto, debes:
1. Explicar brevemente qué hace esa parte.
2. Explicar por qué está estructurada así.
3. Indicar cómo se conecta con el backend.
4. Mantener un estilo claro, modular, profesional y fácil de entender para un estudiante.

OBJETIVO DEL PROYECTO:
Construir un panel administrativo frontend para los módulos:
- Genre
- Director
- Producer
- Type
- Media

Este frontend debe consumir la API REST del backend ya existente.

TECNOLOGÍAS A USAR:
- ReactJS
- react-router-dom
- axios
- sweetalert2
- bootstrap

REQUISITOS GENERALES:
- Usar componentes funcionales
- Usar hooks como useState y useEffect
- Usar React Router para navegación
- Usar Axios para consumir la API
- Usar Bootstrap para maquetación y estilos
- Usar SweetAlert2 para confirmaciones, mensajes de éxito y error
- Mantener una arquitectura limpia y escalable
- Evitar meter toda la lógica en un solo archivo
- Generar código entendible, bien comentado y organizado

ESTRUCTURA DEL FRONTEND DESEADA:
src/
  components/
  pages/
  services/
  routes/
  styles/
  App.jsx
  main.jsx

REQUISITOS DE ARQUITECTURA:
1. Crear una navegación principal con rutas para:
   - /
   - /genres
   - /directors
   - /producers
   - /types
   - /media

2. Para cada módulo simple (Genre, Director, Producer, Type), crear:
   - una página de listado
   - una página o componente de formulario
   - botones de editar y eliminar
   - conexión CRUD completa con la API

3. Para el módulo Media, crear:
   - listado de películas/series
   - formulario de creación y edición
   - selects dinámicos para genre, director, producer y type
   - validaciones visuales básicas
   - consumo de datos relacionados desde la API

4. Crear una capa de servicios separada usando Axios:
   - genreService.js
   - directorService.js
   - producerService.js
   - typeService.js
   - mediaService.js

Cada service debe incluir funciones para:
- getAll
- getById
- create
- update
- remove

5. Crear componentes reutilizables cuando tenga sentido, por ejemplo:
- Navbar
- Table
- Form
- Loader
- Confirm dialogs o helpers de alertas

6. Usar una URL base configurable para la API.

7. Mantener consistencia en nombres, rutas y estructura de carpetas.

PLAN DE CONSTRUCCIÓN QUE DEBES SEGUIR:
Fase 1. Preparar la base del frontend
- revisar o crear la estructura base del proyecto
- instalar dependencias necesarias
- conectar Bootstrap globalmente
- dejar lista la navegación principal

Fase 2. Configurar rutas
- definir todas las rutas principales del sistema
- dejar lista una estructura clara de navegación

Fase 3. Crear capa de servicios con Axios
- crear un archivo por módulo
- centralizar llamadas al backend
- evitar llamadas HTTP mezcladas dentro de muchos componentes

Fase 4. Construir primero módulos simples
- Genre
- Director
- Producer
- Type

Cada uno con:
- listado
- formulario
- crear
- editar
- eliminar
- alertas
- conexión real con API

Fase 5. Construir módulo Media
- listado
- formulario
- relaciones con otros módulos
- selects dinámicos
- validaciones
- visualización de datos relacionados

Fase 6. Mejorar experiencia visual
- navbar
- tablas responsive
- botones consistentes
- espaciado
- mensajes de error y éxito
- loaders básicos
- manejo de errores de conexión

Fase 7. Pruebas finales
- verificar CRUD de todos los módulos
- comprobar que el frontend refleja los cambios en la API y base de datos

FORMA DE TRABAJO:
Quiero que trabajemos paso a paso, no todo de golpe.

Debes entregarme el desarrollo por bloques, en este orden:
1. estructura recomendada del proyecto
2. instalación de dependencias
3. configuración base de Bootstrap
4. configuración de rutas
5. navbar principal
6. servicios Axios base
7. módulo Genre completo
8. módulo Director completo
9. módulo Producer completo
10. módulo Type completo
11. módulo Media completo
12. mejoras visuales y pruebas

REGLAS IMPORTANTES:
- No avances al siguiente bloque sin dejar claro el anterior.
- Cuando generes código, entrégalo listo para copiar y pegar.
- Explica siempre primero la idea y luego el código.
- Usa nombres consistentes y profesionales.
- Si detectas que alguna decisión puede variar según mi backend, indícalo claramente.
- Si hay supuestos sobre endpoints, menciónalos.
- Usa buenas prácticas reales de React moderno.

CONTEXTO DEL BACKEND:
La API REST ya existe y maneja los módulos:
- genres
- directors
- producers
- types
- media

Los endpoints son tipo CRUD REST, por ejemplo:
GET /genres
GET /genres/:id
POST /genres
PUT /genres/:id
DELETE /genres/:id

Y de forma equivalente para los demás módulos.

OBJETIVO FINAL:
Quiero terminar con un frontend administrativo completo, limpio, funcional, entendible y defendible académicamente.

Empieza ahora con el BLOQUE 1:
- propón la estructura ideal del proyecto React
- explica por qué esa estructura es correcta
- luego genera el árbol de carpetas y archivos inicial recomendado