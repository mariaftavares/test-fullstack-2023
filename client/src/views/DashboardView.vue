<template>
    <div class="bg-violet-200 min-h-screen">
        <div class="p-6">
            <div class="flex justify-between">
                <h1 class="font-bold text-4xl text-justify text-stone-900 mb-2">Dashboard</h1>
                <div>
                    <v-btn v-if="userIsAdmin" color="warning" prepend-icon="mdi mdi-account" class="m-2" @click="() => usersAdministration()" size="small">Usuários</v-btn>
                    <v-btn color="error" prepend-icon="mdi mdi-logout" class="m-2" size="small" @click="() => logout()">Sair</v-btn>
                </div>
            </div>
            <div class="flex items-center justify-center">
                <div class="flex bg-violet-500 w-100 shadow-lg  rounded-2xl flex items-center justify-center pr-3">
                    <div class=" w-2/5">
                        <div class=" ">
                            <img src="../assets/imagem-computer.png">
                        </div>
                    </div>
                    <div v-if="loading" class="w-3/6 rounded-2xl p-2 flex items-center justify-center">
                        <div class="m-3">
                            <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
                        </div>
                        <div>
                            <h2 class="font-bold text-2xl text-center text-stone-900">Loading ...</h2>
                        </div>
                    </div>
                    <div v-if="!loading"
                        class="w-3/6 rounded-2xl p-2 bg-violet-200 grid grid-cols-2 gap-4 flex items-center justify-center">
                        <div class="col-span-2 p-2">
                            <h2 class="font-bold text-1xl text-center text-stone-900">Processador</h2>
                            <h2 class="text-center">{{ processor }}</h2>
                        </div>
                        <div class="flex flex-col items-center">
                            <h2 class="text-1xl text-stone-900 font-bold mb-4">Memória RAM Livre (GB)</h2>
                            <v-progress-circular class="p-4" :rotate="360" :size="120" :width="15" :model-value="freeMemoryPercentage" color="teal"> {{ freeMemoryPercentage }}%
                            </v-progress-circular>
                        </div>
                        <div class="flex flex-col items-center">
                            <h2 class="text-1xl text-stone-900 font-bold mb-4">Espaço Livre em Disco (GB)</h2>
                            <v-progress-circular class="p-4" :rotate="360" :size="120" :width="15"
                                :model-value="freeMemoryDiskPercentage" color="teal">
                                {{ freeMemoryDiskPercentage }}%
                            </v-progress-circular>
                        </div>
                        <div class="col-span-2 flex flex-col items-center">
                            <h2 class="text-1xl text-stone-900 font-bold mb-4">IP's das interfaces disponíveis</h2>
                            <p v-for="(ipNetworkInterface, index) in ipNetworkInterfaces" :key="index"
                                :href="ipNetworkInterface">
                                {{ ipNetworkInterface }}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/services/api'
    export default {
        data() {
            return {
                freeMemoryPercentage: 0,
                freeMemoryDiskPercentage: 0,
                req: {},
                loading: true,
                processor: '',
                ramMemory: {},
                diskMemory: {},
                userIsAdmin: false,
                ipNetworkInterfaces: []
            }
        },
        methods: {
            fetchData() {
                this.loading = true
                this.req.headers = {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
                api.get('/dashboard', this.req).then((response) => {
                    this.processor = response.data.processor
                    this.ramMemory = response.data.ramMemory
                    this.ipNetworkInterfaces = response.data.ipNetworkInterfaces
                    this.diskMemory = response.data.diskMemory
                    this.freeMemoryPercentage = (this.ramMemory.freeMemory * 100 / this.ramMemory.totalMemory).toFixed(1)
                    this.freeMemoryDiskPercentage = (this.diskMemory.freeMemory * 100 / this.diskMemory.totalMemory).toFixed(1)
                    this.loading = false
                }).catch((error) => {
                    this.loading = false
                    console.log(error)
                })
            },
            logout() {
                localStorage.clear();
                this.$router.push({ name: 'Login' })
            },
            usersAdministration() {
                this.$router.push({ name: 'Users' })
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