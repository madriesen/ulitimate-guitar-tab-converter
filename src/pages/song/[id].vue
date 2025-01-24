<template>
  <div v-if="error">{{ error }}</div>
  <client-only>
    <chordchart v-if="data" :url="songConfig!.link" :chart="data"/>
    <div v-else-if="status === 'pending'">Loading...</div>
  </client-only>
</template>
<script setup lang="ts">
import {songs} from "~/utils/navigation/songs";

const route = useRoute();
const songConfig = ref(songs[Number(route.params.id)] || null);

const songUrl = computed(() => songConfig.value?.link);

const {data, status, error} = useAsyncData(
    `tab-${songUrl.value}`,
    () => {
      if (!songUrl.value) throw new Error('Invalid song URL');
      return $fetch('/api/ultimate-guitar-tabs', {
        params: {url: songUrl.value},
        retry: false,
      });
    },
    {lazy: false, immediate: true}
);
</script>
