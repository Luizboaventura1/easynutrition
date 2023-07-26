import { createPinia } from "pinia";

const pinia = createPinia()

export default defineNuxtPlugin((nuxt)=> {
  nuxt.vueApp.use(pinia)
})