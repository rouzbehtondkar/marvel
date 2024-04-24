<template v-if="data">
</template>
<script setup lang="ts">
import {useMarvelStore} from '~/stores/useMarvelStore ';
import { useRoute } from 'vue-router';
import {ref} from  'vue'
const marvelStore = useMarvelStore();
const route = useRoute()
// console.log(route.params.id)
const data=ref({});
const characterId = route.params.id;
const loadSpecificCharacter = async (characterId) => {
  try {
    const character = await marvelStore.fetchCharacterById(characterId);
    return character;
  } catch (error) {
    console.error('Error loading specific character:', error);
    return null;
  }
};

onMounted(async () => {

  data.value = await loadSpecificCharacter(characterId);

});
console.log( data.value);
</script>
<style scoped>

</style>