import * as echarts from 'echarts/core'
import {
  BarChart,
  type BarSeriesOption,
  LineChart,
  type LineSeriesOption,
} from 'echarts/charts'
import {
  DatasetComponent,
  type DatasetComponentOption,
  GridComponent,
  type GridComponentOption,
  LegendComponent,
  type LegendComponentOption,
  TitleComponent,
  type TitleComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  TransformComponent,
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import type {
  ComposeOption,
} from 'echarts/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | GridComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>

// 注册必须的组件
echarts.use([
  BarChart,
  LineChart,
  CanvasRenderer,
  DatasetComponent,
  GridComponent,
  LabelLayout,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
  UniversalTransition,
])

const option = ref<ECOption>({
  tooltip: {
    axisPointer: { type: 'cross' },
  },
  xAxis: { type: 'category', axisTick: {
    alignWithLabel: true,
  } },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}g',
    },
  },
  dataset: {
    source: [],
  },
  series: [
    {
      type: 'line',
    },
  ],
})

const chart = shallowRef<echarts.ECharts>()
const dataset = ref<ECOption['dataset']>(option.value.dataset)

function update() {
  if (chart.value)
    chart.value.setOption(option.value)
  else
    console.error('chart is undefined')
}

export function useCharts(ele: HTMLElement) {
  chart.value = echarts.init(toValue(ele))
  watch(dataset, (newVal) => {
    option.value.dataset = newVal
    update()
  }, { deep: true, immediate: true })
  return {
    chart,
    dataset,
  }
}
