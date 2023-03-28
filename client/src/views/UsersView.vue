<template>
  <div class="bg-violet-200 min-h-screen">
    <div class="p-6">
      <div class="flex justify-between">
        <h1 class="font-bold text-4xl text-justify text-stone-900 mb-2">Users Administration</h1>
        <div>
          <v-btn color="success" prepend-icon="mdi-television" class="m-2" @click="() => dashboard()" size="small">Dashboard</v-btn>
          <v-btn color="error" prepend-icon="mdi mdi-logout" class="m-2" size="small" @click="() => logout()">Sair</v-btn>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="flex bg-violet-500 w-100 shadow-lg  rounded-2xl flex items-center justify-center p-3">
          <div class=" rounded-2xl p-1 w-full flex items-center justify-center ">
            <v-table fixed-header height="500px" class="w-full">
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Email
                  </th>
                  <th class="text-left">
                    Role
                  </th>
                  <th class="text-left">
                    Created_at
                  </th>
                  <th class="text-left">
                    <FormModal :req="req" @newUser="addUserList" />
                  </th>
                  <th class="text-left">
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in usersList" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td>{{ user.created_at }}</td>
                  <td>
                    <UpdateModal @updateUser="updateList" :req="req" :user="user" />
                  </td>
                  <td>
                    <DeleteModal @deleteUser="removeUserList" :req="req" :userId="user.id" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/services/api'
  import FormModal from '@/components/FormModal';
  import DeleteModal from '@/components/DeleteModal';
  import UpdateModal from '../components/UpdateModal';
  export default {
    components: {
      FormModal,
      DeleteModal,
      UpdateModal
    },
    data() {
      return {
        usersList: [],
        req: {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        },
        indexUser: 0
      }
    },
    methods: {
      fetchData() {
        api.get('/users', this.req).then((res) => {
          console.log(res)
          this.usersList = res.data
        }).catch((error) => {
          console.log(error)
        })
      },
      addUserList(newUser) {
        this.usersList.push(newUser)
      },
      removeUserList(userID) {
        this.usersList = this.usersList.filter((user) => user.id !== userID)
      },
      updateList(userUpdated) {
        this.indexUser = this.usersList.findIndex((user) => {
          return user.id === userUpdated.id
        })
        this.usersList[this.indexUser] = userUpdated
      },
      logout() {
        localStorage.clear();
        this.$router.push({ name: 'Login' })
      },
      dashboard() {
        this.$router.push({ name: 'Dashboard' })
      }
    },
    created() {
      this.$watch(
        () => { this.userIsAdmin = this.$route.params.isAdmin },
        () => {this.fetchData()},
        { immediate: true }
      )
    }
  }
</script>