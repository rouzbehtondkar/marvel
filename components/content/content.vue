<template>
  <!--  search and header-->
  <div class="w-[100%] h-[20vh]  pb-[20px] text-white gradient-circle-red flex flex-col justify-center items-center gap-[20px]  ">
    <div class="w-[100%]  flex justify-end pl-[165px] pt-[20px] ">
      <nuxt-link class="bg-pink-600 rounded  text-black font-bold md:mr-[20px] mr-[70%] md:p-[20px] flex justify-center items-center" to="/product" >محصولات</nuxt-link>
    </div>
    <div class="w-[80%]  p-[12px]   rounded-[8px] bg-[#2C2E30] flex justify-start items-center ">
      <button @click="searchCharacters" class="bg-red ml-[10px]">Search</button>
      <input v-model="searchTerm" class="w-[90%] h-[48px] bg-[#3B3D3F] text-left"
             placeholder="Searching for characters">
    </div>
  </div>
  <!--  content card Characters -->
<!--  <div class="bg-gray-500 h-[80vh] w-[100%]">-->
<!--<slider/>-->
<!--  </div>-->
  <div class="bg-gray-800 h-[100vh] ">
    <div class="w-full bg-gray-800 flex flex-col items-center justify-center p-4">

<!--      show data from backend-->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" dir="ltr">
        <div v-for="(item, i) in displayedCharacters" :key="i" class="bg-gray-700 text-white p-4 rounded-lg shadow-lg">
<!--  diirect to other page for show detail       -->
          <NuxtLink :to="`/detail/${item.id}`" >
            <img :src="item.thumbnail.path + '.' + item.thumbnail.extension" alt="Character Thumbnail"
                 class="w-full h-[269px] object-cover rounded-lg">
          </NuxtLink>

          <NuxtLink :to="`/detail/${item.id}`"  class="text-center">{{ item.name }}</NuxtLink>
        </div>
      </div>
    </div>
<!--    section about pagenation-->
    <div class=" bg-gray-800 flex justify-center items-center  mt-4 pb-[40px]">
    <span class="text-white">  <</span>
      <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          class="mx-1 px-3 py-2  border-gray-300 text-sm leading-4 font-medium rounded-md text-white  hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          :class="{ 'bg-red-500 text-white': currentPage === page }"
      >
        {{ page }}
      </button>

    </div>
  </div>


</template>


<script setup lang="ts">


//import files from vue and component
import {useMarvelStore} from '~/stores/useMarvelStore ';
import {ref,computed,watchEffect } from 'vue';

// variabel
const specificCharacter = ref(null);
const searchTerm = ref('');
const marvelStore = useMarvelStore();
const currentPage = ref(1);
const itemsPerPage = 6;
const searchClicked = ref(false);

definePageMeta({
  layout:'home-layout'
})
//run data from backend
onMounted(() => {
  marvelStore.fetchCharacters();

});

// const searchCharacters = async () => {
//   try {
//     await marvelStore.fetchCharacters(searchTerm.value);
//     searchTerm.value = '';
//
//   } catch (error) {
//     console.error('Error searching characters:', error);
//   }
// };

// funcation filter for search

const filteredCharacters=computed(()=>{
  if(!searchClicked) return [];
  return marvelStore.characters.filter(character =>character.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
})
// const filteredCharacters = computed(() => {
//   if (!searchClicked) return [] ;
//   return marvelStore.characters.filter(character => character.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
// });


// funcation pagenation for number page
const totalPages = computed(() => {
  return Math.ceil(filteredCharacters.value.length / itemsPerPage);
});


const displayedCharacters = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCharacters.value.slice(start, end);

});
// run funcation pagenation
const changePage = (page) => {
  currentPage.value = page;
};


</script>

<style scoped>
.gradient-circle-red {
  background-image: linear-gradient(to right, rgb(136, 0, 0) 1%, black 10%);
  background-position: left center;
  //background-size: 100% 100%;
}
</style>