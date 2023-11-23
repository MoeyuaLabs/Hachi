<script setup lang="ts">
const { settings } = useSettings()
</script>

<template>
  <TheHeader>
    <template #left>
      <RouterLink to="/" i-carbon-chevron-left icon-btn />
    </template>
  </TheHeader>
  <form p="y-4 x-8" b-rd-5 bg-white pb-8>
    <BaseInput v-model="settings.key" label="Security Key" type="password" />
    <BaseInput v-model="settings.uri" label="URI" type="url" />
  </form>
</template>
