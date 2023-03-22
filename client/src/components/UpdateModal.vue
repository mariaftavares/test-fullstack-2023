<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="warning" v-bind="props" icon="mdi-pencil" size="small">
        </v-btn>
      </template>
      <v-card ref="form">
        <v-card-title class="bg-violet-300">
          <v-alert variant="tonal" class="m-2" v-if="error" :text=errorMensage type="error"></v-alert>
          <span class="text-h5">User Profile Edit</span>
        </v-card-title>
        <v-card-text class="bg-violet-300">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field bg-color="grey-lighten-2" label="Name*" v-model="name" clearable></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="email" clearable bg-color="grey-lighten-2"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Password*" type="password" v-model="password" clearable
                  bg-color="grey-lighten-2"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete bg-color="grey-lighten-2" :items="['admin', 'user']" label="Role*" v-model="role"
                  clearable></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="bg-violet-300">
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="() => { dialog = false }">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" type="submit" :loading="loading" :disabled="loading" @click="updateUser()">
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
    props: {
      user: Object,
      req: Object
    },
    data() {
      return {
        fieldsUpdate: {},
        loading: false,
        dialog: false,
        error: false,
        errorMensage: '',
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        password: this.user.password
      }
    },
    methods: {
      async updateUser() {
        this.loading = true
        if (Object.keys(this.fieldsUpdate).length !== 0) {
          api.put(`/users/${this.user.id}`, this.fieldsUpdate, this.req).then((res) => {
            this.$emit('updateUser', res.data.userUpdated)
            this.loading = false
            this.dialog = false
          }).catch((error) => {
            console.log(error)
            this.loading = false
            this.error = true
            this.errorMensage = error.response.data.errorMessage
          })
        }
        else {
          this.loading = false
          this.dialog = false
        }

      }
    },
    watch: {
      name: {
        handler(newValue, oldValue) {
          if (newValue !== oldValue && newValue !== null) {
            if (newValue.trim() !== '') {
              this.fieldsUpdate.name = newValue
            }
            else {
              this.name = oldValue
            }
          }
        },
      },
      email: {
        handler(newValue, oldValue) {
          if (newValue !== oldValue && newValue !== null) {
            if (newValue.trim() !== '') {
              this.fieldsUpdate.email = newValue
            }
            else {
              this.email = oldValue
            }
          }
        },
      },
      role: {
        handler(newValue, oldValue) {
          if (newValue !== oldValue && newValue !== null) {
            if (newValue.trim() !== '') {
              this.fieldsUpdate.role = newValue
            }
            else {
              this.role = oldValue
            }

          }
        },
      },
      password: {
        handler(newValue, oldValue) {
          if (newValue !== oldValue && newValue !== null) {
            if (newValue.trim() !== '') {
              this.fieldsUpdate.password = newValue
            }
            else {
              this.password = oldValue
            }
          }
        },
      }
    },
  }
</script>