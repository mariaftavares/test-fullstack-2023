<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="auto">
      <template v-slot:activator="{ props }">
        <v-btn color="error" v-bind="props" icon="mdi mdi-delete-forever" size="small">
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="bg-violet-300">
          <span class="text-h5">Are you sure you want to delete this user?</span>
        </v-card-title>
        <v-card-actions class="bg-violet-300">
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="deleteUser()">
            Agree
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
      userId: Number,
      req: Object
    },
    data() {
      return {
        dialog: false,
        loading: false,
        error: false,
        errorMensage: ''
      }
    },
    methods: {
      async deleteUser() {
        this.loading = true
        api.delete(`/users/${this.userId}`, this.req).then(() => {
          this.$emit('deleteUser', this.userId)
          this.loading = false
          this.dialog = false
        }).catch((error) => {
          this.error = true
          this.errorMensage = error.response.data.errorMessage
        })
      }
    }
  }
</script>