import { useSettings } from '~/composables/settings'
import { useJSONStorage } from '~/composables/useJSON'

interface History {
  date: string
  weight: number
}

const name = 'はち'
const birthday = new Date('2023/09/22')
const age = Math.floor((new Date().valueOf() - birthday.valueOf()) / 1000 / 60 / 60 / 24)
const weight = ref(0)
const increase = ref(0)
const suggest = ref(0)
const history = useLocalStorage<Array<History>>('history', [])

const { settings } = useSettings()
const { key, uri } = settings.value

const { requestJSON, updateJSON } = useJSONStorage(uri, key)

const get = requestJSON<Array<History>>
const update = updateJSON<Array<History>>

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
  }
}
