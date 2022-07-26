<template>
    <div>
        <h1>home</h1>
        <form @submit.prevent="hanleSubmit">
            <input type="text" placeholder="Ingrese url" v-model="url">
            <button type="submit">agregar</button>
        </form>
        
        <p>{{user.userData.email}}</p>
        <p v-if="dataBaseStore.loadingDoc">loading doc....</p>
        <ul v-else>
            <li v-for="item of dataBaseStore.documents" key="item.id">
            {{item.name}}    -   {{item.id}} 
            <button @click="dataBaseStore.deleteUrl(item.id)">eliminar</button>
            <button @click="router.push(`/editar/${item.id}`)" >editar</button>
            </li>
            
        </ul>
    </div>
</template>

<script setup>
import { useUserStore} from '../stores/user.js';
import { userDataStore  } from '../stores/database.js';
import { ref } from "vue";
import { useRouter } from 'vue-router';

const user = useUserStore();
const dataBaseStore =userDataStore();
const router = useRouter()
dataBaseStore.getUrls()

const url =ref("");
const hanleSubmit = () => {
    //hacer validacion
    dataBaseStore.addUrl(url.value);
}
</script>

