import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    // console.log(data);
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderMessage(this._error);
    this._data = data;
    // console.log(this._data);

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  addHandler(handler) {
    ['load', 'hashchange'].forEach(ev => {
      addEventListener(ev, handler);
    });
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
