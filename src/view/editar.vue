<template>
    <div>
    <h1>editando la cosa del id= {{route.params.id}} </h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="ingrese URL" v-model="url">
            <button type="submit">editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { useRoute } from 'vue-router';
import { userDataStore } from '../stores/database';
const route = useRoute();
const DataStore = userDataStore();
//console.log(route.params);
const handleSubmit = () => {
    DataStore.updateUrl(route.params.id, url.value)
}
const url =ref("")
onMounted(async () => {
    url.value = await DataStore.leerUrl(route.params.id)
});
</script>
