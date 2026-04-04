# Andrea Musar — Personal Trainer Website

Sitio web completo para la entrenadora personal **Andrea Musar** de Lima, Peru.  
Construido con **Next.js 14** (App Router), **Tailwind CSS**, **Framer Motion** y **Supabase**.

---

## 🚀 Stack Tecnológico

| Layer | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animaciones | Framer Motion |
| Base de datos | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Fuentes | Bebas Neue + Inter (Google Fonts) |
| Deploy | Vercel |

---

## 📂 Estructura de Carpetas

```
andreamusar_web/
├── app/
│   ├── (public)/           # Páginas públicas (con Navbar + Footer)
│   │   ├── page.tsx        # Home / Landing
│   │   ├── servicios/      # Planes y servicios
│   │   ├── tienda/         # Tienda de suplementos
│   │   │   └── [slug]/     # Detalle de producto
│   │   ├── resultados/     # Testimonios y transformaciones
│   │   ├── blog/           # Blog de fitness
│   │   │   └── [slug]/     # Artículo individual
│   │   └── contacto/       # Formulario de contacto + FAQ
│   ├── admin/              # Panel administrativo (protegido)
│   │   ├── login/          # Página de login
│   │   ├── productos/      # CRUD de productos
│   │   ├── servicios/      # CRUD de servicios
│   │   ├── pedidos/        # Gestión de pedidos
│   │   ├── leads/          # Ver consultas recibidas
│   │   ├── clientes/       # Lista de clientes
│   │   └── challenges/     # Gestión de retos fitness
│   ├── layout.tsx          # Root layout con SEO global
│   ├── not-found.tsx       # Página 404 personalizada
│   ├── sitemap.ts          # Sitemap automático
│   └── robots.ts           # Robots.txt automático
├── components/
│   ├── layout/             # Navbar, Footer, WhatsAppButton
│   ├── home/               # Secciones del home
│   ├── services/           # Página de servicios
│   ├── store/              # Tienda y detalle de producto
│   ├── results/            # Página de resultados
│   ├── blog/               # Blog listing y artículo
│   ├── contact/            # Formulario de contacto
│   ├── admin/              # Componentes del admin panel
│   └── ui/                 # Componentes reutilizables
├── context/
│   └── CartContext.tsx     # Estado del carrito de compras
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Cliente browser de Supabase
│   │   └── server.ts       # Cliente server de Supabase
│   ├── constants.ts        # Configuración, mock data, links
│   ├── types.ts            # TypeScript types del schema
│   └── utils.ts            # Funciones utilitarias
├── supabase/
│   └── schema.sql          # Schema SQL completo para Supabase
├── middleware.ts            # Protección de rutas /admin
├── .env.example             # Variables de entorno requeridas
├── tailwind.config.ts       # Configuración de Tailwind + brand colors
├── next.config.ts           # Configuración de Next.js
└── tsconfig.json            # TypeScript config
```

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/andreamusar_web.git
cd andreamusar_web
```

### 2. Instalar dependencias

Asegúrate de tener **Node.js 18+** instalado.

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y completa tus valores:

```bash
cp .env.example .env.local
```

Abre `.env.local` y completa:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_WHATSAPP_NUMBER=51999999999
NEXT_PUBLIC_SITE_URL=https://andreamusar.com
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/andreamusar
NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@andreamusar
```

### 4. Configurar Supabase

#### a) Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com) y crea un proyecto nuevo
2. Copia el **Project URL** y el **anon public key** al `.env.local`

#### b) Ejecutar el schema SQL
1. En tu dashboard de Supabase, ve a **SQL Editor**
2. Crea una nueva query
3. Pega el contenido de `supabase/schema.sql`
4. Ejecuta la query

#### c) Crear bucket de imágenes (opcional)
1. Ve a **Storage** en Supabase
2. Crea un bucket llamado `product-images`
3. Márcalo como **público**

#### d) Crear usuario admin
1. Ve a **Authentication > Users**
2. Crea un nuevo usuario con el email de Andrea
3. Usa ese email y contraseña para acceder a `/admin/login`

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 6. Build para producción

```bash
npm run build
npm run start
```

---

## 🌐 Deploy en Vercel

### Configuración automática

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) y conecta tu repositorio
3. En **Environment Variables**, agrega todas las variables de `.env.example`
4. Haz deploy

### Configuración de dominio con Cloudflare

1. En Vercel, ve a **Domains** y agrega tu dominio
2. En Cloudflare, agrega los registros DNS que Vercel te indique
3. Activa el proxy de Cloudflare (nube naranja) para seguridad adicional

---

## 🗄️ Base de Datos

El schema incluye 8 tablas con Row Level Security (RLS):

| Tabla | Descripción |
|---|---|
| `products` | Catálogo de suplementos |
| `services` | Planes de entrenamiento |
| `orders` | Pedidos de la tienda |
| `clients` | Clientes registrados |
| `leads` | Consultas del formulario de contacto |
| `blog_posts` | Artículos del blog |
| `testimonials` | Testimonios de clientes |
| `challenges` | Retos fitness disponibles |

### Políticas RLS

- **Productos, servicios, retos, testimonios:** Lectura pública, escritura solo autenticados
- **Blog posts:** Solo se muestran públicamente los `published = true`
- **Leads:** Inserción pública (formulario), lectura solo admin
- **Clientes y pedidos:** Solo acceso autenticado

---

## 🎨 Diseño

### Paleta de colores

```
Negro principal:   #0A0A0A
Carbón oscuro:     #111827
Acento naranja:    #F97316
Blanco:            #FFFFFF
Gris texto:        #9CA3AF
```

### Tipografías

- **Bebas Neue** — Headings impactantes en uppercase
- **Inter** — Body text limpio y legible

### Componentes clave

- `btn-primary` — Botón naranja sólido
- `btn-outline` — Botón con borde blanco
- `card-dark` — Tarjeta oscura con borde
- `tag` — Etiqueta naranja en uppercase
- `input-dark` — Input oscuro para formularios

---

## 📱 Páginas del Sitio

| Ruta | Descripción |
|---|---|
| `/` | Home — Landing con hero, servicios, testimonios, retos |
| `/servicios` | Todos los planes y precios |
| `/tienda` | Catálogo de suplementos con filtros |
| `/tienda/[slug]` | Detalle de producto |
| `/resultados` | Transformaciones y testimonios de clientes |
| `/blog` | Blog de fitness con categorías |
| `/blog/[slug]` | Artículo individual |
| `/contacto` | Formulario de contacto + FAQ |
| `/admin` | Panel admin (requiere login) |
| `/admin/login` | Login del panel admin |

---

## 🔧 Funcionalidades Principales

- ✅ Carrito de compras con persistencia en localStorage
- ✅ Formulario de contacto con validación y guardado en Supabase
- ✅ Panel admin protegido con Supabase Auth
- ✅ CRUD de productos, servicios y retos desde el admin
- ✅ Botón de WhatsApp flotante en todas las páginas
- ✅ Animaciones con Framer Motion
- ✅ SEO optimizado con metadata dinámica
- ✅ Sitemap.xml y robots.txt automáticos
- ✅ Diseño 100% responsive (mobile-first)
- ✅ Menú hamburguesa en móvil
- ✅ Loading skeletons para productos y blog
- ✅ Página 404 personalizada
- ✅ Filtros de categoría en tienda y blog

---

## 📞 Contacto

- **WhatsApp:** +51 999 999 999
- **Email:** hola@andreamusar.com
- **Ubicación:** Santa Anita, Lima, Peru 🇵🇪
- **Instagram:** @andreamusar
- **TikTok:** @andreamusar
