console.log('Injecting script...')

let editor = undefined

document.addEventListener('patch-ace', () => {



  setTimeout( async () => {
    originalEdit = window.ace.edit

    window.ace.edit = name => {
      editor = originalEdit(name)
      document.dispatchEvent(new Event('ace-editor-created'))

      return editor
    }



    const saveButton = await waitForElement('.tbtn.tbtn-primary')
    saveButton.click()

    console.log('patch-ace finished');
  }, 2000)
})





document.addEventListener('set-value-to-editor', e => {
  setTimeout(() => {
    editor.setValue(e.detail.value)
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
