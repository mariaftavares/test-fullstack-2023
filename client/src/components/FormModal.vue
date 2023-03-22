<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          Adicionar
        </v-btn>
      </template>
      <v-card ref="form">
        <v-card-title class="bg-violet-300">
          <v-alert variant="tonal" class="m-2" v-if="error" :text=errorFieldsMessange type="error"></v-alert>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text class="bg-violet-300">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field bg-color="grey-lighten-2" label="Name*" v-model="data.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="data.email" bg-color="grey-lighten-2"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Password*" type="password" v-model="data.password"
                  bg-color="grey-lighten-2"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete bg-color="grey-lighten-2" :items="['admin', 'user']" label="Role*"
                  v-model="data.role"></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions class="bg-violet-300">
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="() => { dialog = false, resetFields() }">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" type="submit" :loading="loading" :disabled="loading" @click="createUser()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import api from '@/services/api'
  export default {
    data: () => ({
      dialog: false,
      data: {
        name: '',
        password: '',
        email: '',
        role: ''
      },
      errorFieldsMessange: '',
      error: false,
      loading: false
    }),
    props: {
      req: Object
    },
    methods: {
      async createUser() {
        this.loading = true
        api.post('users', this.data, this.req).then((res) => {
          this.error = false
          this.$emit('newUser', res.data.newUser)
          this.loading = false
          this.dialog = false
          this.resetFields()
        }).catch((error) => {
          this.loading = false
          this.error = true
          this.errorFieldsMessange = error.response.data.errorMessage
        })
      },
      resetFields() {
        this.data.name = ''
        this.data.password = ''
        this.data.email = ''
        this.data.role = ''
      }
    }
  }
</script>

