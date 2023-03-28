<template>
  <div class="bg-violet-200  min-h-screen flex items-center justify-center">
    <div class="bg-violet-300 flex w-full rounded-2xl shadow-lg max-w-3xl  items-center">
      <div class="w-1/2 ">
        <h1 class="font-bold text-2xl text-center text-stone-900 m-8">Entre na sua conta</h1>
        <v-alert variant="tonal" class="mb-6 m-8" v-if="error" text="Email/Senha incorretos" type="error"></v-alert>
        <div class=" flex items-center justify-center">
          <v-responsive max-width="344">
            <v-text-field class="mb-4" bg-color="grey-lighten-2" label="Email"
              hint="Digite seu email para acessar este site" type="email" v-model="email"></v-text-field>
            <v-text-field class="mb-4" bg-color="grey-lighten-2" label="Senha" type="password"
              hint="Digite sua senha para acessar este site" v-model="password"></v-text-field>
            <v-btn class="p-8" variant="outlined" :loading="loading" :disabled="loading" @click="() => login()">
              Entrar
            </v-btn>
          </v-responsive>
        </div>
      </div>
      <div class="w-1/2">
        <img class="rounded-2xl" src="../assets/logo-infoware.png">
      </div>
    </div>
  </div>
</template>
 
<script>
  import api from '@/services/api'
  export default {
    data() {
      return {
        email: '',
        password: '',
        loading: false,
        error: false
      }
    },
    methods: {
      login() {
        this.error = false
        this.loading = true
        api.post('/login', { email: this.email, password: this.password }).then((res) => {
          console.log(res)
          this.loading = false
          this.error = false
          this.$router.push({ name: 'Dashboard' })
          localStorage.setItem('token', res.data.token)
        }).catch((err) => {
          console.log(err)
          this.error = true
          this.loading = false
        })
      }
    }
  };
</script>