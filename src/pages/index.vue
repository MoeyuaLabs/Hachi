<script setup lang="ts">
import { useHachi } from '~/composables/hachi'
import { useCharts } from '~/composables/echarts'

const { hachi, get } = useHachi()

const chartRef = ref<HTMLElement | null>(null)

const { option, init } = useCharts()

watch(hachi, () => {
  option.value.dataset! = {
    source: hachi.value.weights,
  }
}, { immediate: true, deep: true })

onMounted(() => {
  init(chartRef)
  get()
})
</script>

<template>
  <TheHeader>
    <RouterLink to="/settings" i-carbon-settings icon-btn />
  </TheHeader>
  <div>
    <div ref="chartRef" h-100 w-full />
    <div grid="~ rows-1 cols-2" h-20>
      <div>Birthday <br> {{ hachi.birthday }}</div>
      <div>Age <br> {{ 11 }} day</div>
    </div>
  </div>
  <button i-carbon-add fixed bottom-16 right-8 h-16 w-16 icon-btn />
</template>
