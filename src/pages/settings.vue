<script setup lang="ts">
import { useSettings } from '~/composables/settings'

const { settings } = useSettings()
</script>

<template>
  <TheHeader left="返回" to-left="/" />
  <form p="5" m="x-4 y-6" b-rd-5 bg-white pb-8>
    <div flex="~ col" mb-4 items-start>
      <label for="security-key" mb-2 ml-2>Security Key</label>
      <BaseInput id="security-key" v-model="settings.key" w-full type="password" />
    </div>

    <div flex="~ col" items-start>
      <label for="uri" mb-2 ml-2>URI</label>
      <BaseInput id="uri" v-model="settings.uri" w-full type="url" />
    </div>
  </form>
</template>
