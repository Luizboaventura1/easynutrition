import { createVuetify } from "vuetify/lib/framework.mjs";
import * as directives from 'vuetify/directives'
import * as components from "vuetify/components"

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    ssr: true,
    directives,
    components
  })
  nuxt.vueApp.use(vuetify)
})