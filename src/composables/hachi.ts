import { ofetch } from 'ofetch'
import { useSettings } from '~/composables/settings'

interface History {
  date: string
  weight: number
}

const name = 'はち'
const birthday = new Date('2023/09/22')
const age = Math.floor((new Date().valueOf() - birthday.valueOf()) / 1000 / 60 / 60 / 24)
const history = ref<History[]>([])
const weight = ref(0)
const increase = ref(0)
const suggest = ref(0)

const { settings } = useSettings()
const { key, uri } = settings.value

async function get() {
  try {
    const res = await ofetch<Array<History> | { status: number; message: string }>(uri, {
      parseResponse: JSON.parse,
    })
    if ('length' in res)
      history.value = res
    else
      throw new Error(res.message)
  }
  catch (error) {
    console.error(error)
  }
}

type ResponseAdd = {
  status: 0
  data: Array<History>
} | {
  status: 1
  message: string
}

async function update() {
  try {
    const res = await ofetch<ResponseAdd>(uri, {
      method: 'PUT',
      headers: {
        'Security-key': key,
      },
      body: history.value,
      parseResponse: JSON.parse,
    })
    if (res.status === 1)
      throw new Error(res.message)
  }
  catch (error) {
    console.error(error)
  }
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
    get,
    update,
  }
}
