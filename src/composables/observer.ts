function elementObserver(element: Ref<HTMLElement | null>): Promise<HTMLElement> {
  return new Promise((resolve) => {
    if (element.value)
      return resolve(element.value)

    const observer = new MutationObserver(() => {
      if (element.value) {
        resolve(element.value)
        observer.disconnect()
      }
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

export function useObserver() {
  return {
    elementObserver,
  }
}
