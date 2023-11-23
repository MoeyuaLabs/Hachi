<script setup lang="ts">
</script>

<template>
  <header grid="~ cols-3" p-4>
    <div flex="~ items-center justify-start">
      <slot name="left" />
    </div>

    <div flex="~ items-center justify-center">
      <slot name="center" />
    </div>

    <div flex="~ items-center justify-end">
      <slot name="right" />
    </div>
  </header>
</template>
