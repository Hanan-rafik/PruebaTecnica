# Proyecto con Autenticación Simulada  

El proyecto está estructurado con una arquitectura de frontend y un backend simulado. No hay un backend real, pero la autenticación y el manejo de usuarios se simulan en el frontend para mostrar cómo funciona una aplicación con login y registro.  

---

## 🖥️ Tecnologías Usadas  

### **Frontend (Interfaz de Usuario)**  
- **React**: Biblioteca para construir la interfaz de usuario.  
- **Vite**: Herramienta para un desarrollo más rápido.  
- **TypeScript**: Añade seguridad con tipado estático.  
- **Material-UI (MUI)**: Componentes de UI preconstruidos.  
- **TailwindCSS**: Framework CSS para estilos rápidos y personalizados.  
- **React Router**: Maneja la navegación entre páginas.  
- **React Hook Form**: Facilita el manejo de formularios y validaciones.  

---

## 📂 Estructura del Proyecto  

📂 src/ ├── components/ # Componentes reutilizables (ej: PrivateRoute) ├── pages/ # Páginas de la aplicación (Login, Register, Home) ├── context/ # Contexto de autenticación (manejo del estado global) ├── services/ # Lógica para simular llamadas API (authService.ts) ├── App.tsx # Componente principal que define las rutas ├── main.tsx # Punto de entrada de la aplicación └── index.css # Estilos globales de TailwindCSS




---

## ⚙️ Backend Simulado  
- **No hay un servidor real**, pero se usa un archivo `authService.ts` para simular la autenticación.  
- Los usuarios se almacenan en **un array en memoria**.  
- Se genera un **token JWT falso** al iniciar sesión.  

---

## 📌 Decisiones Técnicas  

✅ **Autenticación con Context API** → Se usa Context API porque es más simple que Redux o Zustand para una app pequeña.  
✅ **Protección de Rutas** → Solo los usuarios autenticados pueden acceder a ciertas páginas.  
✅ **Validación de Formularios** → Se usa React Hook Form para validar datos (ej: email válido, coincidencia de contraseñas).  
✅ **Estilos** → Se combinan **MUI** para componentes y **TailwindCSS** para personalización.  
✅ **Navegación** → Se usa React Router para cambiar entre páginas.  

---

## 🔄 Flujo de la Aplicación  

### 🔹 **Registro**  
1. El usuario ingresa su email y contraseña.  
2. Si los datos son válidos, se guarda el usuario y se redirige a la pantalla de Login.  

### 🔹 **Login**  
1. El usuario ingresa su email y contraseña.  
2. Si son correctos, se genera un "token JWT falso" y entra a la página de inicio.  

### 🔹 **home**  
- Solo se puede ver si el usuario está autenticado.  
- Si no ha iniciado sesión, es redirigido a la pantalla de Login.  


