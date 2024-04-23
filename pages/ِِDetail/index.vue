<template>
  <div>
    <h1>{{ character.name }}</h1>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMarvelStore } from '~/stores/useMarvelStore ';

const route = useRoute();
const marvelStore = useMarvelStore();
const character = ref(null);

onMounted(async () => {
  const characterId = route.params.id;
  character.value = await marvelStore.fetchCharacterDetails(characterId);
  console.log("work?" + character)
});
</script>

<style scoped>
/* استایل‌های خاص صفحه جزییات کاراکتر */
</style>
