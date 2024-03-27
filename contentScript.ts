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
    const titleElement = document.querySelector(
      '#houseInfo > div.house-title > h1',
    );
    const titleText =
      titleElement instanceof HTMLElement
        ? titleElement.innerText
        : 'Title not found';

    const priceElement = document.querySelector(
      '#houseInfo > div.house-price > span',
    );
    const priceText =
      priceElement instanceof HTMLElement
        ? priceElement.innerText
        : 'Price not found';

    const addressElement = document.querySelector(
      '#positionRound > div.address.ellipsis > p:nth-child(1) > span.load-map',
    );
    const addressText =
      addressElement instanceof HTMLElement
        ? addressElement.innerText
        : 'Address not found';

    const otherFeesElement = document.querySelector(
      '#houseDetail > div.main-info-list > div.main-info-left > div.content',
    );
    const detailsText =
      otherFeesElement instanceof HTMLElement
        ? otherFeesElement.innerText
        : 'Details not found';

    const currentUrl = document.location.href;

    const combinedText = `Title: ${titleText}\n\nPrice: ${priceText}\n\nAddress: ${addressText}\n\nOtherFees:\n\n${detailsText}\n\nURL:\n${currentUrl}`;

    if (navigator.clipboard && combinedText) {
      navigator.clipboard
        .writeText(combinedText)
        .then(() => {
          sendResponse({ success: true, text: combinedText });
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
