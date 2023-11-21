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
  <div ref="chartRef" h-100 w-full />
  <div grid="~ rows-1 cols-2" m-10 h-20>
    <div>Now <br> 0.00g</div>
    <div>Inc <br> 0.00g</div>
  </div>
  <div>
    <h2 mb-2 w-full text-left>
      More Information
    </h2>
    <div grid="~ rows-1 cols-4" w-full>
      <div>Name <br> {{ hachi.name }}</div>
      <div>Birthday <br> {{ hachi.birthday }}</div>
      <div>Age <br> {{ 'xx' }} day</div>
    </div>
  </div>
</template>
