<script setup lang="ts">
defineProps<{
  title?: string
  back?: string
}>()
</script>

<template>
  <header flex="~ items-center" mb-4 w-full>
    <slot>
      <RouterLink v-if="back" to="/" i-carbon-chevron-left icon-btn />
      <h1 ml-4>
        {{ title }}
      </h1>
    </slot>
  </header>
</template>
