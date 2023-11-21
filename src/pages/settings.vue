<script setup lang="ts">
import { useSettings } from '~/composables/settings'

const { settings } = useSettings()
</script>

<template>
  <TheHeader title="Settings" back="/" />
  <form text-left grid="~ gap-4">
    <div flex="~ row">
      <label for="security-key" mr-2>Security Key</label>
      <BaseInput id="security-key" v-model="settings.key" grow-1 type="password" />
    </div>
    <div flex="~ row">
      <label for="uri" mr-2>URI</label>
      <BaseInput id="uri" v-model="settings.uri" grow-1 type="url" />
    </div>
  </form>
</template>
