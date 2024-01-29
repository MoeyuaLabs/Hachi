<script setup lang="ts">
import { nanoid } from 'nanoid'

const { settings } = useSettings()
const { history } = useHachi()

function onBackup() {
  // localStorage.setItem('backup', JSON.stringify(history.value))
  const blob = new Blob([JSON.stringify(history.value)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const id = nanoid()
  link.href = url
  link.download = `hachi-${id}.json`
  link.click()
  URL.revokeObjectURL(url)
}
function onRecover() {
  // 导入 json
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files![0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const backup = JSON.parse(e.target!.result as string)
      if (!backup || !backup.length)
        return
      history.value = backup
    }
    reader.readAsText(file)
  }
  input.click()
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
