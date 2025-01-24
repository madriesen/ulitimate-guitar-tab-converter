<template>
  <div class="w-[210mm] h-[297mm] mx-auto print:w-full print:h-auto">
    <c-title>{{ title }}</c-title>
    <UDivider type="dashed"/>
    <chordchart-header :artist="artist" :keyChord="key"/>
    <chordchart-chords :chords/>
  </div>
</template>
<script setup lang="ts">
import {parseChords, parseHtml} from "~/utils/chordsheet/parser";
import {findInObject} from "~/utils/object";

const props = defineProps<{
  url: string
  chart: string
}>()

const chartData = parseHtml(props.chart)

const [title] = findInObject<string>(chartData, 'song_name')
const [artist] = findInObject<string>(chartData, 'artist_name')
const [key] = findInObject<string>(chartData, 'tonality_name')

const [content] = findInObject<string>(chartData, 'content')

const chords = parseChords(content)
</script>

<style>
.sheet {
  font-family: "apercu mono pro", monospace;
  white-space: pre;
  line-height: 1.15rem;
}
</style>
