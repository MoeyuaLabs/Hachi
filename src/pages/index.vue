<script setup lang="ts">
import { useHachi } from '~/composables/hachi'
import { useCharts } from '~/composables/echarts'

const { birthday, age, weight, increase, history, suggest, requestHistory, addWeight } = useHachi()

const chartRef = ref<HTMLElement | null>(null)

const { chartOption, charInit } = useCharts()

watch(history, (val) => {
  chartOption.value.dataset! = {
    // FIXME: 类型错误
    source: toRaw(val),
  }
  chartOption.value.title = {
    text: `${weight.value}g`,
    left: 20,
  }
}, { immediate: true, deep: true })

onMounted(async () => {
  await charInit(chartRef)
  requestHistory()
})
</script>

<template>
  <TheHeader left="设置" to-left="/settings" right="添加" to-right="/add">
    <!-- <div w-full flex justify-between>
      <RouterLink to="/settings" i-carbon-settings icon-btn />
      <button i-carbon-add icon-btn @click="addWeight(1)" />
    </div> -->
  </TheHeader>
  <div ref="chartRef" h-100 w-full bg-white pt-2 />
  <div p="x-4 y-6">
    <h2 mb-2 w-full pl-5 text-left>
      History
    </h2>
    <div b-rd-5 bg-white p-5>
      <div v-for="h in history" :key="h.date" w-full flex justify-between p-2 b-b="1px solid hex-DADADB">
        <span>{{ h.weight }} g</span>
        <span>{{ h.date }}</span>
      </div>
    </div>
  </div>
</template>
