import { ofetch } from 'ofetch'
import { useSettings } from '~/composables/settings'

interface Weight {
  date: string
  val: number
}

interface Hachi {
  name: string
  birthday: string
  weights: Weight[]
}

const hachi = ref<Hachi>({
  name: 'はち',
  birthday: '2023/09/22',
  weights: [],
})

const { settings } = useSettings()
const { key, uri } = settings.value

async function get() {
  try {
    const res = await ofetch<Hachi['weights'] | { status: number; message: string }>(uri, {
      parseResponse: JSON.parse,
    })
    if ('length' in res)
      hachi.value.weights = res
    else
      throw new Error(res.message)
  }
  catch (error) {
    console.error(error)
  }
}

type ResponseAdd = {
  status: 0
  data: Hachi
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
      body: hachi.value.weights,
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
  watch(hachi.value.weights, (newVal, oldVal) => {
    if (oldVal.length === 0)
      return
    if (newVal.length !== oldVal.length)
      update()
  })
  return {
    hachi,
    get,
    update,
  }
}
