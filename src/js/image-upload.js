const SELECTORS = {
    hiddenImageFileInput: 'hiddenImageFileInput',
    imageContainer: '.image-container',
    galleryThumbnail: '.gallery-thumbnail',
};

const $hiddenImageFileInput = document.getElementById(SELECTORS.hiddenImageFileInput);
const $imageContainer = document.querySelector(SELECTORS.imageContainer);
const $galleryThumbnail = document.querySelector(SELECTORS.galleryThumbnail);
const $previewImage = createPreviewImageElement();

const handleInitialImageUpload = (() => {
    let hasUploadedBefore = false;

    return () => {
        if (hasUploadedBefore) return;
        removeThumbnail();
        hasUploadedBefore = true;
    };
})();

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

function handleImagePreview(file) {
    $imageContainer.appendChild($previewImage);
    const reader = new FileReader();
    reader.onload = (event) => {
        $previewImage.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

function isValidImage(file) {
    return file?.type?.startsWith('image/');
}

function displayError(message) {
    $previewImage.src = '';
    alert(message);
}

function updateImagePreview(file) {
    if (!isValidImage(file)) {
        displayError('Selected file is not an image.');
        return;
    }
    handleInitialImageUpload();
    handleImagePreview(file);
}

function handleImageFileSelection() {
    const file = this.files[0];
    updateImagePreview(file);
}

$hiddenImageFileInput.addEventListener('change', handleImageFileSelection);
