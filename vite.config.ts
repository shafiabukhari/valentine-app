import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Custom plugin to handle Figma asset imports
    {
      name: 'figma-asset-resolver',
      resolveId(id) {
        if (id.startsWith('figma:asset/')) {
          return id
        }
      },
      load(id) {
        if (id.startsWith('figma:asset/')) {
          // Return empty string or a transparent PNG data URL
          return `export default "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="`
        }
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': '/src',
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
