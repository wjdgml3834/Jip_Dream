const $fetchedImage = createPreviewImageElement();
const $imageContainer = document.querySelector('.image-container');

function createPreviewImageElement() {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('id', 'fetchedImage');
    return imageElement;
}

function getImage() {
    const savedImageURL = localStorage.getItem('savedImage');
    if (savedImageURL) {
        $fetchedImage.src = savedImageURL;
        $imageContainer.appendChild($fetchedImage);
    } else {
        console.log('error');
    }
}

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        getImage();
    }
};
