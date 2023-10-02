const $hiddenImageFileInput = document.getElementById('hiddenImageFileInput');
const $imageContainer = document.querySelector('.image-container');
const $galleryThumbnail = document.querySelector('.gallery-thumbnail');

let hasUploadedBefore = false;
const previewImage = document.createElement('img');
previewImage.setAttribute('id', 'previewImage');

$imageContainer.addEventListener('click', function () {
    $hiddenImageFileInput.click();
});

$hiddenImageFileInput.addEventListener('change', function () {
    const file = this.files[0];

    if (file && file.type.startsWith('image/')) {
        if (hasUploadedBefore === false) {
            $galleryThumbnail.parentNode.removeChild($galleryThumbnail);
            hasUploadedBefore = true;
        }

        $imageContainer.appendChild(previewImage);

        const reader = new FileReader();

        reader.onload = function (event) {
            previewImage.src = event.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
    }
});
