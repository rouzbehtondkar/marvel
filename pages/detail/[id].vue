<template>
<!--  header info for Characters-->
  <div class="w-[100%] h-[120vh] bg-black text-white ">
    <button class="bg-red md:mr-[88%] mt-[20px] logo_res">LOGO</button>
    <div v-for="(item,i) in detailInfo" :key="i">
      <div class="flex w-[100%] pl-[10px] gap-[20px] pb-[40px] items-center detailInfo_res ">
        <div class="w-[80%] flex flex-col md:pt-[80px]" dir="ltr">
          <span class="font-bold text-[30px]">{{ item.name }}</span>
          <span>{{ item.description }}</span>
          <div class=" flex section_btn  justify-start  gap-5 pt-[10px]">
            <button class="btn-custom flex justify-center items-center gap-2">
              <img src="~/assets/img/export.png" alt="Comic Link"/>
              Details
            </button>
            <button class="btn-custom  flex  justify-center gap-5 ">
              <img src="~/assets/img/export.png" alt="Comic Link"/>
              wiki
            </button>
            <button class="btn-custom  flex  justify-center gap-5 ">
              <img src="~/assets/img/export.png" alt="Comic Link"/>
              comiclink
            </button>

          </div>
        </div>

        <div class="md:w-[20%] flex img_section">
          <img :src="item.thumbnail.path + '.' + item.thumbnail.extension" alt="Character Thumbnail"
               class=" w-[50%] pt-[40px] rounded-lg detailInfo_img_res">
        </div>

      </div>
    </div>
    <!--    section info for comics and series-->
    <div class="bg-gray-800 h-[80vh]">
      <div class="w-full bg-gray-800 flex flex-col items-center justify-center p-4">

        <div class="flex flex-col gap-[50px]">
          <h3 class="font-bold text-[20px] pb-[50px] pt-[50px] pr-[92%]" dir="ltr"> comics</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" dir="ltr">

            <div v-for="(items,i) in detailComic" :key="i" class="bg-gray-700 text-white p-4 rounded-lg shadow-lg">
              <img :src="items.thumbnail.path + '.' + items.thumbnail.extension" alt="Character Thumbnail"
                   class="w-full h-[269px] object-cover rounded-lg">
              <NuxtLink class="text-center">{{ items.title }}</NuxtLink>
            </div>
            <!--  section series        -->


          </div>
          <h3 class="font-bold text-[20px] pb-[50px] pt-[50px] pr-[92%]" dir="ltr"> series</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" dir="ltr">
            <div v-for="(items,i) in detailseries" :key="i"
                 class=" w-[300px] bg-gray-700 text-white p-4 rounded-lg shadow-lg pt-[50px]">
              <img :src="items.thumbnail.path + '.' + items.thumbnail.extension" alt="Character Thumbnail"
                   class="w-full h-[269px] object-cover rounded-lg">
              <NuxtLink class="text-center">{{ items.title }}</NuxtLink>
            </div>

          </div>
        </div>

      </div>
    </div>


  </div>

</template>
<script setup lang="ts">
import {useMarvelStore} from '~/stores/useMarvelStore ';
import {useRoute} from 'vue-router';
import {ref, onMounted} from 'vue';
import axios from 'axios';
import md5 from 'md5'


const marvelStore = useMarvelStore();
const route = useRoute()
// console.log(route.params.id)
const characterId = route.params.id;
const detailInfo = ref([]);
const detailComic = ref([]);
const detailseries = ref([]);


const marvelsDetail = async (characterId) => {
  const publicKey = '2dadec700ec19acae6022f02802c1593';
  const privateKey = 'e9970b149457a34b075505ddb0818f29e1a9430b';
  const apiBaseURL = "https://gateway.marvel.com/v1/public/";

  function createURL() {
    const ts = Date.now();
    const params = new URLSearchParams({
      ts: ts,
      apikey: publicKey,
      hash: md5(ts + privateKey + publicKey),

    });
    const endpoint = `${apiBaseURL}/characters/${characterId}?`;
    return endpoint + params;
  }

  try {
    const response = await axios.get(createURL());

    detailInfo.value = response.data.data.results
    // detailComic.value=response.data.data.results[0].comics.items
    // console.log(response.data.data)

  } catch (error) {
    console.error(error);
  }

}


// comics

const marvelsComic = async (characterId) => {
  const publicKey = '2dadec700ec19acae6022f02802c1593';
  const privateKey = 'e9970b149457a34b075505ddb0818f29e1a9430b';
  const apiBaseURL = "https://gateway.marvel.com/v1/public/";

  function createURL() {
    const ts = Date.now();
    const params = new URLSearchParams({
      ts: ts,
      apikey: publicKey,
      hash: md5(ts + privateKey + publicKey),

    });
    const endpoint = `${apiBaseURL}/characters/${characterId}/comics?`;
    return endpoint + params;
  }

  try {
    const response = await axios.get(createURL());

    detailComic.value = response.data.data.results

    console.log(response.data.data)

  } catch (error) {
    console.error(error);
  }

}
const marvelsSeries = async (characterId) => {
  const publicKey = '2dadec700ec19acae6022f02802c1593';
  const privateKey = 'e9970b149457a34b075505ddb0818f29e1a9430b';
  const apiBaseURL = "https://gateway.marvel.com/v1/public/";

  function createURL() {
    const ts = Date.now();
    const params = new URLSearchParams({
      ts: ts,
      apikey: publicKey,
      hash: md5(ts + privateKey + publicKey),

    });
    const endpoint = `${apiBaseURL}/characters/${characterId}/series?`;
    return endpoint + params;
  }

  try {
    const response = await axios.get(createURL());

    detailseries.value = response.data.data.results

    console.log(response.data.data)

  } catch (error) {
    console.error(error);
  }

}


marvelsDetail(characterId)
marvelsComic(characterId)
marvelsSeries(characterId)

</script>
<style scoped>

</style>