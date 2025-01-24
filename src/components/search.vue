<template>
  <div class="flex justify-between gap-5">
    <base-input
        :loading
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        class="flex-1"
    />
    <UButton @click="emit('search')" color="primary" variant="solid">Search</UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{ placeholder: string; modelValue: string, loading: boolean }>();
const emit = defineEmits(['update:modelValue', 'search']);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>
