let editor = undefined

document.addEventListener('patch-ace', async () => {
  setTimeout(() => {
    let originalEdit = window.ace.edit

    window.ace.edit = name => {
      editor = originalEdit(name)
      document.dispatchEvent(new Event('ace-editor-created'))

      return editor
    }
  }, 500)

  setTimeout(async () => {
    const saveButton = await waitForElement('.tbtn.tbtn-primary')
    saveButton.click()
  }, 1000)
})

document.addEventListener('set-value-to-editor', e => {
  setTimeout(async () => {
    editor.setValue(e.detail.value)
    const saveButton = await waitForElement('.tbtn.tbtn-primary')
    saveButton.click()
    originalEdit = undefined
  }, 1000)
})

function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
