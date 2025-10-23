# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Funcionalidad

Layout con Header (Navbar) y Footer.

Listado de productos en Home (API FakeStore).

Sección “Moda” como ruta estática adicional.

Detalle de producto con ruta dinámica.

Carrito con useState en App.jsx (agregar/eliminar, total).

Manejo de carga y errores al consumir la API.

Navegación con react-router-dom.

Rutas

/ → Inicio (lista de productos)

/moda → Sección moda (filtra ropa)

/producto/:id → Detalle de producto

/carrito → Carrito

Componentes

ProductCard (Producto) separado del Cart (Carrito).

Layout agrupa Header + Navbar + Footer.

API

Base: https://fakestoreapi.com

Endpoints usados:

GET /products (Home y Moda)

GET /products/:id (Detalle)

Implementado en src/services/api.js con fetch.

Estado y efectos

useState para el carrito en App.jsx.

useEffect para cargar productos en Home.jsx, Moda.jsx y detalle en ProductDetail.jsx.

Estados de loading y error en cada página que consume la API.

Cómo probar

Iniciar el servidor con pnpm run dev.

Navegar entre Inicio, Moda y Carrito desde el Navbar.

Agregar productos al carrito desde las cards y desde el detalle.

Verificar incremento/disminución en el Carrito.




