import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LearnView from '@/views/LearnView.vue'
import ModuleDetailView from '@/views/ModuleDetailView.vue'
import PdfReaderView from '@/views/PdfReaderView.vue'
import FactCheckerView from '@/views/FactCheckerView.vue'
import HelpView from '@/views/HelpView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/learn', name: 'learn', component: LearnView },
    { path: '/learn/:slug', name: 'learn-detail', component: ModuleDetailView },
    // `bare` = no site header/footer: a full-window PDF reader, opened in a new tab from the module page
    { path: '/learn/:slug/read', name: 'learn-read', component: PdfReaderView, meta: { bare: true } },
    { path: '/fact-checker', name: 'fact-checker', component: FactCheckerView },
    { path: '/help', name: 'help', component: HelpView },
    { path: '/contact', name: 'contact', component: ContactView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
