const settings = useStorage('settings', {
  key: '',
  uri: 'https://json.extendsclass.com/bin/e5bd9f7cbc76',
})

export function useSettings() {
  return {
    settings,
  }
}
