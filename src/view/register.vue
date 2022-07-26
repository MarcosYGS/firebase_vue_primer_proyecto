<template>
    <div>
        <h1>registro</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="ingrese email" v-model="email">
            <input type="password" plaseholder="ingrese paspassword" v-model="password">
            <button type="submit" :disabled="userStore.loadingUser">crear usuario</button>
        </form>
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
        console.log("procesando formulario")
        console.log(email.value)
        console.log(password.value)
        await userStore.registerUser(email.value, password.value)

    }

</script>
