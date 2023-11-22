<script setup lang="ts">
import { useHachi } from '~/composables/hachi'
import { useCharts } from '~/composables/echarts'

const { birthday, age, weight, increase, history, suggest, get } = useHachi()

const chartRef = ref<HTMLElement | null>(null)

const { option, init } = useCharts()

watch(history, (val) => {
  option.value.dataset! = {
    source: val,
  }
}, { immediate: true, deep: true })

onMounted(() => {
  init(chartRef)
  get()
})

// const increase
</script>

<template>
  <TheHeader>
    <RouterLink to="/settings" i-carbon-settings icon-btn />
  </TheHeader>
  <div ref="chartRef" h-100 w-full />
  <div grid="~ rows-1 cols-2" m-10 h-20>
    <div>Birthday <br> {{ birthday.toLocaleDateString() }}</div>
    <div>Age <br> {{ age }} day</div>
  </div>
  <div>
    <h2 mb-2 w-full text-left>
      Information
    </h2>
    <div grid="~ rows-1 cols-4" w-full>
      <div>Weight<br> {{ weight }} g</div>
      <div>Increase <br> {{ increase }} g</div>
      <div>Suggest<br> {{ suggest }} g</div>
    </div>
  </div>
</template>
