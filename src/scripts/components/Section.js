export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }
    renderItems(elements) {
        elements.reverse().forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}