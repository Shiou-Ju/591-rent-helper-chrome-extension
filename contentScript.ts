const swipePicture = (event: KeyboardEvent): void => {
  const previousPictureBtn: HTMLButtonElement =
    document.querySelector('.prev-btn');
  const nextPictureBtn: HTMLButtonElement = document.querySelector('.next-btn');
  const closePicDetailModal: HTMLButtonElement = document.querySelector(
    '.photos-detail > div > .close-btn',
  );
  const morePicModal: HTMLDivElement =
    document.querySelector('.more-photos-page');

  const isExistingBtn = !!previousPictureBtn && !!nextPictureBtn;
  const isMorePicModalOpen = morePicModal.style.display === '';

  if (isExistingBtn || isMorePicModalOpen) {
    switch (event.key) {
      case 'ArrowLeft':
        {
          if (previousPictureBtn) previousPictureBtn.click();
        }
        break;
      case 'ArrowRight':
        {
          if (nextPictureBtn) nextPictureBtn.click();
        }
        break;
      case 'Escape':
        {
          if (isMorePicModalOpen) {
            morePicModal.style.setProperty('display', 'none');
            document.body.style.removeProperty('position');
          }
          if (closePicDetailModal) closePicDetailModal.click();
        }
        break;
      default:
        break;
    }
  }
};

document.onkeydown = swipePicture;
document.addEventListener('click', (event) => {
  const morePicModal: HTMLDivElement =
    document.querySelector('.more-photos-page');
  const openModalBtn = event.target as HTMLDivElement;

  if (openModalBtn && openModalBtn.className.includes('view-more')) {
    morePicModal.style.removeProperty('display');
  }
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'getHouseInfoText') {
    const element = document.querySelector('#houseInfo > div.house-title > h1');
    const elementText =
      element instanceof HTMLElement ? element.innerText : null;

    if (navigator.clipboard && elementText) {
      navigator.clipboard
        .writeText(elementText)
        .then(() => {
          sendResponse({ success: true, text: elementText });
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
          sendResponse({ success: false, error: err.toString() });
        });
    } else {
      sendResponse({
        success: false,
        error: 'Clipboard API not available or text is null',
      });
    }
  }

  return true;
});
