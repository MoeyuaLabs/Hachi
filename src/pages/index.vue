<script setup lang="ts">
import { useHachi } from '~/composables/hachi'
import { useCharts } from '~/composables/echarts'
import { useElement } from '~/composables/element'

const { hachi, get } = useHachi()

const chartRef = ref<HTMLElement | null>(null)
const { elementObserver } = useElement(chartRef)
async function initObservers() {
  chartRef.value = await elementObserver()
  const { dataset } = useCharts(chartRef.value)
  watch(hachi, () => {
    dataset.value = {
      source: hachi.value.weights,
    }
  }, { immediate: true, deep: true })
}

onMounted(async () => {
  await initObservers()
  await get()
})
</script>

<template>
  <div>
    <div i-carbon-dog-walker inline-block text-4xl />
    <p>
      <a rel="noreferrer" target="_blank">
        {{ hachi.name }} 已经 {{ }} 天了
      </a>
    </p>
    <p>
      <em text-sm op75>生日是 {{ hachi.birthday }}</em>
    </p>

    <div ref="chartRef" h-100 w-full />
  </div>
</template>
