<script setup lang="ts">
const { settings } = useSettings()
const { history, updateHistory } = useHachi()

function onBackup() {
  localStorage.setItem('backup', JSON.stringify(history.value))
}
function onRecover() {
  const backup = JSON.parse(localStorage.getItem('backup')!)
  if (!backup || !backup.length)
    return
  history.value = backup
  updateHistory()
}
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
  <footer flex="~ justify-center">
    <button mr-4 btn @click="onBackup">
      Backup Data
    </button>
    <button btn @click="onRecover">
      Recover Data
    </button>
  </footer>
</template>
