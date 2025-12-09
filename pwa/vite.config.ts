import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Indispensable pour Docker (expose l'IP)
    port: 5173,  // Le port défini dans votre docker-compose
    strictPort: true,
    watch: {
      usePolling: true, // Souvent nécessaire pour que le Hot Reload marche sur Windows/Docker
    },
    // Configuration du Proxy pour taper sur Symfony sans problème de CORS
    proxy: {
      '/api': {
        target: 'https://php', // Le nom du service Docker Symfony
        changeOrigin: true,
        secure: false, // Car on utilise un certificat auto-signé en dev
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionnel : dépend de vos routes Symfony
      },
    },
  },
})
