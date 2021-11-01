chrome.contextMenus.create({
  title: 'tldr-pages',
  contexts: ['selection'],
  id: 'tldr-pages'
});

chrome.contextMenus.onClicked.addListener(sendQueryToMain);

var connectionPort;
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (message) {
    if (message.comm == 'tldr-pages-comm' && message.data) {
      connectionPort = port;
    }
  });
});

function sendQueryToMain(info) {
  if (connectionPort) {
    connectionPort.postMessage({
      comm: 'tldr-pages-comm',
      data: info.selectionText
    });;
  }
}