import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default { // 👈 JUST EXPORT THE OBJECT
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Aapka backend server
        changeOrigin: true, // CORS errors se bachne ke liye
        secure: false,      // Agar backend http hai toh
      }
    }
  }
}