<template>
  <button @click="showModal =true" class="text-white bg-green p-[20px] rounded-[10px]"> all info about Charachters
  </button>
  <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
       aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:w-[900px] md:h-[650px]">
        <div class=" w-[100%] bg-green-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex flex-col sm:items-end md:flex md:justify-start ">
            <h3 class=" text-[20px] bg-pink-300 font-bold mb-[10px]" id="modal-title ">list name character</h3>
            <div v-for="(items ,i) in data" :key="i"
                 class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex flex-col flex-wrap">

              <div class=" w-full flex flex-col  ">
                <div class="flex gap-[100px]">

                  <h2 class="font-bold">name:
                    <span class="font-medium">{{ items.name }}</span></h2>
                  <span class="font-bold "> id:{{ items.id }}</span>

                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ">
          <button @click="showModal = false" type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useMarvelStore} from "~/stores/useMarvelStore ";
import {onMounted} from "vue";


const showModal = ref(false);
const marvelImg = useMarvelStore()
onMounted(async ()=>{
  await marvelImg.fetchCharacters()

})
const data =marvelImg.characters;
console.log (data)


</script>
<style scoped>

</style>