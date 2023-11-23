<script setup lang="ts">
import { nanoid } from 'nanoid'

const { updateHistory, history } = useHachi()
const date = ref(new Date().toLocaleDateString())
const weight = ref(0)
const id = ref(nanoid())
function submit() {
  history.value.push({
    date: date.value,
    weight: weight.value,
  })
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
    <BaseInput v-model="id" label="ID" readonly color-gray />

    <BaseInput v-model="date" label="Date" type="date" />

    <BaseInput v-model="weight" label="Weight (g)" type="number" />
  </form>
  <button btn @click="submit">
    Submit
  </button>
  <button btn>
    Reset
  </button>
</template>
