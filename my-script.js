console.log('Injecting script...')

// setTimeout(() => {
//   console.log('[INJECTION]: window.ace', window.ace)
//   console.log('[INJECTION]: window.ace.edit', window.ace.edit)
// }, 3000)

let editor = undefined

document.addEventListener('patch-ace', () => {
  console.log('[INJECTION]: patch-ace event catched, going to patch ace.edit...')
  console.log('[INJECTION:PATCH-ACE]: at once: window.ace', window.ace)
  setTimeout(() => {
    console.log('[INJECTION:PATCH-ACE]: later: window.ace', window.ace)
    console.log('[INJECTION:PATCH-ACE]: later: window.ace.edit', window.ace.edit)

    originalEdit = window.ace.edit

    window.ace.edit = name => {
      editor = originalEdit(name)
      // if (!window.aceEditors) {
      //   window.aceEditors = {}
      // }
      // window.aceEditors[name] = editor
      console.log('[INJECTION:PATCH-ACE:EDIT]: tilda created editor:', editor)
      document.dispatchEvent(new Event('ace-editor-created'))
      return editor
    }
  }, 2000)
})

document.addEventListener('set-value-to-editor', e => {
  console.log('going to set value to editor')
  setTimeout(() => {
    editor.setValue(e.detail.value)
  }, 1000)
})

// function waitForElement(selector) {
//   return new Promise(resolve => {
//       if (document.querySelector(selector)) {
//           return resolve(document.querySelector(selector));
//       }

//       const observer = new MutationObserver(mutations => {
//           if (document.querySelector(selector)) {
//               resolve(document.querySelector(selector));
//               observer.disconnect();
//           }
//       });

//       observer.observe(document.body, {
//           childList: true,
//           subtree: true
//       });
//   });
// }
