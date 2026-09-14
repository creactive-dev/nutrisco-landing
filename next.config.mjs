/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Un correo automático de la app ya apunta a /programa. La oferta vive en
      // la portada; el redirect conserva la query (UTM incluidos).
      { source: "/programa", destination: "/", permanent: true },
    ]
  },
}
export default nextConfig
