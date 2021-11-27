function wait (timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

async function closeTab (tab) {
  await wait(5000)
  chrome.tabs.remove(tab.id)
}

function sendToPocket (tabs) {
  tabs.forEach(function (chrometab) {
    var url = encodeURIComponent(chrometab.url)
    var id = chrometab.id
    var prefix = 'http://getpocket.com/edit?url='
    var newurl = prefix + url
    chrome.tabs.update(id, { url: newurl }, closeTab)
  })
}

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function (tab) {
  sendToPocket([tab])
})
