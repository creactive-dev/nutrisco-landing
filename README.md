# Nutrisco Landing Page

Landing page de venta para Nutrisco — plataforma SaaS de nutrición antiinflamatoria de Constanza Paschold N.

**Stack:** Next.js 14 · Tailwind CSS · Framer Motion · TypeScript  
**Estilo:** The Modern Apothecary (amplificado para marketing)

---

## Requisitos

- Node.js v18 o v20 (v24 no es compatible con Next.js 14)
- npm v9+

---

## Correr en local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con los valores reales

# 3. Correr en desarrollo
npm run dev
# → Abre http://localhost:3000
```

---

## Variables de entorno requeridas

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|----------------|
| `NEXT_PUBLIC_MP_PAYMENT_URL` | Link directo al plan de suscripción Mercado Pago | Mercado Pago > Tu negocio > Suscripciones |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp Business (sin +, con código país) | Ej: `56912345678` |
| `NEXT_PUBLIC_SITE_URL` | URL de producción | Ej: `https://nutrisco.cl` |

---

## Deployar en Vercel

```bash
# 1. Instalar Vercel CLI (si no está instalado)
npm i -g vercel

# 2. Deploy
vercel

# 3. Configurar variables de entorno en Vercel Dashboard
# Settings > Environment Variables > Agregar las 3 variables
```

O conectar el repositorio en vercel.com > New Project > Import Git Repository.

---

## URL de revisión (portada v2, sep-2026)

Mientras Constanza no apruebe, la portada v2 **no va al dominio**: vive en
**https://nutrisco-landing-revision.vercel.app**, un proyecto Vercel aparte (`nutrisco-landing-revision`,
equipo `cass-projects-e05c7da3`) sin conexión a git. Se despliega a mano:

```bash
# desde un directorio temporal, nunca desde el repo (así no viajan .env ni archivos sin commitear)
git -C ~/Dev/nutrisco-landing archive feat/landing-v2-empieza-por-ti | tar -x -C <tmp>
cd <tmp>
printf '{\n  "framework": "nextjs"\n}\n' > vercel.json   # sin esto el proyecto nuevo sirve 404
npx vercel link --yes --project nutrisco-landing-revision --scope cass-projects-e05c7da3
npx vercel deploy --prod --yes --build-env NEXT_PUBLIC_NOINDEX=1 --scope cass-projects-e05c7da3
```

- `NEXT_PUBLIC_NOINDEX=1` se fija **al construir**: sin ella la URL de revisión es indexable.
- El checkout funciona porque el origen está en `CORS_EXTRA_ORIGINS` de la app. Vaciarlo al salir al dominio.
- En `public/pauta-c1-q7x2/` de ese despliegue están las imágenes que usan los anuncios de Meta: si se
  despliega desde cero, copiarlas antes o los creativos pierden su fuente.
- Comprobar el píxel con un navegador real y `navigator.webdriver` oculto: un PageView por visita.

## Estructura del proyecto

```
nutrisco-landing/
├── app/
│   ├── layout.tsx          # Fonts (Playfair + Inter), metadata SEO
│   ├── page.tsx            # Composición de todas las secciones
│   └── globals.css         # warm-mesh, grain, glassmorphism, breathe-shadow
├── components/
│   ├── sections/           # Un componente por sección de la landing
│   │   ├── Hero.tsx
│   │   ├── ElPuente.tsx
│   │   ├── QueIncluye.tsx
│   │   ├── Nutricionista.tsx
│   │   ├── ComoFunciona.tsx
│   │   ├── Testimonios.tsx
│   │   ├── PrecioFundador.tsx
│   │   ├── FAQ.tsx
│   │   └── CTAFinal.tsx
│   ├── ui/                 # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── Accordion.tsx
│   └── layout/
│       ├── Navbar.tsx      # Sticky glassmorphism
│       └── Footer.tsx
├── lib/
│   └── constants.ts        # TODO: copy, precios, config centralizada
├── public/                 # Assets estáticos (foto Constanza, OG image)
├── tailwind.config.ts      # Tokens del design system Nutrisco
├── .env.local.example      # Template de variables de entorno
└── README.md
```

---

## Assets pendientes (completar antes del launch)

| Asset | Dónde reemplazar |
|-------|-----------------|
| Foto de Constanza | `components/sections/Nutricionista.tsx` — reemplazar el placeholder div con `<Image>` |
| Testimonios reales | `lib/constants.ts` > `TESTIMONIOS.items` |
| Link Mercado Pago real | `.env.local` > `NEXT_PUBLIC_MP_PAYMENT_URL` |
| Handle Instagram real | `lib/constants.ts` > `SITE_CONFIG.instagram` |
| OG Image | `public/og-image.jpg` + agregar en `app/layout.tsx` > `openGraph.images` |

---

## Actualizar copy

Todo el copy está centralizado en `lib/constants.ts`. Para cambiar cualquier texto:
1. Abrir `lib/constants.ts`
2. Editar el valor correspondiente
3. Guardar — el cambio se refleja automáticamente en todos los componentes

---

*Desarrollado por CreActive Studio para Nutrisco · Abril 2026*
