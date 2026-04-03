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
