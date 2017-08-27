let gallery = Object.create(HTMLElement.prototype);
let galleryItem = Object.create(HTMLElement.prototype);
galleryItem.createdCallback = function() {
    const img = new Image();
    const item = this;
    img.onload = () => this.appendChild(img);
    img.src = item.getAttribute('src');
};
document['registerElement']('simple-gallery', {prototype: gallery});
document['registerElement']('gallery-item', {prototype: galleryItem});
