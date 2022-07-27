<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="ingrese email" v-model="email">
            <input type="password" plaseholder="ingrese paspassword" v-model="password">
            <button type="submit" :disabled="userStore.loadingUser">logear usuario</button>
        </form>
        <button @click="userStore.googleAuth()">google</button>
    </div>
</template>

<script setup>

import {ref} from "vue"
import {useUserStore} from "../stores/user"


const userStore = useUserStore();



const email =ref("")
const password =ref("")

    const handleSubmit = async() => {

        if (!email.value || password.value.length < 6) {
        return alert("ingresa los campos");
    }
        await userStore.loginUser(email.value, password.value)
    }

</script>
