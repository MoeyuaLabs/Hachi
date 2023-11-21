<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
  <input
    id="input" v-model="modelValue" type="text" v-bind="$attrs" mx-1 pl-1.5 bg="transparent"
    border="~ rounded gray-200 dark:gray-700" outline="none active:none"
  >
</template>
