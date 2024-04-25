<template >
  <div class="w-[100%] h-[30vh] bg-black text-white">

<!--      <button class="bg-red">LOGO</button>-->
      <div v-for="(item,i) in detailInfo" :key="i">
        <div class="flex w-[100%] pl-[10px] gap-[20px] items-center ">
          <div class="w-[80%] flex flex-col pt-[80px]   " dir="ltr">
            <span class="font-bold text-[30px]">{{item.name}}</span>
            <span>{{item.description}}</span>
          </div>
          <div class="w-[20%] flex   ">
            <img :src="item.thumbnail.path + '.' + item.thumbnail.extension" alt="Character Thumbnail"
                 class=" w-[50%] pt-[40px]  rounded-lg">
          </div>
        </div>




      </div>

    </div>

</template>
<script setup lang="ts">
import {useMarvelStore} from '~/stores/useMarvelStore ';
import { useRoute } from 'vue-router';
import {ref,onMounted} from  'vue';
import axios from 'axios';
import md5 from 'md5'


const marvelStore = useMarvelStore();
const route = useRoute()
// console.log(route.params.id)
const characterId = route.params.id;
const detailInfo=ref([]);

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

              detailInfo.value=response.data.data.results
              console.log(response.data)

            } catch (error) {
                console.error(error);
            }

  }



  marvelsDetail(characterId)

</script>
<style scoped>

</style>