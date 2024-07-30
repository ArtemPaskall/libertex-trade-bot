// add script name to the status block to show script is active or not
const statusBlock = document.querySelector('.user-status')

const scriptStatus = document.createElement('div')
scriptStatus.textContent = '+ ZScript v0.53'
scriptStatus.style.paddingLeft = '5px'
scriptStatus.style.fontSize = '11px'
scriptStatus.style.color = '#909294'

statusBlock.appendChild(scriptStatus)

//add the extension status bar to the header
const statusBar = document.createElement('div')
statusBar.className = 'status-bar'
statusBar.style.width = '250px'

const statusLabel = document.createElement('div')
statusLabel.className = 'status-switcher'
statusLabel.textContent = 'Status'
statusLabel.style.cursor = 'pointer'

const sound = document.createElement('div')
sound.className = 'sound'
sound.textContent = 'Sound'
sound.style.cursor = 'pointer'

const connection = document.createElement('div')
connection.className = 'connection'
connection.textContent = 'Connection'
connection.style.cursor = 'pointer'

statusBar.appendChild(statusLabel)
statusBar.appendChild(sound)
statusBar.appendChild(connection)

const leftColumnHeaderElement = document.querySelector('.col-left')
const rightColumnHeaderElement = document.querySelector('.col-right')
leftColumnHeaderElement.parentElement.insertBefore(
  statusBar,
  rightColumnHeaderElement,
)

// work with 'https://app.libertex.org/investments/active/' page

function waitForElement(selector, callback, interval = 100, timeout = 5000) {
  const startTime = Date.now()

  const checkExist = setInterval(() => {
    const element = document.querySelector(selector)

    if (element) {
      clearInterval(checkExist)
      callback(element)
    } else if (Date.now() - startTime > timeout) {
      clearInterval(checkExist)
      console.log(`Element with selector "${selector}" not found within timeout.`)
    }
  }, interval)
}

function investmentsListHandler(element) {
  console.log('Element found:', element)
  element.childNodes.forEach(node => {
    console.log(node)
    node.style.lineHeight = '22px'

    const startTimeElement = node.querySelector('.col.col-startTime')
    const rules = document.createElement('select')
    rules.style.width = '100px'
    rules.style.color = 'black'
    rules.style.backgroundColor = 'gray'

    // Create and add <option> elements
    let option1 = document.createElement('option')
    option1.value = 'option1'
    option1.text = 'Option 1'
    rules.appendChild(option1)

    let option2 = document.createElement('option')
    option2.value = 'option2'
    option2.text = 'Option 2'
    rules.appendChild(option2)

    startTimeElement.appendChild(rules)

    rules.addEventListener('click', function (event) {
      event.stopPropagation()
    })
  })
}

waitForElement('.investments-list', investmentsListHandler)

// let socket = new WebSocket('wss://app.libertex.org/ws-gate/ws');
//hjkjh
