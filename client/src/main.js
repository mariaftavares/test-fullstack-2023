import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../index.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
})

const app = createApp(App);

app.use(vuetify);
app.use(router)
app.mount("#app");
