chrome.contextMenus.create({
  title: 'tldr-pages',
  contexts: ['selection'],
  id: 'tldr-pages'
});

chrome.contextMenus.onClicked.addListener(sendQueryToTab);

function sendQueryToTab (info, tab) {
  chrome.tabs.sendMessage(tab.id, {word: info.selectionText});
}