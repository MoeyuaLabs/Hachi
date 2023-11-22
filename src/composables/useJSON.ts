import { ofetch } from 'ofetch'

export interface ErrorJSON { status: 1; message: string }
export type RequestJSON<T> = T | ErrorJSON
export type UpdateJSON<T> = { status: 0; data: T } | ErrorJSON
export type Respose<T> = RequestJSON<T> | UpdateJSON<T>

function isErrorJSON(value: Respose<any>): value is ErrorJSON {
  return (value as ErrorJSON).status === 1
}

const uri = ref('')
const key = ref('')

async function requestJSON<T>() {
  try {
    const res = await ofetch<RequestJSON<T>>(uri.value, {
      parseResponse: JSON.parse,
    })
    if (isErrorJSON(res))
      throw new Error(res.message)
    return res
  }
  catch (error) {
    console.error(error)
  }
}

async function updateJSON<T extends Record<string, any>>(data: T) {
  try {
    const res = await ofetch<UpdateJSON<History[]>>(uri.value, {
      method: 'PUT',
      headers: {
        'Security-key': key.value,
      },
      body: toValue(data),
      parseResponse: JSON.parse,
    })
    if (res.status === 1)
      throw new Error(res.message)
  }
  catch (error) {
    console.error(error)
  }
}

/**
 * @param u uri
 * @param k key
 */
export function useJSONStorage(u: string, k: string) {
  uri.value = u
  key.value = k
  return {
    requestJSON,
    updateJSON,
  }
}
