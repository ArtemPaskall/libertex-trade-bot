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








  const HTMLPublishHandler = () => {
    console.log('HTML Publish')
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

    elementsToPublishWithPath.forEach(element => HTMLPublish(element))
    HTMLPublish(elementsToPublishWithPath[0])

    // elementsToPublishWithPath.reduce((promise, element, index) => {
    //   return promise.then(() => {
    //     return new Promise(resolve => {
    //       console.log(`Processing item ${index}`);
    //       let patched = false
    //       HTMLPublish(element, patched)

    //       setTimeout(() => {
    //         console.log('second execution of HTMLPublish started');
    //         let patched = true
    //         HTMLPublish(element, patched)
    //         console.log('second execution of HTMLPublish finished');
    //       }, 5000);



    //       setTimeout(() => {
    //         console.log(`Finished processing item ${index}`);
    //         resolve();
    //         console.log(`5s passed`);
    //       }, 9000);

    //     });
    //   });
    // }, Promise.resolve());



  }


  let patched = false

  async function HTMLPublish(blockToPublish) {
    console.log(patched);

    if (!patched) {
    const mainContent = document.querySelector('#allrecords')
    const blocksToPublishIDArray = [...mainContent.children].map(
      child => child.id,
    )

    const indexOfBlockToPublish = blocksToPublishIDArray.indexOf(
      blockToPublish.id,
    )

    const onOffButton = [...blockToPublish.querySelectorAll('*')].filter(
      child => child.title === 'Спрятать/Показать',
    )



    const contentEditBtn = [...blockToPublish.querySelectorAll('*')].filter(
      child =>
        child.innerText === 'Контент' &&
        child.className === 'recordedit_mainleft_but_settings_title',
    )

    contentEditBtn[0].click()




        console.log('patched', patched);
        document.dispatchEvent(
          new CustomEvent('patch-ace'))
          console.log('patch-ace in contentScript')

         patched = true

        // const saveButton = await waitForElement('.tbtn.tbtn-primary')
        // saveButton.click()
        // console.log(saveButton);

    } else {
      console.log('patched', patched);

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
      // console.log(MDContent);

      const createCopyBlockToPublishBtn = [
        ...blockToPublish.querySelectorAll('*'),
      ].filter(child => child.title === 'Дублировать')



      document.addEventListener('ace-editor-created', () => {
        console.log('ace-editor-created');
      })

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

      console.log('set-value-to-editor in contentScript');
    }



    console.log('HTMLPublish finish');
    // console.log('finish render of element', blockToPublish);
    // const src = chrome.runtime.getURL("src/ace.js")
    // await import(src)
    // const editor = ace.edit("aceeditor553653040")

    // createCopyBlockToPublishBtn[0].click()
    // onOffButton[0].click()
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
