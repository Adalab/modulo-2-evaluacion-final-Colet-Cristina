🛒 **Tiendecita Online**

    Tiendecita Online es una aplicación web sencilla desarrollada con HTML, CSS y JavaScript que permite visualizar, buscar y gestionar productos obtenidos desde una API. Además, incluye un carrito de compras y almacenamiento local para mejorar la experiencia del usuario.

✨ **Funcionalidades principales**

- **Carga Dinámica:** Obtención de productos desde la API externa de FakeStore.
- **Persistencia de Datos:** Uso de `localStorage` para mantener los productos y el estado del carrito incluso tras refrescar la página.
- **Buscador Inteligente:** Filtrado por título y descripción en tiempo real.
- **Gestión Avanzada del Carrito:** - Añadir/Quitar productos (Toggle).
  - Borrado individual de elementos (Bonus).
  - Vaciado completo del carrito.
  - Contador de productos sincronizado.

⚙️ **Cómo funciona**

1. **Inicio:** La app comprueba si hay un "backup" en el almacenamiento local. Si no, conecta con la API.
2. **Búsqueda:** Filtra el array de productos original y re-pinta la interfaz sin recargar la página.
3. **Carrito:** Al añadir un producto, se actualiza el array `cart`, se guarda en el navegador y se sincronizan los botones de la lista principal (cambiando de color/texto).

💾 Tecnologías utilizadas

HTML5: Estructura semántica (ul, li, section).

CSS3: Diseño responsivo mediante CSS Grid y Flexbox.

JavaScript (ES6): Manipulación del DOM, eventos, Fetch API y métodos de arrays (filter, find, findIndex).

FakeStore API: Fuente de datos externa.
