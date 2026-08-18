import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LearnView from '@/views/LearnView.vue'
import ModuleDetailView from '@/views/ModuleDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/learn', name: 'learn', component: LearnView },
    { path: '/learn/:slug', name: 'learn-detail', component: ModuleDetailView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
