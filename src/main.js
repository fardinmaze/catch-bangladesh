import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fontsource/noto-sans-bengali/400.css'
import '@fontsource/noto-sans-bengali/500.css'
import '@fontsource/noto-sans-bengali/600.css'
import '@fontsource/noto-sans-bengali/700.css'
import './style.css'

createApp(App).use(router).mount('#app')
