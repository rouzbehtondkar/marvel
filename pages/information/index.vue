<template>
  <div class="w-[100%] container mx-auto flex flex-col gap-[100px]  items-center justify-center ">
    <div class="flex">
      <div v-for="(item, i) in info" :key="i">
        <p class="font-bold"> {{ item.title }}</p>
      </div>
    </div>
    <div class="flex flex-col items-center gap-[40px] ">
      <span class="bg-pink-300 p-[20px]"> welcome to Login Marvel</span>
      <input type="text" v-model="username"
             class="w-[150%] flex text-left  border p-[10px] rounded-[10px] login_input_res"
             placeholder="enter your username"/>
      <input type="password" v-model="password"
             class="w-[150%] flex text-left  border p-[10px] rounded-[10px] login_input_res"
             placeholder="enter your username"/>

      <button @click="login" class="text-white pt-[20px] bg-pink px-[30px]  py-[16px] flex items-center justify-center mb-[80px]">Enter</button>
    </div>

  </div>

</template>


<script setup lang="ts">
import {test} from '~/stores/test'

const Data = test();
const info = ref([]);
const username=ref('');
const password=ref('');
const router = useRouter();

onMounted(async () => {
  await Data.product();

  info.value = Data.productvalue.products;
})


async function login () {
  await Data.loginUser(username.value,password.value)
  if(Data.user) {
    const token = Data.user.token;

    localStorage.setItem('authToken' , JSON.stringify(token))
    router.push('/landing')

  }else {
    console.log("error")
  }

}











// async function  login () {
//   await Data.loginUser(username.value,password.value)
//   if(Data.user) {
//     const token=Data.user.token;
//     console.log(token)
//     localStorage.setItem('authToken',JSON.stringify(token))
//     router.push('/landing');
//   }else {
//     console.log("error")
//   }
// }


</script>


<style scoped>

</style>