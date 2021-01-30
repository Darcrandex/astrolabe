import { defineConfig } from 'vite'

export default defineConfig({
  // 深度导入
  optimizeDeps: { include: ['three/examples/jsm/controls/OrbitControls'] },

  server: {
    port: 5354,
  },
})
