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
import { useObserver } from '~/composables/observer'

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

const instance = shallowRef<echarts.ECharts>()

const option = ref<ECOption>({
  title: {
    text: 'Hachi\'s Weight',
  },
  tooltip: {
    axisPointer: { type: 'cross' },
  },
  xAxis: {
    type: 'category',
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} g',
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

function setChart() {
  if (instance.value)
    instance.value.setOption(option.value)
  else console.error('chart is undefined')
}

async function init(element: Ref<HTMLElement | null>) {
  const { elementObserver } = useObserver()
  instance.value = echarts.init(await elementObserver(element))
  setChart()
}

export function useCharts() {
  watch(option, () => {
    setChart()
  }, { deep: true })

  return {
    chartInstance: instance,
    chartOption: option,
    charInit: init,
  }
}
