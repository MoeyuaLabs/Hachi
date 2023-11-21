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
  <div>
    <h2 mb-2 w-full text-left>
      History
    </h2>
    <div flex="~ row justify-start" w-full overflow-scroll>
      <div v-for="weight in hachi.weights" :key="weight.date" flex="col items-center" mr-4>
        <div>{{ weight.val }} g</div>
        <div>{{ weight.date }}</div>
      </div>
    </div>
  </div>
</template>
