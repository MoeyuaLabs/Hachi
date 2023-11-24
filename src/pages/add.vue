<script setup lang="ts">
import { nanoid } from 'nanoid'

const { updateHistory, history } = useHachi()
const date = ref(new Date().toLocaleDateString())
const weight = ref(0)
const id = ref(nanoid())
function submit() {
  history.value.push({
    id: id.value,
    date: date.value,
    weight: weight.value,
  })
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
        <el-form-item label="ID">
          <el-input v-model="id" disabled />
        </el-form-item>

        <el-form-item label="Date">
          <el-date-picker v-model="date" type="date" />
        </el-form-item>

        <el-form-item label="Weight">
          <el-input-number v-model="weight" />
        </el-form-item>

        <el-button @click="submit">
          Submit
        </el-button>
      </el-form>
    </el-main>
  </el-container>
</template>
