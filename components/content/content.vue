<template>
  <!--  search and header-->
  <div class="w-[100%] h-[20vh] bg-black text-white">
    <div class="w-[100%] flex justify-end pl-[165px] pt-[7px]">
      <button class="bg-red">LOGO</button>
    </div>
    <div class="w-[80%] p-[12px] mr-[10%] mt-[15px] rounded-[8px] bg-[#2C2E30] flex justify-center items-center">
      <button @click="searchCharacters" class="bg-red ml-[10px]">Search</button>
      <input v-model="searchTerm" class="w-[90%] h-[48px] bg-[#3B3D3F] text-left"
             placeholder="Searching for characters">
    </div>
  </div>
  <!--  content-->
  <div class="bg-gray-800 h-[80vh]">
    <div class="w-full bg-gray-800 flex flex-col items-center justify-center p-4">

<!--      show data from backend-->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="(item, i) in displayedCharacters" :key="i" class="bg-gray-700 text-white p-4 rounded-lg shadow-lg">
          <img :src="item.thumbnail.path + '.' + item.thumbnail.extension" alt="Character Thumbnail"
               class="w-full h-[269px] object-cover rounded-lg">
          <NuxtLink :to="`/detail/${item.id}`"  class="text-center">{{ item.name }}</NuxtLink>
        </div>
      </div>
    </div>
<!--    section about pagenation-->
    <div class=" flex justify-center mt-4 pb-[40px]">
      <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          class="mx-1 px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          :class="{ 'bg-blue-500 text-white': currentPage === page }"
      >
        {{ page }}
      </button>
    </div>
  </div>


</template>


<script setup lang="ts">
//import files from vue and component
import {useMarvelStore} from '~/stores/useMarvelStore ';
import {ref} from 'vue';

// variabel
const specificCharacter = ref(null);
const searchTerm = ref('');
const marvelStore = useMarvelStore();
const currentPage = ref(1);
const itemsPerPage = 6;



//run data from backend
onMounted(() => {
  marvelStore.fetchCharacters();

});
// search items marvel
const searchCharacters = async () => {
  try {
    await marvelStore.fetchCharacters(searchTerm.value);

  } catch (error) {
    console.error('Error searching characters:', error);
  }
};


const filteredCharacters = computed(() => {
  return marvelStore.characters.filter(character => character.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const totalPages = computed(() => {
  return Math.ceil(filteredCharacters.value.length / itemsPerPage);
});

const displayedCharacters = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCharacters.value.slice(start, end);
});

const changePage = (page) => {
  currentPage.value = page;
};

const loadSpecificCharacter = async (characterId) => {
  specificCharacter.value = await marvelStore.fetchCharacterById(characterId);
};
</script>

<style scoped>

</style>