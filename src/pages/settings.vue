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
const router = useRouter()
</script>

<template>
  <el-container p-4>
    <el-header height="40px" flex="~ items-center">
      <el-page-header @back="router.back()" />
    </el-header>
    <el-main>
      <el-form label-position="top">
        <el-form-item label="Security Key">
          <el-input v-model="settings.key" type="password" />
        </el-form-item>

        <el-form-item label="URI">
          <el-input v-model="settings.uri" />
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>
      <el-button @click="onBackup">
        Backup Data
      </el-button>
      <el-button @click="onRecover">
        Recover Data
      </el-button>
    </el-footer>
  </el-container>
</template>
