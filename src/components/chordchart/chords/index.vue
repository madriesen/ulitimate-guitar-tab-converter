<template>
  <div ref="chordChartHtml" class="chordchart font-chords" v-html="chordChart">
  </div>
</template>
<script setup lang="ts">
import {generateChordPro} from "~/utils/chordsheet/chordpro";
import {generateChordChart} from "~/utils/chordsheet/chordchart";

const props = defineProps<{ chords: string }>()
const chordPro = generateChordPro(props.chords)
const chordChart = generateChordChart(chordPro)

const chordchartHtml = ref<HTMLHtmlElement | null>(null);


const A4Height = 297; // A4 height in mm (you can adjust to fit your need)

// Function to check overflow
const checkOverflow = () => {
  if (chordchartHtml.value && chordchartHtml.value.scrollHeight > chordchartHtml.value?.clientHeight) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('chordchart font-chords');
    // You can populate the newDiv with the rest of the content or leave it empty
    chordchartHtml.value.parentNode?.appendChild(newDiv);
  }
};

// Check for overflow after the component is mounted
onMounted(() => {
  nextTick(checkOverflow)
});
</script>

<style>
.chordchart {
  column-count: 2; /* Define 2 columns */
  column-gap: 20px; /* Add gap between columns */
  padding: 10px;
  box-sizing: border-box;
}

.line {
  @apply flex flex-wrap max-w-[80%]
}

.pair {
  @apply grid grid-rows-2 grid-cols-1 pb-1
}

.chord {
  @apply h-4 font-bold;
}

.lyrics {
  @apply h-5 font-normal whitespace-pre;
}

.section {
  @apply mb-5;
  break-inside: avoid; /* Avoid breaking items across columns */

}

.section-header {
  @apply inline-block border-b font-bold mb-2 px-1 rounded;
}

.intro {
  @apply bg-red-400
}

.verse {
  @apply bg-yellow-400
}

.chorus,
.prechorus {
  @apply bg-green-400
}

.instrumental,
.interlude {
  @apply bg-purple-500
}
</style>
