<script setup lang="ts">
import { nanoid } from 'nanoid'

defineProps<{
  label: string
}>()
const modelValue = defineModel()
const id = ref(nanoid())
</script>

<template>
  <div flex="~ col" mb-4 items-start>
    <label :for="id" mb-2 ml-2>{{ label }}</label>
    <input
      :id="id" v-model="modelValue" type="text" v-bind="$attrs" bg="transparent"
      border="~ rounded gray-200 dark:gray-700" outline="none active:none" mx-1 w-full pl-1.5
    >
  </div>
</template>
