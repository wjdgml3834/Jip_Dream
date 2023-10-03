const SELECTORS = {
    hiddenImageFileInput: 'hiddenImageFileInput',
    imageContainer: '.image-container',
    galleryThumbnail: '.gallery-thumbnail',
};

const $hiddenImageFileInput = document.getElementById(SELECTORS.hiddenImageFileInput);
const $imageContainer = document.querySelector(SELECTORS.imageContainer);
const $galleryThumbnail = document.querySelector(SELECTORS.galleryThumbnail);
const $previewImage = createPreviewImageElement();

let hasUploadedBefore = false;

function createPreviewImageElement() {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('id', 'previewImage');
    return imageElement;
}

$imageContainer.addEventListener('click', function () {
    $hiddenImageFileInput.click();
});

function removeThumbnail() {
    $galleryThumbnail.parentNode.removeChild($galleryThumbnail);
}

function handleInitialImageUpload() {
    if (hasUploadedBefore) return;
    removeThumbnail();
    hasUploadedBefore = true;
}

function handleImagePreview(file) {
    $imageContainer.appendChild($previewImage);
    const reader = new FileReader();
    reader.onload = (event) => {
        $previewImage.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

function updateImagePreview(file) {
    try {
        if (!file?.type?.startsWith('image/')) {
            throw new Error('Selected file is not an image.');
        }
    } catch (error) {
        $previewImage.src = '';
        alert(error.message);
    }
    handleInitialImageUpload();
    handleImagePreview(file);
}

function handleImageFileSelection() {
    const file = this.files[0];
    updateImagePreview(file);
}

$hiddenImageFileInput.addEventListener('change', handleImageFileSelection);
