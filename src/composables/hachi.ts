import { useSettings } from '~/composables/settings'
import { useJSONStorage } from '~/composables/useJSON'

// TODO 需要添加 nanoId
interface Weight {
  date: string
  weight: number
}

type History = Array<Weight>

const name = 'はち'
const birthday = new Date('2023/09/22')
const age = Math.floor((new Date().valueOf() - birthday.valueOf()) / 1000 / 60 / 60 / 24)
const weight = ref(0)
const increase = ref(0)
const suggest = ref(0)
const history = useLocalStorage<History>('history', [])

const { settings } = useSettings()
const { key, uri } = settings.value

const { requestJSON, updateJSON } = useJSONStorage(uri, key)

function isHistory(value: unknown): value is History {
  return Array.isArray(value)
}

function isWeight(val: unknown): val is Weight {
  if (typeof val !== 'object' || val === null)
    return false
  if (typeof (val as Weight).date !== 'string')
    return false
  if (typeof (val as Weight).weight !== 'number')
    return false
  return true
}

function addWeight(w: number) {
  const date = new Date().toLocaleDateString()
  const weight = { date, weight: w }
  if (!isWeight(weight))
    return
  history.value.push(weight)
  updateJSON(history.value)
}

async function requestHistory() {
  const data = await requestJSON<History>()
  if (!isHistory(data))
    return
  // TODO 需要与本地数据合并
  history.value = data
}

async function updateHistory() {
  if (!isHistory(history.value))
    await updateJSON(history.value)
}

export function useHachi() {
  watchEffect(() => {
    const last = history.value[history.value.length - 1] ?? 0
    const prev = history.value[history.value.length - 2] ?? 0
    weight.value = Math.round(last.weight * 100) / 100
    increase.value = Math.round((last.weight - prev.weight) * 100) / 100
    suggest.value = Math.round((last.weight / 10) * 100) / 100
  })
  return {
    name,
    birthday,
    age,
    history,
    weight,
    increase,
    suggest,
    requestHistory,
    updateHistory,
    addWeight,
  }
}
