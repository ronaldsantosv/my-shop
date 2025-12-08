# Mi Shop

App React con Vite que consume MockAPI para un CRUD completo de productos, carrito protegido y autenticación simulada.

## Requerimientos cubiertos
- Carrito con Context API, persistencia y rutas protegidas por autenticación.
- CRUD contra `https://692f84ad778bbf9e006daf21.mockapi.io/products` con validación, edición y modal de confirmación al borrar.
- Búsqueda y paginación en el catálogo público.
- Diseño responsivo basado en clases de Bootstrap + componentes creados con styled-components.
- Notificaciones tipo toast y uso de íconos accesibles.
- Helmet para SEO (title y meta dinámicos).

## Instalación
1. Instala las dependencias (pnpm recomendado):
   ```bash
   pnpm install
   ```
2. Ejecuta el proyecto en modo desarrollo:
   ```bash
   pnpm run dev
   ```
3. Compila para producción:
   ```bash
   pnpm run build
   ```

## Uso
- Inicia sesión desde **/login** (email y contraseña cualquiera) para acceder al carrito y al panel **/admin**.
- En el panel administra productos (crear, editar, borrar) conectados a MockAPI.
- El catálogo público incluye buscador, paginador y filtro por categoría "Moda" en la ruta **/moda**.
- Las notificaciones muestran el resultado de las operaciones y los errores de red.
