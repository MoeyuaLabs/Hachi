<script setup lang="ts">
const { birthday, age, weight, history, requestHistory } = useHachi()

const chartRef = ref<HTMLElement | null>(null)

const { chartOption, charInit } = useCharts()

watch(history, (val) => {
  chartOption.value.dataset! = {
    // FIXME: 类型错误
    source: toRaw(val),
  }
  chartOption.value.title = {
    text: `${weight.value}g`,
    left: 'center',
  }
}, { immediate: true, deep: true })

onMounted(async () => {
  await charInit(chartRef)
  requestHistory()
})
</script>

<template>
  <TheHeader>
    <template #left>
      <RouterLink to="/settings" i-carbon-settings icon-btn />
    </template>
    <template #right>
      <RouterLink to="/add" i-carbon-add icon-btn />
    </template>
  </TheHeader>

  <div ref="chartRef" h-100 w-full bg-white pt-2 />

  <div flex="~ justify-around items-center" h-16 w-full>
    <div>
      <p>Birthday</p>
      <p>{{ birthday.toLocaleDateString() }}</p>
    </div>
    <div h-full w-1 b-l="1px solid black" />
    <div>
      <p>Age</p>
      <p>{{ age }} day</p>
    </div>
  </div>

  <div p="x-4 y-6">
    <h2 w-full pl-5 text-left>
      History
    </h2>
    <div b-rd-5 bg-white px-5>
      <div v-for="h in history" :key="h.date" w-full flex justify-between p-2 b-b="1px solid hex-DADADB">
        <span>{{ h.weight }} g</span>
        <span>{{ h.date }}</span>
      </div>
    </div>
  </div>
</template>
