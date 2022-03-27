const swipePicture = (event: KeyboardEvent): void => {
  const previousPictureBtn: HTMLButtonElement =
    document.querySelector('.prev-btn');
  const nextPictureBtn: HTMLButtonElement = document.querySelector('.next-btn');
  const closePicDetailModal: HTMLButtonElement = document.querySelector(
    '.photos-detail > div > .close-btn'
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
