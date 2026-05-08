# 🛍️ FakeStore App - Tienda Online en React Native

Una **app móvil moderna** para explorar y comprar productos online. ¡Simple, rápida y con una interfaz hermosa!

## ✨ ¿Qué puedes hacer?

- 📝 **Iniciar sesión** - Acceso seguro a tu cuenta
- 🔍 **Buscar productos** - Búsqueda rápida por nombre o categoría
- 🏷️ **Filtrar y ordenar** - Por precio, categoría o valoración
- 📦 **Ver detalles** - Información completa de cada producto
- 🛒 **Agregar al carrito** - Compra fácilmente
- 💬 **Notificaciones** - Recibe feedback de tus acciones
- 🌙 **Tema oscuro** - Protege tu vista de noche

---

## 🚀 Cómo Instalar y Correr

### Paso 1: Descargar el código
```bash
git clone <link-del-repositorio>
cd Entrevista
```

### Paso 2: Instalar las dependencias
```bash
npm install
```

Esto descarga todas las herramientas necesarias (solo una vez).

### Paso 3: Iniciar la app
```bash
npm start
```

Verás un código QR en la terminal. ¡Escanéalo con tu teléfono!

---

## 📱 Ver en tu Teléfono

### Opción 1: Con la app Expo Go (MÁS FÁCIL)
1. Descarga **Expo Go** desde App Store o Google Play
2. Cuando hayas corrido `npm start`, escanea el código QR con tu teléfono
3. ¡La app se abre automáticamente!

### Opción 2: En Android
```bash
npm run android
```

### Opción 3: En iPhone
```bash
npm run ios
```

---

## 🔐 Login - Credenciales de Demo

Para probar la app, usa estas credenciales:

```
Usuario:      mor_2314
Contraseña:   83r5^_
```

> Estas credenciales son públicas (es una API de demostración). ¡Solo prueba la funcionalidad!

---

## 🎨 Características Principales

### Pantalla de Inicio (Login)
- Bonito formulario con validación
- Mensajes de error claros
- Ícono para mostrar/ocultar contraseña
- Notificaciones cuando todo va bien

### Catálogo de Productos
- Listado de todos los productos
- **Búsqueda en tiempo real** (escribe y ve resultados al instante)
- **Filtros**:
  - Por categoría (Electrónica, Joyería, Ropa)
  - Por precio (menor a mayor, mayor a menor)
  - Por calificación (3+ estrellas, 4+ estrellas)
- Desliza hacia arriba para recargar la lista
- Muestra cantidad de resultados encontrados

### Detalle del Producto
- Foto del producto
- Descripción completa
- Precio
- Calificación y cantidad de votos
- Selector de cantidad
- Botón para agregar al carrito

---

## 🎯 Lo que hace especial esta app

### ⚡ Muy Rápida
- La búsqueda no se congela mientras escribes
- Los filtros se aplican al instante
- Las animaciones son suaves

### 🎨 Linda Interfaz
- Diseño moderno y limpio
- Colores agradables
- Animaciones fluidas
- Responsive (funciona en cualquier tamaño de pantalla)

### 📢 Feedback claro
- Mensajes cuando algo sale bien ✅
- Mensajes cuando algo sale mal ❌
- Notificaciones flotantes que desaparecen solas
- Estados vacíos con sugerencias

### 🛡️ Segura
- Tu token de acceso se guarda de forma segura
- La sesión se recuerda cuando cierras y abres la app
- Validaciones en todos los formularios

---

## 🔧 ¿Hay un Problema?

### "No puedo conectar a la API"
- Verifica que tengas internet
- Reinicia la app

### "No reconoce mis credenciales"
- Usa exactamente: `mor_2314` / `83r5^_`
- Sin espacios extras

### "La app no se actualiza"
- Presiona `r` en la terminal donde corriste `npm start`

---

## 📦 ¿Qué Tecnología Usa?

- **React Native** - Framework para hacer apps móviles
- **Expo** - Herramienta para desarrollar React Native fácilmente
- **React Navigation** - Para navegar entre pantallas
- **Zustand** - Para guardar datos globales
- **FakeStore API** - Datos de productos (API pública de demostración)

> No te preocupes si no entiendes estos términos. ¡Solo sabe que todo funciona junto para dar una app rápida y hermosa!

---

## 📚 Guía Rápida de Carpetas

```
src/
├── screens/           ← Las pantallas que ves (login, productos, detalle)
├── components/        ← Piezas de UI reutilizables
├── hooks/             ← Lógica personalizada
├── constants/         ← Colores, mensajes, configuraciones
├── api/               ← Conexión con el servidor
└── services/          ← Funciones para traer datos
```

---

## 🚀 Próximos Pasos (Opcional)

Si quieres aprender más:
1. Abre `src/screens/products/ProductsScreen.js` para ver cómo funciona el listado
2. Abre `src/hooks/useProducts.js` para ver cómo se traen los datos
3. Modifica `src/constants/theme.js` para cambiar los colores

---

## 💡 Tips

- **Busca algo**: Prueba escribiendo "shirt", "electronics", o "phone"
- **Filtra por precio**: Ordena de menor a mayor precio
- **Tema oscuro**: Si tu teléfono tiene tema oscuro activado, la app lo respeta
- **Refresca datos**: Desliza hacia arriba en el listado para recargar

---

## 🎓 Desarrollado Para

Esta app fue creada para demostrar:
- Cómo construir apps móviles modernas
- Código limpio y bien organizado
- Buena experiencia de usuario (UX)
- Manejo profesional de errores y validaciones

---

## ❓ ¿Preguntas?

Si algo no funciona o no entiendes cómo hacerlo:
1. Revisa las instrucciones arriba
2. Reinicia la app
3. Ejecuta `npm install` nuevamente
4. Cierra y abre la terminal

¡Eso soluciona el 99% de los problemas! 😄

---

**¡Disfruta explorando la tienda!** 🎉
