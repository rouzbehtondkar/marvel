
<template>
<div class="w-[100%] h-[220vh] flex flex-col pt-[50px] bg-blue-500" >
  <div class="flex flex-col items-center gap-[20px]" >
    <img class="w-[50%] border-l-1 " :src="loginImg"/>
    <span class="text-black font-bold bg-gray-400 outline rounded-[10px] p-[12px]">{{loginName}}</span>
    <span class="text-black font-bold bg-gray-400 outline rounded-[10px] p-[12px]">{{loginEmail}}</span>
    <span class="text-black font-bold bg-gray-400 outline rounded-[10px] p-[12px]">{{loginUser}}</span>

  </div>
</div>
</template>

<script setup lang="ts">
import {useMarvelStore} from "~/stores/useMarvelStore ";
import { watchEffect } from 'vue';
const marvelStore=useMarvelStore();
const loginEmail = ref(marvelStore.user.email || null);
const loginName = ref(marvelStore.user.firstName || null);
const loginImg = ref(marvelStore.user.image || null);
const loginUser = ref(marvelStore.user.username || null);
const ISSERVER = typeof window === "undefined";
if (!ISSERVER) {
  localStorage.setItem('user', JSON.stringify(marvelStore.user));
}
onMounted(()=>{
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    marvelStore.user = JSON.parse(storedUser);
    loginEmail.value = marvelStore.user.email;
    loginName.value = marvelStore.user.firstName;
    loginImg.value = marvelStore.user.image;
    loginUser.value = marvelStore.user.username;
  }
});
watchEffect(() => {
  loginEmail.value = marvelStore.user.email || null;
  loginName.value = marvelStore.user.firstName || null;
  loginImg.value = marvelStore.user.image || null;
  loginUser.value = marvelStore.user.username || null;
});

</script>

<style scoped>

</style>