<template>
  <div class="top-0 left-0 h-16 p-4 bg-gray-700 fixed min-w-screen w-full">
    <UButton label="Find Songs" @click="isOpen = true"/>

    <USlideover v-model="isOpen" :transition="false" side="left">
      <div class="p-4 flex-1 overflow-scroll">
        <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            class="flex sm:hidden absolute end-5 top-5 z-10"
            square
            padded
            @click="isOpen = false"
        />
        <ULink class="h-14 border-b border-gray-600" @click="isOpen=false" to="/">
          <div class="navigation-item"> Home
          </div>
        </ULink>

        <ULink v-for="[index, song] of songs.entries()" :key="song.title" @click="isOpen=false" :to="`/song/${index}`">
          <div class="navigation-item"> {{
              song.title
            }}
          </div>
        </ULink>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import {songs} from "~/utils/navigation/songs";

const isOpen = ref(false)
</script>

<style scoped>
.navigation-item {
  @apply text-xl h-16 flex items-center border-b border-gray-600;
}
</style>
