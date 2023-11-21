const options = useStorage('options', {
  key: '',
  uri: 'https://json.extendsclass.com/bin/e5bd9f7cbc76',
})

export function useOptions() {
  return {
    options,
  }
}
