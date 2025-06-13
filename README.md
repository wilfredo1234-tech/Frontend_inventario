#  Frontend Inventario - Aplicación Web de Gestión de Inventarios

Este es el frontend de una aplicación web de inventario desarrollada con **Vue.js 3**, **Pinia**, **Vue Router**. La aplicación permite a los usuarios registrarse, iniciar sesión, gestionar productos y categorías, y editar su perfil.

El frontend está desplegado en **Vercel** y se conecta a un backend RESTful hecho en Laravel (en producción en Railway).

##  Funcionalidades

-  Registro e inicio de sesión de usuarios
-  CRUD completo de productos
-  CRUD de categorías
-  Vista y edición del perfil de usuario
-  Cierre de sesión
-  Conexión con API externa en producción
-  Validaciones con Zod


##  Producción

- **Frontend en Vercel:** https://inventario-lemon.vercel.app/


##  Tecnologías utilizadas

### Frontend

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) – Manejo de estado
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/) – Consumo de APIs
- [Zod](https://zod.dev/) – Validación de formularios

- [Lucide Vue](https://lucide.dev/) – Iconografía
- [Vite](https://vitejs.dev/) – Build tool y servidor de desarrollo

### Producción

- **Frontend:** Vercel
- **Backend:** Railway (Laravel + PostgreSQL)

##  Instalación y ejecución local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/wilfredo1234-tech/Frontend_inventario.git


 2.  Entra al proyecto:
cd frontend-inventario

3.Instala las dependencias:
npm install


4.Ejecuta en modo desarrollo:
npm run dev



 Notas


El backend también está desplegado y puede ser consultado mediante endpoints públicos.

Próximamente se agregarán más funcionalidades como reportes, filtros y dashboard para admins.


 Autor
Wilfredo Palacio
Desarrollador Web Junior
 palaciojimenezwilfredo22@gmail.com


