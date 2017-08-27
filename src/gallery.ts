import {Carousel} from './carousel';

const gallery = Object.create(HTMLElement.prototype);
gallery.createdCallback = function() {
    this.carousel = new Carousel(this);
    this.carousel.init();
};
const galleryItem = Object.create(HTMLElement.prototype);
galleryItem.createdCallback = function() {
    const img = new Image();
    img.onload = () => {
        this.appendChild(img);
        Carousel.resizeImage(img);
    };
    img.src = this.getAttribute('src');
};
document['registerElement']('simple-gallery', {prototype: gallery});
document['registerElement']('gallery-item', {prototype: galleryItem});
