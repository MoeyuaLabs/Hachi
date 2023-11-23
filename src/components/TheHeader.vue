<script setup lang="ts">
defineProps<{
  title?: string
  back?: string
  left?: string
  toLeft?: string
  right?: string
  toRight?: string
  center?: string
}>()
</script>

<template>
  <header sticky top-0 z-10 h-10 w-full bg-hex-F2F1F5 grid="~ cols-3">
    <RouterLink v-if="toLeft" color="#007AFF" pl-4 text-left line-height-10 :to="toLeft">
      {{ left }}
    </RouterLink>
    <h1 text-center line-height-10>
      {{ center }}
    </h1>
    <RouterLink v-if="toRight" color="#007AFF" pr-4 text-right line-height-10 :to="toRight">
      {{ right }}
    </RouterLink>
    <slot>
      <RouterLink v-if="back" to="/" i-carbon-chevron-left icon-btn />
      <h1 ml-4>
        {{ title }}
      </h1>
    </slot>
  </header>
</template>
