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
    const { type } = obj

    if (type === 'NEW') {
      newPageLoaded()
    }
  })

  const newPageLoaded = () => {
    const HTMLPublishBtnExist = document.querySelector('#HTMLPublishBtn')

    if (!HTMLPublishBtnExist) {
      const HTMLPublishBtn = document.createElement('li')
      HTMLPublishBtn.id = 'HTMLPublishBtn'
      HTMLPublishBtn.className = 'tp-menu__item'
      HTMLPublishBtn.innerHTML =
        '<a href="#"><b style="color: #e66051">Render MD</b></a>'

      const regularPublishBtn = document.querySelector(
        '#page_menu_publishlink',
      ).parentElement
      const tildaNavMenu = regularPublishBtn.parentElement

      tildaNavMenu.insertBefore(HTMLPublishBtn, regularPublishBtn.nextSibling)

      HTMLPublishBtn.addEventListener('click', HTMLPublishHandler)
    }
  }

  const HTMLPublishHandler = () => {
    const mainContent = document.querySelector('#allrecords')

    const elementsToPublish = [...mainContent.children].filter(
      child =>
        (child.attributes.off.value === 'n' || child.attributes.off.value === '') &&
        findElementWithZeroMD(child),
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

    const createLoader = loaderId => {
      const darkWrapOnScriptExecuting = document.createElement('div')
      darkWrapOnScriptExecuting.id = loaderId
      darkWrapOnScriptExecuting.innerText = 'Loading...'
      darkWrapOnScriptExecuting.style =
        'position: fixed; top: 0; left: 0;' +
        'width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1000000; ' +
        'color: #fff; font-size: 52px;' +
        'display: flex; justify-content: center; align-items: center;'
      document.body.appendChild(darkWrapOnScriptExecuting)
    }

    const removeLoader = loaderId => {
      const loaderToRemove = document.getElementById(loaderId)
      loaderToRemove.remove()
    }

    const elementsPublishPromise = elementsToPublishWithPath.reduce(
      (promise, element, index) => {
        return promise.then(() => {
          return new Promise(resolve => {
            let patched = false
            HTMLPublish(element, patched)

            setTimeout(() => {
              let patched = true
              HTMLPublish(element, patched)
            }, 7500)

            setTimeout(() => {
              resolve()
            // }, 16000)
            }, 18000)
          })
        })
      },
      Promise.resolve(createLoader('wrapperDark')),
    )

    elementsPublishPromise.then(() => {
      removeLoader('wrapperDark')
    })
  }

  async function HTMLPublish(blockToPublish, patched) {
    if (!patched) {
      const mainContent = document.querySelector('#allrecords')

      const findOnOffButton = element => {
        const onOffButton = [...element.querySelectorAll('*')].filter(
          child => child.title === 'Спрятать/Показать',
        )

        return onOffButton
      }

      const findMooveUpButton = element => {
        const mooveUpButton = [...element.querySelectorAll('*')].filter(
          child => child.title === 'Переместить вверх',
        )

        return mooveUpButton
      }

      const onOffButton = [...blockToPublish.querySelectorAll('*')].filter(
        child => child.title === 'Спрятать/Показать',
      )

      const contentEditBtn = [...blockToPublish.querySelectorAll('*')].filter(
        child =>
          child.innerText === 'Контент' &&
          child.className === 'recordedit_mainleft_but_settings_title',
      )

      const createCopyBlockToPublishBtn = [
        ...blockToPublish.querySelectorAll('*'),
      ].filter(child => child.title === 'Дублировать')

      createCopyBlockToPublishBtn[0].click()

      setTimeout(() => {
        const sibling = blockToPublish.nextElementSibling
        findOnOffButton(sibling)[0].click()

        setTimeout(() => {
          findMooveUpButton(sibling)[0].click()
        }, 1000)
      }, 2500)

      setTimeout(() => {
        contentEditBtn[0].click()
      }, 4000)

      setTimeout(async () => {
        document.dispatchEvent(new CustomEvent('patch-ace'))
      }, 5000)
    } else {
      let absolutePath = [...blockToPublish.querySelectorAll('*')].filter(
        element => element.className === 'hljs-value',
      )[0].innerText

      const startIndex = absolutePath.match(/\w/).index
      const endIndex = absolutePath.indexOf('md') + 2
      absolutePath = absolutePath.slice(startIndex, endIndex)
      absolutePath = encodeURIComponent(absolutePath)

      async function MDContentFetch() {
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

      const MDContentScriptTagWrapped =
        '<zero-md>\n' +
        '<script type="text/markdown">\n' +
        `${MDContent}\n` +
        '</script>\n' +
        '</zero-md>'

      const contentEditBtn = [...blockToPublish.querySelectorAll('*')].filter(
        child =>
          child.innerText === 'Контент' &&
          child.className === 'recordedit_mainleft_but_settings_title',
      )

      contentEditBtn[0].click()

      document.dispatchEvent(
        new CustomEvent('set-value-to-editor', {
          detail: {
            value: MDContentScriptTagWrapped,
          },
        }),
      )
    }
  }

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
})()
