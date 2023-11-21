let element: Ref<HTMLElement | null>

function elementObserver(): Promise<HTMLElement> {
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

export function useElement(ele: Ref<HTMLElement | null>) {
  element = ele
  return {
    elementObserver,
  }
}

export {
  elementObserver as waitForElement,
}
