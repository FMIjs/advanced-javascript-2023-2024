import { render, html } from 'lit-html';

export class AppHome extends HTMLElement {
  static selector = 'app-home';
  #showRoot = null;

  constructor() {
    super();
    this.#showRoot = this.attachShadow({ mode: 'closed' });
    this.render();
  }

  submitHandler(event) {
    event.preventDefault();
    console.log(event.target);
  }

  getTemplate() {
    return html`
      <h1>HOME PAGE</h1>
    `;
  }

  render() {
    render(this.getTemplate(this), this.#showRoot);
  }
}

customElements.define(AppHome.selector, AppHome)