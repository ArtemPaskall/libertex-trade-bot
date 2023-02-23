;(() => {
  const projectId = '16859899'
  const branch = 'master'
  const token = 'rWDVsgsvVsAENEjezaPC'

  function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0]
    var s = document.createElement('script')
    s.setAttribute('type', 'text/javascript')
    s.setAttribute('src', file)
    th.appendChild(s)
  }
  injectScript(chrome.runtime.getURL('/my-script.js'), 'body')

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, pageId } = obj

    if (type === 'NEW') {
      currentPage = pageId
      newPageLoaded()
    }
  })

  const newPageLoaded = () => {
    console.log('newPageLoaded')

    const HTMLPublishBtnExist = document.querySelector('#HTMLPublishBtn')

    if (!HTMLPublishBtnExist) {
      const HTMLPublishBtn = document.createElement('li')
      HTMLPublishBtn.id = 'HTMLPublishBtn'
      HTMLPublishBtn.className = 'tp-menu__item'
      HTMLPublishBtn.innerHTML =
        '<a href="#"><b style="color: #e66051">HTML</b></a>'

      const regularPublishBtn = document.querySelector(
        '#page_menu_publishlink',
      ).parentElement
      const tildaNavMenu = regularPublishBtn.parentElement

      tildaNavMenu.insertBefore(HTMLPublishBtn, regularPublishBtn.nextSibling)

      HTMLPublishBtn.addEventListener('click', HTMLPublishHandler)
    }
  }

  let pacthed = false

  const HTMLPublishHandler = () => {
    console.log('HTML Publish')
    const mainContent = document.querySelector('#allrecords')

    const elementsToPublish = [...mainContent.children].filter(
      child => child.attributes.off.value === 'n' && findElementWithZeroMD(child),
    )

    function findElementWithZeroMD(item) {
      const elementsWithZero = [...item.querySelectorAll('*')].filter(
        node => node.className === 'hljs-title' && node.innerText === 'zero-md',
      )

      return elementsWithZero.length > 0 ? true : false
    }

    const elementsToPublishWithPath = elementsToPublish.filter(child =>
      findElementWithPath(child),
    )

    function findElementWithPath(item) {
      const elementsWithPath = [...item.querySelectorAll('*')].filter(
        node => node.className === 'hljs-attribute' && node.innerText === 'path',
      )

      return elementsWithPath.length > 0 ? true : false
    }

    elementsToPublishWithPath.forEach(element => HTMLPublish(element))

    async function HTMLPublish(blockToPublish) {
      const blocksToPublishIDArray = [...mainContent.children].map(
        child => child.id,
      )
      const indexOfBlockToPublish = blocksToPublishIDArray.indexOf(
        blockToPublish.id,
      )

      const onOffButton = [...blockToPublish.querySelectorAll('*')].filter(
        child => child.title === 'Спрятать/Показать',
      )

      let absolutePath = [...blockToPublish.querySelectorAll('*')].filter(
        element => element.className === 'hljs-value',
      )[0].innerText

      const startIndex = absolutePath.match(/\w/).index
      const lastIndex = absolutePath.indexOf('md') + 2
      absolutePath = absolutePath.slice(startIndex, lastIndex)
      absolutePath = encodeURIComponent(absolutePath)

      const MDContentFetch = async () => {
        try {
          const response = await fetch(
            `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${absolutePath}/raw?ref=${branch}`,
            {
              headers: {
                'PRIVATE-TOKEN': token,
              },
            },
          )
          const result = await response.text()

          return result
        } catch (error) {
          console.log('Error > ', error)
        }
      }

      const MDContent = await MDContentFetch()

      const createCopyBlockToPublishBtn = [
        ...blockToPublish.querySelectorAll('*'),
      ].filter(child => child.title === 'Дублировать')

      const contentEditBtn = [...blockToPublish.querySelectorAll('*')].filter(
        child =>
          child.innerText === 'Контент' &&
          child.className === 'recordedit_mainleft_but_settings_title',
      )

      contentEditBtn[0].click()

      document.addEventListener('ace-editor-created', event => {
        console.log('ace-editor-created: event: ', event)
        console.log('ace-editor-created: event.detail: ', event.detail)
        event.detail.editor.setValue('<p>Hello,</p>\n<p>World!</p>')
      })

      // const textAreaForCustomContent = await waitForElm('.ace_text-input')
      // const textAreaForCustomContent = await waitForElm('.ace_content')
      // const textAreaForCustomContent = await waitForElm('.js-aceeditor')
      const textAreaForCustomContent = await waitForElm('#aceeditor553653040')
      // const textAreaForCustomContent = await waitForElm('#editformsxl')
      // const textAreaForCustomContent = await waitForElm('.tbtn.tbtn-primary')
      // const textAreaForCustomContent = await waitForElm('.form-group.pe-form-group')

      if (!pacthed) {
        document.dispatchEvent(new Event('patch-ace'))
        pacthed = true
      } else {
        document.dispatchEvent(
          new CustomEvent('set-value-to-editor', {
            detail: { value: '<p>Hello,</p>\n<p>World!</p>' },
          }),
        )
      }

      // document.querySelector('#rec553653040').click()

      console.log(textAreaForCustomContent)
      const scriptAce = document.getElementsByTagName('script')
      const aceJs = [...scriptAce].filter(child =>
        child.src.includes('https://front.tildacdn.com/aceeditor/ace.js'),
      )
      console.log(aceJs[0])

      console.log('window.ace', window.ace)
      console.log('globalThis.ace', globalThis.ace)

      // const src = chrome.runtime.getURL("src/ace.js")
      // await import(src)
      // const editor = ace.edit("aceeditor553653040")

      // createCopyBlockToPublishBtn[0].click()
      // onOffButton[0].click()
    }
  }

  function waitForElm(selector) {
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
})()
