<template>
  <div class="flex justify-between italic mb-4">
    <div>{{ artist }}</div>
    <div>
      <span v-if="keyChord">Key:&nbsp{{ keyChord }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ artist: string, keyChord?: string }>()
</script>
