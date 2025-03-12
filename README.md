El proyecto está diseñado con una estructura de frontend y backend simulado, lo que significa que no hay un servidor real manejando datos. En su lugar, la autenticación y los usuarios se gestionan dentro del frontend para demostrar cómo funcionaría una aplicación con login y registro.

Tecnologías Usadas
Frontend (Interfaz de Usuario)
React: Para construir la interfaz de la aplicación.
Vite: Hace que el desarrollo sea más rápido.
TypeScript: Agrega seguridad al código.
Material-UI (MUI): Proporciona botones y otros elementos de diseño ya hechos.
TailwindCSS: Ayuda a personalizar los estilos de manera rápida.
React Router: Maneja la navegación entre pantallas.
React Hook Form: Facilita la validación y manejo de formularios.
Estructura del Proyecto:


📂 src/
├── components/ → Partes reutilizables, como la protección de rutas.
├── pages/ → Las pantallas principales (Login, Registro, Inicio).
├── context/ → Guarda la información de autenticación.
├── services/ → Simula las llamadas a un backend.
├── App.tsx → Configura las rutas principales.
├── main.tsx → Punto de inicio de la app.
└── index.css → Estilos globales.

Backend Simulado
No hay un servidor real, pero se usa un archivo llamado authService.ts para simular el proceso de autenticación.
Los usuarios se almacenan en una lista dentro del frontend.
Se genera un token JWT falso cuando alguien inicia sesión.
Decisiones Técnicas
✅ Autenticación con Context API → Se usa Context API porque es más simple que Redux o Zustand para una app pequeña.
✅ Protección de Rutas → Solo los usuarios con sesión iniciada pueden acceder a ciertas páginas.
✅ Validación de Formularios → Se usa React Hook Form para asegurarse de que los datos sean correctos (ej: email válido, contraseñas que coincidan).
✅ Estilos → Se combinan MUI para los componentes y TailwindCSS para personalizar los estilos.
✅ Navegación → Se usa React Router para cambiar entre pantallas.

Cómo Funciona la App
🔹 Registro

El usuario ingresa su email y contraseña.
Si los datos son válidos, se guarda el usuario y se le envía a la pantalla de Login.
🔹 Login

El usuario escribe su email y contraseña.
Si son correctos, se guarda un "token falso" y el usuario entra a la página de inicio.
🔹 Página de Inicio

Solo se puede ver si el usuario está autenticado.
Si no ha iniciado sesión, lo envía a la pantalla de Login.
