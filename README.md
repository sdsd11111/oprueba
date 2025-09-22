# La Herencia - Restaurante

Sitio web moderno para el restaurante "La Herencia" con panel de administración para gestionar el menú del día.

## Características

- 🍽️ Página de inicio con sección de platos destacados
- 📱 Diseño completamente responsivo
- 🔐 Panel de administración seguro
- 📝 Gestión completa de platos (CRUD)
- 🎨 Interfaz intuitiva y fácil de usar
- ⚡ Optimizado para rendimiento

## Requisitos previos

- Node.js 16.8 o superior
- npm o yarn
- Cuenta en Vercel para despliegue

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd la-herencia
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   # En producción, usa variables de entorno seguras para autenticación
   ```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el sitio.

## Panel de Administración

Accede al panel de administración en:
- URL: `/admin/login`
- Usuario: `admin`
- Contraseña: `admin123`

**Nota:** Cambia estas credenciales en producción.

## Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una.
2. Instala la CLI de Vercel:
   ```bash
   npm install -g vercel
   ```
3. Inicia sesión en Vercel:
   ```bash
   vercel login
   ```
4. Despliega el proyecto:
   ```bash
   vercel
   ```
5. Sigue las instrucciones en pantalla para completar el despliegue.

## Estructura del Proyecto

```
la-herencia/
├── src/
│   ├── app/                 # Rutas de la aplicación
│   │   ├── api/             # API routes
│   │   ├── admin/           # Panel de administración
│   │   └── page.tsx         # Página principal
│   ├── components/          # Componentes reutilizables
│   │   ├── layout/          # Componentes de diseño
│   │   └── ui/              # Componentes de interfaz de usuario
│   ├── lib/                 # Utilidades y configuraciones
│   └── styles/              # Estilos globales
├── public/                  # Archivos estáticos
│   └── images/              # Imágenes del sitio
└── middleware.ts            # Middleware de autenticación
```

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Variables de autenticación (en producción, usa un sistema seguro)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Tecnologías Utilizadas

- ⚛️ Next.js 14
- 🎨 Tailwind CSS
- 🔄 React Hooks
- 🔒 Middleware de autenticación
- 📱 Diseño responsivo
- ⚡ Optimización de rendimiento

## Licencia

Este proyecto está bajo la Licencia MIT.
