console.log('Injecting script...')

let editor = undefined




document.addEventListener('patch-ace', async () => {
  console.log('patch-ace started');

//  setTimeout(() => {
//     let originalEdit = window.ace.edit

//     window.ace.edit = name => {
//       editor = originalEdit(name)
//       document.dispatchEvent(new Event('ace-editor-created'))

//       return editor
//     }

//     console.log('ace-editor-created in my-script.js');
//     console.log('patch-ace finished');
//     console.log('2sec left');
//   }, 2000)



//   setTimeout( async () => {
//     console.log(editor);
//     const saveButton = await waitForElement('.tbtn.tbtn-primary')
//     saveButton.click()
//     console.log('save button clicked');
//     // const HTMLButton = await waitForElement('#HTMLPublishBtn')
//     // HTMLButton.click()
//     // console.log('html button clicked');
//   }, 2500)





  let count = 0;

  const intervalId = setInterval(async () => {

    if (window.ace?.edit) {
      let originalEdit = window.ace.edit

      window.ace.edit = name => {
        editor = originalEdit(name)
        document.dispatchEvent(new Event('ace-editor-created'))

        return editor
      }

      console.log(count);
      console.log('ace-editor-created in my-script.js');
      console.log('patch-ace finished');
      console.log('2sec left');

      count++
      clearInterval(intervalId)

      const saveButton = await waitForElement('.tbtn.tbtn-primary')
      saveButton.click()
    }
  }, 5)

  //   setTimeout( async () => {
  //   console.log(editor);
  //   const saveButton = await waitForElement('.tbtn.tbtn-primary')
  //   saveButton.click()
  //   console.log('save button clicked');
  //   // const HTMLButton = await waitForElement('#HTMLPublishBtn')
  //   // HTMLButton.click()
  //   // console.log('html button clicked');

  //   const qqq = await waitForElement('#HTMLPublishBtn2')
  //   qqq.click()
  //   console.log('html button clicked');


  //   console.log('2500 sec left');
  // }, 2500)

})



document.addEventListener('set-value-to-editor', e => {
  setTimeout( async () => {
    console.log(e);
    console.log(editor);
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
