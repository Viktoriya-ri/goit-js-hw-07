import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);
galleryContainer.addEventListener('click', onImgClick);

function createGalleryItemsMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    }).join('');
}

const instance = basicLightbox.create(`<img width="1280" height="auto" src="">`,
    {
        onShow: (instance) => {
            window.addEventListener('keydown', onEscKeyPress);
        },
        onClose: (instence) => {
            window.removeEventListener('keydown', onEscKeyPress);
        },
    });

function onImgClick(evt) {
    evt.preventDefault();
    const datasetSource = evt.target.dataset.source;
    if (!datasetSource) 
        return;
    instance.element().querySelector('img').src = datasetSource;
    instance.show();
}
    
function onEscKeyPress(evt) {
    if (evt.code !== 'Escape') 
        return;
    instance.close();
}