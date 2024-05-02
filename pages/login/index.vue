<template>
  <div class=" flex w-[100%]  container mx-auto pt-[200px] pr-[15%]   ">
    <div class="flex justify-center items-center bg-pink-700 w-[80%] rounded-[20px]  ">
      <div class="flex flex-col justify-center items-center">
        <span class="font-bold text-white pt-[50px]">welcome to marvel</span>
        <div class="w-[100%] flex flex-col items-center pt-[30px] gap-[15px]">
          <input type="text" v-model="username"
                 class="w-[150%] flex text-left  border p-[10px] rounded-[10px] login_input_res"
                 placeholder="enter your number"/>

          <input type="password" v-model="password"
                 class="w-[150%] flex text-left  border p-[10px] rounded-[10px] login_input_res"
                 placeholder="enter your number"/>
          <button @click="login"
                  class="text-white pt-[20px] bg-pink px-[30px]  py-[16px] flex items-center justify-center mb-[80px]"
                  :title="Enter">
            Enter

          </button>


        </div>

<!--        <sidbar :email="loginEmail" :name="loginName" :img="loginImg" />-->
      </div>
    </div>


  </div>
</template>
<script setup lang="ts">
import {useMarvelStore} from "~/stores/useMarvelStore ";
import { ref, defineEmits } from 'vue';
import sidbar from "~/components/layouts/sidbar.vue"
import { useRouter } from 'vue-router';
import Swal from "sweetalert2";
import axios from 'axios';
const marvelStore=useMarvelStore();
const username = ref('');
const password = ref('');
const expiresInMins = ref(30);
const router = useRouter();
const loginEmail = ref(null);
const loginName = ref(null);
const loginImg = ref(null);

async function login() {
await marvelStore.loginUser(username.value,password.value);
console.log(marvelStore.user.token)
  if (marvelStore.user) {
    // کاربر با موفقیت وارد شد
    const token = marvelStore.user.token;
    localStorage.setItem('authToken', token);
    console.log(token);
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Login successful.',
    });
    router.push('/landing');
  } else {
    // خطا در ورود کاربر
    console.error(marvelStore.loginError);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password is incorrect!',
    });
  }

}

definePageMeta({
  middleware:'auth',

})
</script>

<style scoped>

</style>