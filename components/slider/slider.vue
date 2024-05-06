<template>
  <div  class="bg-gray-800 w-[100%] h-[100vh] sliders"  >
    <div class="slider w-[100%] justify-center items-center ">
      <div class="slides flex flex-col gap-[20px] justify-center items-center ">
        <img v-for="(item, i) in marvelImg.characters" :key="i" :src="item.thumbnail.path + '.' + item.thumbnail.extension" alt="Image" class="slid" >
        <span v-if="firstSlide"  class="text-white font-bold text-[30px] "> this picture  is  hero</span>

      </div>


      <button @click="prevSlide" class="prev">Prev</button>
      <button @click="nextSlide" class="next">Next</button>
    </div>
 <div class="w-[100%] flex justify-center pt-[40px]">
   <modals/>
 </div>
  </div>
</template>

<script setup>
import { ref, onMounted,watch  } from 'vue';
import {useMarvelStore} from '~/stores/useMarvelStore ';
const marvelImg=useMarvelStore()
const images = ref([
  {
    id: 1,
    img: "https://s31.picofile.com/file/8474795818/slider1.jpg"
  },
  {
    id: 2,
    img: "https://s30.picofile.com/file/8474797226/amsterdam_1089646_1280_1_.jpg"
  },
  {
    id: 3,
    img: "https://s31.picofile.com/file/8474795834/slider2.jpg"
  },
]);
const slideIndex = ref(0);
const slides = ref(null);
const firstSlide=ref (false);




onMounted(async  () => {

  await   marvelImg.fetchCharacters()
});

watch([ slideIndex,()=>marvelImg.characters], () => {
  firstSlide.value = slideIndex.value === 0  ||  slideIndex.value === 4;
  slides.value = document.querySelectorAll(".slides img");
  if (slides.value[slideIndex.value]) {
    slides.value[slideIndex.value].classList.add("displaySlide");
  };
  // console.log (marvelImg.characters)
});


function showSlide(i) {
  slides.value.forEach(slide => slide.classList.remove("displaySlide"));
  slides.value[i].classList.add("displaySlide");
}
function showAll (){


}
function prevSlide() {
  slideIndex.value = (slideIndex.value - 1 + marvelImg.characters.length) % marvelImg.characters.length;
  showSlide(slideIndex.value);
}

function nextSlide() {
  slideIndex.value = (slideIndex.value + 1) % marvelImg.characters.length;
  showSlide(slideIndex.value);
}
</script>

<style scoped>
.displaytext {
  display: block;
}

.slid {
  width: 50% !important;
  margin: auto;
}
.slider {

  position: relative;
  width: 50%;
  margin: auto;
  overflow: hidden;
}

.slider img {
  width: 100%;
  display: none;
}

img.displaySlide {
  display: block;
}
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
}

.next {
  right: 10px;
  border-radius: 3px 0 0 3px;
  background-color: #dc2626;
}
.prev {
  background-color: #dc2626;
  left: 10px;
  border-radius: 3px 0 0 3px;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}
</style>
