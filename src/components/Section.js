class Section {
    constructor({ items, renderer }, popupSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(popupSelector);
    }

    addItem(elem) {
        this._container.prepend(elem);
    }

    renderItems() {
        this._renderedItems.forEach((item) => this._renderer(item));
    }
}

export { Section }
