;(() => {
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
        '#page_menu_publishlink'
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
        findElementWithZeroMD(child)
    )

    function findElementWithZeroMD(item) {
      const elementsWithZero = [...item.querySelectorAll('*')].filter(
        node => node.className === 'hljs-title' && node.innerText === 'zero-md'
      )

      return elementsWithZero.length > 0 ? true : false
    }

    const elementsToPublishWithPath = elementsToPublish.filter(child =>
      findElementWithPath(child)
    )

    function findElementWithPath(item) {
      const elementsWithPath = [...item.querySelectorAll('*')].filter(
        node => node.className === 'hljs-attribute' && node.innerText === 'path'
      )

      return elementsWithPath.length > 0 ? true : false
    }

    if (!elementsToPublishWithPath.length) {
      alert('There is no zero-md blocks')
      return
    }

    const flexTagsArray = [...elementsToPublishWithPath[0].querySelectorAll('*')]
      .filter(
        node =>
          node.className === 'hljs-title' &&
          node.innerText.match(/\bflex-(1[0-2]|[1-9])\b/)
      )
      .map(node => node.innerText)

    const flexGrowArray = getGrowValuesFrom(flexTagsArray)

    function getGrowValuesFrom(flexTagsArray) {
      if (
        flexTagsArray.length === 6 &&
        flexTagsArray[0] === flexTagsArray[1] &&
        flexTagsArray[2] === flexTagsArray[3] &&
        flexTagsArray[4] === flexTagsArray[5]
      ) {
        const grow1 = flexTagsArray[0].split('-')[1]
        const grow2 = flexTagsArray[2].split('-')[1]
        const grow3 = flexTagsArray[4].split('-')[1]

        return [grow1, grow2, grow3]
      }
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
              HTMLPublish(
                element,
                patched,
                index,
                elementsToPublishWithPath.length,
                flexGrowArray
              )
            }, 7500)

            setTimeout(() => {
              resolve()
            }, 16000)
          })
        })
      },
      Promise.resolve(createLoader('wrapperDark'))
    )

    elementsPublishPromise.then(() => {
      removeLoader('wrapperDark')
    })
  }

  async function HTMLPublish(
    blockToPublish,
    patched,
    index,
    parentArrayLength,
    flexGrowArray
  ) {
    if (!patched) {
      const mainContent = document.querySelector('#allrecords')

      const findOnOffButton = element => {
        const onOffButton = [...element.querySelectorAll('*')].filter(
          child => child.title === 'Спрятать/Показать'
        )

        return onOffButton
      }

      const findMooveUpButton = element => {
        const mooveUpButton = [...element.querySelectorAll('*')].filter(
          child => child.title === 'Переместить вверх'
        )

        return mooveUpButton
      }

      const onOffButton = [...blockToPublish.querySelectorAll('*')].filter(
        child => child.title === 'Спрятать/Показать'
      )

      const contentEditBtn = [...blockToPublish.querySelectorAll('*')].filter(
        child =>
          child.innerText === 'Контент' &&
          child.className === 'recordedit_mainleft_but_settings_title'
      )

      const createCopyBlockToPublishBtn = [
        ...blockToPublish.querySelectorAll('*')
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

      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('patch-ace'))
      }, 5000)
    } else {
      let absolutePath = [...blockToPublish.querySelectorAll('*')].filter(
        element => element.className === 'hljs-value'
      )[0].innerText

      const startIndex = absolutePath.match(/\w/).index
      const endIndex = absolutePath.indexOf('md') + 2
      absolutePath = absolutePath.slice(startIndex, endIndex)

      const langFromZeroMDAttributes = [...blockToPublish.querySelectorAll('*')]
        .filter(
          node => node.className === 'hljs-attribute' && node.innerText === 'lang'
        )
        .map(node =>
          // node.nextSibling.nextSibling.innerText.match(/[a-zA-Z]+/)[0].toUpperCase()
          node.nextSibling.nextSibling.innerText.match(/[a-zA-Z]+/)[0]
        )

      const codeFromZeroMDAttributes = [...blockToPublish.querySelectorAll('*')]
        .filter(
          node => node.className === 'hljs-attribute' && node.innerText === 'code'
        )
        .map(node =>
          node.nextSibling.nextSibling.innerText.match(/[a-zA-Z]+/)[0].toUpperCase()
        )

      const contentEditBtn = [...blockToPublish.querySelectorAll('*')].filter(
        child =>
          child.innerText === 'Контент' &&
          child.className === 'recordedit_mainleft_but_settings_title'
      )

      contentEditBtn[0].click()
      const lastZeroMdElement = index === parentArrayLength - 1 ? true : false

      // const zeroLibrarySrc = chrome.runtime.getURL('src/index.js')
      // const zeroMdModule = await import(zeroLibrarySrc)

      // const IDfyScr = chrome.runtime.getURL('src/utils/IDfy.js')
      // const idfyMdModule = await import(IDfyScr)

      // console.log('idfyMdModule', idfyMdModule)
      // console.log('zeroMdModule', zeroMdModule)

      // const zeromdClass = zeroMdModule.ZeroMd.toString()
      // const idfyFucntion = idfyMdModule.default.toString()

      // console.log('zeromdClass', zeromdClass)
      // console.log('idfyFucntion', idfyFucntion)

      document.dispatchEvent(
        new CustomEvent('set-value-to-editor', {
          detail: {
            lastZeroMdElement,
            absolutePath,
            flexGrowArray,
            langFromZeroMDAttributes: langFromZeroMDAttributes[0],
            codeFromZeroMDAttributes: codeFromZeroMDAttributes[0],
            // zeromdClass,
            // idfyFucntion
          }
        })
      )
    }
  }
})()
