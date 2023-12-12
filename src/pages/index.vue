<script setup lang="ts">
const { age, birthday, history, requestHistory } = useHachi()

const chartRef = ref<HTMLElement | null>(null)

const { chartOption, charInit } = useCharts()

watch(history, (val) => {
  chartOption.value.dataset! = {
    // FIXME: 类型错误
    source: toRaw(val),
  }
  chartOption.value.title
    = [
      {
        text: `${age} days`,
        subtext: 'Age',
        left: 40,
        itemGap: 5,
      },
      {
        text: `${birthday.toLocaleDateString()}`,
        subtext: 'Birthday',
        right: 40,
        itemGap: 5,
      },

    ]
}, { immediate: true, deep: true })

onMounted(async () => {
  await charInit(chartRef)
  requestHistory()
})

function formatData(data: number) {
  return data.toFixed(2)
}

function calculateWeight(index: number) {
  if (index <= 0)
    return
  const { weight: prevWeight } = history.value[index - 1]
  const { weight } = history.value[index]
  return formatData(weight - prevWeight)
}
</script>

<template>
  <el-container p-4>
    <el-header height="40px" flex="~ items-center justify-between">
      <RouterLink to="/settings" i-carbon-settings icon-btn />
      <RouterLink to="/add" i-carbon-add icon-btn />
    </el-header>
    <el-main>
      <div ref="chartRef" h-110 w-full bg-white py-2 />
      <div flex="~ col-reverse">
        <div v-for="(h, i) in history" :key="h.id" mb-4 b-rd-2 bg-hex-eef1f7 p-4>
          <div mb-4 text-left color-hex-3166f1 flex="~ items-center gap-2">
            <div i-carbon-activity />
            <span font-bold>Hachi</span>
            <div i-carbon-dot-mark text-size-2 />
            {{ h.date }}
          </div>

          <div flex tabular-nums>
            <div mr-8>
              <span text-8 font-500>{{ formatData(h.weight) }}</span> <span>g</span>
            </div>
            <div v-if="i > 0">
              <span v-if="Number(calculateWeight(i)) >= 0" i-carbon-caret-sort-up color="green" inline-block />
              <span v-else i-carbon-caret-sort-down color="red" inline-block />
              <span text-8 font-500>{{ calculateWeight(i) }}</span> <span>g</span>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
