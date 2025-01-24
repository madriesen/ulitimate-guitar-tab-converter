<template>
  <UInput
      :model-value="value"
      @update:model-value="(value) => $emit('update:value', value)"
      :placeholder="placeholder"
      class="flex-1"
  />
</template>

<script setup lang="ts">
defineProps<{ placeholder: string; value: string, loading: boolean }>();
const emit = defineEmits(['update:value']);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value);
};
</script>
