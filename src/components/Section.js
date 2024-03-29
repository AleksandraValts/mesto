class Section {
    constructor({ items, renderer }, popupSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(popupSelector);
    }

    addItem(elem) {
        this._container.prepend(elem);
    }

    renderItems(items) {
        for (let i = items.length - 1; i > -1; i--) {
          this._renderer(items[i]);
        }
      }
}

export { Section }
