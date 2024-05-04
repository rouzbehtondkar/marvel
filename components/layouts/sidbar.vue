
<template>
<div class="w-[100%] h-[220vh] flex flex-col pt-[50px] bg-blue-500" >
  <div class="flex flex-col items-center gap-[20px]" >
    <img :src="userInfo.image" class="rounded w-[80px]">
    <span class="text-black font-bold   rounded-[10px] p-[12px]">{{ userInfo.email}}</span>
    <span class="text-black font-bold   rounded-[10px] p-[12px]">{{ userInfo.firstName}} {{ userInfo.age}}</span>
    <button class="text-black font-bold bg-gray-400 outline rounded-[10px] p-[12px] mt-4" @click="logout">Log Out</button>
    <nuxt-link class="text-black font-bold bg-gray-400 outline rounded-[10px] p-[12px] mt-4" @click="showAlert" to="/login">login</nuxt-link>

  </div>
</div>
</template>

<script setup lang="ts">
import { useMarvelStore } from "~/stores/useMarvelStore ";
import { ref, onMounted } from 'vue';
import Swal from "sweetalert2";

const marvelStore = useMarvelStore();
const userInfo = ref({});
const token = marvelStore.user.token;
onMounted(() => {
  // بررسی کردن اینکه آیا مقدار 'userInfo' در localStorage وجود دارد یا خیر
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  if (Object.keys(storedUserInfo).length > 0) {
    userInfo.value = storedUserInfo;
    localStorage.setItem('authToken', token);
  }
});

if (marvelStore.user) {
  localStorage.setItem('userInfo', JSON.stringify(marvelStore.userInfo));
}

const logout = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('authToken');
  location.reload();
};

const showAlert = () => {
  if (token) {
    Swal.fire({
      icon: 'warning',
      title: '!کاربر گرامی',
      text: '!شما قبلا وارد شده اید',
    });
  }
}
</script>


<style scoped>

</style>