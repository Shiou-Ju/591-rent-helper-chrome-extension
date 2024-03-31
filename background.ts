const OPTION_ID = 'copyInfo' as const;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: OPTION_ID,
    title: 'copy all infos for in slack',
    contexts: ['all'],
  });
});

// function isTextEncodable(text: string | undefined): text is string {
//   return typeof text === 'string' && text.trim().length > 0;
// }

// FIXME:
// https://rent.591.com.tw/home/16286976?s=ac
// this link can not use bopy

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== OPTION_ID) return;

  if (tab.id !== undefined) {
    chrome.tabs.sendMessage(
      tab.id,
      { action: 'getHouseInfoText' },
      function (response) {
        if (response.success) {
          console.log('Text copied to clipboard:', response.text);
        } else {
          console.error('Failed to copy text:', response.error);
        }
      },
    );
  }
});
