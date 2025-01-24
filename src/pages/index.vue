<template>
  <c-title class="print:hidden">Ultimate Guitar Tab Downloader</c-title>
  <search class="print:hidden" :loading="status === 'pending'" @search="fetchTabData" v-model="ultimateGuitarTabUrl"
          placeholder="Ultimate Guitar tab url..."/>
  <div v-if="error">{{ error }}</div>
  <chordchart v-if="data" :url="ultimateGuitarTabUrl" :chart="data"/>
  <div v-else-if="status === 'pending'">Loading...</div>
</template>
<script setup lang="ts">
const ultimateGuitarTabUrl = ref('https://tabs.ultimate-guitar.com/tab/misc-soundtrack/grease-youre-the-one-that-i-want-chords-78010')

// Reactive fetch using useAsyncData
const {data, status, refresh, error} = useAsyncData(
    `tab-${ultimateGuitarTabUrl.value}`,
    () => {
      if (!ultimateGuitarTabUrl.value) throw new Error('Invalid song URL');
      return $fetch('/api/ultimate-guitar-tabs', {
        params: {url: ultimateGuitarTabUrl.value},
        retry: false,
      });
    },
    {lazy: false, immediate: false}
);
// Manual fetch trigger for custom search actions
const fetchTabData = () => {
  data.value = null
  refresh()
}
</script>
