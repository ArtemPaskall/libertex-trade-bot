// // // add script name to the status block to show script is active or not
const statusBlock = document.querySelector('.user-status')

const scriptStatus = document.createElement('div')
scriptStatus.textContent = '+ ZScript v0.53'
scriptStatus.style.paddingLeft = '5px'
scriptStatus.style.fontSize = '11px'
scriptStatus.style.color = '#909294'

statusBlock.appendChild(scriptStatus)

// // // add the extension status bar to the header
const statusBar = document.createElement('div')
statusBar.className = 'status-bar'
statusBar.style.width = '250px'

const statusLabel = document.createElement('div')
statusLabel.className = 'status-switcher'
statusLabel.textContent = 'Status'
statusLabel.style.cursor = 'pointer'

const sound = document.createElement('div')
sound.className = 'sound-label'
sound.textContent = 'Sound OFF'
sound.style.cursor = 'pointer'

const connection = document.createElement('div')
connection.className = 'connection-label'
connection.textContent = 'Connection'

statusBar.appendChild(statusLabel)
statusBar.appendChild(sound)
statusBar.appendChild(connection)

const leftColumnHeaderElement = document.querySelector('.col-left')
const rightColumnHeaderElement = document.querySelector('.col-right')
leftColumnHeaderElement.parentElement.insertBefore(
  statusBar,
  rightColumnHeaderElement,
)

// // // alarm function monitor internet connection
const alarmSound = new Audio(chrome.runtime.getURL('assets/videoplayback.m4a'))

let userInteracted = false

// Function to unlock audio playback and check status
function unlockAudio() {
  userInteracted = true
  alarmSound
    .play()
    .then(() => {
      // Audio playback succeeded, immediately pause it
      alarmSound.pause()
      alarmSound.currentTime = 0
      updateAudioLabel('#02fd4f')
    })
    .catch(error => {
      console.log('Audio playback failed:', error)
      updateAudioLabel('red')
    })

  window.removeEventListener('click', unlockAudio)
  window.removeEventListener('keydown', unlockAudio)
}

// Function to update the audio label color
function updateAudioLabel(color) {
  waitForElement('.sound-label')
    .then(element => {
      element.textContent = color === 'red' ? 'Sound OFF' : 'Sound ON'
      color === 'red' && (element.title = 'Turn ON')
      element.style.color = color
    })
    .catch(error => console.log(error))
}

// Add event listeners to detect the first user interaction
window.addEventListener('click', unlockAudio)
window.addEventListener('keydown', unlockAudio)

// Initial check to see if audio is allowed
function checkAudioStatus() {
  alarmSound
    .play()
    .then(() => {
      // Audio playback succeeded, immediately pause it
      alarmSound.pause()
      alarmSound.currentTime = 0
      updateAudioLabel('#02fd4f')
    })
    .catch(error => {
      console.log('Audio playback failed:', error)
      updateAudioLabel('red')
    })
}

// Function to check internet connection
function checkConnection() {
  waitForElement('.connection-label')
    .then(element => {
      element.style.color = '#02fd4f'
    })
    .catch(error => console.log(error))

  if (!navigator.onLine) {
    alarmSound.play().catch(error => {
      console.error('Audio playback failed:', error)
    })

    waitForElement('.connection-label')
      .then(element => {
        element.style.color = 'red'
      })
      .catch(error => console.log(error))
  }
}

// Event listeners for connection changes
window.addEventListener('online', checkConnection)
window.addEventListener('offline', checkConnection)

// Initial check and simulate user interaction
window.addEventListener('load', () => {
  checkConnection()
  checkAudioStatus()
})

// Check connection every 30 seconds (30000 milliseconds)
setInterval(checkConnection, 30000)

// // // work with 'https://app.libertex.org/investments/active/' page
let hasHandledInvestmentsMessage = false

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const { type } = obj

  if (type === 'INVESTMENTS' && !hasHandledInvestmentsMessage) {
    hasHandledInvestmentsMessage = true

    waitForElement('.investments-list')
      .then(element => {
        function investmentsListHandler(element) {
          console.log('Element found:', element)
          element.childNodes.forEach(node => {
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
        investmentsListHandler(element)
      })
      .catch(error => console.log(error))
  } else if (type === 'RESET_INVESTMENTS') {
    hasHandledInvestmentsMessage = false
  }
})

// // // function helper to find dinamic content
function waitForElement(selector, interval = 100, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const checkExist = setInterval(() => {
      const element = document.querySelector(selector)

      if (element) {
        clearInterval(checkExist)
        resolve(element)
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkExist)
        reject(
          new Error(
            `Element with selector "${selector}" not found within timeout.`,
          ),
        )
      }
    }, interval)
  })
}

// let socket = new WebSocket('wss://app.libertex.org/ws-gate/ws');
